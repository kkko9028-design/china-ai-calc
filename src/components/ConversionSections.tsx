"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Copy,
  Layers,
  Share2,
  TrendingDown,
  Zap,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";
import {
  BorderBeamCard,
  FadeInSection,
  SpotlightCard,
} from "@/components/ui/TechPrimitives";

interface Scenario {
  tag: string;
  tagZh: string;
  title: string;
  titleZh: string;
  workload: string;
  workloadZh: string;
  fromModel: string;
  fromMonthly: string;
  toModel: string;
  toMonthly: string;
  annualSaved: string;
  annualSavedZh: string;
  cutPct: string;
  impactCopy: string;
  impactCopyZh: string;
  compareHref: string;
}

const SCENARIOS: Scenario[] = [
  {
    tag: "AI Coding Agent Team",
    tagZh: "AI 编程 Agent 团队",
    title: "800M context reads + 150M code output / mo",
    titleZh: "月均 8 亿上下文读取 + 1.5 亿代码输出",
    workload: "75% prompt cache hit across repo-level agent loops",
    workloadZh: "仓库级多轮循环下 75% 上下文缓存命中率",
    fromModel: "Claude Fable 5.2",
    fromMonthly: "$7,720/mo",
    toModel: "Qwen 4 Max",
    toMonthly: "$1,018/mo",
    annualSaved: "$80,424/yr",
    annualSavedZh: "$80,424 / 年",
    cutPct: "-87%",
    impactCopy:
      "Extends seed runway by months without throttling user token quotas or context depth.",
    impactCopyZh:
      "不阉割用户额度和上下文长度的前提下，每年直接省出 8 万多美元研发预算。",
    compareHref: "/compare/claude-fable-5-2-vs-qwen-4-max/",
  },
  {
    tag: "B2B RAG & Support SaaS",
    tagZh: "B2B 知识库与客服 SaaS",
    title: "300M document input + 80M answer output / mo",
    titleZh: "月均 3 亿文档输入 + 8000 万回答输出",
    workload: "40% cache hit on shared enterprise knowledge bases",
    workloadZh: "企业共享知识库 40% 缓存命中率",
    fromModel: "GPT-6.2 Astra",
    fromMonthly: "$4,688/mo",
    toModel: "DeepSeek V4 Pro",
    toMonthly: "$292/mo",
    annualSaved: "$52,752/yr",
    annualSavedZh: "$52,752 / 年",
    cutPct: "-94%",
    impactCopy:
      "Turns thin AI wrapper margins into 90%+ SaaS gross margins—even on flat-rate $29/mo plans.",
    impactCopyZh:
      "即便向客户按 $29/月 包月收费，也能把原本微薄的利润率直接拉升至 90% 以上。",
    compareHref: "/compare/gpt-6-2-astra-vs-deepseek-v4-pro/",
  },
  {
    tag: "High-Throughput Pipeline",
    tagZh: "高吞吐数据清洗流水线",
    title: "400M ingestion + 100M structured JSON / mo",
    titleZh: "月均 4 亿文本吞吐 + 1 亿结构化 JSON 提取",
    workload: "20% cache hit on background enrichment & classification",
    workloadZh: "后台异步分类与提取 20% 缓存命中率",
    fromModel: "Gemini 4 Hydrogen",
    fromMonthly: "$1,236/mo",
    toModel: "DeepSeek V4.1 Flash",
    toMonthly: "$111/mo",
    annualSaved: "$13,500/yr",
    annualSavedZh: "$13,500 / 年",
    cutPct: "-91%",
    impactCopy:
      "Process 10x more documents per dollar so free-tier users barely register on your cloud bill.",
    impactCopyZh:
      "每一美元可处理 10 倍文档量，让海量免费试用用户几乎不再消耗你的服务器预算。",
    compareHref: "/compare/gemini-4-hydrogen-vs-deepseek-v4-1-flash/",
  },
];

