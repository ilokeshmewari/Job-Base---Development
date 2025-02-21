"use client";
import { useEffect } from "react";
import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/B2boWl.js") // Use a local service worker file
        .then((registration) => {
          console.log("Ad Service Worker registered:", registration);
        })
        .catch((error) => {
          console.error("Ad Service Worker registration failed:", error);
        });
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Job Base</title>
        {/* Ad Manager Script */}
        <script
          async
          src="https://js.wpadmngr.com/static/adManager.js"
          data-admpid="295943"
        ></script>
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
