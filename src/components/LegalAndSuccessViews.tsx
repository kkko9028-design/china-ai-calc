"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Download,
  Loader2,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { siteConfig } from "@/config/site";
import { useLanguage } from "@/context/LanguageContext";
import { BorderBeamCard, SpotlightCard } from "@/components/ui/TechPrimitives";

export function TermsView() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 transition hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {t("Back to Home", "返回首页")}
      </Link>

      <h1 className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl">
        {t("Terms of Service", "服务条款 (Terms of Service)")}
      </h1>
      <p className="mt-2 font-mono text-xs text-slate-500">
        {t(`Effective Date: ${siteConfig.lastUpdated}`, "生效日期：2026年11月27日")}
      </p>

      <div className="mt-8 space-y-6 rounded-2xl border border-white/[0.08] bg-[#070d19]/80 p-6 text-sm leading-relaxed text-slate-300 sm:p-8">
        <section>
          <h2 className="font-display text-lg font-bold text-white">
            {t("1. Overview & Independent Status", "1. 服务概述与独立声明")}
          </h2>
          <p className="mt-2">
            {t(
              `${siteConfig.name} provides independent API cost calculators, technical reference documentation, and educational digital guides for software developers. We are an independent publisher and are not affiliated with, endorsed by, or sponsored by OpenAI, Anthropic, Google, DeepSeek, Alibaba Cloud, Moonshot AI, MiniMax, or Zhipu AI.`,
              `${siteConfig.name} 向全球开发者与创作者提供独立的大模型 API 成本测算工具与技术参考文档。本站为独立第三方发布者，与 OpenAI、Anthropic、Google、DeepSeek、阿里云、月之暗面、MiniMax 或智谱 AI 无任何隶属或官方背书关系。`
            )}
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-white">
            {t("2. Digital Products & License Grant", "2. 数字商品与使用许可")}
          </h2>
          <p className="mt-2">
            {t(
              "When you purchase 'The China AI Direct API Playbook', you receive a non-exclusive, non-transferable license for personal or internal company reference. You may not publicly redistribute, resell, upload to public repositories, or share the paid digital files with third parties.",
              "购买《The China AI Direct API Playbook》后，您将获得供个人或所在团队内部查阅使用的非独占、不可转让许可。严禁将付费数字文件公开传播、转售、上传至公开代码库或分享给第三方。"
            )}
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-white">
            {t("3. Merchant of Record & Billing", "3. 支付结算与税务合规")}
          </h2>
          <p className="mt-2">
            {t(
              "Our online checkout and instant digital file delivery are powered by Payhip and PayPal. Payment processing, buyer receipts, and applicable digital VAT handling are managed securely through Payhip's checkout platform.",
              "本站数字商品的在线收银与即时文件发货由 Payhip 与 PayPal 安全处理，负责银行卡/PayPal 支付、电子收据开具及适用地区的数字税合规处理。"
            )}
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-white">
            {t("4. Pricing Accuracy & Third-Party APIs", "4. 第三方平台规则与免责声明")}
          </h2>
          <p className="mt-2">
            {t(
              "Third-party AI providers may change their API pricing, promotional trial quotas, or regional onboarding policies at any time without notice. All calculators and guides are provided 'as is' for informational and educational purposes. Always verify live billing rates inside each provider's official console before running production workloads.",
              "各第三方 AI 厂商可能随时调整其 API 定价、新户赠送额度或账户政策。本站计算器与文档按「现状」提供，仅供技术参考；正式投产调用前请务必在对应厂商官方控制台核实最新计费标准。"
            )}
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-white">
            {t("5. Customer Support Contact", "5. 客服联系方式")}
          </h2>
          <p className="mt-2">
            {t("For any questions regarding these Terms or your order, contact us at: ", "如对本条款或您的订单有任何疑问，请发送邮件至：")}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="font-mono font-semibold text-emerald-300 underline"
            >
              {siteConfig.contactEmail}
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}