export function RealWorldScenarios() {
  const { lang, t } = useLanguage();

  return (
    <section className="mt-20">
      <FadeInSection className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
            <Layers className="h-3.5 w-3.5" />
            {t("Real-World Token Economics", "真实业务省钱账单")}
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t(
              "What switching actually saves in production",
              "真实生产环境下切换模型能省多少钱"
            )}
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            {t(
              "Exact math using November 2026 uncached, cached-read, and output rates.",
              "按 2026 年 11 月官方标准输入、缓存读取及输出单价精确核算。"
            )}
          </p>
        </div>
        <Link
          href="#calculator"
          className="font-mono text-xs font-semibold text-emerald-300 transition hover:text-emerald-200"
        >
          {t("Plug in your own numbers ↑", "填入你自己的用量测算 ↑")}
        </Link>
      </FadeInSection>

      <div className="grid gap-4 lg:grid-cols-3">
        {SCENARIOS.map((s, idx) => (
          <FadeInSection key={s.tag} delay={idx * 0.06}>
            <SpotlightCard className="flex h-full flex-col justify-between p-6">
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-300">
                    {lang === "zh" ? s.tagZh : s.tag}
                  </span>
                  <span className="rounded-md bg-emerald-400/15 px-2 py-0.5 font-mono text-xs font-bold text-emerald-300 ring-1 ring-emerald-400/30">
                    {s.cutPct}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-base font-bold text-white">
                  {lang === "zh" ? s.titleZh : s.title}
                </h3>
                <p className="mt-1 font-mono text-[11px] text-slate-500">
                  {lang === "zh" ? s.workloadZh : s.workload}
                </p>

                {/* Before -> After Invoice Strip */}
                <div className="mt-5 grid grid-cols-2 overflow-hidden rounded-xl border border-white/[0.07] bg-black/35">
                  <div className="p-3">
                    <p className="truncate text-[11px] text-slate-400">
                      {s.fromModel}
                    </p>
                    <p className="mt-0.5 font-mono text-base font-bold text-rose-300/90 line-through decoration-rose-400/60">
                      {s.fromMonthly}
                    </p>
                  </div>
                  <div className="border-l border-white/[0.07] bg-emerald-400/[0.05] p-3">
                    <p className="truncate text-[11px] text-emerald-300">
                      {s.toModel}
                    </p>
                    <p className="mt-0.5 font-mono text-base font-bold text-emerald-300">
                      {s.toMonthly}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-1.5 font-mono text-xs font-semibold text-white">
                  <TrendingDown className="h-3.5 w-3.5 text-emerald-400" />
                  {t("Net runway saved:", "每年净省现金流：")}{" "}
                  <span className="text-emerald-300">
                    {lang === "zh" ? s.annualSavedZh : s.annualSaved}
                  </span>
                </div>

                <p className="mt-2.5 text-xs leading-relaxed text-slate-400">
                  {lang === "zh" ? s.impactCopyZh : s.impactCopy}
                </p>
              </div>

              <Link
                href={s.compareHref}
                className="group mt-5 inline-flex items-center gap-1.5 border-t border-white/[0.06] pt-3.5 text-xs font-semibold text-emerald-300 transition hover:text-emerald-200"
              >
                {t(
                  `Inspect ${s.fromModel} vs ${s.toModel} breakdown`,
                  `查看 ${s.fromModel} vs ${s.toModel} 详细账单`
                )}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </SpotlightCard>
          </FadeInSection>
        ))}
      </div>
    </section>
  );
}

export function ClosingCtaBanner() {
  const { t } = useLanguage();
  const [copiedLink, setCopiedLink] = useState(false);
  const [pageUrl, setPageUrl] = useState(siteConfig.url);

  useEffect(() => {
    setPageUrl(window.location.origin);
  }, []);

  const shareText =
    "Gemini 4 Carbon doubles on Dec 1 — here is a live Nov 2026 calculator comparing GPT-6.2 & Claude 5.2 vs DeepSeek V4, Qwen 4 Max & Kimi K3.1 (with 2-line global setup, no China phone):";

  const xShareHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    shareText
  )}&url=${encodeURIComponent(pageUrl)}`;

  const redditShareHref = `https://www.reddit.com/submit?url=${encodeURIComponent(
    pageUrl
  )}&title=${encodeURIComponent(
    "Built a Nov 2026 LLM API cost calculator: GPT-6.2 / Claude 5.2 vs DeepSeek V4, Qwen 4 Max & Kimi K3.1 (with global ZDR routes)"
  )}`;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 1800);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <section className="mt-24">
      <FadeInSection>
        <BorderBeamCard>
          <div className="flex flex-col items-center px-2 py-6 text-center sm:px-8 sm:py-8">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-emerald-300">
              <Zap className="h-3.5 w-3.5" />
              {t("Smart Multi-Model Routing", "聪明的多模型混合路由")}
            </span>

            <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t(
                "Stop paying frontier tax on routine tokens.",
                "别再为日常常规 Token 交昂贵的旗舰智商税。"
              )}
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 sm:text-base">
              {t(
                <>
                  Keep GPT-6.2 Astra or Claude Fable 5.2 for the hardest 10%
                  architectural hops—and route the other 90% of everyday coding,
                  RAG, and extraction to{" "}
                  <span className="font-semibold text-emerald-300">
                    DeepSeek V4, Qwen 4 Max, or Kimi K3.1
                  </span>{" "}
                  in two lines of code.
                </>,
                <>
                  把最难的 10% 核心架构推理留给 GPT-6.2 Astra 或 Claude Fable 5.2，把剩下 90% 的日常编码、RAG 问答与信息提取用 2 行代码切到{" "}
                  <span className="font-semibold text-emerald-300">
                    DeepSeek V4、Qwen 4 Max 或 Kimi K3.1
                  </span>
                  ，立省八成以上账单。
                </>
              )}
            </p>

            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/#calculator"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 shadow-[0_0_30px_-6px_rgba(16,185,129,0.75)] transition hover:shadow-[0_0_40px_-4px_rgba(34,211,238,0.85)]"
              >
                {t("Calculate Your Stack Savings", "立即测算你的团队能省多少")}
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href={xShareHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-xs font-semibold text-slate-200 transition hover:border-emerald-400/40 hover:text-white"
              >
                <Share2 className="h-3.5 w-3.5 text-emerald-300" />
                {t("Share on X", "分享到 X")}
              </a>

              <a
                href={redditShareHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-3 text-xs font-semibold text-slate-200 transition hover:border-amber-300/40 hover:text-white"
              >
                {t("Post to Reddit", "发到 Reddit")}
              </a>

              <button
                type="button"
                onClick={handleCopyUrl}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-black/30 px-4 py-3 font-mono text-xs text-slate-300 transition hover:border-white/25 hover:text-white"
              >
                {copiedLink ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    {t("Link Copied", "已复制链接")}
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    {t("Copy URL", "复制本站链接")}
                  </>
                )}
              </button>
            </div>
          </div>
        </BorderBeamCard>
      </FadeInSection>
    </section>
  );
}
