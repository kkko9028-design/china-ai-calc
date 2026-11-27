export type ModelOrigin = "western" | "china";

export interface GlobalAccessOption {
  provider: string;
  providerZh: string;
  url: string;
  needsChinaPhone: boolean;
  paymentMethods: string;
  paymentMethodsZh: string;
  zeroDataRetention: boolean;
  notes: string;
  notesZh: string;
}

export interface AIModel {
  id: string;
  slug: string;
  name: string;
  provider: string;
  origin: ModelOrigin;
  tier: "Flagship" | "Mid-Tier" | "Budget";
  contextWindow: string;
  // USD per 1M tokens
  inputPrice: number;
  outputPrice: number;
  cachedInputPrice: number;
  // OpenRouter model slug for drop-in code
  openRouterId: string;
  releaseDate: string;
  bestFor: string[];
  bestForZh: string[];
  priceAlert?: string;
  priceAlertZh?: string;
  summary: string;
  summaryZh: string;
  globalAccess?: GlobalAccessOption[];
}

export const AI_MODELS: AIModel[] = [
  // === Western Frontier & Mainstream Models (Nov 2026) ===
  {
    id: "gpt-6.2-astra",
    slug: "gpt-6-2-astra",
    name: "GPT-6.2 Astra",
    provider: "OpenAI",
    origin: "western",
    tier: "Flagship",
    contextWindow: "272K (Long-ctx 2x)",
    inputPrice: 8.0,
    outputPrice: 40.0,
    cachedInputPrice: 0.4,
    openRouterId: "openai/gpt-6.2-astra",
    releaseDate: "Nov 17, 2026",
    bestFor: ["Complex reasoning", "Architecture design", "Hard coding tasks"],
    bestForZh: ["复杂深度推理", "系统架构设计", "高难度算法与编程"],
    priceAlert: "Requests >272K tokens incur 2x input ($16) and $60 output.",
    priceAlertZh: "单次请求超过 272K 上下文时，输入翻倍至 $16/M，输出升至 $60/M。",
    summary:
      "OpenAI's heavy-hitting frontier reasoning model for advanced engineering and multi-step planning.",
    summaryZh:
      "OpenAI 旗舰级深度推理模型，专为高复杂度软件工程与多步规划设计。",
  },
  {
    id: "claude-fable-5.2",
    slug: "claude-fable-5-2",
    name: "Claude Fable 5.2",
    provider: "Anthropic",
    origin: "western",
    tier: "Flagship",
    contextWindow: "1M",
    inputPrice: 8.0,
    outputPrice: 40.0,
    cachedInputPrice: 0.2,
    openRouterId: "anthropic/claude-fable-5.2",
    releaseDate: "Nov 9, 2026",
    bestFor: ["Autonomous coding agents", "Deep refactoring", "Long-horizon workflows"],
    bestForZh: ["自主编程 Agent", "大型代码库重构", "长周期复杂任务流"],
    summary:
      "Anthropic's top-ranked agentic coding model with ultra-low cached read pricing ($0.20/M).",
    summaryZh:
      "Anthropic 榜首级编程与 Agent 模型，具备超低缓存读取价格（$0.20/M）。",
  },
  {
    id: "gemini-4-carbon",
    slug: "gemini-4-carbon",
    name: "Gemini 4 Carbon",
    provider: "Google",
    origin: "western",
    tier: "Flagship",
    contextWindow: "2M",
    inputPrice: 4.0,
    outputPrice: 20.0,
    cachedInputPrice: 0.2,
    openRouterId: "google/gemini-4-carbon",
    releaseDate: "Nov 2026",
    bestFor: ["Huge codebase analysis", "Multimodal video/PDF", "Long-horizon engineering"],
    bestForZh: ["超大型代码库分析", "视频/PDF 原生多模态", "长上下文工程任务"],
    priceAlert:
      "Introductory promo ($2/$10) expires Nov 30, 2026 — standard rate ($4/$20) starts Dec 1, 2026.",
    priceAlertZh:
      "首发优惠价（$2/$10）于 2026 年 11 月 30 日截止，12 月 1 日起恢复标准价（$4/$20）。",
    summary:
      "Google's flagship long-context engineering model. Standard pricing doubles on Dec 1, 2026.",
    summaryZh:
      "Google 旗舰超长上下文工程模型，2026 年 12 月 1 日起标准 API 价格翻倍。",
  },
  {
    id: "gemini-4-neon",
    slug: "gemini-4-neon",
    name: "Gemini 4 Neon",
    provider: "Google",
    origin: "western",
    tier: "Mid-Tier",
    contextWindow: "1M",
    inputPrice: 3.0,
    outputPrice: 15.0,
    cachedInputPrice: 0.15,
    openRouterId: "google/gemini-4-neon",
    releaseDate: "Nov 18, 2026",
    bestFor: ["Enterprise analysis", "Balanced reasoning", "Structured extraction"],
    bestForZh: ["企业数据分析", "均衡逻辑推理", "结构化信息抽取"],
    summary:
      "Google's mid-tier step-up model bridging everyday speed and complex enterprise tasks.",
    summaryZh:
      "Google 中高端主力模型，兼顾响应速度与复杂企业级分析能力。",
  },
  {
    id: "gpt-6.2-sol",
    slug: "gpt-6-2-sol",
    name: "GPT-6.2 Sol",
    provider: "OpenAI",
    origin: "western",
    tier: "Mid-Tier",
    contextWindow: "256K",
    inputPrice: 2.0,
    outputPrice: 10.0,
    cachedInputPrice: 0.1,
    openRouterId: "openai/gpt-6.2-sol",
    releaseDate: "Nov 17, 2026",
    bestFor: ["Daily coding", "Production SaaS apps", "Fast tool calling"],
    bestForZh: ["日常编程辅助", "生产级 SaaS 应用", "高速工具调用"],
    summary:
      "OpenAI's cost-effective workhorse model for everyday production apps and agent loops.",
    summaryZh:
      "OpenAI 高性价比日常主力模型，适合生产环境 SaaS 与高频工具调用。",
  },
  {
    id: "claude-sonnet-5.5",
    slug: "claude-sonnet-5-5",
    name: "Claude Sonnet 5.5",
    provider: "Anthropic",
    origin: "western",
    tier: "Mid-Tier",
    contextWindow: "1M",
    inputPrice: 2.0,
    outputPrice: 10.0,
    cachedInputPrice: 0.1,
    openRouterId: "anthropic/claude-sonnet-5.5",
    releaseDate: "2026",
    bestFor: ["Production coding", "Writing & editing", "Customer support agents"],
    bestForZh: ["生产代码编写", "高质量写作润色", "智能客服 Agent"],
    summary:
      "Anthropic's balanced production tier with strong instruction following and coding reliability.",
    summaryZh:
      "Anthropic 均衡型生产模型，指令遵循精准、代码输出稳定可靠。",
  },
  {
    id: "gemini-4-hydrogen",
    slug: "gemini-4-hydrogen",
    name: "Gemini 4 Hydrogen",
    provider: "Google",
    origin: "western",
    tier: "Budget",
    contextWindow: "1M",
    inputPrice: 1.5,
    outputPrice: 7.5,
    cachedInputPrice: 0.08,
    openRouterId: "google/gemini-4-hydrogen",
    releaseDate: "Nov 12, 2026",
    bestFor: ["High-volume agents", "Fast everyday coding", "Search & RAG"],
    bestForZh: ["高并发 Agent 循环", "日常快速编码", "搜索增强与 RAG"],
    summary:
      "Google's fast, cost-effective default model for high-frequency developer workloads.",
    summaryZh:
      "Google 高速高性价比默认模型，适合高频开发者负载与检索问答。",
  },

  // === Chinese Frontier & Open-Weight Models (Nov 2026) ===
  {
    id: "deepseek-v4-pro",
    slug: "deepseek-v4-pro",
    name: "DeepSeek V4 Pro",
    provider: "DeepSeek",
    origin: "china",
    tier: "Flagship",
    contextWindow: "1.05M",
    inputPrice: 0.8,
    outputPrice: 1.55,
    cachedInputPrice: 0.2,
    openRouterId: "deepseek/deepseek-v4-pro",
    releaseDate: "2026",
    bestFor: ["Coding & math", "High-volume APIs", "Cost-sensitive SaaS"],
    bestForZh: ["代码生成与数学推理", "高并发生产 API", "极致降本 SaaS 应用"],
    summary:
      "Flagship Chinese reasoning & coding model delivering frontier quality at up to 90% lower API cost than GPT-6.2 Astra or Claude Fable 5.2.",
    summaryZh:
      "国产旗舰推理与编程大模型，性能对标一线前沿模型，API 成本比 GPT-6.2 Astra 与 Claude Fable 5.2 最高降低 90%。",
    globalAccess: [
      {
        provider: "OpenRouter (Recommended for US/EU)",
        providerZh: "OpenRouter（欧美开发者首选）",
        url: "https://openrouter.ai/models/deepseek/deepseek-v4-pro",
        needsChinaPhone: false,
        paymentMethods: "Visa, Mastercard, Apple Pay, Crypto",
        paymentMethodsZh: "Visa、Mastercard、Apple Pay、加密货币",
        zeroDataRetention: true,
        notes: "Filter by US/EU host providers with Zero Data Retention (ZDR) enabled.",
        notesZh: "支持筛选欧美本地算力节点并开启零数据留存（ZDR）隐私保护。",
      },
      {
        provider: "DeepSeek Official Global API",
        providerZh: "DeepSeek 官方国际版开放平台",
        url: "https://platform.deepseek.com",
        needsChinaPhone: false,
        paymentMethods: "International Credit Card, PayPal",
        paymentMethodsZh: "国际信用卡、PayPal",
        zeroDataRetention: false,
        notes: "Lowest direct pricing; check compliance requirements if handling EU/US PII.",
        notesZh: "官方直连最低价；若处理欧美敏感个人数据（PII）请留意数据合规要求。",
      },
      {
        provider: "Together AI / Fireworks (US Hosted)",
        providerZh: "Together AI / Fireworks（美国本土托管）",
        url: "https://www.together.ai",
        needsChinaPhone: false,
        paymentMethods: "International Credit Card, Enterprise Invoice",
        paymentMethodsZh: "国际信用卡、企业对公账单",
        zeroDataRetention: true,
        notes: "Open weights hosted on US/EU GPUs with SOC2 compliance.",
        notesZh: "开源权重部署在欧美本土 GPU 集群，具备 SOC2 企业级安全合规。",
      },
    ],
  },
  {
    id: "qwen-4-max",
    slug: "qwen-4-max",
    name: "Qwen 4 Max",
    provider: "Alibaba Cloud",
    origin: "china",
    tier: "Flagship",
    contextWindow: "1M",
    inputPrice: 1.5,
    outputPrice: 4.5,
    cachedInputPrice: 0.071,
    openRouterId: "qwen/qwen4-max",
    releaseDate: "Nov 2026",
    bestFor: ["Full-stack coding", "Multilingual apps", "Ultra-cheap prompt caching"],
    bestForZh: ["全栈工程开发", "多语言全球化应用", "超低价上下文缓存"],
    summary:
      "Alibaba's November 2026 developer flagship featuring a 1M context window and one of the cheapest cached-input rates ($0.071/M) on the market.",
    summaryZh:
      "阿里云 2026 年 11 月旗舰开发者模型，支持 1M 上下文与全行业极低的缓存读取价格（$0.071/M）。",
    globalAccess: [
      {
        provider: "OpenRouter (Easiest Setup)",
        providerZh: "OpenRouter（2 分钟极速接入）",
        url: "https://openrouter.ai/models/qwen/qwen4-max",
        needsChinaPhone: false,
        paymentMethods: "Visa, Mastercard, Apple Pay",
        paymentMethodsZh: "Visa、Mastercard、Apple Pay",
        zeroDataRetention: true,
        notes: "Drop-in OpenAI SDK compatibility in 2 minutes, no Alibaba Cloud account needed.",
        notesZh: "完全兼容 OpenAI SDK，无需注册阿里云账号即可直接调用。",
      },
      {
        provider: "Alibaba Cloud Model Studio (International / Singapore)",
        providerZh: "阿里云百炼国际站（新加坡 / 弗吉尼亚节点）",
        url: "https://www.alibabacloud.com/product/modelstudio",
        needsChinaPhone: false,
        paymentMethods: "International Credit Card, PayPal",
        paymentMethodsZh: "国际信用卡、PayPal",
        zeroDataRetention: true,
        notes: "Choose Singapore or Virginia endpoint for non-China data residency.",
        notesZh: "可选择新加坡或美国弗吉尼亚节点，满足海外数据驻留要求。",
      },
    ],
  },
  {
    id: "kimi-k3.1-pro",
    slug: "kimi-k3-1-pro",
    name: "Kimi K3.1 Pro",
    provider: "Moonshot AI",
    origin: "china",
    tier: "Flagship",
    contextWindow: "1.05M",
    inputPrice: 2.0,
    outputPrice: 10.0,
    cachedInputPrice: 0.2,
    openRouterId: "moonshotai/kimi-k3.1-pro",
    releaseDate: "Nov 4, 2026",
    bestFor: ["Long-document research", "Agentic tool use", "Complex writing"],
    bestForZh: ["超长文档深度研报", "多步 Agent 工具调用", "高质量长文创作"],
    summary:
      "Moonshot AI's 2.8T-parameter flagship shipped Nov 4, 2026 with open weights under a custom commercial license and strong 1M-context recall.",
    summaryZh:
      "月之暗面于 2026 年 11 月 4 日发布的 2.8 万亿参数旗舰模型，具备极强的百万长文本召回与 Agent 能力。",
    globalAccess: [
      {
        provider: "OpenRouter (Recommended)",
        providerZh: "OpenRouter（海外免手机号推荐）",
        url: "https://openrouter.ai/models/moonshotai/kimi-k3.1-pro",
        needsChinaPhone: false,
        paymentMethods: "Visa, Mastercard, Apple Pay",
        paymentMethodsZh: "Visa、Mastercard、Apple Pay",
        zeroDataRetention: true,
        notes: "Instant global billing; avoids Moonshot China SMS verification.",
        notesZh: "直接用海外银行卡结算，绕开国内版短信实名验证。",
      },
      {
        provider: "Moonshot AI Global Platform",
        providerZh: "Moonshot AI 海外开放平台",
        url: "https://platform.moonshot.ai",
        needsChinaPhone: false,
        paymentMethods: "International Credit Card",
        paymentMethodsZh: "国际信用卡",
        zeroDataRetention: false,
        notes: "Direct API with automatic context caching support.",
        notesZh: "官方海外直连 API，支持自动上下文缓存计费。",
      },
    ],
  },
  {
    id: "deepseek-v4.1-flash",
    slug: "deepseek-v4-1-flash",
    name: "DeepSeek V4.1 Flash",
    provider: "DeepSeek",
    origin: "china",
    tier: "Budget",
    contextWindow: "1.05M",
    inputPrice: 0.15,
    outputPrice: 0.6,
    cachedInputPrice: 0.04,
    openRouterId: "deepseek/deepseek-v4.1-flash",
    releaseDate: "2026",
    bestFor: ["High-throughput classification", "Summarization", "Background batch agents"],
    bestForZh: ["高吞吐文本分类", "批量摘要提取", "后台异步批处理任务"],
    summary:
      "Ultra-low-cost speed tier built for high-volume pipelines, background enrichment, and budget-conscious indie apps.",
    summaryZh:
      "超低成本极速模型，专为大规模数据清洗流水线、后台批处理与独立开发者应用打造。",
    globalAccess: [
      {
        provider: "OpenRouter",
        providerZh: "OpenRouter 全球路由",
        url: "https://openrouter.ai/models/deepseek/deepseek-v4.1-flash",
        needsChinaPhone: false,
        paymentMethods: "Visa, Mastercard, Apple Pay",
        paymentMethodsZh: "Visa、Mastercard、Apple Pay",
        zeroDataRetention: true,
        notes: "Fast routing across multiple global inference providers.",
        notesZh: "自动在多家海外推理节点间高速负载均衡。",
      },
      {
        provider: "DeepInfra (US Hosted)",
        providerZh: "DeepInfra（美国节点托管）",
        url: "https://deepinfra.com",
        needsChinaPhone: false,
        paymentMethods: "International Credit Card",
        paymentMethodsZh: "国际信用卡",
        zeroDataRetention: true,
        notes: "Pay-as-you-go serverless inference with low latency in US/EU.",
        notesZh: "按量付费无服务器推理，欧美本地访问延迟极低。",
      },
    ],
  },
];

