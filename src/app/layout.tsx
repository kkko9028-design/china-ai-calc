import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/jetbrains-mono";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { DevStatusBadge } from "@/components/DevStatusBadge";
import { ContactFloatingWidget } from "@/components/ContactFloatingWidget";
import { AmbientBackground } from "@/components/ui/TechPrimitives";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "China AI API pricing",
    "DeepSeek V4 Pro pricing",
    "Qwen 4 Max API outside China",
    "Kimi K3.1 Pro API pricing",
    "GPT-6.2 vs DeepSeek",
    "Claude 5.2 vs Qwen 4 Max",
    "LLM API cost calculator 2026",
    "Gemini 4 Carbon price increase",
  ],
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
  other: {
    google: "notranslate",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" translate="no" className="notranslate">
      <head>
        <meta name="google" content="notranslate" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){if(typeof Node==="function"&&Node.prototype){var r=Node.prototype.removeChild;Node.prototype.removeChild=function(c){if(c&&c.parentNode!==this){return c;}return r.apply(this,arguments);};var i=Node.prototype.insertBefore;Node.prototype.insertBefore=function(n,ref){if(ref&&ref.parentNode!==this){return n;}return i.apply(this,arguments);};}})();`,
          }}
        />
      </head>
      <body className="notranslate relative flex min-h-screen flex-col bg-[#030712] font-sans text-slate-100">
        <LanguageProvider>
          <AmbientBackground />
          <Navbar />
          <main className="relative z-10 flex-1">{children}</main>
          <Footer />
          <ContactFloatingWidget />
          <DevStatusBadge />
        </LanguageProvider>
        {siteConfig.cloudflareAnalyticsToken ? (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({
              token: siteConfig.cloudflareAnalyticsToken,
            })}
          />
        ) : null}
        {siteConfig.umamiWebsiteId ? (
          <script
            defer
            src="https://cloud.umami.is/script.js"
            data-website-id={siteConfig.umamiWebsiteId}
          />
        ) : null}
        {siteConfig.clarityProjectId ? (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "${siteConfig.clarityProjectId}");`,
            }}
          />
        ) : null}
      </body>
    </html>
  );
}