export function PrivacyView() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 transition hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {t("Back to Home", "返回首页")}
      </Link>

      <h1 className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl">
        {t("Privacy Policy", "隐私政策 (Privacy Policy)")}
      </h1>
      <p className="mt-2 font-mono text-xs text-slate-500">
        {t(`Last Updated: ${siteConfig.lastUpdated}`, "最近更新：2026年11月27日")}
      </p>

      <div className="mt-8 space-y-6 rounded-2xl border border-white/[0.08] bg-[#070d19]/80 p-6 text-sm leading-relaxed text-slate-300 sm:p-8">
        <section>
          <h2 className="font-display text-lg font-bold text-white">
            {t("1. Minimal Data Collection", "1. 最小化数据收集原则")}
          </h2>
          <p className="mt-2">
            {t(
              "Our API cost calculator runs 100% client-side in your browser. We do not require user accounts to use the free tools, and we store only your language preference (EN/ZH) locally in your browser's localStorage.",
              "本站 API 价格计算器 100% 在您的浏览器本地运行。使用免费工具无需注册账号，浏览器本地仅保存您的中英文界面语言偏好。"
            )}
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-white">
            {t("2. Privacy-First Web Analytics", "2. 匿名访问统计")}
          </h2>
          <p className="mt-2">
            {t(
              "We use Cloudflare Web Analytics to measure aggregate page views and referrers. Cloudflare Web Analytics does not use tracking cookies, does not fingerprint individuals, and does not sell personal data.",
              "本站使用 Cloudflare Web Analytics 统计聚合页面浏览量与来源。该统计服务不使用跟踪 Cookie，不进行个人指纹识别，也不出售任何个人数据。"
            )}
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-white">
            {t("3. Payment & Order Processing (GDPR)", "3. 支付与订单数据处理")}
          </h2>
          <p className="mt-2">
            {t(
              "When you purchase a digital product, payment details (card numbers, PayPal credentials, billing details) are collected and processed directly by Payhip and PayPal in accordance with PCI-DSS and GDPR standards. Our website never sees or stores your payment card details.",
              "当您购买数字商品时，银行卡与 PayPal 账单信息直接由符合 PCI-DSS 与欧盟 GDPR 标准的 Payhip 与 PayPal 处理。本站服务器从不接触或存储您的任何支付卡信息。"
            )}
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-white">
            {t("4. Data Rights & Contact", "4. 数据权利与联系邮箱")}
          </h2>
          <p className="mt-2">
            {t("For privacy inquiries or data deletion requests regarding support emails, contact: ", "如有任何隐私相关咨询或客服邮件删除请求，请联系：")}
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="font-mono font-semibold text-emerald-300 underline"
            >
              {siteConfig.contactEmail}
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}

export function RefundView() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 transition hover:text-white"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        {t("Back to Home", "返回首页")}
      </Link>

      <h1 className="mt-5 font-display text-3xl font-bold text-white sm:text-4xl">
        {t("Refund & Fulfillment Policy", "退款与数字发货政策 (Refund Policy)")}
      </h1>
      <p className="mt-2 font-mono text-xs text-slate-500">
        {t(`Last Updated: ${siteConfig.lastUpdated}`, "最近更新：2026年11月27日")}
      </p>

      <div className="mt-8 space-y-6 rounded-2xl border border-white/[0.08] bg-[#070d19]/80 p-6 text-sm leading-relaxed text-slate-300 sm:p-8">
        <section>
          <h2 className="font-display text-lg font-bold text-white">
            {t("1. Instant Digital Delivery", "1. 即时数字文件交付")}
          </h2>
          <p className="mt-2">
            {t(
              "Upon successful checkout completion, you are immediately redirected to your verified order download page where you can download the complete ZIP package right away.",
              "付款完成后，系统将立即自动跳转至已验证的专属下载页面，您可当场一键下载完整的 ZIP 数字手册压缩包。"
            )}
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-white">
            {t("2. Digital Content & Statutory Withdrawal Notice", "2. 数字下载商品退款说明（含欧盟 14 天规则说明）")}
          </h2>
          <p className="mt-2">
            {t(
              "Because our playbook is a downloadable, non-returnable digital file delivered immediately upon purchase, by completing checkout and initiating the download you expressly consent to immediate performance and acknowledge that the statutory 14-day EU/UK right of withdrawal is waived once digital delivery begins. Consequently, completed downloads are generally non-refundable.",
              "由于本商品为付款后立即交付、可复制的离线数字文档，您在完成支付并开始下载时即明确同意立即履行交付，并知悉一旦开始数字内容交付即不再适用欧盟/英国法定的 14 天无理由撤回权。因此，已成功下载的数字商品原则上不支持无理由退货。"
            )}
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-white">
            {t("3. When We Gladly Issue a Full Refund", "3. 100% 支持全额退款或补发的情形")}
          </h2>
          <p className="mt-2">
            {t(
              "We stand behind fair, responsive customer care. Please email us first before opening any bank dispute—we resolve all billing or delivery issues within 24 hours, including:",
              "我们重视每一位买家的体验。若遇到任何问题，请先发邮件联系我们（无需发起银行拒付争议，我们会在 24 小时内为您妥善解决），以下情况均支持补发或全额原路退款："
            )}
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-slate-300">
            <li>
              {t(
                "Accidental duplicate purchase of the same product.",
                "不小心重复购买了同一份商品（退还重复订单全款）。"
              )}
            </li>
            <li>
              {t(
                "Technical failure preventing you from downloading or opening the file that our support team cannot resolve within 24 hours.",
                "因技术故障无法下载或打开文件，且客服在 24 小时内未能帮您解决补发。"
              )}
            </li>
            <li>
              {t(
                "Verified factually broken endpoint instructions inside the current edition that we cannot provide a working update for.",
                "当期手册中核心接口地址经核实完全失效且我们无法提供可用更新说明。"
              )}
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-lg font-bold text-white">
            {t("4. How to Request Help or a Refund", "4. 售后与退款申请方式")}
          </h2>
          <p className="mt-2">
            {t(
              "Send your order ID or checkout email address to ",
              "请将您的订单号（Order ID）或付款时填写的邮箱发送至 "
            )}
            <a
              href={`mailto:${siteConfig.contactEmail}?subject=Order%20Support%20-%20SwitchCN%20Playbook`}
              className="font-mono font-semibold text-emerald-300 underline"
            >
              {siteConfig.contactEmail}
            </a>
            {t(" and we will reply within 24 hours.", "，我们将在 24 小时内回复处理。")}
          </p>
        </section>
      </div>
    </div>
  );
}

