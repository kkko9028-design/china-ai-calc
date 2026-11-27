"use client";

import Link from "next/link";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Code2,
  ExternalLink,
  Globe,
  Shield,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import {
  AI_MODELS,
  AIModel,
  CHINA_MODELS,
  FAQ_ITEMS_EN,
  FAQ_ITEMS_ZH,
  WESTERN_MODELS,
  calculateMonthlyCost,
  formatUSD,
  getAllComparisonPairs,
} from "@/data/models";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { LiveAINews } from "@/components/LiveAINews";
import {
  ClosingCtaBanner,
  RealWorldScenarios,
} from "@/components/ConversionSections";
import {
  AffiliateInfraSection,
  PlaybookPromoBanner,
} from "@/components/MonetizationBlocks";
import { AdSlot } from "@/components/AdSlot";
import { HeroBillShowdown } from "@/components/HeroBillShowdown";
import {
  FadeInSection,
  FaqAccordion,
  ModelTickerMarquee,
  SpotlightCard,
} from "@/components/ui/TechPrimitives";

function SectionLabel({
  icon: Icon,
  children,
}: {
  icon: typeof Globe;
  children: React.ReactNode;
}) {
  return (
    <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
      <Icon className="h-3.5 w-3.5" />
      {children}
    </div>
  );
}

