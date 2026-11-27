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
  Gift,
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
              <Gift className="h-3.5 w-3.5" />
              {t(
                `STEP-BY-STEP FIELD MANUAL · $${siteConfig.playbookPriceUSD} ONE-TIME`,
                `保姆级直连实战手册 · $${siteConfig.playbookPriceUSD} 一次买断`
              )}
            </div>
            <h3 className="mt-3 font-display text-xl font-bold text-white sm:text-2xl">
              {t(
                "Want direct wholesale rates + $20+ in official free token quotas?",
                "想绕开中间商拿官方底价，并领满 $20+ 官方新户免费 Token 额度？"
              )}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {t(
                "Get The China AI Direct API Playbook (2026 Edition): step-by-step account setup across all 6 official international portals (no +86 phone, no Alipay), how to claim 1M+ free Qwen tokens per model, zero-code setup for Cursor, Claude Code, ChatBox & SillyTavern, plus Hailuo/Kling video API access without $500 deposits.",
                "获取《2026 中国大模型官方直连实战全手册》：手把手教你免 +86 手机号、用外卡/PayPal 开通 6 大官方国际站，白嫖百万级官方免费额度（当天赚回教程费），零代码填入 Cursor、Claude Code、ChatBox、酒馆 SillyTavern 与 n8n，并附带海螺/可灵视频 API 避开 $500 预充门槛攻略。"
              )}
            </p>
          </div>

          <div className="flex w-full shrink-0 flex-col gap-2.5 sm:w-auto sm:flex-row lg:flex-col">
            <Link
              href="/playbook/"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 shadow-[0_0_28px_-6px_rgba(16,185,129,0.75)] transition hover:shadow-[0_0_38px_-4px_rgba(34,211,238,0.85)]"
            >
              {t(
                `Get the Direct API Playbook — $${siteConfig.playbookPriceUSD}`,
                `查看实战手册详情 — $${siteConfig.playbookPriceUSD}`
              )}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <span className="text-center font-mono text-[11px] text-slate-500">
              {t(
                "No coding required · Recoup $15 via free quotas",
                "零代码小白友好 · 领完免费额度当天回本"
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
  const [showPendingNotice, setShowPendingNotice] = useState(false);

  const hasCheckout = Boolean(siteConfig.playbookCheckoutUrl.trim());

  const chapters = [
    {
      num: "Chapter 01",
      title: "The Domestic (.cn) vs. Global Portal Trap",
      titleZh: "第一章：避开 90% 老外必踩的「国内站 .cn vs 国际站」大坑",
      desc: "Why 90% of English tutorials give you the wrong base_url causing instant 401 errors—and the 30-second decision matrix for picking the exact right portal.",
      descZh:
        "为什么网上搜到的教程总报 401 密钥无效？一张表看清两套隔离账号体系与 30 秒选型决策。",
    },
    {
      num: "Chapter 02",
      title: "The Free Token Quota Harvester ($20+ Value)",
      titleZh: "第二章：官方新户免费百万 Token 额度领取清单（价值超 $20）",
      desc: "Exact steps to activate Alibaba Cloud Model Studio (Singapore) for 1,000,000 free tokens per Qwen model—plus how to lock 'Free Quota Only' so you never get surprise charges.",
      descZh:
        "手把手激活阿里云百炼国际站（新加坡节点）领取每模型 100 万免费额度，并开启防超支扣费保护开关，买完教程当天回本。",
    },
    {
      num: "Chapter 03",
      title: "All 6 Official International Portals (No +86 Phone)",
      titleZh: "第三章：6 大中国厂商官方国际站开户与外卡充值全流程",
      desc: "Verified portals, Visa/Mastercard/PayPal top-up walkthroughs ($1–$5 minimums), and exact endpoints for DeepSeek, Alibaba Qwen (-intl), Moonshot Kimi (.ai), SiliconFlow (.com), MiniMax (.io), and Zhipu (Z.ai).",
      descZh:
        "覆盖 DeepSeek、阿里通义 (-intl)、Kimi (.ai)、硅基流动 (.com)、MiniMax 海螺 (.io) 与智谱 (Z.ai) 的免国内手机号注册、$1 小额激活与精准接口地址。",
    },
    {
      num: "Chapter 04",
      title: "Zero-Code Setup for 6 Everyday Apps",
      titleZh: "第四章：6 款主流工具「零代码」填表即用指南",
      desc: "Copy-paste setup for Cursor / VS Code (via Cline & Roo Code without breaking Cursor), the hidden native Anthropic URL trick to run Claude Code CLI on Kimi/GLM/MiniMax, plus ChatBox, SillyTavern (1M context), OpenWebUI & n8n.",
      descZh:
        "完全不懂编程也能照着填：Cursor/VS Code（不破坏原生功能的插件接法）、Claude Code 原生 /anthropic 接口直连秘籍、ChatBox、SillyTavern 酒馆百万上下文、OpenWebUI 与 n8n 配置。",
    },
    {
      num: "Chapter 05–07",
      title: "Hailuo & Kling Video APIs + 401/3DS Fix Dictionary + Cheat Sheet",
      titleZh: "第五至七章：可灵/海螺视频 API 避开 $500 门槛攻略 + 排错字典 + 速查表",
      desc: "How to generate AI video at ~$0.08/sec without Kling's $500 enterprise deposit, how to fix international card 3D-Secure declines via PayPal, GDPR/ZDR privacy setup, and a 1-click copyable Master Cheat Sheet.",
      descZh:
        "如何绕开可灵官方 $500 预充门槛按秒调用视频生成 API、外卡拒付如何用 PayPal 化解、欧美数据隐私保护设置及全模型一键复制速查总表。",
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
              "INTERACTIVE HANDBOOK + PDF + CHEAT SHEET · NOV 2026",
              "交互式离线电子书 + 可打印 PDF + 速查表 · 2026年11月版"
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
              "Stop wasting hours hitting Chinese SMS walls, 401 Invalid Key errors, or paying middleman markups. Connect directly to China's top text, coding, and video AI labs from anywhere in the world—even if you don't write a single line of code.",
              "告别国内手机号实名拦截、401 接口报错与二道贩子加价。无论你是用 Cursor/Claude Code 的开发者，还是用 ChatBox、SillyTavern、n8n 的零代码玩家，都能照着手册 10 分钟直连中国六大官方国际站。"
            )}
          </p>

          {/* Value Highlight Box */}
          <div className="mt-6 rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.06] p-5">
            <div className="flex items-start gap-3">
              <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
              <div className="text-sm leading-relaxed text-slate-200">
                <strong className="text-emerald-300">
                  {t(
                    "Pays for itself in 15 minutes:",
                    "15 分钟赚回 $15 票价："
                  )}
                </strong>{" "}
                {t(
                  "Chapter 2 walks you through claiming official international starter token allocations (1,000,000 free tokens per eligible Qwen model + global trial credits) worth more than the price of this guide.",
                  "手册第 2 章手把手带你领取阿里云百炼国际站等官方赠送的百万级免费 Token 额度，光免费额度价值就已经超过 $20。"
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
                      "Instant Download · Beginner Friendly",
                      "付款秒发 · 零基础小白友好"
                    )}
                  </span>
                  <div className="mt-3 flex items-baseline gap-3">
                    <span className="font-mono text-5xl font-extrabold text-white">
                      ${siteConfig.playbookPriceUSD}
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      $39
                    </span>
                    <span className="rounded-md bg-emerald-400/15 px-2 py-0.5 font-mono text-xs font-bold text-emerald-300">
                      {t("NOV 2026 EDITION", "2026 最新实测版")}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-slate-400">
                    {t(
                      "Every portal URL and API endpoint live-tested against November 2026 global servers.",
                      "所有官方海外入口与 API 地址均已完成 2026 年 11 月实机连通核验。"
                    )}
                  </p>

                  <ul className="mt-6 space-y-2.5 border-t border-white/[0.07] pt-5 text-sm text-slate-200">
                    {[
                      t(
                        "Interactive Offline eBook (.html) with 1-click Copy buttons + Print-to-PDF",
                        "交互式离线电子书（.html），所有地址一键复制，支持一键导出 PDF"
                      ),
                      t(
                        "6 Official Global Portals (DeepSeek, Qwen, Kimi, SiliconFlow, MiniMax, Z.ai)",
                        "6 大官方国际站免 +86 手机号注册与外卡/PayPal 充值指南"
                      ),
                      t(
                        "Official Free Token Quota Harvester ($20+ value)",
                        "官方新户百万级免费 Token 领取与防超支扣费教程"
                      ),
                      t(
                        "Zero-code setup for Cursor/Cline, Claude Code, ChatBox, SillyTavern & n8n",
                        "Cursor/Cline、Claude Code、ChatBox、酒馆与 n8n 零代码填表教程"
                      ),
                      t(
                        "Hailuo & Kling AI Video API guide (skip $500 deposits)",
                        "海螺与可灵 AI 视频 API 按秒低价接入攻略（避开 $500 预充门槛）"
                      ),
                      t(
                        "Markdown Quick-Copy Endpoint Cheat Sheet included",
                        "附赠 Markdown 全接口与模型 ID 速查卡（可直接导入 Notion）"
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
                  {hasCheckout ? (
                    <a
                      href={siteConfig.playbookCheckoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-3.5 text-sm font-bold text-slate-950 shadow-[0_0_32px_-6px_rgba(16,185,129,0.8)] transition hover:shadow-[0_0_42px_-4px_rgba(34,211,238,0.9)]"
                    >
                      <Zap className="h-4 w-4" />
                      {t(
                        `Buy & Download Instant Playbook — $${siteConfig.playbookPriceUSD}`,
                        `立即购买并下载完整手册 — $${siteConfig.playbookPriceUSD}`
                      )}
                    </a>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => setShowPendingNotice(true)}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-3.5 text-sm font-bold text-slate-950 shadow-[0_0_32px_-6px_rgba(16,185,129,0.8)] transition hover:shadow-[0_0_42px_-4px_rgba(34,211,238,0.9)]"
                      >
                        <Zap className="h-4 w-4" />
                        {t(
                          `Download Complete Playbook — $${siteConfig.playbookPriceUSD}`,
                          `立即获取完整实战手册 — $${siteConfig.playbookPriceUSD}`
                        )}
                      </button>
                      {showPendingNotice && (
                        <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-3.5 text-xs leading-relaxed text-emerald-100">
                          {t(
                            "Instant checkout is finalizing verification. Click below to grab your copy directly:",
                            "在线自动发货通道正在激活中，点击下方邮件即可直接获取手册："
                          )}
                          <a
                            href={`mailto:${siteConfig.contactEmail}?subject=Order%20China%20AI%20Direct%20API%20Playbook%20($15)`}
                            className="mt-2 block font-mono font-bold text-emerald-300 underline"
                          >
                            {siteConfig.contactEmail} →
                          </a>
                        </div>
                      )}
                    </>
                  )}

                  <p className="text-center font-mono text-[11px] text-slate-500">
                    {t(
                      "Secure global checkout · Visa / Mastercard / Apple Pay",
                      "支持全球主流银行卡与 Apple Pay 安全结算"
                    )}
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
