"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { CHINA_MODELS, getAllComparisonPairs } from "@/data/models";
import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const featuredPairs = getAllComparisonPairs().slice(0, 6);
  const { t } = useLanguage();

  return (
    <footer className="relative z-10 mt-24 border-t border-white/[0.06] bg-[#020510]/80 py-14 text-sm text-slate-400 backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:grid-cols-2 lg:grid-cols-4 sm:px-6">
        <div>
          <p className="font-display text-base font-bold text-white">{siteConfig.name}</p>
          <p className="mt-2 leading-relaxed">
            {t(
              "Independent API cost comparison & global access guides for Chinese LLMs (DeepSeek, Qwen, Kimi) vs US frontier models.",
              "独立的第三方大模型 API 价格对比与海外接入指南（覆盖 DeepSeek、Qwen、Kimi 与欧美旗舰模型）。"
            )}
          </p>
          <a
            href={`mailto:${siteConfig.contactEmail}`}
            className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs text-emerald-300 transition hover:text-emerald-200"
          >
            <Mail className="h-3.5 w-3.5" />
            {siteConfig.contactEmail}
          </a>
        </div>

        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-300">
            {t("Global Access Guides", "海外接入指南")}
          </p>
          <ul className="mt-4 space-y-2">
            <li>
              <Link
                href="/playbook/"
                className="font-semibold text-emerald-300 transition hover:text-emerald-200"
              >
                {t(
                  `Direct API Playbook ($${siteConfig.playbookPriceUSD})`,
                  `官方直连实战手册 ($${siteConfig.playbookPriceUSD})`
                )}
              </Link>
            </li>
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

        <div>
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-slate-300">
            {t("Legal & Support", "法律条款与售后支持")}
          </p>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/terms/" className="transition hover:text-emerald-300">
                {t("Terms of Service", "服务条款 (Terms)")}
              </Link>
            </li>
            <li>
              <Link href="/privacy/" className="transition hover:text-emerald-300">
                {t("Privacy Policy", "隐私政策 (Privacy)")}
              </Link>
            </li>
            <li>
              <Link href="/refund/" className="transition hover:text-emerald-300">
                {t("Refund & Fulfillment Policy", "退款与发货政策 (Refunds)")}
              </Link>
            </li>
            <li className="pt-1 text-xs text-slate-500">
              {t("Support:", "客服支持：")}{" "}
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-slate-300 hover:text-emerald-300"
              >
                {siteConfig.contactEmail}
              </a>
            </li>
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
            "Independent publication. Not affiliated with OpenAI, Anthropic, Google, DeepSeek, Alibaba, or Moonshot AI.",
            "本站为独立技术参考站，与 OpenAI、Anthropic、Google、DeepSeek、阿里云或月之暗面无隶属关系。"
          )}
        </p>
      </div>
    </footer>
  );
}
