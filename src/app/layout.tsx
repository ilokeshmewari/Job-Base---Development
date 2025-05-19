import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/Navbar";
import NoticeStrip from "@/components/NoticeStrip";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import NewsletterSection from "@/components/Newsletter";
import Script from "next/script";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JobBase | Get Your Dream Job at jobbase.site",
  description: "Discover your next opportunity with JobBase. Visit jobbase.site to get your dream job today.",
  keywords: ["jobbase", "jobbase.site", "jobbase.in", "get your dream job"],
  metadataBase: new URL("https://jobbase.site"),
  openGraph: {
    title: "JobBase | Get Your Dream Job",
    description: "Explore job opportunities and land your dream job at jobbase.site",
    url: "https://jobbase.site",
    siteName: "JobBase",
    type: "website",
    images: [
      {
        url: "/jobbase.png",
        width: 1200,
        height: 630,
        alt: "JobBase"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "JobBase | Get Your Dream Job",
    description: "Explore jobbase.site and get your dream job today.",
    images: ["/jobbase-og-image.png"]
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "JobBase",
              "url": "https://jobbase.site",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://jobbase.site/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <NoticeStrip />
          <main className="flex-grow container mx-auto p-4">{children}</main>
          <NewsletterSection />
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
