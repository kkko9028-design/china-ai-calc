import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  calculateMonthlyCost,
  getAllComparisonPairs,
  getComparisonBySlug,
} from "@/data/models";
import { CompareDetailView } from "@/components/PageViews";

export function generateStaticParams() {
  return getAllComparisonPairs().map((pair) => ({
    slug: pair.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const pair = getComparisonBySlug(slug);
  if (!pair) return {};

  const fromCost = calculateMonthlyCost(pair.from, 50, 5, 50);
  const toCost = calculateMonthlyCost(pair.to, 50, 5, 50);
  const pct = Math.round(((fromCost - toCost) / Math.max(fromCost, 0.01)) * 100);

  return {
    title: `${pair.from.name} vs ${pair.to.name} API Pricing (Nov 2026) — Save ${pct}%`,
    description: `Compare ${pair.from.name} ($${pair.from.inputPrice}/$${pair.from.outputPrice}) vs ${pair.to.name} ($${pair.to.inputPrice}/$${pair.to.outputPrice}). Interactive cost calculator, prompt caching comparison, and 2-line global API migration code.`,
  };
}

export default async function CompareDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pair = getComparisonBySlug(slug);
  if (!pair) notFound();

  return <CompareDetailView from={pair.from} to={pair.to} />;
}
