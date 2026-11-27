"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Code2,
  Cpu,
  ExternalLink,
  FileCode2,
  PackageCheck,
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
 * Compact high-converting promo card placed right below the calculator.
 */
export function StarterKitPromoBanner() {
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
              <Sparkles className="h-3.5 w-3.5" />
              {t(
                `PRODUCTION CODE KIT · $${siteConfig.starterKitPriceUSD} ONE-TIME`,
                `生产级省钱代码包 · $${siteConfig.starterKitPriceUSD} 一次买断`
              )}
            </div>
            <h3 className="mt-3 font-display text-xl font-bold text-white sm:text-2xl">
              {t(
                "Want automatic routing without rewriting your backend?",
                "不想手动改后端？直接用现成的多模型智能省钱路由器"
              )}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">
              {t(
                "Grab the SwitchCN Smart Router Starter Kit (TypeScript + Python + Docker LiteLLM). Automatically routes 85–90% of routine traffic to DeepSeek V4 / Qwen 4 Max with US/EU Zero Data Retention, automatic 429 failover, and per-request savings telemetry.",
                "获取 SwitchCN 多模型智能路由代码包（含 TypeScript + Python + Docker 私有网关配置）：自动将 85%–90% 常规请求分流至 DeepSeek V4 / Qwen 4 Max，内置欧美零数据留存（ZDR）请求头、超时自动降级与单次调用省钱账单日志。"
              )}
            </p>
          </div>

          <div className="flex w-full shrink-0 flex-col gap-2.5 sm:w-auto sm:flex-row lg:flex-col">
            <Link
              href="/starter-kit/"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-3 text-sm font-bold text-slate-950 shadow-[0_0_28px_-6px_rgba(16,185,129,0.75)] transition hover:shadow-[0_0_38px_-4px_rgba(34,211,238,0.85)]"
            >
              {t(
                `Get Smart Router Kit — $${siteConfig.starterKitPriceUSD}`,
                `查看代码包详情 — $${siteConfig.starterKitPriceUSD}`
              )}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <span className="text-center font-mono text-[11px] text-slate-500">
              {t(
                "Instant ZIP download · Unlimited commercial use",
                "付款后秒发 ZIP 源码包 · 无限商业项目授权"
              )}
            </span>
          </div>
        </div>
      </SpotlightCard>
    </div>
  );
}

/**
 * High-converting Cloud / VPS / GPU Affiliate cards (PayPal-friendly programs).
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
      desc: "Spin up a rock-solid US/EU Docker Droplet in 55 seconds to host a private LiteLLM + Redis prompt-caching router for your SaaS.",
      descZh:
        "55 秒快速拉起欧美本土 Docker 云主机，部署你团队专属的 LiteLLM + Redis 缓存加速网关。",
      highlight: t("Simple predictable monthly pricing", "账单透明可控 · 极简 Docker 部署"),
      cta: t("Launch Droplet", "前往 DigitalOcean"),
      href: siteConfig.affiliates.digitalOceanUrl,
      icon: Server,
    },
    {
      badge: t("Best Budget KVM VPS", "高性价比 KVM 云主机"),
      name: "Hostinger KVM VPS (Docker Ready)",
      desc: "Run OpenWebUI, Dify, n8n, and LiteLLM proxy 24/7 on dedicated NVMe KVM hardware at a fraction of hyperscaler VPS costs.",
      descZh:
        "以极低年付成本独享 NVMe KVM 虚拟机，7×24 小时稳定运行 OpenWebUI、Dify、n8n 与私有 AI 路由网关。",
      highlight: t("1-click Docker & AI templates", "内置一键 Docker 与 AI 应用模板"),
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
            {t("Self-Host & Private Gateway Stack", "私有化网关与海外部署基础设施")}
          </div>
          <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {t(
              "Recommended Cloud & GPU Hosting for Private AI Routing",
              "部署私有 AI 网关与开源模型的推荐海外云平台"
            )}
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            {t(
              "Want 100% control over logs, Redis prompt caching, or self-hosted open weights? Deploy on US/EU infrastructure.",
              "需要 100% 掌控请求日志、自建 Redis 缓存或私有化运行开源权重？推荐以下欧美主流基础设施。"
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
 * Full dedicated sales page view for /starter-kit/
 */
