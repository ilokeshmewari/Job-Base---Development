"use client"
import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return (
    <html>
      <head><title>Job Base</title>
        <script async src="https://js.wpadmngr.com/static/adManager.js" data-admpid="295943"></script>
        <script>
        importScripts('https://sw.wpushorg.com/ps/sw.js');
        </script>
      </head>
      <body>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto p-4">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
