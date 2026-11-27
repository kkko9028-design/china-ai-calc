export const siteConfig = {
  name: "SwitchCN.ai",
  tagline: "China AI API Pricing Calculator & Global Access Guide",
  description:
    "Calculate how much you save switching from GPT-6.2, Claude 5.2, or Gemini 4 to DeepSeek V4, Qwen 4 Max, and Kimi K3.1. Includes no-China-phone global API guides & drop-in OpenAI SDK code.",
  // 绑定独立域名后改成你的正式域名（不要带结尾斜杠，Creem 提交审核前必须绑定独立域名）
  url: "https://xingyuhaha.top",
  lastUpdated: "November 27, 2026",

  // === C. 免费访客统计 (Cloudflare Web Analytics — 已激活) ===
  cloudflareAnalyticsToken: "804b369bb95a489285edba8fbb3438f4",

  // === A. $15 付费教程《China AI Direct API Playbook》收银配置 ===
  // 推荐方式（全自动服务端验单防白嫖发货）：在 Cloudflare Worker「设置 -> 变量和机密」添加 CREEM_API_KEY、CREEM_PRODUCT_ID、PLAYBOOK_SECRET_KEY
  // 备用方式（静态收款链接）：也可以把静态链接填在下面 playbookCheckoutUrl
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
  // 真实可达的客服与商务联系邮箱（请确保 Creem 后台填写的客服邮箱与此一致）
  contactEmail: "kkko9028@gmail.com",
};
