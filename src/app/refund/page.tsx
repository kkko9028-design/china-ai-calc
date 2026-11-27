import type { Metadata } from "next";
import { RefundView } from "@/components/LegalAndSuccessViews";

export const metadata: Metadata = {
  title: "Refund & Fulfillment Policy",
  description: "Digital fulfillment and refund policy for SwitchCN.ai.",
};

export default function RefundPage() {
  return <RefundView />;
}
