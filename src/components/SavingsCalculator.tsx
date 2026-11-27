"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  Copy,
  ExternalLink,
  Share2,
  ShieldCheck,
  TrendingDown,
  Zap,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import {
  AI_MODELS,
  CHINA_MODELS,
  WESTERN_MODELS,
  WORKLOAD_PRESETS,
  calculateMonthlyCost,
  formatUSD,
} from "@/data/models";
import { useLanguage } from "@/context/LanguageContext";
import {
  AnimatedUSD,
  BorderBeamCard,
  SpotlightCard,
} from "@/components/ui/TechPrimitives";

interface SavingsCalculatorProps {
  defaultFromId?: string;
  defaultToId?: string;
}

type CodeLang = "node" | "python" | "curl";

const selectCls =
  "mt-2 w-full appearance-none rounded-xl border bg-[#040812] px-3.5 py-2.5 text-sm font-medium text-white outline-none transition focus:ring-2";

export function SavingsCalculator({
  defaultFromId = "gpt-6.2-astra",
  defaultToId = "deepseek-v4-pro",
}: SavingsCalculatorProps) {
  const { lang, t } = useLanguage();
  const [fromId, setFromId] = useState(defaultFromId);
  const [toId, setToId] = useState(defaultToId);
  const [inputMillions, setInputMillions] = useState(50);
  const [outputMillions, setOutputMillions] = useState(5);
  const [cacheHitRate, setCacheHitRate] = useState(70);
  const [codeLang, setCodeLang] = useState<CodeLang>("node");
  const [copied, setCopied] = useState(false);

  const fromModel = useMemo(
    () => AI_MODELS.find((m) => m.id === fromId) ?? WESTERN_MODELS[0],
    [fromId]
  );
  const toModel = useMemo(
    () => AI_MODELS.find((m) => m.id === toId) ?? CHINA_MODELS[0],
    [toId]
  );

  const fromCost = calculateMonthlyCost(fromModel, inputMillions, outputMillions, cacheHitRate);
  const toCost = calculateMonthlyCost(toModel, inputMillions, outputMillions, cacheHitRate);
  const monthlySavings = fromCost - toCost;
  const yearlySavings = monthlySavings * 12;
  const savingsPercent = fromCost > 0 ? Math.round((monthlySavings / fromCost) * 100) : 0;

  const allModelCosts = useMemo(() => {
    const list = AI_MODELS.map((model) => ({
      model,
      cost: calculateMonthlyCost(model, inputMillions, outputMillions, cacheHitRate),
    }));
    list.sort((a, b) => a.cost - b.cost);
    return list;
  }, [inputMillions, outputMillions, cacheHitRate]);

  const maxCost = Math.max(...allModelCosts.map((x) => x.cost), 1);

  const commentLine = t(
    "Drop-in replacement: just change baseURL and model",
    "无缝替换：只需改动 baseURL 和 model 两行代码"
  );

  const codeSnippets: Record<CodeLang, string> = {
    node: `import OpenAI from "openai";

// ${commentLine}
const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const res = await client.chat.completions.create({
  model: "${toModel.openRouterId}",
  messages: [{ role: "user", content: "Hello from global API!" }],
});
console.log(res.choices[0].message.content);`,
    python: `from openai import OpenAI
import os

# ${commentLine}
client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=os.environ["OPENROUTER_API_KEY"],
)

res = client.chat.completions.create(
    model="${toModel.openRouterId}",
    messages=[{"role": "user", "content": "Hello from global API!"}],
)
print(res.choices[0].message.content)`,
    curl: `curl https://openrouter.ai/api/v1/chat/completions \\
  -H "Authorization: Bearer $OPENROUTER_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "${toModel.openRouterId}",
    "messages": [{"role": "user", "content": "Hello from global API!"}]
  }'`,
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippets[codeLang]);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard may be unavailable
    }
  };

  const sliders = [
    {
      label: t("Monthly Input Tokens", "每月输入 Token 量"),
      value: inputMillions,
      set: setInputMillions,
      min: 1,
      max: 500,
      step: 1,
      unit: "M",
      accent: "text-white",
    },
    {
      label: t("Monthly Output Tokens", "每月输出 Token 量"),
      value: outputMillions,
      set: setOutputMillions,
      min: 1,
      max: 150,
      step: 1,
      unit: "M",
      accent: "text-white",
    },
    {
      label: t("Prompt Cache Hit Rate", "上下文缓存命中率 (Prompt Cache)"),
      value: cacheHitRate,
      set: setCacheHitRate,
      min: 0,
      max: 90,
      step: 5,
      unit: "%",
      accent: "text-emerald-300",
    },
  ];

  const alertText =
    lang === "zh"
      ? fromModel.priceAlertZh ?? fromModel.priceAlert
      : fromModel.priceAlert;

  return (
    <section id="calculator" className="scroll-mt-24">
      <div className="grid gap-5 lg:grid-cols-12">
        {/* Controls */}
        <SpotlightCard className="p-6 lg:col-span-7">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/[0.06] font-mono text-[11px] font-bold text-slate-300 ring-1 ring-white/10">
                01
              </span>
              <h2 className="font-display text-lg font-bold text-white">
                {t("Configure Workload", "配置你的月度调用量")}
              </h2>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
              {t("Client-side · Real-time", "纯本地实时计算")}
            </span>
          </div>

          {/* Presets */}
          <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {WORKLOAD_PRESETS.map((preset) => {
              const active =
                inputMillions === preset.inputMillions &&
                outputMillions === preset.outputMillions &&
                cacheHitRate === preset.cacheHitRate;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    setInputMillions(preset.inputMillions);
                    setOutputMillions(preset.outputMillions);
                    setCacheHitRate(preset.cacheHitRate);
                  }}
                  className={`relative rounded-xl border px-3 py-2.5 text-left transition-all duration-200 ${
                    active
                      ? "border-emerald-400/60 bg-emerald-400/[0.09] shadow-[0_0_20px_-4px_rgba(16,185,129,0.5)]"
                      : "border-white/[0.07] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className={`text-xs font-semibold ${active ? "text-emerald-200" : "text-slate-200"}`}>
                    {lang === "zh" ? preset.labelZh : preset.label}
                  </div>
                  <div className="mt-0.5 font-mono text-[10px] text-slate-500">
                    {preset.inputMillions}M / {preset.outputMillions}M
                  </div>
                </button>
              );
            })}
          </div>

          {/* Model selectors */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block font-mono text-[10px] font-semibold uppercase tracking-widest text-amber-300/80">
                ● {t("Current Model", "当前在用的欧美模型")}
              </label>
              <select
                value={fromId}
                onChange={(e) => setFromId(e.target.value)}
                className={`${selectCls} border-white/10 focus:border-amber-300/60 focus:ring-amber-300/20`}
              >
                {WESTERN_MODELS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} (${m.inputPrice} / ${m.outputPrice})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-mono text-[10px] font-semibold uppercase tracking-widest text-emerald-300">
                ● {t("Switch To · China AI", "切换至 · 中国大模型")}
              </label>
              <select
                value={toId}
                onChange={(e) => setToId(e.target.value)}
                className={`${selectCls} border-emerald-400/30 focus:border-emerald-400/70 focus:ring-emerald-400/20`}
              >
                {CHINA_MODELS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} (${m.inputPrice} / ${m.outputPrice})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {alertText && (
            <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-amber-400/25 bg-amber-400/[0.06] px-3.5 py-2.5 text-xs text-amber-100/90">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
              <span>
                <strong className="text-amber-200">
                  {t("Price Alert:", "调价提醒：")}
                </strong>{" "}
                {alertText}
              </span>
            </div>
          )}

          {/* Sliders */}
          <div className="mt-6 space-y-5">
            {sliders.map((s) => (
              <div key={s.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">{s.label}</span>
                  <span className={`rounded-md bg-white/[0.04] px-2 py-0.5 font-mono text-sm font-bold ring-1 ring-white/[0.07] ${s.accent}`}>
                    {s.value}
                    {s.unit}
                  </span>
                </div>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  step={s.step}
                  value={s.value}
                  onChange={(e) => s.set(Number(e.target.value))}
                  className="mt-3 w-full"
                />
              </div>
            ))}
          </div>
        </SpotlightCard>

        {/* Savings output with border beam */}
        <BorderBeamCard className="lg:col-span-5">
          <div className="flex h-full flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-widest text-emerald-300">
                <TrendingDown className="h-3.5 w-3.5" />
                {t("Projected Savings", "预计节省 API 开支")}
              </div>

              <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-slate-500">
                {t("You save every year", "每年可省下")}
              </p>
              <div className="mt-1 flex flex-wrap items-baseline gap-3">
                <AnimatedUSD
                  value={yearlySavings}
                  className="bg-gradient-to-r from-emerald-300 via-emerald-400 to-cyan-300 bg-clip-text font-mono text-4xl font-extrabold tracking-tight text-transparent drop-shadow-[0_0_24px_rgba(16,185,129,0.35)] sm:text-5xl"
                />
                <span className="rounded-md bg-emerald-400/15 px-2 py-0.5 font-mono text-sm font-bold text-emerald-300 ring-1 ring-emerald-400/30">
                  {savingsPercent >= 0 ? `-${savingsPercent}%` : `+${Math.abs(savingsPercent)}%`}
                </span>
              </div>
              <p className="mt-2 text-sm text-slate-400">
                {lang === "zh" ? (
                  <>
                    相当于每月立省{" "}
                    <AnimatedUSD value={monthlySavings} className="font-mono font-semibold text-white" />
                  </>
                ) : (
                  <>
                    <AnimatedUSD value={monthlySavings} className="font-mono font-semibold text-white" /> saved per month
                  </>
                )}
              </p>

              <div className="mt-6 grid grid-cols-2 overflow-hidden rounded-xl border border-white/[0.07] bg-black/30">
                <div className="p-4">
                  <p className="truncate text-xs text-amber-200/80">{fromModel.name}</p>
                  <p className="mt-1 font-mono text-lg font-bold text-slate-200">
                    <AnimatedUSD value={fromCost} />
                    <span className="text-xs font-normal text-slate-500">{t("/mo", "/月")}</span>
                  </p>
                </div>
                <div className="border-l border-white/[0.07] bg-emerald-400/[0.04] p-4">
                  <p className="truncate text-xs text-emerald-300">{toModel.name}</p>
                  <p className="mt-1 font-mono text-lg font-bold text-emerald-300">
                    <AnimatedUSD value={toCost} />
                    <span className="text-xs font-normal text-emerald-500/70">{t("/mo", "/月")}</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2.5">
              <Link
                href={`/compare/${fromModel.slug}-vs-${toModel.slug}/`}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-4 py-3 text-sm font-bold text-slate-950 shadow-[0_0_30px_-6px_rgba(16,185,129,0.7)] transition hover:shadow-[0_0_40px_-4px_rgba(34,211,238,0.8)]"
              >
                {t(
                  `Full ${fromModel.name} vs ${toModel.name} Report`,
                  `查看 ${fromModel.name} vs ${toModel.name} 完整对比报告`
                )}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href={`/models/${toModel.slug}/`}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs font-semibold text-slate-300 transition hover:border-white/20 hover:text-white"
              >
                {t(
                  `Use ${toModel.name} outside China — no China phone`,
                  `海外免国内手机号接入 ${toModel.name} 教程`
                )}
                <ExternalLink className="h-3.5 w-3.5" />
              </Link>

              {/* Instant viral share buttons */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                    `Switching ${inputMillions}M in / ${outputMillions}M out tokens from ${fromModel.name} to ${toModel.name} saves ${formatUSD(
                      Math.max(yearlySavings, 0)
                    )}/yr (${savingsPercent}%). Live Nov 2026 LLM API calculator:`
                  )}&url=${encodeURIComponent(
                    `${siteConfig.url}/compare/${fromModel.slug}-vs-${toModel.slug}/`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/[0.08] bg-black/30 px-3 py-2 font-mono text-[11px] text-slate-300 transition hover:border-emerald-400/40 hover:text-emerald-200"
                >
                  <Share2 className="h-3 w-3 text-emerald-400" />
                  {t("Share on X", "晒账单到 X")}
                </a>
                <a
                  href={`https://www.reddit.com/submit?url=${encodeURIComponent(
                    `${siteConfig.url}/compare/${fromModel.slug}-vs-${toModel.slug}/`
                  )}&title=${encodeURIComponent(
                    `${fromModel.name} vs ${toModel.name} API cost breakdown: ${formatUSD(
                      fromCost
                    )}/mo down to ${formatUSD(toCost)}/mo (${savingsPercent}% saved)`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/[0.08] bg-black/30 px-3 py-2 font-mono text-[11px] text-slate-300 transition hover:border-amber-300/40 hover:text-amber-200"
                >
                  {t("Post to Reddit ↗", "发到 Reddit ↗")}
                </a>
              </div>
            </div>
          </div>
        </BorderBeamCard>
      </div>

      {/* Ranking + Code */}
      <div className="mt-5 grid gap-5 lg:grid-cols-12">
        <SpotlightCard className="p-6 lg:col-span-6" spotlightColor="rgba(34, 211, 238, 0.12)">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/[0.06] font-mono text-[11px] font-bold text-slate-300 ring-1 ring-white/10">
                02
              </span>
              <h3 className="font-display text-base font-bold text-white">
                {t("Ranked for Your Workload", "当前用量下全模型月费排行")}
              </h3>
            </div>
            <span className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
              {t("USD / mo", "美元 / 月")}
            </span>
          </div>
          <div className="mt-5 space-y-3">
            {allModelCosts.map(({ model, cost }, idx) => {
              const pct = Math.max((cost / maxCost) * 100, 2);
              const isTo = model.id === toModel.id;
              const isFrom = model.id === fromModel.id;
              return (
                <motion.div key={model.id} layout transition={{ type: "spring", stiffness: 300, damping: 30 }} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-4 font-mono text-[10px] text-slate-600">{idx + 1}</span>
                      <span
                        className={`font-medium ${
                          isTo ? "font-bold text-emerald-300" : isFrom ? "font-bold text-amber-200" : "text-slate-300"
                        }`}
                      >
                        {model.name}
                      </span>
                      {model.origin === "china" && (
                        <span className="rounded bg-emerald-400/10 px-1.5 py-0.5 font-mono text-[9px] font-bold text-emerald-300 ring-1 ring-emerald-400/20">
                          CN
                        </span>
                      )}
                    </div>
                    <span className="font-mono font-semibold text-slate-200">{formatUSD(cost)}</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.05]">
                    <motion.div
                      initial={false}
                      animate={{ width: `${pct}%` }}
                      transition={{ type: "spring", stiffness: 120, damping: 20 }}
                      className={`h-full rounded-full ${
                        model.origin === "china"
                          ? "bg-gradient-to-r from-emerald-500 to-cyan-400 shadow-[0_0_10px_rgba(16,185,129,0.6)]"
                          : isFrom
                          ? "bg-gradient-to-r from-amber-500 to-amber-300"
                          : "bg-slate-600"
                      }`}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </SpotlightCard>

        <SpotlightCard className="p-6 lg:col-span-6" spotlightColor="rgba(99, 102, 241, 0.12)">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/[0.06] font-mono text-[11px] font-bold text-slate-300 ring-1 ring-white/10">
                03
              </span>
              <h3 className="flex items-center gap-1.5 font-display text-base font-bold text-white">
                <Zap className="h-4 w-4 text-emerald-400" />
                {t("Switch in 2 Lines", "2 行代码无缝接入")}
              </h3>
            </div>
            <div className="flex rounded-lg border border-white/[0.08] bg-black/40 p-0.5 font-mono text-[11px]">
              {(["node", "python", "curl"] as CodeLang[]).map((langItem) => (
                <button
                  key={langItem}
                  type="button"
                  onClick={() => setCodeLang(langItem)}
                  className={`relative rounded-md px-2.5 py-1 font-medium uppercase transition ${
                    codeLang === langItem ? "text-white" : "text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {codeLang === langItem && (
                    <motion.span
                      layoutId="code-tab"
                      className="absolute inset-0 rounded-md bg-white/[0.09] ring-1 ring-white/10"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{langItem}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Terminal window */}
          <div className="relative mt-5 overflow-hidden rounded-xl border border-white/[0.08] bg-[#02040a]">
            <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.02] px-3.5 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
              <span className="ml-3 font-mono text-[10px] text-slate-500">
                {codeLang === "node" ? "index.mjs" : codeLang === "python" ? "main.py" : "terminal"}
              </span>
              <button
                type="button"
                onClick={handleCopy}
                className="ml-auto inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 font-mono text-[10px] text-slate-300 transition hover:bg-white/[0.08]"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" /> {t("Copied", "已复制")}
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" /> {t("Copy", "复制代码")}
                  </>
                )}
              </button>
            </div>
            <pre className="max-h-[360px] overflow-auto p-4 font-mono text-[11px] leading-relaxed text-slate-300">
              <code>{codeSnippets[codeLang]}</code>
            </pre>
          </div>

          {toModel.globalAccess?.[0] && (
            <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-emerald-400/15 bg-emerald-400/[0.04] p-3.5 text-xs">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
              <div>
                <p className="font-semibold text-slate-100">
                  {t("Privacy:", "隐私与路由提示：")}{" "}
                  {lang === "zh"
                    ? toModel.globalAccess[0].providerZh
                    : toModel.globalAccess[0].provider}
                </p>
                <p className="mt-0.5 text-slate-400">
                  {lang === "zh"
                    ? toModel.globalAccess[0].notesZh
                    : toModel.globalAccess[0].notes}
                </p>
              </div>
            </div>
          )}
        </SpotlightCard>
      </div>
    </section>
  );
}
