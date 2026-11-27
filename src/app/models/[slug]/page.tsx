import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CHINA_MODELS, getModelBySlug } from "@/data/models";
import { ModelGuideView } from "@/components/PageViews";

export function generateStaticParams() {
  return CHINA_MODELS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const model = getModelBySlug(slug);
  if (!model) return {};

  return {
    title: `How to Use ${model.name} API Outside China (2026 Pricing & Guide)`,
    description: `Complete global developer guide to ${model.name} (${model.provider}): $${model.inputPrice}/$${model.outputPrice} per 1M tokens, no Chinese phone required, Zero Data Retention routes, and drop-in OpenAI SDK code.`,
  };
}

export default async function ModelGuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const model = getModelBySlug(slug);
  if (!model || model.origin !== "china") notFound();

  return <ModelGuideView model={model} />;
}
