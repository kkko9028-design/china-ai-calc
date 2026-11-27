"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, BookOpenCheck, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";

const DISMISS_KEY = "switchcn_playbook_bar_dismissed";

/**
 * Slim sticky bottom bar that appears after the visitor has scrolled past the hero.
 * Hidden on the playbook / checkout / legal pages; dismissible for the session.
 */
export function StickyPlaybookBar() {
  const { t } = useLanguage();
  const pathname = usePathname() || "/";
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  const hiddenRoute = ["/playbook", "/checkout", "/terms", "/privacy", "/refund"].some((p) =>
    pathname.startsWith(p)
  );

  useEffect(() => {
    try {
      setDismissed(window.sessionStorage.getItem(DISMISS_KEY) === "1");
    } catch {
      setDismissed(false);
    }
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dismiss = () => {
    setDismissed(true);
    try {
      window.sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // ignore
    }
  };

  const show = visible && !dismissed && !hiddenRoute;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="fixed bottom-5 left-4 right-24 z-40 sm:left-1/2 sm:right-auto sm:w-[560px] sm:-translate-x-1/2"
        >
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-400/30 bg-[#070d19]/95 py-2.5 pl-3.5 pr-2 shadow-[0_16px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl">
            <BookOpenCheck className="hidden h-5 w-5 shrink-0 text-emerald-300 sm:block" />
            <p className="min-w-0 flex-1 text-xs leading-snug text-slate-300">
              <span className="font-semibold text-white">
                {t(
                  `$${siteConfig.playbookPriceUSD} setup playbook`,
                  `$${siteConfig.playbookPriceUSD} 保姆级开通手册`
                )}
              </span>
              <span className="hidden sm:inline"> · </span>
              <br className="sm:hidden" />
              {t(
                "6 official intl. portals, no +86 phone",
                "6 大官方国际站，免 +86 手机号"
              )}
            </p>
            <Link
              href="/playbook/"
              className="group inline-flex shrink-0 items-center gap-1 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-3 py-2 text-xs font-bold text-slate-950 transition hover:brightness-110"
            >
              {t("See it", "看看")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <button
              type="button"
              onClick={dismiss}
              aria-label={t("Dismiss", "关闭")}
              className="shrink-0 rounded-lg p-1 text-slate-500 transition hover:text-slate-200"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
