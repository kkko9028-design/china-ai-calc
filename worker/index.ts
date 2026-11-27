import { PLAYBOOK_CIPHERTEXT_B64, PLAYBOOK_IV_B64 } from "./playbookPayload.ts";

export interface Env {
  ASSETS: {
    fetch: (request: Request | string) => Promise<Response>;
  };
  CREEM_API_KEY?: string;
  CREEM_PRODUCT_ID?: string;
  PLAYBOOK_SECRET_KEY?: string;
}

function jsonResponse(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store, private",
    },
  });
}

function getCreemApiBase(apiKey: string): string {
  return apiKey.trim().startsWith("creem_test_")
    ? "https://test-api.creem.io"
    : "https://api.creem.io";
}

function hexToBytes(hex: string): Uint8Array {
  const clean = hex.trim();
  if (!/^[0-9a-fA-F]{64}$/.test(clean)) {
    throw new Error("Invalid PLAYBOOK_SECRET_KEY format (expected 64 hex chars).");
  }
  const out = new Uint8Array(32);
  for (let i = 0; i < 32; i++) {
    out[i] = parseInt(clean.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}

function base64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) {
    out[i] = bin.charCodeAt(i);
  }
  return out;
}

async function decryptPlaybookZip(secretHex: string): Promise<ArrayBuffer> {
  const keyBytes = hexToBytes(secretHex);
  const ivBytes = base64ToBytes(PLAYBOOK_IV_B64);
  const cipherBytes = base64ToBytes(PLAYBOOK_CIPHERTEXT_B64);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-GCM" },
    false,
    ["decrypt"]
  );

  return crypto.subtle.decrypt(
    { name: "AES-GCM", iv: ivBytes },
    cryptoKey,
    cipherBytes
  );
}

interface CreemCheckoutResponse {
  id?: string;
  mode?: string;
  status?: string;
  checkout_url?: string;
  product?: string | { id?: string };
  product_id?: string;
  customer?: {
    email?: string;
  };
  order?: {
    id?: string;
    status?: string;
  };
}

interface AggregatedNewsItem {
  id: string;
  title: string;
  url: string;
  commentsUrl?: string;
  source: string;
  points?: number;
  comments?: number;
  publishedAt: string;
  badge?: string;
}

interface HNHitRaw {
  objectID: string;
  title?: string;
  url?: string | null;
  points?: number;
  num_comments?: number;
  created_at: string;
}