function CheckoutSuccessInner() {
  const { t } = useLanguage();
  const searchParams = useSearchParams();
  const checkoutId = (searchParams.get("checkout_id") ?? "").trim();
  const orderIdParam = (searchParams.get("order_id") ?? "").trim();

  const [status, setStatus] = useState<"checking" | "verified" | "unverified">(
    checkoutId ? "checking" : "unverified"
  );
  const [orderInfo, setOrderInfo] = useState<{
    mode?: string;
    orderId?: string | null;
    customerEmail?: string | null;
    error?: string;
  }>({});

  useEffect(() => {
    if (!checkoutId) {
      setStatus("unverified");
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `/api/download?verify_only=1&checkout_id=${encodeURIComponent(
            checkoutId
          )}`,
          { cache: "no-store" }
        );
        const data = await res.json();
        if (cancelled) return;
        if (res.ok && data.verified) {
          setOrderInfo({
            mode: data.mode,
            orderId: data.orderId ?? orderIdParam,
            customerEmail: data.customerEmail,
          });
          setStatus("verified");
        } else {
          setOrderInfo({
            error:
              data.error ??
              "Could not confirm completed payment for this checkout_id.",
          });
          setStatus("unverified");
        }
      } catch {
        if (!cancelled) {
          setOrderInfo({
            error: "Network error while verifying order status.",
          });
          setStatus("unverified");
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [checkoutId, orderIdParam]);

  const downloadHref = checkoutId
    ? `/api/download?checkout_id=${encodeURIComponent(checkoutId)}`
    : "#";

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      {status === "checking" && (
        <SpotlightCard className="p-8 text-center">
          <Loader2 className="mx-auto h-10 w-10 animate-spin text-emerald-400" />
          <h1 className="mt-4 font-display text-2xl font-bold text-white">
            {t("Verifying Your Payment...", "正在核验您的支付结果...")}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            {t(
              "Confirming order status directly with Creem secure checkout...",
              "正在与 Creem 安全收银台实时核对订单状态，请稍候..."
            )}
          </p>
        </SpotlightCard>
      )}

      {status === "verified" && (
        <BorderBeamCard>
          <div className="p-2 sm:p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 px-3 py-1 font-mono text-xs font-bold text-emerald-300 ring-1 ring-emerald-400/30">
                <CheckCircle2 className="h-4 w-4" />
                {t("PAYMENT VERIFIED", "支付已确认")}
              </span>
              {orderInfo.mode === "test" && (
                <span className="rounded-md bg-amber-400/20 px-2.5 py-0.5 font-mono text-[11px] font-bold text-amber-300 ring-1 ring-amber-400/30">
                  TEST MODE ORDER
                </span>
              )}
            </div>

            <h1 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
              {t(
                "Thank you! Your Playbook is Ready.",
                "感谢购买！您的直连实战手册已准备就绪"
              )}
            </h1>

            <p className="mt-2 text-sm leading-relaxed text-slate-300">
              {t(
                "Click the button below to download your complete ZIP package. Bookmark this page if you ever want to re-download it.",
                "请点击下方绿色按钮立即下载完整的 ZIP 手册压缩包。建议收藏本页网址以便日后随时重新下载。"
              )}
            </p>

            <div className="mt-5 rounded-xl border border-white/[0.08] bg-black/40 p-3.5 font-mono text-xs text-slate-400">
              <div>
                {t("Order / Checkout ID:", "订单核验编号：")}{" "}
                <span className="text-slate-200">
                  {orderInfo.orderId || checkoutId}
                </span>
              </div>
              {orderInfo.customerEmail && (
                <div className="mt-1">
                  {t("Receipt Email:", "收据邮箱：")}{" "}
                  <span className="text-emerald-300">
                    {orderInfo.customerEmail}
                  </span>
                </div>
              )}
            </div>

            <a
              href={downloadHref}
              className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 px-6 py-4 text-base font-bold text-slate-950 shadow-[0_0_34px_-6px_rgba(16,185,129,0.85)] transition hover:shadow-[0_0_44px_-4px_rgba(34,211,238,0.95)]"
            >
              <Download className="h-5 w-5" />
              {t(
                "Download Playbook ZIP Now",
                "立即下载完整手册压缩包 (.zip)"
              )}
            </a>

            <div className="mt-6 space-y-2 border-t border-white/[0.07] pt-4 text-xs text-slate-400">
              <p className="font-semibold text-slate-200">
                {t("How to open:", "打开方式：")}
              </p>
              <p>
                {t(
                  "1. Unzip China-AI-Direct-API-Playbook-2026.zip → 2. Double-click China-AI-Direct-API-Playbook-2026.html in any browser (works 100% offline, includes Print-to-PDF).",
                  "1. 解压下载的压缩包 → 2. 用任意浏览器双击打开 China-AI-Direct-API-Playbook-2026.html（100% 离线可用，支持一键导出 PDF）。"
                )}
              </p>
              <p className="flex items-center gap-1.5 pt-1 text-slate-400">
                <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-400" />
                {t("Need any help? Email ", "遇到任何下载或配置问题？随时联系客服邮箱：")}
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="font-mono font-semibold text-emerald-300 underline"
                >
                  {siteConfig.contactEmail}
                </a>
              </p>
            </div>
          </div>
        </BorderBeamCard>
      )}

      {status === "unverified" && (
        <SpotlightCard className="p-7">
          <div className="flex items-center gap-2.5 text-amber-300">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <h1 className="font-display text-xl font-bold text-white">
              {t(
                "Order Verification Required",
                "需要核对订单信息后下载"
              )}
            </h1>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-slate-300">
            {checkoutId
              ? t(
                  `We couldn't confirm a completed payment for checkout "${checkoutId}" yet (${
                    orderInfo.error ?? "pending"
                  }). If your payment just went through, wait 5 seconds and refresh this page.`,
                  `暂时未能核验到会话 "${checkoutId}" 的已完成付款状态。如果您刚刚完成支付，请等待 5 秒后刷新本页面重试。`
                )
              : t(
                  "This page automatically unlocks your download when redirected from Creem after payment.",
                  "本页面用于在完成 Creem 支付跳转回来后自动解锁您的专属下载链接。"
                )}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/playbook/"
              className="rounded-xl bg-emerald-400 px-4 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              {t("Go to Playbook Page", "前往手册购买页")}
            </Link>
            <a
              href={`mailto:${siteConfig.contactEmail}?subject=Playbook%20Download%20Help&body=Checkout%20ID:%20${encodeURIComponent(
                checkoutId || "N/A"
              )}`}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2.5 text-xs font-semibold text-slate-200 transition hover:border-emerald-400/40 hover:text-white"
            >
              <Mail className="h-3.5 w-3.5 text-emerald-300" />
              {t(
                `Contact Support (${siteConfig.contactEmail})`,
                `联系客服补发 (${siteConfig.contactEmail})`
              )}
            </a>
          </div>
        </SpotlightCard>
      )}
    </div>
  );
}

export function CheckoutSuccessView() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-2xl px-4 py-16 text-center text-sm text-slate-400">
          Loading order status...
        </div>
      }
    >
      <CheckoutSuccessInner />
    </Suspense>
  );
}
