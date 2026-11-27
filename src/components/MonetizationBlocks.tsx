"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Cpu,
  ExternalLink,
  Loader2,
  Server,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";
import {
  BorderBeamCard,
  FadeInSection,
  SpotlightCard,
} from "@/components/ui/TechPrimitives";

/**
 * High-converting promo banner placed directly below the calculator.
 */
export function PlaybookPromoBanner() {
  const { t } = useLanguage();

  return (
    <div className="mt-8">
      <SpotlightCard
        className="p-6 sm:p-7"
        spotlightColor="rgba(16, 185, 129, 0.18)"
      >
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-300">
              <BookOpenCheck className="h-3.5 w-3.5" />
              {t(
                `STEP-BY-STEP FIELD MANUAL · $${siteConfig.playbookPriceUSD} ONE-TIME`,
                `保姆级直连实战手册 · $${siteConfig.playbookPriceUSD} 一次买断`
              )}
            </div>
            <h3 className="mt-3 font-display text-xl font-bold text-white sm:text-2xl">
              {t(
                "Want direct international API setup + official starter token quotas?",
                "想用国际卡直接开通中国六大官方国际站，并领取新户免费额度？"
              )}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {t(
                "Get The China AI Direct API Playbook (2026 Edition): verified onboarding across all 6 official international portals (standard Visa/Mastercard/PayPal, no +86 phone needed), how to activate official starter token quotas, zero-code setup for Cursor/Cline, Claude Code, ChatBox & SillyTavern, plus pay-as-you-go Hailuo/Kling video API guides.",
                "获取《2026 中国大模型官方直连实战全手册》：覆盖 6 大官方国际站开户与国际卡/PayPal 充值指南（无需 +86 手机号）、官方新户免费试用额度开启方法，以及零代码配置 Cursor/Cline、Claude Code、ChatBox、SillyTavern 与按秒计费视频 API 全流程。"
              )}
            </p>
          </div>

          <div className="flex w-full shrink-0 flex-col gap-2.5 sm:w-auto sm:flex-row lg:flex-col">
            <Link
              href="/playbook/"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 shadow-[0_0_28px_-6px_rgba(16,185,129,0.75)] transition hover:shadow-[0_0_38px_-4px_rgba(34,211,238,0.85)]"
            >
              {t(
                `View Playbook Details — $${siteConfig.playbookPriceUSD}`,
                `查看实战手册详情 — $${siteConfig.playbookPriceUSD}`
              )}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <span className="text-center font-mono text-[11px] text-slate-500">
              {t(
                "No coding required · Instant ZIP download",
                "零基础友好 · 付款后即时解锁 ZIP 下载"
              )}
            </span>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
}

/**
 * Cloud / VPS / GPU Affiliate cards (PayPal-friendly programs).
 */
export function AffiliateInfraSection() {
  const { lang, t } = useLanguage();

  const cards = [
    {
      badge: t("Cloud GPU & Global VPS", "全球云服务器 & GPU 算力"),
      name: "Vultr Cloud & NVIDIA GPU",
      desc: "Deploy private vLLM / SGLang open-weight endpoints (DeepSeek V4, Qwen 4) or low-latency US/EU API proxies with hourly billing.",
      descZh:
        "按小时计费租用欧美本土 NVIDIA GPU 部署私有 DeepSeek / Qwen 开源模型，或开设低延迟海外 API 转发节点。",
      highlight: t("$6/mo proxy VPS · On-demand H100/A100", "$6/月轻量节点 · 按需租用 H100/A100"),
      cta: t("Deploy on Vultr", "前往 Vultr 部署"),
      href: siteConfig.affiliates.vultrUrl,
      icon: Cpu,
    },
    {
      badge: t("Developer Cloud Staple", "独立开发者首选云"),
      name: "DigitalOcean Droplets & GPU",
      desc: "Spin up a rock-solid US/EU Docker Droplet in 55 seconds to host OpenWebUI, SillyTavern, or a private team AI workspace.",
      descZh:
        "55 秒快速拉起欧美本土 Docker 云主机，部署你专属的 OpenWebUI、SillyTavern 或团队私有 AI 面板。",
      highlight: t("Simple predictable monthly pricing", "账单透明可控 · 极简 Docker 部署"),
      cta: t("Launch Droplet", "前往 DigitalOcean"),
      href: siteConfig.affiliates.digitalOceanUrl,
      icon: Server,
    },
    {
      badge: t("Best Budget KVM VPS", "高性价比 KVM 云主机"),
      name: "Hostinger KVM VPS (AI Templates)",
      desc: "Run OpenWebUI, Dify, and n8n automation workflows 24/7 on dedicated NVMe KVM hardware with 1-click templates.",
      descZh:
        "以极低年付成本独享 NVMe KVM 虚拟机，内置一键模板 7×24 小时稳定运行 OpenWebUI、Dify 与 n8n 工作流。",
      highlight: t("1-click Docker & n8n/OpenWebUI templates", "内置一键 n8n 与 OpenWebUI 模板"),
      cta: t("Check VPS Plans", "查看高性价比 VPS"),
      href: siteConfig.affiliates.hostingerVpsUrl,
      icon: ShieldCheck,
    },
  ];

  return (
    <section className="mt-20">
      <FadeInSection className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
        <div>
          <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
            <Server className="h-3.5 w-3.5" />
            {t("Self-Host & 24/7 Cloud Apps", "24 小时云端托管与私有化部署")}
          </div>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {t(
              "Recommended Cloud Hosting for OpenWebUI, n8n & Open Weights",
              "部署 OpenWebUI、n8n 与开源模型的推荐海外云主机"
            )}
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            {t(
              "Want to run your own private ChatGPT-style UI, n8n automations, or self-hosted models? These US/EU hosts set up in minutes.",
              "想搭建完全属于自己的私有 AI 聊天界面、n8n 自动化或自托管开源模型？以下欧美主流云平台几分钟即可跑通。"
            )}
          </p>
        </div>
        <span className="font-mono text-[10px] uppercase tracking-wider text-slate-500">
          {t("Partner links · Zero extra cost to you", "合作伙伴链接 · 不增加你的任何购买成本")}
        </span>
      </FadeInSection>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {cards.map((c, idx) => {
          const Icon = c.icon;
          return (
            <FadeInSection key={c.name} delay={idx * 0.06}>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="group block h-full"
              >
                <SpotlightCard
                  className="flex h-full flex-col justify-between p-6"
                  spotlightColor="rgba(34, 211, 238, 0.13)"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded-full bg-cyan-400/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-cyan-300 ring-1 ring-cyan-400/20">
                        {c.badge}
                      </span>
                      <Icon className="h-4 w-4 text-slate-400 transition group-hover:text-cyan-300" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-bold text-white transition group-hover:text-cyan-200">
                      {c.name}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {lang === "zh" ? c.descZh : c.desc}
                    </p>
                  </div>

                  <div className="mt-5 border-t border-white/[0.06] pt-3.5">
                    <p className="font-mono text-[11px] text-emerald-300/90">
                      {c.highlight}
                    </p>
                    <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-white transition group-hover:text-cyan-300">
                      {c.cta}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </SpotlightCard>
              </a>
            </FadeInSection>
          );
        })}
      </div>
    </section>
  );
}

/**
 * Full dedicated sales page view for /playbook/ ($15 Direct API Tutorial)
 */
export function PlaybookSalesView() {
  const { lang, t } = useLanguage();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [fallbackNotice, setFallbackNotice] = useState(false);

  const handleBuyClick = async () => {
    setCheckoutLoading(true);
    setFallbackNotice(false);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        const data = (await res.json()) as { checkoutUrl?: string };
        if (data.checkoutUrl) {
          window.location.href = data.checkoutUrl;
          return;
        }
      }
      // Fall back to static checkout link if configured
      if (siteConfig.playbookCheckoutUrl.trim()) {
        window.location.href = siteConfig.playbookCheckoutUrl.trim();
        return;
      }
      setFallbackNotice(true);
    } catch {
      if (siteConfig.playbookCheckoutUrl.trim()) {
        window.location.href = siteConfig.playbookCheckoutUrl.trim();
        return;
      }
      setFallbackNotice(true);
    } finally {
      setCheckoutLoading(false);
    }
  };

  const chapters = [
    {
      num: "Chapter 01",
      title: "Understanding Domestic (.cn) vs. International Portals",
      titleZh: "第一章：厘清「国内站 .cn」与「海外国际站」两套隔离体系",
      desc: "Why mixing domestic and international endpoints triggers 401 authentication errors—plus a 30-second decision matrix to pick the right portal for your region and privacy needs.",
      descZh:
        "为什么混用国内外端点会直接报 401 鉴权失败？附 30 秒选型决策表，按所在地区与隐私需求快速选对官方入口。",
    },
    {
      num: "Chapter 02",
      title: "Activating Official International Starter Token Quotas",
      titleZh: "第二章：官方国际站新户免费试用 Token 额度开启指南",
      desc: "Step-by-step instructions to activate international developer starter allocations on Alibaba Cloud Model Studio (Singapore scope) and configure 'Free Quota Only' billing alerts.",
      descZh:
        "手把手演示如何在阿里云百炼国际站（新加坡地域）激活新户每模型百万级免费试用额度，并设置「仅使用免费额度」防超支保护。",
    },
    {
      num: "Chapter 03",
      title: "All 6 Official International Portals (Standard Card & PayPal)",
      titleZh: "第三章：6 大官方国际站注册与国际卡 / PayPal 充值流程",
      desc: "Verified global portals, billing walkthroughs, and exact endpoints for DeepSeek, Alibaba Qwen (-intl), Moonshot Kimi (.ai), SiliconFlow (.com), MiniMax (.io), and Zhipu (Z.ai)—using standard international cards or PayPal.",
      descZh:
        "覆盖 DeepSeek、阿里通义 (-intl)、Kimi (.ai)、硅基流动 (.com)、MiniMax 海螺 (.io) 与智谱 (Z.ai) 的海外邮箱登录、小额充值激活与精确接口地址。",
    },
    {
      num: "Chapter 04",
      title: "Zero-Code Configuration for 6 Popular Apps",
      titleZh: "第四章：6 款常用客户端与自动化软件「零代码」配置步骤",
      desc: "Copy-paste setup for Cursor / VS Code (via Cline & Roo Code extensions), native Anthropic-compatible endpoint configuration for Claude Code CLI, plus ChatBox, SillyTavern, OpenWebUI & n8n.",
      descZh:
        "无需编写代码，照着填表即可接入：Cursor/VS Code（Cline & Roo Code 插件配置）、Claude Code 原生 /anthropic 兼容端点配置、ChatBox、SillyTavern、OpenWebUI 与 n8n。",
    },
    {
      num: "Chapter 05–07",
      title: "Hailuo & Kling Video APIs + Troubleshooting + Master Cheat Sheet",
      titleZh: "第五至七章：海螺与可灵视频 API 指南 + 常见报错排查 + 全接口速查表",
      desc: "Comparison of official direct vs. pay-as-you-go per-second routes for Hailuo 03, Kling, and Wan video generation, solutions for 401/429/3DS card errors, GDPR/ZDR privacy settings, and a 1-click copyable endpoint table.",
      descZh:
        "海螺、可灵与通义万相视频生成 API 的官方直连与按秒计费渠道对比，401/429 及国际卡 3DS 支付失败排查方案，欧美零数据留存（ZDR）隐私设置，以及一键复制速查总表。",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 transition hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {t("Back to Savings Calculator", "返回省钱计算器")}
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-12">
        {/* Left Pitch & Chapter Breakdown */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-300">
            <BookOpenCheck className="h-3.5 w-3.5" />
            {t(
              "INTERACTIVE OFFLINE HANDBOOK + CHEAT SHEET · NOV 2026",
              "交互式离线电子手册 + 速查表 · 2026年11月实测版"
            )}
          </div>

          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
            {t(
              "The China AI Direct API Playbook (2026 Edition)",
              "中国大模型官方 API 海外直连实战全手册"
            )}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-slate-400">
            {t(
              "A clear, verified field manual for global developers and creators to set up official international accounts across China's leading text, coding, and video AI platforms—using standard email sign-up and Visa, Mastercard, or PayPal.",
              "专为海外开发者与创作者编写的实测配置手册：无需中国大陆手机号或支付宝，使用普通邮箱与国际信用卡 / PayPal 即可开通中国六大主流大模型与视频官方国际平台。"
            )}
          </p>

          {/* Value Highlight Box */}
          <div className="mt-6 rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.06] p-5">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
              <div className="text-sm leading-relaxed text-slate-200">
                <strong className="text-emerald-300">
                  {t(
                    "Live-Verified Endpoints (Nov 2026):",
                    "2026 年 11 月实机连通核验："
                  )}
                </strong>{" "}
                {t(
                  "Every international console link, OpenAI-compatible base_url, and Anthropic-compatible CLI endpoint in this manual has been verified against live global servers, with 1-click copy buttons and Print-to-PDF support.",
                  "手册内的每一个国际站控制台链接、OpenAI 兼容接口与 Claude Code 兼容地址均已完成实机连通验证，内置一键复制按钮并支持随时打印导出为 PDF。"
                )}
              </div>
            </div>
          </div>

          {/* Chapters Breakdown */}
          <h2 className="mt-10 font-display text-xl font-bold text-white">
            {t("What You Get Inside", "手册完整章节一览")}
          </h2>
          <div className="mt-4 space-y-3.5">
            {chapters.map((ch) => (
              <SpotlightCard key={ch.num} className="p-5">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                  {ch.num}
                </span>
                <h3 className="mt-1 font-display text-base font-bold text-white">
                  {lang === "zh" ? ch.titleZh : ch.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                  {lang === "zh" ? ch.descZh : ch.desc}
                </p>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* Right Sticky Checkout Card */}
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <BorderBeamCard>
              <div className="flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-emerald-300">
                    {t(
                      "One-Time Purchase · Instant Digital Delivery",
                      "一次买断 · 付款后即时解锁下载"
                    )}
                  </span>
                  <div className="mt-3 flex items-baseline gap-3">
                    <span className="font-mono text-5xl font-extrabold text-white">
                      ${siteConfig.playbookPriceUSD}
                    </span>
                    <span className="font-mono text-xs uppercase text-slate-400">
                      USD
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-slate-400">
                    {t(
                      "Complete ZIP download containing the interactive offline HTML handbook (Print-to-PDF ready) + Markdown Quick-Copy Cheat Sheet.",
                      "购买后当场下载完整 ZIP 压缩包（内含可离线阅读与导出 PDF 的交互式电子书 + Markdown 全接口速查卡）。"
                    )}
                  </p>

                  <ul className="mt-6 space-y-2.5 border-t border-white/[0.07] pt-5 text-sm text-slate-200">
                    {[
                      t(
                        "Interactive Offline eBook (.html) with 1-click Copy buttons + Print-to-PDF",
                        "交互式离线电子书（.html），所有地址一键复制，支持一键导出 PDF"
                      ),
                      t(
                        "6 Official International Portals (DeepSeek, Qwen, Kimi, SiliconFlow, MiniMax, Z.ai)",
                        "6 大官方国际站邮箱注册与国际卡 / PayPal 充值指南"
                      ),
                      t(
                        "Official International Starter Token Quota Setup & Billing Alerts",
                        "官方国际站新户免费试用额度开启与防超支账单告警设置"
                      ),
                      t(
                        "Zero-code setup for Cursor/Cline, Claude Code, ChatBox, SillyTavern & n8n",
                        "Cursor/Cline、Claude Code、ChatBox、酒馆与 n8n 零代码填表教程"
                      ),
                      t(
                        "Hailuo, Kling & Wan AI Video API per-second access comparison",
                        "海螺、可灵与万相 AI 视频 API 官方与按秒计费接入对比"
                      ),
                      t(
                        "Responsive email support (" + siteConfig.contactEmail + ")",
                        "提供专属售后邮件技术支持 (" + siteConfig.contactEmail + ")"
                      ),
                    ].map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2.5">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 space-y-3">
                  <button
                    type="button"
                    onClick={handleBuyClick}
                    disabled={checkoutLoading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-3.5 text-sm font-bold text-slate-950 shadow-[0_0_32px_-6px_rgba(16,185,129,0.8)] transition hover:shadow-[0_0_42px_-4px_rgba(34,211,238,0.9)] disabled:opacity-60"
                  >
                    {checkoutLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        {t("Opening Secure Checkout...", "正在打开安全收银台...")}
                      </>
                    ) : (
                      <>
                        <Zap className="h-4 w-4" />
                        {t(
                          `Buy Now & Instant Download — $${siteConfig.playbookPriceUSD}`,
                          `立即购买并即时下载 — $${siteConfig.playbookPriceUSD}`
                        )}
                      </>
                    )}
                  </button>

                  {fallbackNotice && (
                    <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-3.5 text-xs leading-relaxed text-emerald-100">
                      {t(
                        "Online card checkout is completing merchant activation. Email us below to receive a direct payment & download link:",
                        "在线收银通道正在完成商户激活配置，您可直接发送邮件获取购买链接："
                      )}
                      <a
                        href={`mailto:${siteConfig.contactEmail}?subject=Purchase%20China%20AI%20Direct%20API%20Playbook%20($15)`}
                        className="mt-1.5 block font-mono font-bold text-emerald-300 underline"
                      >
                        {siteConfig.contactEmail} →
                      </a>
                    </div>
                  )}

                  <p className="text-center text-[11px] leading-relaxed text-slate-500">
                    {t(
                      "Secure checkout processed by Creem (Merchant of Record). Instant digital delivery begins immediately after payment — see our ",
                      "由授权收银平台 Creem 安全结算。付款后立即开始数字文件交付，购买即同意 "
                    )}
                    <Link href="/terms/" className="underline hover:text-slate-300">
                      {t("Terms", "服务条款")}
                    </Link>{" "}
                    &amp;{" "}
                    <Link href="/refund/" className="underline hover:text-slate-300">
                      {t("Refund Policy", "退款政策")}
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </BorderBeamCard>
          </div>
        </div>
      </div>

      <AffiliateInfraSection />
    </div>
  );
}
