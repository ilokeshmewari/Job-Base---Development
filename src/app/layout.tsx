import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Script from "next/script"; // ✅ Import Next.js Script component

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Job Base</title>
        <meta name="monetag" content="bf541f80b3e644fc4b770690cbffe5e2" />
      </head>
      <body>
        {/* ✅ Correct way to add scripts in Next.js */}
        <Script
          src="https://cmp.gatekeeperconsent.com/min.js"
          data-cfasync="false"
          strategy="afterInteractive"
        />
        <Script
          src="https://the.gatekeeperconsent.com/cmp.min.js"
          data-cfasync="false"
          strategy="afterInteractive"
        />
        <Script
          async
          src="//www.ezojs.com/ezoic/sa.min.js"
          strategy="afterInteractive"
        />
        <Script id="ezstandalone">
          {`
            window.ezstandalone = window.ezstandalone || {};
            ezstandalone.cmd = ezstandalone.cmd || [];
          `}
        </Script>
        <Script
          async
          src="https://js.wpadmngr.com/static/adManager.js"
          data-admpid="295943"
          strategy="afterInteractive"
        />
        <Script
          src="https://kulroakonsu.net/88/tag.min.js"
          data-zone="132627"
          async
          data-cfasync="false"
          strategy="afterInteractive"
        />

        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto p-4">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
