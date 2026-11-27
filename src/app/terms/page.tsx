import type { Metadata } from "next";
import { TermsView } from "@/components/LegalAndSuccessViews";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service and digital product license terms for SwitchCN.ai.",
};

export default function TermsPage() {
  return <TermsView />;
}
