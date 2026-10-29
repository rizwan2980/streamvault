import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmartPopManager } from "@/components/smart-pop-manager";

import { SiteShaderBackground } from "@/components/shader-background";
import { CommandPaletteProvider } from "@/components/command-palette";
import { RegionContextProvider } from "@/components/region-context";
import { getRegions, buildSearchIndex, DEFAULT_REGION_CODE } from "@/lib/data";

const geistSans = Inter({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = JetBrains_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://streamvault.site"),
  title: {
    default: "StreamVault — The Ultimate Streaming Hub | Movies, Anime, TV & Sports",
    template: "%s · StreamVault",
  },
  description:
    "StreamVault is the premier, verified directory for curated high-definition streaming platforms. Instant lightning-fast fuzzy search, multi-region support for 4K movies, anime, live TV, sports, and manga.",
  applicationName: "StreamVault",
  keywords: [
    "streamvault",
    "free movies online",
    "best streaming sites 2026",
    "watch series hd",
    "anime streaming 1080p",
    "live sports streams free",
    "manga online reader",
    "curated streaming directory",
    "fmhy alternative",
    "stream vault pro",
    "verified streaming sites",
  ],
  authors: [{ name: "StreamVault Curators", url: "https://streamvault.site" }],
  creator: "StreamVault Team",
  publisher: "StreamVault Media",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
    ],
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "StreamVault",
    title: "StreamVault — Curated High-Definition Streaming Directory",
    description:
      "Explore hand-tested, verified streaming platforms with fast fuzzy search and regional libraries.",
    url: "https://streamvault.site",
    locale: "en_US",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "StreamVault — The Premier Streaming Directory",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "StreamVault — The Ultimate Curated Streaming Hub",
    description:
      "Handpicked streaming sites for HD movies, anime, manga, live TV, and sports with real-time health checks.",
    images: ["/banner.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "entertainment",
};

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const regions = await getRegions();
  const searchIndex = await buildSearchIndex(DEFAULT_REGION_CODE);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "StreamVault",
    "url": "https://streamvault.site",
    "description": "Curated premium directory of verified streaming resources.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://streamvault.site/?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

      </head>
      <body className="min-h-screen antialiased">
        <SmartPopManager />
        <ThemeProvider>
          <SiteShaderBackground />
          <RegionContextProvider regions={regions} current={DEFAULT_REGION_CODE}>
            <CommandPaletteProvider initialIndex={searchIndex} regions={regions}>
              <div className="relative z-10">
                <Navbar />
                {children}
                <Footer />
              </div>
            </CommandPaletteProvider>
          </RegionContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
