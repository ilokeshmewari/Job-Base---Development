"use client";

import { useEffect, useRef } from "react";

const AdsterraAd = () => {
  const adContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!adContainerRef.current) return;

    // Clear previous content to avoid duplicate ads
    adContainerRef.current.innerHTML = "";

    // Define Adsterra ad options globally
    Object.assign(globalThis, {
      atOptions: {
        key: "95355a1f3c92fe766c0d6e69ebddb093",
        format: "iframe",
        height: 50,
        width: 320,
        params: {},
      },
    });

    // Create script element
    const script = document.createElement("script");
    script.src = "//www.highperformanceformat.com/95355a1f3c92fe766c0d6e69ebddb093/invoke.js";
    script.async = true;
    script.type = "text/javascript";

    // Append the script inside the ad container
    adContainerRef.current.appendChild(script);

    return () => {
      if (adContainerRef.current) {
        adContainerRef.current.innerHTML = ""; // Cleanup when component unmounts
      }
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
