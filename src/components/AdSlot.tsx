"use client";

import { Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";

export function AdSlot({ label }: { label?: string }) {
  const { t } = useLanguage();
  const displayLabel = label ?? t("Sponsored Slot", "赞助推荐位");

  if (siteConfig.adsenseClientId) {
    return (
      <div className="my-10 flex min-h-[90px] items-center justify-center rounded-2xl border border-white/[0.07] bg-[#070d19]/70 p-4 text-xs text-slate-500">
        AdSense Ready ({siteConfig.adsenseClientId})
      </div>
    );
  }

  return (
    <div className="my-10 flex flex-col items-start justify-between gap-3 rounded-2xl border border-dashed border-white/[0.1] bg-[#070d19]/60 px-5 py-4 backdrop-blur-xl sm:flex-row sm:items-center">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-400/10 text-amber-300 ring-1 ring-amber-400/20">
          <Sparkles className="h-4 w-4" />
        </div>
        <div>
          <p className="font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-500">
            {displayLabel}
          </p>
          <p className="text-sm text-slate-300">
            {t(
              "Building an AI gateway, GPU cloud, or dev tool? Reach developers comparing LLM costs.",
              "正在做 AI API 网关、算力云或开发者工具？在这里触达精准的大模型开发者人群。"
            )}
          </p>
        </div>
      </div>
      <a
        href={`mailto:${siteConfig.contactEmail}?subject=Sponsor%20${encodeURIComponent(siteConfig.name)}`}
        className="shrink-0 rounded-lg border border-white/[0.1] bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold text-slate-200 transition hover:border-amber-300/40 hover:text-amber-200"
      >
        {t("Sponsor this spot →", "投放合作 →")}
      </a>
    </div>
  );
}
