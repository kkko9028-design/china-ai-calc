# SwitchCN.ai — China AI API Pricing Calculator & Global Access Guide

一个纯静态、零服务器成本的出海 AI 工具站 MVP（Next.js 15 App Router + Tailwind CSS + Programmatic SEO）。

## 核心功能

- **交互式省钱计算器**：对比 2026 年 11 月最新欧美旗舰模型（GPT-6.2 Astra/Sol、Claude Fable 5.2 / Sonnet 5.5、Gemini 4 Carbon/Neon/Hydrogen）与中国大模型（DeepSeek V4 Pro / V4.1 Flash、Qwen 4 Max、Kimi K3.1 Pro），支持 Prompt Cache 命中率与场景预设。
- **2 行代码无缝迁移**：提供 Node.js / Python / cURL 的 OpenAI SDK 兼容代码，海外开发者无需中国手机号或支付宝即可调用。
- **程序化 SEO 矩阵（33+ 独立静态页）**：
  - 首页 `/`（含 FAQ JSON-LD 结构化数据）
  - 28 个模型两两对比页 `/compare/[us-model]-vs-[cn-model]/`
  - 4 个中国模型海外接入指南页 `/models/[cn-model]/`
  - 自动生成 `sitemap.xml` 和 `robots.txt`

## 5 分钟免费上线（Cloudflare Pages 或 Vercel）

### 方式一：Vercel（最简单）
1. 在 GitHub 新建一个仓库，把本目录代码推送上去。
2. 登录 [Vercel](https://vercel.com) → **Add New Project** → 导入刚才的 GitHub 仓库 → 直接点 **Deploy**。

### 方式二：Cloudflare Pages（不限流量）
1. 推送代码到 GitHub。
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → 连接 GitHub 仓库。
3. 构建设置：
   - Framework preset: `Next.js (Static HTML Export)`
   - Build command: `npm run build`
   - Build output directory: `out`

## 日常维护（每次有新模型发布时）

1. 打开 `src/data/models.ts`，添加或修改模型价格。
2. 修改 `src/config/site.ts` 中的 `lastUpdated`（买好域名后也在这里改 `url` 和 `adsenseClientId`）。
3. 推送到 GitHub，Cloudflare/Vercel 会自动重新生成所有对比页和 `sitemap.xml`。
