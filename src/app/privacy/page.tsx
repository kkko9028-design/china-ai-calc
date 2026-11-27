import type { Metadata } from "next";
import { PrivacyView } from "@/components/LegalAndSuccessViews";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy and GDPR compliance details for SwitchCN.ai.",
};

export default function PrivacyPage() {
  return <PrivacyView />;
}
