"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowDown, TrendingDown } from "lucide-react";
import {
  AI_MODELS,
  WORKLOAD_PRESETS,
  calculateMonthlyCost,
} from "@/data/models";
import { useLanguage } from "@/context/LanguageContext";
import { AnimatedUSD, BorderBeamCard } from "@/components/ui/TechPrimitives";

const FROM_MODEL = AI_MODELS.find((m) => m.id === "gpt-6.2-astra")!;
const TO_MODEL = AI_MODELS.find((m) => m.id === "deepseek-v4-pro")!;
const CYCLE_MS = 3800;

/**
 * Hero visual hook: auto-cycling "monthly bill" showdown that shows the
 * savings payoff before the visitor scrolls. Click a tab to stop auto-play.
 */
export function HeroBillShowdown() {
  const { lang, t } = useLanguage();
  const [idx, setIdx] = useState(0);
  const [auto, setAuto] = useState(true);

  useEffect(() => {
    if (!auto) return;
    const id = setInterval(
      () => setIdx((i) => (i + 1) % WORKLOAD_PRESETS.length),
      CYCLE_MS
    );
    return () => clearInterval(id);
  }, [auto]);

  const p = WORKLOAD_PRESETS[idx];
  const fromCost = calculateMonthlyCost(FROM_MODEL, p.inputMillions, p.outputMillions, p.cacheHitRate);
  const toCost = calculateMonthlyCost(TO_MODEL, p.inputMillions, p.outputMillions, p.cacheHitRate);
  const saved = fromCost - toCost;
  const pct = Math.round((saved / fromCost) * 100);
  const toWidth = Math.max((toCost / fromCost) * 100, 3);

  return (
    <BorderBeamCard className="text-left shadow-[0_0_90px_-25px_rgba(16,185,129,0.45)]">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {t("Monthly bill showdown", "月度账单实测对比")}
        </div>
        <span className="font-mono text-[10px] text-slate-500">
          {t("Nov 2026 rates", "2026-11 官方价")}
        </span>
      </div>

      {/* Workload tabs */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {WORKLOAD_PRESETS.map((w, i) => (
          <button
            key={w.id}
            type="button"
            onClick={() => {
              setIdx(i);
              setAuto(false);
            }}
            className={`rounded-lg px-2.5 py-1 text-[11px] font-semibold transition ${
              i === idx
                ? "bg-emerald-400/15 text-emerald-200 ring-1 ring-emerald-400/40"
                : "text-slate-500 ring-1 ring-white/[0.06] hover:text-slate-300"
            }`}
          >
            {lang === "zh" ? w.labelZh : w.label}
          </button>
        ))}
      </div>

      {/* Auto-play progress */}
      <div className="mt-3 h-px w-full overflow-hidden bg-white/[0.06]">
        {auto && (
          <motion.div
            key={idx}
            className="h-full bg-emerald-400/60"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
          />
        )}
      </div>

      <p className="mt-3 font-mono text-[11px] text-slate-500">
        {lang === "zh"
          ? `每月 ${p.inputMillions}M 输入 · ${p.outputMillions}M 输出 · ${p.cacheHitRate}% 缓存命中`
          : `${p.inputMillions}M input · ${p.outputMillions}M output · ${p.cacheHitRate}% cache hit / mo`}
      </p>

      {/* Bars */}
      <div className="mt-5 space-y-4">
        <div>
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-slate-400">{FROM_MODEL.name}</span>
            <AnimatedUSD value={fromCost} className="font-mono font-bold text-rose-300" />
          </div>
          <div className="mt-1.5 h-2.5 w-full rounded-full bg-gradient-to-r from-rose-500/70 to-orange-400/70" />
        </div>
        <div>
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-slate-200">{TO_MODEL.name}</span>
            <AnimatedUSD value={toCost} className="font-mono font-bold text-emerald-300" />
          </div>
          <div className="mt-1.5 h-2.5 w-full rounded-full bg-white/[0.04]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300 shadow-[0_0_12px_rgba(52,211,153,0.6)]"
              animate={{ width: `${toWidth}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
            />
          </div>
        </div>
      </div>

      {/* Payoff */}
      <div className="mt-6 flex items-end justify-between gap-4 border-t border-white/[0.07] pt-5">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-slate-500">
            {t("You keep", "每月可省")}
          </div>
          <AnimatedUSD
            value={saved}
            className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl"
          />
          <div className="mt-1 font-mono text-xs text-slate-500">
            ≈ <AnimatedUSD value={saved * 12} className="text-slate-300" />{" "}
            {t("per year", "/ 年")}
          </div>
        </div>
        <motion.span
          key={pct}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="inline-flex items-center gap-1 rounded-xl bg-emerald-400/15 px-3 py-2 font-mono text-lg font-bold text-emerald-300 ring-1 ring-emerald-400/30"
        >
          <TrendingDown className="h-4 w-4" />-{pct}%
        </motion.span>
      </div>

      <Link
        href="#calculator"
        className="group mt-5 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] py-2.5 text-xs font-semibold text-slate-200 transition hover:border-emerald-400/40 hover:text-emerald-200"
      >
        {t("Plug in your own numbers", "代入你自己的用量测算")}
        <ArrowDown className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
      </Link>
    </BorderBeamCard>
  );
}
