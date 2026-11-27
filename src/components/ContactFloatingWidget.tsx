"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy, Mail, Send, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";

export function ContactFloatingWidget() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.contactEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore clipboard errors
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end font-sans">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mb-3 w-80 overflow-hidden rounded-2xl border border-emerald-400/30 bg-[#060d1a]/95 p-5 shadow-[0_16px_48px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <p className="font-display text-sm font-bold text-white">
                  {t("Contact & Support", "联系我 / 售后与合作")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close contact dialog"
                className="rounded-lg p-1 text-slate-400 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-2.5 text-xs leading-relaxed text-slate-400">
              {t(
                "Questions about China AI APIs, your $15 Playbook order, or sponsorship inquiries? Email me directly — I reply within 24 hours.",
                "关于大模型接入问题、$15 手册订单售后或商务赞助合作，欢迎直接给我发邮件，24 小时内回复。"
              )}
            </p>

            {/* Email Box + One-Click Copy */}
            <div className="mt-4 flex items-center justify-between gap-2 rounded-xl border border-white/[0.08] bg-black/50 px-3 py-2.5">
              <span className="truncate font-mono text-xs font-semibold text-emerald-300">
                {siteConfig.contactEmail}
              </span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-white/10 bg-white/[0.05] px-2 py-1 font-mono text-[10px] font-medium text-slate-200 transition hover:border-emerald-400/40 hover:text-emerald-200"
              >
                {copied ? (
                  <>
                    <Check className="h-3 w-3 text-emerald-400" />
                    {t("Copied", "已复制")}
                  </>
                ) : (
                  <>
                    <Copy className="h-3 w-3" />
                    {t("Copy", "复制")}
                  </>
                )}
              </button>
            </div>

            <a
              href={`mailto:${siteConfig.contactEmail}?subject=SwitchCN%20Inquiry`}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-4 py-2.5 text-xs font-bold text-slate-950 shadow-[0_0_24px_-6px_rgba(16,185,129,0.75)] transition hover:shadow-[0_0_32px_-4px_rgba(34,211,238,0.85)]"
            >
              <Send className="h-3.5 w-3.5" />
              {t("Send Email Now", "立即发邮件联系我")}
            </a>

            <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-2.5 text-[11px] text-slate-500">
              <span>{t("Replies within 24h", "通常 24 小时内回复")}</span>
              <Link
                href="/refund/"
                onClick={() => setOpen(false)}
                className="text-slate-400 underline hover:text-emerald-300"
              >
                {t("Order Support", "订单与退款说明")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Circular Floating Action Button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("Contact support", "联系我")}
        title={t("Contact me via email", "点击查看我的联系邮箱")}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full border border-emerald-400/45 bg-gradient-to-br from-[#091d1b] via-[#071122] to-[#050a14] text-emerald-300 shadow-[0_0_26px_rgba(16,185,129,0.4)] backdrop-blur-xl transition-all duration-200 hover:scale-105 hover:border-emerald-300 hover:shadow-[0_0_36px_rgba(34,211,238,0.65)]"
      >
        <span className="absolute right-1 top-1 flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
        </span>
        {open ? (
          <X className="h-5 w-5 text-white" />
        ) : (
          <Mail className="h-5 w-5 transition-transform group-hover:scale-110" />
        )}
      </button>
    </div>
  );
}
