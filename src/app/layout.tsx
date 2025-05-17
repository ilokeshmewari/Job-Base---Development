import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/Navbar";
import NoticeStrip from "@/components/NoticeStrip";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import NewsletterSection from "@/components/Newsletter";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Job Base Community {`-`} Helping You Land Your Dream Job</title>

        <meta name="38b9a9cdc118707cf5b1a41144b3e3bb385dea7a" content="38b9a9cdc118707cf5b1a41144b3e3bb385dea7a" />
        <meta name="referrer" content="no-referrer-when-downgrade" />

         <script src="https://imasdk.googleapis.com/js/sdkloader/ima3.js" async></script>
      
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
