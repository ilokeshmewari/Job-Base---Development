"use client";

import { useEffect, useRef } from "react";

const AdsterraAd = () => {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!adContainerRef.current) return;

    // Clear previous content
    adContainerRef.current.innerHTML = "";

    // Define atOptions globally
    (globalThis as any).atOptions = {
      key: "95355a1f3c92fe766c0d6e69ebddb093",
      format: "iframe",
      height: 50,
      width: 320,
      params: {},
    };

    // Create script element
    const script = document.createElement("script");
    script.src = "//www.highperformanceformat.com/95355a1f3c92fe766c0d6e69ebddb093/invoke.js";
    script.async = true;
    script.type = "text/javascript";

    // Append script inside the ad container
    adContainerRef.current.appendChild(script);

    return () => {
      adContainerRef.current && (adContainerRef.current.innerHTML = "");
    };
  }, []);

  return (
    <div className="flex justify-center items-center my-4">
      {/* Ad Container (Adsterra Ad will load here) */}
      <div
        ref={adContainerRef}
        className="w-[320px] h-[50px] flex justify-center items-center bg-gray-200"
      ></div>
    </div>
  );
};

export default AdsterraAd;
