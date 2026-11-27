"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Flame,
  MessageSquare,
  Radio,
  RefreshCw,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { SpotlightCard } from "@/components/ui/TechPrimitives";

type NewsTab = "global" | "china" | "radar";

interface NewsItem {
  id: string;
  title: string;
  titleZh?: string;
  url: string;
  commentsUrl?: string;
  source: string;
  sourceZh?: string;
  points?: number;
  comments?: number;
  publishedAt: string;
  badge?: string;
  badgeZh?: string;
  internalCompareHref?: string;
}

const CURATED_RADAR_ITEMS: NewsItem[] = [
  {
    id: "radar-gemini-dec1",
    title: "Gemini 4 Carbon intro promo ($2/$10) expires Nov 30 — standard API rate doubles to $4/$20 on Dec 1",
    titleZh: "Gemini 4 Carbon 首发优惠价（$2/$10）11月30日到期，12月1日起标准 API 价格翻倍至 $4/$20",
    url: "/compare/gemini-4-carbon-vs-qwen-4-max/",
    source: "Price Alert",
    sourceZh: "调价预警",
    badge: "DEC 1 HIKE",
    badgeZh: "12月1日涨价",
    publishedAt: "2026-11-27T04:00:00Z",
    internalCompareHref: "/compare/gemini-4-carbon-vs-qwen-4-max/",
  },
  {
    id: "radar-gpt62",
    title: "OpenAI rolls out GPT-6.2 Astra ($8/$40) & GPT-6.2 Sol ($2/$10) with 2x long-context multiplier above 272K",
    titleZh: "OpenAI 发布 GPT-6.2 Astra（$8/$40）与 GPT-6.2 Sol（$2/$10），超 272K 上下文触发翻倍计费",
    url: "/compare/gpt-6-2-astra-vs-deepseek-v4-pro/",
    source: "Release Radar",
    sourceZh: "新模型发布",
    badge: "NEW MODEL",
    badgeZh: "重磅上新",
    publishedAt: "2026-11-17T16:00:00Z",
    internalCompareHref: "/compare/gpt-6-2-astra-vs-deepseek-v4-pro/",
  },
  {
    id: "radar-qwen4",
    title: "Alibaba ships Qwen 4 Max API globally with 1M context window and $0.071/M cached input reads",
    titleZh: "阿里云全球上线 Qwen 4 Max API：支持 1M 上下文，缓存读取低至 $0.071 / 百万 Token",
    url: "/models/qwen-4-max/",
    source: "China AI",
    sourceZh: "中国大模型",
    badge: "$0.071 CACHE",
    badgeZh: "超低缓存价",
    publishedAt: "2026-11-15T10:00:00Z",
    internalCompareHref: "/models/qwen-4-max/",
  },
  {
    id: "radar-claude52",
    title: "Anthropic launches Claude Fable 5.2 ($8/$40, $0.20 cached read) topping agentic coding benchmarks",
    titleZh: "Anthropic 发布 Claude Fable 5.2（$8/$40，缓存读取 $0.20/M），登顶编程 Agent 评测榜",
    url: "/compare/claude-fable-5-2-vs-deepseek-v4-pro/",
    source: "Release Radar",
    sourceZh: "新模型发布",
    badge: "BENCHMARK #1",
    badgeZh: "评测榜首",
    publishedAt: "2026-11-09T17:00:00Z",
    internalCompareHref: "/compare/claude-fable-5-2-vs-deepseek-v4-pro/",
  },
  {
    id: "radar-kimi",
    title: "Moonshot AI releases 2.8T-parameter Kimi K3.1 Pro weights & global API ($2/$10, 1.05M context)",
    titleZh: "月之暗面发布 2.8 万亿参数 Kimi K3.1 Pro 开源权重与海外 API（$2/$10，1.05M 上下文）",
    url: "/models/kimi-k3-1-pro/",
    source: "China AI",
    sourceZh: "中国大模型",
    badge: "OPEN WEIGHTS",
    badgeZh: "开放权重",
    publishedAt: "2026-11-04T09:00:00Z",
    internalCompareHref: "/models/kimi-k3-1-pro/",
  },
  {
    id: "radar-hydrogen",
    title: "Google introduces Gemini 4 Hydrogen ($1.50/$7.50) & Neon ($3/$15) for high-frequency agent loops",
    titleZh: "Google 推出 Gemini 4 Hydrogen（$1.50/$7.50）与 Neon（$3/$15），主攻高频 Agent 工作流",
    url: "/compare/gemini-4-hydrogen-vs-deepseek-v4-1-flash/",
    source: "Release Radar",
    sourceZh: "新模型发布",
    badge: "FAST TIER",
    badgeZh: "高速档位",
    publishedAt: "2026-11-12T15:00:00Z",
    internalCompareHref: "/compare/gemini-4-hydrogen-vs-deepseek-v4-1-flash/",
  },
];