export const WESTERN_MODELS = AI_MODELS.filter((m) => m.origin === "western");
export const CHINA_MODELS = AI_MODELS.filter((m) => m.origin === "china");

export interface WorkloadPreset {
  id: string;
  label: string;
  labelZh: string;
  description: string;
  inputMillions: number;
  outputMillions: number;
  cacheHitRate: number; // 0 to 90
}

export const WORKLOAD_PRESETS: WorkloadPreset[] = [
  {
    id: "coding-agent",
    label: "Coding Agent",
    labelZh: "编程 Agent",
    description: "Heavy context reads + high cache hit (70%)",
    inputMillions: 50,
    outputMillions: 5,
    cacheHitRate: 70,
  },
  {
    id: "saas-chatbot",
    label: "SaaS Chatbot",
    labelZh: "SaaS 客服对话",
    description: "Balanced customer chat (30% cache)",
    inputMillions: 20,
    outputMillions: 8,
    cacheHitRate: 30,
  },
  {
    id: "rag-docs",
    label: "RAG / Docs",
    labelZh: "知识库 / RAG",
    description: "Large document inputs + short answers",
    inputMillions: 100,
    outputMillions: 10,
    cacheHitRate: 50,
  },
  {
    id: "indie-mvp",
    label: "Indie MVP",
    labelZh: "独立应用起步",
    description: "Light production traffic",
    inputMillions: 5,
    outputMillions: 2,
    cacheHitRate: 20,
  },
];

