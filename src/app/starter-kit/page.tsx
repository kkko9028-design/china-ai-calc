import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { StarterKitSalesView } from "@/components/MonetizationBlocks";

export const metadata: Metadata = {
  title: `Multi-LLM Smart Router Starter Kit ($${siteConfig.starterKitPriceUSD}) — Cut API Costs 85%`,
  description:
    "Production TypeScript, Next.js, Python & Docker LiteLLM smart router kit. Route 85-90% of routine prompts to DeepSeek V4 & Qwen 4 Max with US/EU Zero Data Retention and automatic failover.",
};

export default function StarterKitPage() {
  return <StarterKitSalesView />;
}