function decodeXmlEntities(s: string): string {
  return s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#038;/g, "&")
    .replace(/&#39;/g, "'")
    .trim();
}

function parseRssItems(xml: string, sourceName: string, badge: string): AggregatedNewsItem[] {
  const items: AggregatedNewsItem[] = [];
  const itemMatches = xml.match(/<item[\s\S]*?<\/item>/gi) ?? [];
  for (const block of itemMatches.slice(0, 6)) {
    const titleMatch = block.match(/<title>([\s\S]*?)<\/title>/i);
    const linkMatch = block.match(/<link>([\s\S]*?)<\/link>/i);
    const dateMatch = block.match(/<pubDate>([\s\S]*?)<\/pubDate>/i);
    const title = titleMatch ? decodeXmlEntities(titleMatch[1]) : "";
    const url = linkMatch ? decodeXmlEntities(linkMatch[1]) : "";
    const rawDate = dateMatch ? dateMatch[1].trim() : "";
    const parsedTime = rawDate ? new Date(rawDate).toISOString() : new Date().toISOString();
    if (title && url) {
      items.push({
        id: `rss-${sourceName}-${url.slice(-24)}`,
        title,
        url,
        source: sourceName,
        badge,
        publishedAt: parsedTime,
      });
    }
  }
  return items;
}

async function fetchHNSingleKeyword(
  keyword: string,
  minPoints: number,
  hitsPerPage: number
): Promise<AggregatedNewsItem[]> {
  const endpoint = `https://hn.algolia.com/api/v1/search_by_date?query=${encodeURIComponent(
    keyword
  )}&tags=story&numericFilters=points>${minPoints}&hitsPerPage=${hitsPerPage}`;
  const res = await fetch(endpoint, { headers: { "User-Agent": "SwitchCN-NewsBot/1.0" } });
  if (!res.ok) return [];
  const data = (await res.json()) as { hits?: HNHitRaw[] };
  return (data.hits ?? [])
    .filter((h) => Boolean(h.title))
    .map((h) => {
      const hnUrl = `https://news.ycombinator.com/item?id=${h.objectID}`;
      let source = "news.ycombinator.com";
      if (h.url) {
        try {
          source = new URL(h.url).hostname.replace(/^www\./, "");
        } catch {
          // keep fallback
        }
      }
      return {
        id: `hn-${h.objectID}`,
        title: h.title as string,
        url: h.url || hnUrl,
        commentsUrl: hnUrl,
        source,
        points: h.points ?? 0,
        comments: h.num_comments ?? 0,
        publishedAt: h.created_at,
      };
    });
}

function dedupeAndSortByDate(items: AggregatedNewsItem[], limit: number): AggregatedNewsItem[] {
  const seen = new Set<string>();
  const unique: AggregatedNewsItem[] = [];
  for (const item of items) {
    const key = item.title.toLowerCase().slice(0, 60);
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(item);
    }
  }
  unique.sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  return unique.slice(0, limit);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    // 0. Real-time Global & China AI News Aggregator (GET /api/news)
    if (url.pathname === "/api/news") {
      try {
        const [tcXmlRes, hnAI, hnLLM, hnDeepSeek, hnQwen, hnKimi] = await Promise.all([
          fetch("https://techcrunch.com/category/artificial-intelligence/feed/", {
            headers: { "User-Agent": "SwitchCN-NewsBot/1.0" },
          })
            .then((r) => (r.ok ? r.text() : ""))
            .catch(() => ""),
          fetchHNSingleKeyword("AI", 15, 6).catch(() => []),
          fetchHNSingleKeyword("LLM", 10, 4).catch(() => []),
          fetchHNSingleKeyword("DeepSeek", 3, 5).catch(() => []),
          fetchHNSingleKeyword("Qwen", 3, 5).catch(() => []),
          fetchHNSingleKeyword("Kimi", 3, 4).catch(() => []),
        ]);

        const tcItems = tcXmlRes ? parseRssItems(tcXmlRes, "TechCrunch AI", "MEDIA") : [];
        const globalNews = dedupeAndSortByDate([...tcItems, ...hnAI, ...hnLLM], 8);
        const chinaNews = dedupeAndSortByDate([...hnDeepSeek, ...hnQwen, ...hnKimi], 6);

        return new Response(
          JSON.stringify({
            ok: true,
            syncedAt: new Date().toISOString(),
            global: globalNews,
            china: chinaNews,
          }),
          {
            status: 200,
            headers: {
              "Content-Type": "application/json; charset=utf-8",
              "Cache-Control": "public, max-age=300",
            },
          }
        );
      } catch {
        return jsonResponse({ ok: false, global: [], china: [] }, 500);
      }
    }

    // 1. Health check endpoint
    if (url.pathname === "/api/health") {
      return jsonResponse({
        ok: true,
        checkoutConfigured: Boolean(env.CREEM_API_KEY && env.CREEM_PRODUCT_ID),
        deliveryConfigured: Boolean(env.PLAYBOOK_SECRET_KEY),
        mode: env.CREEM_API_KEY?.trim().startsWith("creem_test_")
          ? "test"
          : env.CREEM_API_KEY
          ? "live"
          : "unconfigured",
      });
    }

    // 2. Create Creem Checkout Session (POST /api/checkout)
    if (url.pathname === "/api/checkout") {
      if (request.method !== "POST") {
        return jsonResponse({ error: "Method not allowed" }, 405);
      }

      const apiKey = env.CREEM_API_KEY?.trim();
      const productId = env.CREEM_PRODUCT_ID?.trim();
      if (!apiKey || !productId) {
        return jsonResponse(
          {
            configured: false,
            error: "Checkout credentials are not configured yet.",
          },
          503
        );
      }

      const creemBase = getCreemApiBase(apiKey);
      const successUrl = `${url.origin}/checkout/success/`;

      try {
        const res = await fetch(`${creemBase}/v1/checkouts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
          },
          body: JSON.stringify({
            product_id: productId,
            request_id: `pb_${crypto.randomUUID()}`,
            success_url: successUrl,
          }),
        });

        if (!res.ok) {
          return jsonResponse(
            { error: "Unable to create checkout session with payment provider." },
            502
          );
        }

        const data = (await res.json()) as CreemCheckoutResponse;
        if (!data.checkout_url) {
          return jsonResponse(
            { error: "Missing checkout_url from payment provider." },
            502
          );
        }

        return jsonResponse({
          configured: true,
          checkoutUrl: data.checkout_url,
        });
      } catch {
        return jsonResponse(
          { error: "Network error contacting payment provider." },
          502
        );
      }
    }

    // 3. Verify & Fulfill Paid Digital Download (GET /api/download?checkout_id=...)
    if (url.pathname === "/api/download") {
      if (request.method !== "GET") {
        return jsonResponse({ error: "Method not allowed" }, 405);
      }

      const checkoutId = (url.searchParams.get("checkout_id") ?? "").trim();
      const verifyOnly = url.searchParams.get("verify_only") === "1";

      if (!/^[a-zA-Z0-9_-]{6,80}$/.test(checkoutId)) {
        return jsonResponse(
          { verified: false, error: "Invalid or missing checkout_id." },
          400
        );
      }

      const apiKey = env.CREEM_API_KEY?.trim();
      const expectedProductId = env.CREEM_PRODUCT_ID?.trim();
      const secretKey = env.PLAYBOOK_SECRET_KEY?.trim();

      if (!apiKey || !secretKey) {
        return jsonResponse(
          {
            verified: false,
            error: "Fulfillment service is missing server configuration.",
          },
          503
        );
      }

      const creemBase = getCreemApiBase(apiKey);

      try {
        // Authoritative server-to-server verification against Creem API
        const verifyRes = await fetch(
          `${creemBase}/v1/checkouts?checkout_id=${encodeURIComponent(checkoutId)}`,
          {
            method: "GET",
            headers: {
              "x-api-key": apiKey,
            },
          }
        );

        if (!verifyRes.ok) {
          return jsonResponse(
            {
              verified: false,
              error: "Order could not be verified with payment processor.",
            },
            403
          );
        }

        const session = (await verifyRes.json()) as CreemCheckoutResponse;

        const isCompleted = session.status === "completed";
        const orderPaid =
          !session.order?.status || session.order.status === "paid";

        const actualProductId =
          typeof session.product === "string"
            ? session.product
            : session.product?.id ?? session.product_id ?? "";

        const productMatches =
          !expectedProductId ||
          !actualProductId ||
          actualProductId === expectedProductId;

        if (!isCompleted || !orderPaid || !productMatches) {
          return jsonResponse(
            {
              verified: false,
              error: "Payment is not completed for this product.",
            },
            403
          );
        }

        if (verifyOnly) {
          return jsonResponse({
            verified: true,
            mode: session.mode ?? "live",
            orderId: session.order?.id ?? checkoutId,
            customerEmail: session.customer?.email ?? null,
          });
        }

        const zipBuffer = await decryptPlaybookZip(secretKey);

        return new Response(zipBuffer, {
          status: 200,
          headers: {
            "Content-Type": "application/zip",
            "Content-Disposition":
              'attachment; filename="China-AI-Direct-API-Playbook-2026.zip"',
            "Cache-Control": "no-store, private",
            "X-Content-Type-Options": "nosniff",
          },
        });
      } catch {
        return jsonResponse(
          {
            verified: false,
            error: "Server error during payment verification or decryption.",
          },
          500
        );
      }
    }

    // 4. All static Next.js pages & assets
    return env.ASSETS.fetch(request);
  },
};