export function StarterKitSalesView() {
  const { lang, t } = useLanguage();
  const [showPendingNotice, setShowPendingNotice] = useState(false);

  const hasCheckout = Boolean(siteConfig.starterKitCheckoutUrl.trim());

  const includedFiles = [
    {
      path: "ts/smartRouter.ts",
      desc: "Zero-latency prompt complexity classifier + OpenRouter ZDR headers + multi-model automatic failover + real-time savedUSD telemetry.",
      descZh:
        "零额外延迟提示词复杂度分类器 + OpenRouter 零数据留存（ZDR）强制头 + 多模型故障自动无缝切换 + 单次请求省钱金额统计。",
    },
    {
      path: "ts/nextjsRouteExample.ts",
      desc: "Drop-in Next.js App Router POST /api/chat endpoint ready for production SaaS.",
      descZh: "开箱即用的 Next.js App Router `/api/chat` 生产级后端接口示例。",
    },
    {
      path: "python/smart_router.py",
      desc: "Clean Python implementation (OpenAI SDK) for FastAPI, Django, and autonomous agent loops.",
      descZh: "基于官方 OpenAI SDK 的 Python 生产路由模块，适配 FastAPI 与 Agent 后端。",
    },
    {
      path: "docker/docker-compose.yml + litellm_config.yaml",
      desc: "Self-hosted LiteLLM Proxy + Redis semantic/prompt cache stack for any $6/mo VPS.",
      descZh: "一键在任意海外 VPS 上拉起 LiteLLM 私有路由网关 + Redis 缓存加速服务。",
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
        {/* Left Pitch & File Breakdown */}
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-300">
            <PackageCheck className="h-3.5 w-3.5" />
            {t("Developer Production Kit · v1.0", "开发者生产级源码包 · v1.0")}
          </div>

          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-5xl">
            {t(
              "SwitchCN Multi-LLM Smart Router Starter Kit",
              "SwitchCN 多模型智能省钱路由代码包"
            )}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-slate-400">
            {t(
              "Stop hardcoding a single $8/$40 frontier model for every trivial summarize, classify, or CRUD coding prompt. Drop this lightweight router into your Node.js, Next.js, or Python app in 5 minutes and cut 75%–90% off your monthly token bill automatically.",
              "别再把所有简单的摘要、分类、常规问答都硬编码发给 $8/$40 的昂贵旗舰模型了。只需 5 分钟把这套轻量级路由模块放进你的 Node.js、Next.js 或 Python 项目，全自动砍掉 75%–90% 的月度 API 账单。"
            )}
          </p>

          {/* Telemetry Preview Terminal */}
          <div className="mt-7 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#02040a]">
            <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
              <span className="ml-3 font-mono text-[11px] text-slate-400">
                smartRouter.ts — Live Telemetry Output
              </span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-slate-300">
              <code>{`const res = await smartChatCompletion({
  messages: [{ role: "user", content: "Extract invoice items into JSON" }],
  enforceZDR: true, // Forces US/EU Zero Data Retention providers
});

// Returned automatically on every call:
{
  routedModel: "deepseek/deepseek-v4.1-flash",
  tier: "fast",
  attempt: 1,
  actualCostUSD: 0.00019,
  frontierBaselineCostUSD: 0.00840,
  savedUSD: 0.00821 // 97.7% saved on this request
}`}</code>
            </pre>
          </div>

          {/* Included Files */}
          <h2 className="mt-10 font-display text-xl font-bold text-white">
            {t("Everything Inside the ZIP", "源码压缩包内含完整文件")}
          </h2>
          <div className="mt-4 space-y-3">
            {includedFiles.map((file) => (
              <SpotlightCard key={file.path} className="p-4">
                <div className="flex items-start gap-3">
                  <FileCode2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                  <div>
                    <p className="font-mono text-xs font-bold text-emerald-300">
                      {file.path}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      {lang === "zh" ? file.descZh : file.desc}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>

        {/* Right Checkout Sticky Card */}
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <BorderBeamCard>
              <div className="flex flex-col justify-between">
                <div>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-emerald-300">
                    {t("One-Time Purchase · Lifetime Updates", "一次买断 · 永久免费更新")}
                  </span>
                  <div className="mt-3 flex items-baseline gap-3">
                    <span className="font-mono text-5xl font-extrabold text-white">
                      ${siteConfig.starterKitPriceUSD}
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      $49
                    </span>
                    <span className="rounded-md bg-emerald-400/15 px-2 py-0.5 font-mono text-xs font-bold text-emerald-300">
                      {t("LAUNCH PRICE", "首发特惠")}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-slate-400">
                    {t(
                      "Pays for itself within your first day of production API traffic.",
                      "上线第一天省下的 API 差价即可回本。"
                    )}
                  </p>

                  <ul className="mt-6 space-y-2.5 border-t border-white/[0.07] pt-5 text-sm text-slate-200">
                    {[
                      t(
                        "TypeScript (Node / Next.js) + Python modules",
                        "包含 TypeScript（Node / Next.js）与 Python 双语言源码"
                      ),
                      t(
                        "3-tier classifier (Fast / Routine / Frontier)",
                        "三档零延迟智能分流（极速档 / 常规主力档 / 旗舰攻坚档）"
                      ),
                      t(
                        "Automatic 429 & timeout provider failover",
                        "遇到限流或超时毫秒级自动无感切换备用模型"
                      ),
                      t(
                        "US/EU Zero Data Retention (ZDR) pre-wired",
                        "预置欧美节点零数据留存（ZDR）隐私保护参数"
                      ),
                      t(
                        "Docker Compose LiteLLM + Redis cache stack",
                        "附赠 Docker 一键私有化部署 LiteLLM + Redis 缓存配置"
                      ),
                      t(
                        "Unlimited commercial & client projects license",
                        "不限商业项目与客户外包项目使用授权"
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
                      href={siteConfig.starterKitCheckoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-5 py-3.5 text-sm font-bold text-slate-950 shadow-[0_0_32px_-6px_rgba(16,185,129,0.8)] transition hover:shadow-[0_0_42px_-4px_rgba(34,211,238,0.9)]"
                    >
                      <Zap className="h-4 w-4" />
                      {t(
                        `Buy Now & Download ZIP — $${siteConfig.starterKitPriceUSD}`,
                        `立即购买并下载源码包 — $${siteConfig.starterKitPriceUSD}`
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
                          `Get Instant Access — $${siteConfig.starterKitPriceUSD}`,
                          `立即获取完整源码包 — $${siteConfig.starterKitPriceUSD}`
                        )}
                      </button>
                      {showPendingNotice && (
                        <div className="rounded-xl border border-emerald-400/30 bg-emerald-400/10 p-3.5 text-xs leading-relaxed text-emerald-100">
                          {t(
                            "Checkout gateway is finalizing verification. Click below to request your instant purchase link via email:",
                            "在线收银台正在激活中，点击下方邮件即可优先获取购买链接与源码包："
                          )}
                          <a
                            href={`mailto:${siteConfig.contactEmail}?subject=Order%20SwitchCN%20Smart%20Router%20Kit%20($19)`}
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

      {/* Also show VPS hosting recommendations for deploying the Docker stack */}
      <AffiliateInfraSection />
    </div>
  );
}
