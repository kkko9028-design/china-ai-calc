"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { CHINA_MODELS, getAllComparisonPairs } from "@/data/models";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const featuredPairs = getAllComparisonPairs().slice(0, 8);
  const { t } = useLanguage();

  return (
    <footer className="relative z-10 mt-24 border-t border-white/[0.06] bg-[#020510]/80 py-14 text-sm text-slate-400 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-3 sm:px-6">
        <div>
          <p className="font-display text-base font-bold text-white">{siteConfig.name}</p>
          <p className="mt-2 leading-relaxed">
            {t(
              "Independent API cost comparison & global access guides for Chinese LLMs (DeepSeek, Qwen, Kimi) vs US frontier models.",
              "独立的第三方大模型 API 价格对比与海外免手机号接入指南（覆盖 DeepSeek、Qwen、Kimi 与欧美旗舰模型）。"
            )}
          </p>
          <p className="mt-3 font-mono text-[11px] text-slate-500">
            {t(
              `Data verified: ${siteConfig.lastUpdated}. Always confirm live rates with your provider before production billing.`,
              `数据核验日期：2026年11月27日。正式投产计费前请以各 API 平台实时公布价格为准。`
            )}
          </p>
        </div>

        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-300">
            {t("Global Access Guides", "海外接入指南")}
          </p>
          <ul className="mt-4 space-y-2">
            {CHINA_MODELS.map((m) => (
              <li key={m.slug}>
                <Link href={`/models/${m.slug}/`} className="transition hover:text-emerald-300">
                  {t(`How to use ${m.name} outside China`, `海外如何接入 ${m.name} API`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-300">
            {t("Popular Comparisons", "热门模型对比")}
          </p>
          <ul className="mt-4 space-y-2">
            {featuredPairs.map((pair) => (
              <li key={pair.slug}>
                <Link href={`/compare/${pair.slug}/`} className="transition hover:text-emerald-300">
                  {pair.from.name} vs {pair.to.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mx-auto mt-12 flex max-w-6xl flex-col items-center justify-between gap-2 border-t border-white/[0.05] px-4 pt-6 text-xs text-slate-500 sm:flex-row sm:px-6">
        <p>
          {t(
            `© 2026 ${siteConfig.name}. Built for indie developers & AI builders.`,
            `© 2026 ${siteConfig.name} · 专为全球独立开发者与 AI 团队打造。`
          )}
        </p>
        <p>
          {t(
            "Not affiliated with OpenAI, Anthropic, Google, DeepSeek, Alibaba, or Moonshot AI.",
            "本站为独立评测工具，与 OpenAI、Anthropic、Google、DeepSeek、阿里云或月之暗面无隶属关系。"
          )}
        </p>
      </div>
    </footer>
  );
}
