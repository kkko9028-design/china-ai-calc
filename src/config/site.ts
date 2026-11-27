export const siteConfig = {
  name: "SwitchCN.ai",
  tagline: "China AI API Pricing Calculator & Global Access Guide",
  description:
    "Calculate how much you save switching from GPT-6.2, Claude 5.2, or Gemini 4 to DeepSeek V4, Qwen 4 Max, and Kimi K3.1. Includes no-China-phone global API guides & drop-in OpenAI SDK code.",
  // 买好域名后改成你的正式域名（不要带结尾斜杠）
  url: "https://china-ai-calc.kkko9028.workers.dev",
  lastUpdated: "November 27, 2026",

  // === C. 免费访客统计 (Cloudflare Web Analytics — 已激活) ===
  cloudflareAnalyticsToken: "804b369bb95a489285edba8fbb3438f4",

  // === A. $15 付费教程《China AI Direct API Playbook》收款链接 (Creem — 支付宝提现) ===
  // 在 https://www.creem.io 上传 china-ai-direct-api-playbook-v1.zip 后，把生成的 Checkout 链接粘贴到这里
  playbookPriceUSD: 15,
  playbookCheckoutUrl: "",

  // === B. 海外云与 GPU 联盟返佣链接 (Affiliate Links — 支持 PayPal 现金提现) ===
  affiliates: {
    vultrUrl: "https://www.vultr.com/products/cloud-gpu/",
    digitalOceanUrl: "https://www.digitalocean.com/products/gpu-droplets",
    hostingerVpsUrl: "https://www.hostinger.com/vps-hosting",
  },

  // Google AdSense 审核通过后填入 ca-pub-xxxxxxxxxxxxxxxx
  adsenseClientId: "",
  // 赞助位/联系邮箱
  contactEmail: "hello@switchcn.ai",
};
