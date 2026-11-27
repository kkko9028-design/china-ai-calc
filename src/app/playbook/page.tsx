import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { PlaybookSalesView } from "@/components/MonetizationBlocks";

export const metadata: Metadata = {
  title: `The China AI Direct API Playbook ($${siteConfig.playbookPriceUSD}) — No +86 Phone Setup Guide`,
  description:
    "Step-by-step 2026 field manual to connect directly to DeepSeek, Alibaba Qwen, Moonshot Kimi, GLM, MiniMax & Hailuo/Kling Video APIs from outside China without a +86 phone or Alipay.",
};

export default function PlaybookPage() {
  return <PlaybookSalesView />;
}
