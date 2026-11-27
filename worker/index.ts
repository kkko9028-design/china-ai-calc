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

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

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
