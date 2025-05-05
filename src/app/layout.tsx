import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/Navbar";
import NoticeStrip from "@/components/NoticeStrip";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import NewsletterSection from "@/components/Newsletter";
import Script from "next/script"; // Import Next.js Script component

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Job Base Community {`-`} Helping You Land Your Dream Job</title>

        {/* Botpress Webchat Scripts using Next.js Script component */}
        <Script
          type="text/javascript"
          src="https://cdn.botpress.cloud/webchat/v2.4/inject.js"
          strategy="afterInteractive"
          id="botp" // Ensures the script is loaded after the page is interactive
        />
        <Script
          type="text/javascript"
          src="https://files.bpcontent.cloud/2025/05/05/10/20250505103317-TS6C1HVN.js"
          strategy="afterInteractive"
          id="botp-two" // Ensures the script is loaded after the page is interactive
        />

        {/* Botpress Webchat Initialization Script using Next.js Script component */}
        <Script
          strategy="afterInteractive" // Ensures the script runs after the page is interactive
          dangerouslySetInnerHTML={{
            __html: `
              window.botpressWebChat.init({
                botId: 'TS6C1HVN', // Replace with your bot ID if needed
                hostUrl: 'https://cdn.botpress.cloud', // Your Botpress Cloud URL
                // You can add more configurations here (like colors, title, etc.)
              });
            `,
          }}
        />
      </head>
      <body>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <NoticeStrip />
          <main className="flex-grow container mx-auto p-4">
            {children} {/* Render child components here */}
          </main>
          <NewsletterSection />
          <Footer />
        </div>

        {/* Botpress Webchat Container */}
        <div id="botpress-webchat"></div>

        <Analytics /> {/* Analytics Component */}
        <SpeedInsights /> {/* Speed Insights Component */}
      </body>
    </html>
  );
}
