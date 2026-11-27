import type { Metadata } from "next";
import { CheckoutSuccessView } from "@/components/LegalAndSuccessViews";

export const metadata: Metadata = {
  title: "Order Confirmed — Download Playbook",
  robots: { index: false, follow: false },
};

export default function CheckoutSuccessPage() {
  return <CheckoutSuccessView />;
}
