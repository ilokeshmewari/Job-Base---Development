import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/Navbar";
import NoticeStrip from "@/components/NoticeStrip";
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function Layout({ children }: { children: React.ReactNode }) {


  return (
    <html lang="en">
      <head>
      </head>
      <body>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <NoticeStrip />
          <main className="flex-grow container mx-auto p-4">{children}</main>
          <Footer />
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