export function HomeView() {
  const { lang, t } = useLanguage();
  const comparisons = getAllComparisonPairs();
  const cheapest = [...CHINA_MODELS].sort((a, b) => a.inputPrice - b.inputPrice)[0];

  const stats = [
    { value: "90%", label: t("Max API cost cut", "最高节省 API 账单") },
    { value: `${AI_MODELS.length}`, label: t("Frontier models tracked", "收录主流旗舰模型") },
    { value: `${comparisons.length}`, label: t("Head-to-head reports", "深度对比测算报告") },
    { value: `$${cheapest.inputPrice}`, label: t("Lowest input / 1M", "最低百万输入单价") },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
      {/* Hero */}
      <section className="relative pb-6 pt-14 sm:pt-20">
        <div className="grid items-center gap-10 lg:grid-cols-[1.08fr_1fr] lg:gap-12">
        <div className="text-center lg:text-left">
        <FadeInSection>
          <Link
            href="/compare/gemini-4-carbon-vs-qwen-4-max/"
            className="group mx-auto inline-flex items-center gap-2 rounded-full border border-amber-400/25 bg-amber-400/[0.06] py-1 pl-1 pr-3 text-xs text-amber-100 backdrop-blur transition hover:border-amber-300/50"
          >
            <span className="flex shrink-0 items-center gap-1 whitespace-nowrap rounded-full bg-amber-400/20 px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider text-amber-200">
              <AlertCircle className="h-3 w-3" /> {t("Dec 1", "12月1日")}
            </span>
            {t(
              "Gemini 4 Carbon price doubles to $4 / $20",
              "Gemini 4 Carbon 优惠到期，价格即将翻倍至 $4 / $20"
            )}
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </FadeInSection>

        <FadeInSection delay={0.08}>
          <h1 className="mx-auto mt-7 max-w-4xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-6xl lg:mx-0 lg:text-[3.5rem]">
            {lang === "zh" ? (
              <>
                切换至中国旗舰大模型
                <br />
                将 API 账单最高砍掉{" "}
                <span className="text-shimmer bg-gradient-to-r from-emerald-300 via-cyan-200 to-emerald-300 bg-clip-text text-transparent">
                  90%
                </span>
              </>
            ) : (
              <>
                Cut your LLM API bill
                <br />
                by up to{" "}
                <span className="text-shimmer bg-gradient-to-r from-emerald-300 via-cyan-200 to-emerald-300 bg-clip-text text-transparent">
                  90% with China AI
                </span>
              </>
            )}
          </h1>
        </FadeInSection>

        <FadeInSection delay={0.16}>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg lg:mx-0">
            {lang === "zh" ? (
              <>
                实时对比 2026 年 11 月大模型 Token 价格（支持 Prompt Cache 缓存折算），附带 2 行 OpenAI SDK 无缝迁移代码，在海外免中国手机号、免支付宝直接调用{" "}
                <span className="text-slate-200">
                  DeepSeek V4、Qwen 4 Max 与 Kimi K3.1
                </span>
                。
              </>
            ) : (
              <>
                Live November 2026 token pricing with prompt caching, plus 2-line
                OpenAI SDK code to run{" "}
                <span className="text-slate-200">
                  DeepSeek V4, Qwen 4 Max &amp; Kimi K3.1
                </span>{" "}
                from anywhere — no Chinese phone or Alipay.
              </>
            )}
          </p>
        </FadeInSection>

        <FadeInSection delay={0.24}>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
            <Link
              href="#calculator"
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-[0_0_40px_-8px_rgba(255,255,255,0.5)] transition hover:bg-emerald-200"
            >
              <Zap className="h-4 w-4" />
              {t("Calculate my savings", "立即测算能省多少钱")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="#guides"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-slate-200 backdrop-blur transition hover:border-white/25 hover:bg-white/[0.06]"
            >
              <Globe className="h-4 w-4 text-emerald-300" />
              {t("Global access guides", "海外免手机号接入指南")}
            </Link>
          </div>
        </FadeInSection>
        </div>

        <FadeInSection delay={0.2} className="mx-auto w-full max-w-md lg:max-w-none">
          <HeroBillShowdown />
        </FadeInSection>
        </div>

        <FadeInSection delay={0.32}>
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-2 overflow-hidden text-center rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl sm:grid-cols-4">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`px-4 py-4 ${i > 0 ? "sm:border-l" : ""} ${
                  i % 2 === 1 ? "border-l" : ""
                } ${i >= 2 ? "border-t sm:border-t-0" : ""} border-white/[0.07]`}
              >
                <div className="font-mono text-2xl font-bold text-white">
                  {s.value}
                </div>
                <div className="mt-0.5 text-[11px] text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>
        </FadeInSection>
      </section>

      <ModelTickerMarquee />

      {/* Calculator */}
      <FadeInSection>
        <SavingsCalculator />
        <PlaybookPromoBanner />
      </FadeInSection>

      {/* Real-time AI & LLM News Wire */}
      <FadeInSection>
        <LiveAINews />
      </FadeInSection>

      <AdSlot />

      {/* Bento: why switch */}
      <section className="mt-20">
        <FadeInSection className="mb-8 text-center">
          <SectionLabel icon={Sparkles}>
            {t("Why developers switch", "为什么全球开发者都在切换")}
          </SectionLabel>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {t(
              "Frontier quality. Fraction of the cost.",
              "一线旗舰性能，不到十分之一的成本。"
            )}
          </h2>
        </FadeInSection>
        <div className="grid gap-4 md:grid-cols-3">
          <FadeInSection className="md:col-span-2">
            <SpotlightCard className="h-full p-7">
              <Zap className="h-6 w-6 text-emerald-300" />
              <h3 className="mt-4 font-display text-xl font-bold text-white">
                {t(
                  "OpenAI-compatible in 2 lines",
                  "2 行代码直接兼容 OpenAI SDK"
                )}
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-400">
                {lang === "zh" ? (
                  <>
                    收录的所有模型均原生支持 OpenAI Chat Completions 接口协议。只需替换{" "}
                    <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-xs text-emerald-200">
                      baseURL
                    </code>{" "}
                    和{" "}
                    <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-xs text-emerald-200">
                      model
                    </code>
                    ，原有的工具调用和提示词一行不用改。
                  </>
                ) : (
                  <>
                    Every model here speaks the OpenAI Chat Completions format.
                    Change{" "}
                    <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-xs text-emerald-200">
                      baseURL
                    </code>{" "}
                    and{" "}
                    <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-xs text-emerald-200">
                      model
                    </code>{" "}
                    — keep your SDK, tools and prompts.
                  </>
                )}
              </p>
              <div className="mt-6 rounded-xl border border-white/[0.07] bg-black/40 p-4 font-mono text-xs leading-relaxed">
                <div className="text-rose-300/80">
                  - baseURL: &quot;https://api.openai.com/v1&quot;
                </div>
                <div className="text-emerald-300">
                  + baseURL: &quot;https://openrouter.ai/api/v1&quot;
                </div>
                <div className="text-rose-300/80">
                  - model: &quot;gpt-6.2-astra&quot;
                </div>
                <div className="text-emerald-300">
                  + model: &quot;deepseek/deepseek-v4-pro&quot;
                </div>
              </div>
            </SpotlightCard>
          </FadeInSection>
          <FadeInSection delay={0.08}>
            <SpotlightCard
              className="h-full p-7"
              spotlightColor="rgba(99,102,241,0.14)"
            >
              <Shield className="h-6 w-6 text-indigo-300" />
              <h3 className="mt-4 font-display text-xl font-bold text-white">
                {t("US/EU hosting + ZDR", "欧美本地节点 + 零数据留存")}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {t(
                  "Run open weights on US/EU GPUs with Zero Data Retention. Your data never touches China-hosted endpoints.",
                  "开源权重直接运行在美国/欧洲本土 GPU 集群并开启零数据留存（ZDR），业务数据无需经过境内服务器。"
                )}
              </p>
            </SpotlightCard>
          </FadeInSection>
          <FadeInSection delay={0.04}>
            <SpotlightCard
              className="h-full p-7"
              spotlightColor="rgba(34,211,238,0.14)"
            >
              <Code2 className="h-6 w-6 text-cyan-300" />
              <h3 className="mt-4 font-display text-xl font-bold text-white">
                {t("1M-token context", "全系标配百万级长上下文")}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                {t(
                  "DeepSeek V4, Qwen 4 Max and Kimi K3.1 all ship ~1M context windows — at a fraction of flagship prices.",
                  "DeepSeek V4、Qwen 4 Max 与 Kimi K3.1 均支持约 100 万 Token 上下文窗口，且无天价长文本翻倍惩罚。"
                )}
              </p>
            </SpotlightCard>
          </FadeInSection>
          <FadeInSection delay={0.12} className="md:col-span-2">
            <SpotlightCard className="h-full p-7">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <CheckCircle2 className="h-6 w-6 text-emerald-300" />
                  <h3 className="mt-4 font-display text-xl font-bold text-white">
                    {t(
                      "Prompt caching from $0.04 / 1M",
                      "上下文缓存读取低至 $0.04 / 百万"
                    )}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-slate-400">
                    {t(
                      "Agent loops re-read the same context. Cached-input rates on Chinese models make long-running coding agents dramatically cheaper.",
                      "Agent 多轮循环会反复读取相同的系统提示词与代码上下文，超低缓存单价让长周期 Agent 成本骤降。"
                    )}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2 font-mono text-xs">
                  {CHINA_MODELS.slice(0, 3).map((m) => (
                    <div
                      key={m.id}
                      className="rounded-lg border border-emerald-400/20 bg-emerald-400/[0.05] px-3 py-2 text-center"
                    >
                      <div className="font-bold text-emerald-300">
                        ${m.cachedInputPrice.toFixed(3)}
                      </div>
                      <div className="mt-0.5 text-[10px] text-slate-500">
                        {m.name.split(" ")[0]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </FadeInSection>
        </div>
      </section>

      {/* Real-World Production Savings Scenarios */}
      <RealWorldScenarios />

      {/* Pricing Table */}
      <section id="pricing-table" className="mt-20 scroll-mt-24">
        <FadeInSection className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <SectionLabel icon={Code2}>
              {t("Pricing matrix", "官方价格矩阵")}
            </SectionLabel>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white">
              {t(
                "November 2026 LLM API Pricing",
                "2026 年 11 月主流大模型 API 价格总表"
              )}
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              {t(
                "Official & OpenRouter standard rates per 1M tokens (USD).",
                "各厂商官方及 OpenRouter 标准单价（美元 / 每百万 Token）。"
              )}
            </p>
          </div>
          <span className="font-mono text-[11px] text-slate-500">
            {t(`Verified ${siteConfig.lastUpdated}`, "核验于 2026-11-27")}
          </span>
        </FadeInSection>

        <FadeInSection>
          <p className="mt-4 font-mono text-[10px] uppercase tracking-widest text-slate-600 sm:hidden">
            {t("Swipe table →", "左右滑动查看完整表格 →")}
          </p>
          <div className="mt-2 overflow-x-auto rounded-2xl border border-white/[0.07] bg-[#070d19]/70 backdrop-blur-xl sm:mt-6">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b border-white/[0.07] font-mono text-[10px] uppercase tracking-widest text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-medium">{t("Model", "模型")}</th>
                  <th className="px-5 py-4 font-medium">{t("Origin", "地区")}</th>
                  <th className="px-5 py-4 font-medium">
                    {t("Context", "上下文窗口")}
                  </th>
                  <th className="px-5 py-4 font-medium">
                    {t("Input", "输入 / 1M")}
                  </th>
                  <th className="px-5 py-4 font-medium">
                    {t("Output", "输出 / 1M")}
                  </th>
                  <th className="px-5 py-4 font-medium">
                    {t("Cached", "缓存读取 / 1M")}
                  </th>
                  <th className="px-5 py-4 text-right font-medium">
                    {t("Guide", "操作指南")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.05]">
                {AI_MODELS.map((m) => (
                  <tr
                    key={m.id}
                    className="group transition-colors hover:bg-white/[0.025]"
                  >
                    <td className="px-5 py-4">
                      <div className="font-semibold text-white">{m.name}</div>
                      <div className="text-xs text-slate-500">{m.provider}</div>
                    </td>
                    <td className="px-5 py-4">
                      {m.origin === "china" ? (
                        <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-emerald-400/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-400/20">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                          {t("China AI", "中国模型")}
                        </span>
                      ) : (
                        <span className="whitespace-nowrap rounded-full bg-white/[0.04] px-2.5 py-0.5 text-xs text-slate-400 ring-1 ring-white/[0.08]">
                          {t("US / Global", "欧美模型")}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 font-mono text-xs text-slate-400">
                      {m.contextWindow}
                    </td>
                    <td className="px-5 py-4 font-mono font-semibold text-slate-200">
                      ${m.inputPrice.toFixed(2)}
                    </td>
                    <td className="px-5 py-4 font-mono font-semibold text-slate-200">
                      ${m.outputPrice.toFixed(2)}
                    </td>
                    <td className="px-5 py-4 font-mono text-emerald-300">
                      ${m.cachedInputPrice.toFixed(3)}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        href={
                          m.origin === "china"
                            ? `/models/${m.slug}/`
                            : `/compare/${m.slug}-vs-deepseek-v4-pro/`
                        }
                        className="inline-flex items-center gap-1 text-xs font-semibold text-slate-400 transition group-hover:text-emerald-300"
                      >
                        {m.origin === "china"
                          ? t("Access guide", "海外接入教程")
                          : t("vs DeepSeek", "对比 DeepSeek")}
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeInSection>
      </section>

      {/* Guides */}
      <section id="guides" className="mt-20 scroll-mt-24">
        <FadeInSection>
          <SectionLabel icon={Globe}>
            {t("Global access playbooks", "海外无障碍接入实战")}
          </SectionLabel>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white">
            {t(
              "Use China AI models from anywhere",
              "如何在海外免国内手机号调用中国大模型"
            )}
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            {t(
              "Billing, ZDR hosting and OpenAI SDK setup — step by step.",
              "国际卡支付、欧美零数据留存（ZDR）节点选择与 OpenAI SDK 配置全流程。"
            )}
          </p>
        </FadeInSection>

        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          {CHINA_MODELS.map((model, i) => (
            <FadeInSection key={model.slug} delay={i * 0.06}>
              <Link
                href={`/models/${model.slug}/`}
                className="group block h-full"
              >
                <SpotlightCard className="h-full p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-300/80">
                        {model.provider} · {model.contextWindow}
                      </span>
                      <h3 className="mt-1.5 font-display text-lg font-bold text-white transition group-hover:text-emerald-200">
                        {model.name}
                      </h3>
                    </div>
                    <span className="rounded-lg bg-black/40 px-2.5 py-1 font-mono text-xs font-bold text-emerald-300 ring-1 ring-white/[0.08]">
                      ${model.inputPrice.toFixed(2)} / $
                      {model.outputPrice.toFixed(2)}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {lang === "zh" ? model.summaryZh : model.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />{" "}
                      {t("No China phone", "免国内手机号")}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Shield className="h-3.5 w-3.5 text-emerald-400" />{" "}
                      {t("US/EU ZDR", "欧美 ZDR 隐私节点")}
                    </span>
                    <span className="ml-auto inline-flex items-center gap-1 font-semibold text-emerald-300">
                      {t("Read guide", "查看教程")}{" "}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </SpotlightCard>
              </Link>
            </FadeInSection>
          ))}
        </div>
      </section>

      {/* Cloud / GPU Affiliate Recommendations */}
      <AffiliateInfraSection />

      {/* Comparisons */}
      <section className="mt-20">
        <FadeInSection>
          <h2 className="font-display text-2xl font-bold tracking-tight text-white">
            {t("Head-to-head comparisons", "全部模型两两对比报告")}{" "}
            <span className="font-mono text-base font-medium text-slate-500">
              /{comparisons.length}
            </span>
          </h2>
        </FadeInSection>
        <FadeInSection>
          <div className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {comparisons.map((pair) => (
              <Link
                key={pair.slug}
                href={`/compare/${pair.slug}/`}
                className="group flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.015] px-3.5 py-2.5 text-xs text-slate-400 transition hover:border-emerald-400/30 hover:bg-emerald-400/[0.04] hover:text-white"
              >
                <span className="truncate">
                  {pair.from.name} <span className="text-slate-600">vs</span>{" "}
                  <span className="text-emerald-300">{pair.to.name}</span>
                </span>
                <ArrowRight className="ml-2 h-3 w-3 shrink-0 text-slate-600 transition group-hover:text-emerald-300" />
              </Link>
            ))}
          </div>
        </FadeInSection>
      </section>

      {/* FAQ */}
      <section className="mx-auto mt-20 max-w-3xl">
        <FadeInSection className="mb-7 text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white">
            {t("Frequently asked", "常见问题解答")}
          </h2>
        </FadeInSection>
        <FadeInSection>
          <FaqAccordion items={lang === "zh" ? FAQ_ITEMS_ZH : FAQ_ITEMS_EN} />
        </FadeInSection>
      </section>

      {/* Bottom Closing CTA & Share Banner */}
      <ClosingCtaBanner />
    </div>
  );
}

export function CompareDetailView({
  from,
  to,
}: {
  from: AIModel;
  to: AIModel;
}) {
  const { lang, t } = useLanguage();
  const sampleFromCost = calculateMonthlyCost(from, 50, 5, 50);
  const sampleToCost = calculateMonthlyCost(to, 50, 5, 50);
  const sampleSavings = sampleFromCost - sampleToCost;
  const samplePct = Math.round(
    (sampleSavings / Math.max(sampleFromCost, 0.01)) * 100
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 transition hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {t("Back to All Models", "返回全模型计算器")}
      </Link>

      <header className="mt-5 mb-8">
        <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
          {t(
            "November 2026 API Cost Comparison",
            "2026 年 11 月 API 成本深度对比"
          )}
        </span>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {t(
            `${from.name} vs ${to.name}: Pricing & Migration Guide`,
            `${from.name} 对比 ${to.name}：API 价格与无缝迁移指南`
          )}
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-400">
          {lang === "zh" ? (
            <>
              以典型的每月 50M 输入 / 5M 输出（50% 缓存命中）工作负载测算，从{" "}
              <strong className="text-slate-200">{from.name}</strong>（
              {formatUSD(sampleFromCost)}/月）切换至{" "}
              <strong className="text-emerald-300">{to.name}</strong>（
              {formatUSD(sampleToCost)}/月），每月可立省约{" "}
              <strong className="text-white">
                {formatUSD(Math.max(sampleSavings, 0))}（降幅 {samplePct}%）
              </strong>
              。
            </>
          ) : (
            <>
              Switching a typical 50M-input / 5M-output workload (50% cache hit)
              from <strong className="text-slate-200">{from.name}</strong> (
              {formatUSD(sampleFromCost)}/mo) to{" "}
              <strong className="text-emerald-300">{to.name}</strong> (
              {formatUSD(sampleToCost)}/mo) saves roughly{" "}
              <strong className="text-white">
                {formatUSD(Math.max(sampleSavings, 0))}/month ({samplePct}%)
              </strong>
              .
            </>
          )}
        </p>
      </header>

      <SavingsCalculator defaultFromId={from.id} defaultToId={to.id} />

      <AdSlot />

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        {[from, to].map((model) => (
          <div
            key={model.id}
            className={`rounded-2xl border p-6 ${
              model.origin === "china"
                ? "border-emerald-500/30 bg-emerald-950/15"
                : "border-white/[0.07] bg-[#070d19]/70 backdrop-blur-xl"
            }`}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-white">
                {model.name}
              </h2>
              <span className="rounded-md bg-black/40 px-2.5 py-1 text-xs font-semibold text-slate-300 ring-1 ring-white/[0.07]">
                {model.provider}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-400">
              {lang === "zh" ? model.summaryZh : model.summary}
            </p>

            <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-black/30 p-3">
                <dt className="text-xs text-slate-500">
                  {t("Input / 1M tokens", "输入单价 / 百万")}
                </dt>
                <dd className="mt-1 font-mono font-bold text-white">
                  ${model.inputPrice.toFixed(2)}
                </dd>
              </div>
              <div className="rounded-xl bg-black/30 p-3">
                <dt className="text-xs text-slate-500">
                  {t("Output / 1M tokens", "输出单价 / 百万")}
                </dt>
                <dd className="mt-1 font-mono font-bold text-white">
                  ${model.outputPrice.toFixed(2)}
                </dd>
              </div>
              <div className="rounded-xl bg-black/30 p-3">
                <dt className="text-xs text-slate-500">
                  {t("Cached Input / 1M", "缓存读取 / 百万")}
                </dt>
                <dd className="mt-1 font-mono font-bold text-emerald-400">
                  ${model.cachedInputPrice.toFixed(3)}
                </dd>
              </div>
              <div className="rounded-xl bg-black/30 p-3">
                <dt className="text-xs text-slate-500">
                  {t("Context Window", "上下文窗口")}
                </dt>
                <dd className="mt-1 font-mono font-bold text-slate-200">
                  {model.contextWindow}
                </dd>
              </div>
            </dl>

            <div className="mt-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {t("Best For", "最擅长场景")}
              </p>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-300">
                {(lang === "zh" ? model.bestForZh : model.bestFor).map(
                  (item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        ))}
      </section>

      {to.globalAccess && (
        <section className="mt-10 rounded-2xl border border-white/[0.07] bg-[#070d19]/70 p-6 backdrop-blur-xl">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-white">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            {t(
              `How to Access ${to.name} Globally (Without a China Phone)`,
              `海外如何免国内手机号接入 ${to.name}`
            )}
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {to.globalAccess.map((opt) => (
              <div
                key={opt.provider}
                className="rounded-xl border border-white/[0.07] bg-black/30 p-4"
              >
                <a
                  href={opt.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-emerald-300 hover:underline"
                >
                  {lang === "zh" ? opt.providerZh : opt.provider} ↗
                </a>
                <p className="mt-1 text-xs text-slate-400">
                  {t("Payment:", "支付方式：")}{" "}
                  {lang === "zh" ? opt.paymentMethodsZh : opt.paymentMethods} ·{" "}
                  ZDR:{" "}
                  {opt.zeroDataRetention
                    ? t("Supported", "支持零数据留存")
                    : t("Standard", "标准条款")}
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  {lang === "zh" ? opt.notesZh : opt.notes}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <ClosingCtaBanner />
    </div>
  );
}

export function ModelGuideView({ model }: { model: AIModel }) {
  const { lang, t } = useLanguage();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 transition hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {t("Back to Calculator", "返回价格计算器")}
      </Link>

      <header className="mt-5 mb-8">
        <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
          {model.provider} · {t(`Released ${model.releaseDate}`, `发布时间 ${model.releaseDate}`)}
        </span>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {t(
            `How to Use ${model.name} API Outside China (2026 Guide)`,
            `海外如何调用 ${model.name} API 完整指南（2026）`
          )}
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-slate-400">
          {lang === "zh" ? model.summaryZh : model.summary}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-xl border border-white/[0.07] bg-[#070d19]/70 p-4 backdrop-blur-xl">
            <p className="text-xs text-slate-400">{t("Input / 1M", "输入单价 / 百万")}</p>
            <p className="mt-1 font-mono text-xl font-bold text-white">
              ${model.inputPrice.toFixed(2)}
            </p>
          </div>
          <div className="rounded-xl border border-white/[0.07] bg-[#070d19]/70 p-4 backdrop-blur-xl">
            <p className="text-xs text-slate-400">{t("Output / 1M", "输出单价 / 百万")}</p>
            <p className="mt-1 font-mono text-xl font-bold text-white">
              ${model.outputPrice.toFixed(2)}
            </p>
          </div>
          <div className="rounded-xl border border-white/[0.07] bg-[#070d19]/70 p-4 backdrop-blur-xl">
            <p className="text-xs text-slate-400">{t("Cached Input / 1M", "缓存读取 / 百万")}</p>
            <p className="mt-1 font-mono text-xl font-bold text-emerald-400">
              ${model.cachedInputPrice.toFixed(3)}
            </p>
          </div>
          <div className="rounded-xl border border-white/[0.07] bg-[#070d19]/70 p-4 backdrop-blur-xl">
            <p className="text-xs text-slate-400">{t("Context Window", "上下文窗口")}</p>
            <p className="mt-1 font-mono text-xl font-bold text-slate-200">
              {model.contextWindow}
            </p>
          </div>
        </div>
      </header>

      {model.globalAccess && (
        <section className="mb-10">
          <h2 className="font-display text-xl font-bold text-white">
            {t(
              `Best Ways to Access ${model.name} from US, EU & Worldwide`,
              `在欧美及全球接入 ${model.name} 的推荐渠道`
            )}
          </h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {model.globalAccess.map((opt) => (
              <div
                key={opt.provider}
                className="flex flex-col justify-between rounded-2xl border border-white/[0.07] bg-[#070d19]/70 p-5 backdrop-blur-xl"
              >
                <div>
                  <h3 className="font-bold text-white">
                    {lang === "zh" ? opt.providerZh : opt.provider}
                  </h3>
                  <div className="mt-3 space-y-1.5 text-xs text-slate-300">
                    <p className="flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                      {opt.needsChinaPhone
                        ? t("China phone required", "需国内手机号")
                        : t("No China phone needed", "无需中国大陆手机号")}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                      ZDR:{" "}
                      {opt.zeroDataRetention
                        ? t("Available", "支持零数据留存")
                        : t("Standard terms", "官方标准隐私协议")}
                    </p>
                    <p className="text-slate-400">
                      {t("Payment:", "支持支付：")}{" "}
                      {lang === "zh" ? opt.paymentMethodsZh : opt.paymentMethods}
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    {lang === "zh" ? opt.notesZh : opt.notes}
                  </p>
                </div>
                <a
                  href={opt.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
                >
                  {t("Open Provider", "前往平台官网")}{" "}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            ))}
          </div>
        </section>
      )}

      <SavingsCalculator defaultFromId="gpt-6.2-astra" defaultToId={model.id} />

      <PlaybookPromoBanner />

      <AffiliateInfraSection />

      <AdSlot />

      <section className="mt-12">
        <h2 className="font-display text-xl font-bold text-white">
          {t(
            `Compare ${model.name} Against US Frontier Models`,
            `将 ${model.name} 与欧美主流旗舰模型对比`
          )}
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {WESTERN_MODELS.map((w) => (
            <Link
              key={w.slug}
              href={`/compare/${w.slug}-vs-${model.slug}/`}
              className="flex items-center justify-between rounded-xl border border-white/[0.07] bg-[#070d19]/70 px-4 py-3 text-sm font-medium text-slate-200 backdrop-blur-xl transition hover:border-emerald-500/40 hover:text-white"
            >
              <span>
                {w.name} vs {model.name}
              </span>
              <ArrowRight className="h-4 w-4 text-emerald-400" />
            </Link>
          ))}
        </div>
      </section>

      <ClosingCtaBanner />
    </div>
  );
}
