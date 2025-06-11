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
         {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-DMVB1865TW"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){(window.dataLayer || []).push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DMVB1865TW');
          `}
        </Script>
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

           <Script
          id="pushalert"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(d, t) {
                var g = d.createElement(t),
                    s = d.getElementsByTagName(t)[0];
                g.src = "https://cdn.pushalert.co/integrate_5417fc1b6ed47b84d35fd95cecc12ee7.js";
                s.parentNode.insertBefore(g, s);
              }(document, "script"));
            `,
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