export function calculateMonthlyCost(
  model: AIModel,
  inputMillions: number,
  outputMillions: number,
  cacheHitRatePercent: number
): number {
  const hitRatio = Math.min(Math.max(cacheHitRatePercent, 0), 100) / 100;
  const cachedInput = inputMillions * hitRatio;
  const uncachedInput = inputMillions * (1 - hitRatio);

  const inputCost =
    uncachedInput * model.inputPrice + cachedInput * model.cachedInputPrice;
  const outputCost = outputMillions * model.outputPrice;

  return inputCost + outputCost;
}

export function formatUSD(amount: number): string {
  if (amount >= 1000) {
    return `$${amount.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  }
  if (amount >= 10) {
    return `$${amount.toFixed(2)}`;
  }
  return `$${amount.toFixed(3)}`;
}

export function getAllComparisonPairs(): {
  slug: string;
  from: AIModel;
  to: AIModel;
}[] {
  const pairs: { slug: string; from: AIModel; to: AIModel }[] = [];
  for (const w of WESTERN_MODELS) {
    for (const c of CHINA_MODELS) {
      pairs.push({
        slug: `${w.slug}-vs-${c.slug}`,
        from: w,
        to: c,
      });
    }
  }
  return pairs;
}

export function getComparisonBySlug(slug: string) {
  return getAllComparisonPairs().find((p) => p.slug === slug);
}

export function getModelBySlug(slug: string) {
  return AI_MODELS.find((m) => m.slug === slug);
}

export const FAQ_ITEMS_EN = [
  {
    q: "Can I use DeepSeek V4, Qwen 4 Max, or Kimi K3.1 APIs outside China without a Chinese phone number?",
    a: "Yes. Global developers can access all three models through OpenRouter, Together AI, DeepInfra, or Alibaba Cloud Model Studio (Singapore/US endpoints) using standard Visa, Mastercard, or Apple Pay—no Chinese phone number or Alipay required.",
  },
  {
    q: "How much cheaper are Chinese frontier LLMs compared to GPT-6.2 Astra and Claude Fable 5.2 in Nov 2026?",
    a: "As of November 2026, GPT-6.2 Astra and Claude Fable 5.2 cost $8/M input and $40/M output. DeepSeek V4 Pro ($0.80/$1.55) cuts costs by up to 90%, while Qwen 4 Max ($1.50/$4.50) cuts costs by ~80% with $0.071/M cached inputs.",
  },
  {
    q: "What happens to Gemini 4 Carbon pricing on December 1, 2026?",
    a: "Google's introductory promotional rate for Gemini 4 Carbon ($2/M input, $10/M output) expires on November 30, 2026. Standard billing doubles to $4/M input and $20/M output starting December 1, 2026.",
  },
  {
    q: "Is it safe for US/EU companies to route data to Chinese open-weight models?",
    a: "If you have strict data residency or GDPR/SOC2 requirements, avoid direct China-hosted endpoints and instead run open-weight models (DeepSeek V4, Qwen 4, Kimi K3.1) via US/EU-hosted inference providers with Zero Data Retention (ZDR) enabled on OpenRouter, Together AI, or DeepInfra.",
  },
];

export const FAQ_ITEMS_ZH = [
  {
    q: "没有中国大陆手机号和支付宝，海外开发者能直接用 DeepSeek V4、Qwen 4 Max 和 Kimi K3.1 的 API 吗？",
    a: "完全可以。海外开发者可通过 OpenRouter、Together AI、DeepInfra 或阿里云百炼国际站（新加坡/美国节点），直接使用 Visa、Mastercard 或 Apple Pay 充值调用，全程无需中国手机号或支付宝。",
  },
  {
    q: "2026 年 11 月中国旗舰大模型相比 GPT-6.2 Astra 和 Claude Fable 5.2 到底便宜多少？",
    a: "目前 GPT-6.2 Astra 与 Claude Fable 5.2 官方定价高达 $8/M 输入、$40/M 输出。而 DeepSeek V4 Pro（$0.80/$1.55）最高可省 90%，Qwen 4 Max（$1.50/$4.50）可省约 80% 且缓存读取仅需 $0.071/M。",
  },
  {
    q: "2026 年 12 月 1 日 Gemini 4 Carbon 的价格会发生什么变化？",
    a: "Google 为 Gemini 4 Carbon 提供的首发优惠价（$2/M 输入、$10/M 输出）将于 11 月 30 日到期，12 月 1 日起标准计费翻倍至 $4/M 输入、$20/M 输出。",
  },
  {
    q: "欧美出海团队调用中国开源模型如何保障数据隐私与 GDPR / SOC2 合规？",
    a: "如果团队有严格的数据驻留或合规要求，请避开境内直连节点，在 OpenRouter、Together AI 或 DeepInfra 中选择托管于美国/欧洲本土 GPU 集群且开启零数据留存（Zero Data Retention, ZDR）的模型节点即可。",
  },
];
