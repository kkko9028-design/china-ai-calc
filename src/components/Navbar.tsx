"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRightLeft, Languages, Moon, Sun } from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    [t("Calculator", "计算器"), "/#calculator"],
    [t("Live News", "实时资讯"), "/#live-news"],
    [t("Pricing", "价格表"), "/#pricing-table"],
    [t("Guides", "海外接入"), "/#guides"],
    [t("API Playbook ($15)", "直连手册 ($15)"), "/playbook/"],
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.07] bg-[#030712]/80 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400/25 to-cyan-500/20 text-emerald-300 ring-1 ring-emerald-400/40 shadow-[0_0_18px_rgba(16,185,129,0.35)] transition group-hover:shadow-[0_0_26px_rgba(16,185,129,0.6)]">
            <ArrowRightLeft className="h-4 w-4" />
          </div>
          <span className="font-display text-base font-bold tracking-tight text-white">
            {siteConfig.name}
          </span>
          <span className="hidden items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-emerald-300 sm:inline-flex">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            {t("Live · Nov 2026", "实时 · 2026年11月")}
          </span>
        </Link>

        <nav className="flex items-center gap-1.5 text-sm font-medium text-slate-400">
          {navItems.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="hidden rounded-lg px-2.5 py-1.5 transition hover:bg-white/[0.05] hover:text-white md:inline-block"
            >
              {label}
            </Link>
          ))}

          {/* Dark / Light Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "dark"
                ? t("Switch to light mode", "切换为浅色模式")
                : t("Switch to dark mode", "切换为深色模式")
            }
            title={
              theme === "dark"
                ? t("Switch to light mode", "切换为浅色模式")
                : t("Switch to dark mode", "切换为深色模式")
            }
            className="ml-1 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.03] text-slate-300 transition hover:border-emerald-400/40 hover:text-emerald-300"
          >
            {theme === "dark" ? (
              <Sun className="h-3.5 w-3.5" />
            ) : (
              <Moon className="h-3.5 w-3.5" />
            )}
          </button>

          {/* EN / 中文 Language Switcher */}
          <div
            role="group"
            aria-label="Language switcher"
            className="ml-1 inline-flex items-center rounded-lg border border-white/[0.1] bg-white/[0.03] p-0.5 text-xs"
          >
            <Languages className="ml-1.5 mr-1 h-3.5 w-3.5 text-emerald-400" />
            <button
              type="button"
              onClick={() => setLang("en")}
              className={`rounded-md px-2 py-1 font-mono text-[11px] font-semibold transition ${
                lang === "en"
                  ? "bg-emerald-400/20 text-emerald-200 ring-1 ring-emerald-400/35"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang("zh")}
              className={`rounded-md px-2 py-1 text-[11px] font-semibold transition ${
                lang === "zh"
                  ? "bg-emerald-400/20 text-emerald-200 ring-1 ring-emerald-400/35"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              中文
            </button>
          </div>

          <Link
            href="/#calculator"
            className="ml-1.5 hidden rounded-lg bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-950 shadow-[0_0_20px_rgba(255,255,255,0.15)] transition hover:bg-emerald-300 sm:inline-block"
          >
            {t("Calculate Savings", "算算能省多少")}
          </Link>
        </nav>
      </div>
    </header>
  );
}