interface HNHit {
  objectID: string;
  title: string;
  url?: string | null;
  points?: number;
  num_comments?: number;
  created_at: string;
}

function formatRelativeTime(iso: string, isZh: boolean): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  if (Number.isNaN(diffMs) || diffMs < 0) return isZh ? "刚刚" : "Just now";
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return isZh ? "刚刚" : "Just now";
  if (mins < 60) return isZh ? `${mins} 分钟前` : `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return isZh ? `${hours} 小时前` : `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return isZh ? `${days} 天前` : `${days}d ago`;
}

function extractDomain(url?: string | null): string {
  if (!url) return "news.ycombinator.com";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "news.ycombinator.com";
  }
}

export function LiveAINews() {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<NewsTab>("global");
  const [globalItems, setGlobalItems] = useState<NewsItem[]>([]);
  const [chinaItems, setChinaItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLiveSource, setIsLiveSource] = useState<boolean>(false);
  const [lastSynced, setLastSynced] = useState<string>("");

  const fetchFeeds = useCallback(async () => {
    setLoading(true);
    try {
      const [globalRes, chinaRes] = await Promise.all([
        fetch(
          "https://hn.algolia.com/api/v1/search_by_date?query=LLM%20OR%20OpenAI%20OR%20Claude%20OR%20Gemini%20OR%20AI%20API&tags=story&numericFilters=points>5&hitsPerPage=8",
          { cache: "no-store" }
        ),
        fetch(
          "https://hn.algolia.com/api/v1/search_by_date?query=DeepSeek%20OR%20Qwen%20OR%20Kimi%20OR%20Moonshot%20OR%20Alibaba%20AI&tags=story&hitsPerPage=8",
          { cache: "no-store" }
        ),
      ]);

      if (!globalRes.ok || !chinaRes.ok) {
        throw new Error("Feed request failed");
      }

      const [globalJson, chinaJson] = await Promise.all([
        globalRes.json(),
        chinaRes.json(),
      ]);

      const mapHits = (hits: HNHit[]): NewsItem[] =>
        (hits || [])
          .filter((h) => Boolean(h?.title))
          .slice(0, 6)
          .map((h) => {
            const hnUrl = `https://news.ycombinator.com/item?id=${h.objectID}`;
            return {
              id: h.objectID,
              title: h.title,
              url: h.url || hnUrl,
              commentsUrl: hnUrl,
              source: extractDomain(h.url),
              points: h.points ?? 0,
              comments: h.num_comments ?? 0,
              publishedAt: h.created_at,
            };
          });

      const mappedGlobal = mapHits(globalJson.hits);
      const mappedChina = mapHits(chinaJson.hits);

      if (mappedGlobal.length > 0) {
        setGlobalItems(mappedGlobal);
        setIsLiveSource(true);
      }
      if (mappedChina.length > 0) {
        setChinaItems(mappedChina);
      }

      const now = new Date();
      setLastSynced(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    } catch {
      setIsLiveSource(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeeds();
    const timer = setInterval(fetchFeeds, 180_000);
    return () => clearInterval(timer);
  }, [fetchFeeds]);

  const displayedItems: NewsItem[] =
    activeTab === "radar"
      ? CURATED_RADAR_ITEMS
      : activeTab === "china"
      ? chinaItems.length > 0
        ? chinaItems
        : CURATED_RADAR_ITEMS.filter((i) => i.source === "China AI" || i.internalCompareHref)
      : globalItems.length > 0
      ? globalItems
      : CURATED_RADAR_ITEMS;

  const tabs: { id: NewsTab; label: string }[] = [
    { id: "global", label: t("Global AI Wire", "全球 AI 实时热帖") },
    { id: "china", label: t("China AI Pulse", "中国模型海外动态") },
    { id: "radar", label: t("Price & Release Radar", "新模型与调价雷达") },
  ];

  return (
    <section id="live-news" className="mt-20 scroll-mt-24">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <Radio className="h-3.5 w-3.5" />
            {t("Real-Time Intelligence Wire", "实时 AI 情报终端")}
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white">
            {t("Live AI & LLM News Feed", "最新全球 AI 与大模型实时资讯")}
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            {t(
              "Auto-updating developer discussions, new model drops, and API pricing shifts.",
              "每 3 分钟自动同步全球极客社区热议、新模型发布与 API 价格变动。"
            )}
          </p>
        </div>

        {/* Controls: Tabs + Refresh */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex rounded-xl border border-white/[0.08] bg-[#060c18]/90 p-1 font-mono text-xs">
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative rounded-lg px-3 py-1.5 font-medium transition ${
                    active ? "text-white" : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="live-news-tab"
                      className="absolute inset-0 rounded-lg bg-emerald-400/15 ring-1 ring-emerald-400/35"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative">{tab.label}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={fetchFeeds}
            disabled={loading}
            title={t("Refresh live feed", "立即刷新实时流")}
            className="inline-flex items-center gap-1.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 font-mono text-[11px] text-slate-300 transition hover:border-emerald-400/40 hover:text-emerald-200 disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin text-emerald-300" : ""}`} />
            {lastSynced
              ? t(`Synced ${lastSynced}`, `已同步 ${lastSynced}`)
              : isLiveSource
              ? t("Live", "实时")
              : t("Refresh", "刷新")}
          </button>
        </div>
      </div>

      {/* News Grid */}
      <div className="mt-6 grid gap-3.5 md:grid-cols-2">
        {displayedItems.map((item) => {
          const isInternal = Boolean(item.internalCompareHref);
          const displayTitle = lang === "zh" && item.titleZh ? item.titleZh : item.title;
          const displaySource = lang === "zh" && item.sourceZh ? item.sourceZh : item.source;
          const displayBadge = lang === "zh" && item.badgeZh ? item.badgeZh : item.badge;

          const cardInner = (
            <SpotlightCard
              className="h-full p-5 transition-transform duration-200 group-hover:-translate-y-0.5"
              spotlightColor="rgba(16, 185, 129, 0.12)"
            >
              <div className="flex h-full flex-col justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-slate-500">
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-white/[0.05] px-2 py-0.5 text-slate-300 ring-1 ring-white/[0.08]">
                        {displaySource}
                      </span>
                      {displayBadge && (
                        <span className="rounded-md bg-emerald-400/15 px-2 py-0.5 font-bold text-emerald-300 ring-1 ring-emerald-400/30">
                          {displayBadge}
                        </span>
                      )}
                    </div>
                    <span>{formatRelativeTime(item.publishedAt, lang === "zh")}</span>
                  </div>

                  <h3 className="mt-3 font-display text-[15px] font-semibold leading-snug text-slate-100 transition group-hover:text-emerald-200">
                    {displayTitle}
                  </h3>
                </div>

                <div className="flex items-center justify-between border-t border-white/[0.05] pt-3 font-mono text-[11px] text-slate-400">
                  <div className="flex items-center gap-3.5">
                    {typeof item.points === "number" && (
                      <span className="inline-flex items-center gap-1 text-amber-300/90">
                        <Flame className="h-3.5 w-3.5" />
                        {item.points} {t("pts", "热度")}
                      </span>
                    )}
                    {typeof item.comments === "number" && item.commentsUrl ? (
                      <span className="inline-flex items-center gap-1 text-slate-400">
                        <MessageSquare className="h-3.5 w-3.5" />
                        {item.comments} {t("comments", "条讨论")}
                      </span>
                    ) : (
                      <span className="text-emerald-300/80">
                        {t("Compare API impact", "测算 API 成本影响")}
                      </span>
                    )}
                  </div>

                  <span className="inline-flex items-center gap-1 font-semibold text-slate-300 transition group-hover:text-emerald-300">
                    {isInternal
                      ? t("Open calculator", "查看测算")
                      : t("Read story", "阅读原文")}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            </SpotlightCard>
          );

          if (isInternal && item.internalCompareHref) {
            return (
              <Link
                key={item.id}
                href={item.internalCompareHref}
                className="group block h-full"
              >
                {cardInner}
              </Link>
            );
          }

          return (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full"
            >
              {cardInner}
            </a>
          );
        })}
      </div>
    </section>
  );
}
