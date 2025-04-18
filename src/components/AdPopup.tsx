"use client";

import { useEffect, useState } from "react";

export default function AdBanner() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load Adsterra scripts dynamically
    setIsLoading(true);

    const script1 = document.createElement("script");
    script1.type = "text/javascript";
    script1.innerHTML = `
      atOptions = {
        'key': 'af4b52344399872bbac2396d0584e669',
        'format': 'iframe',
        'height': 250,
        'width': 300,
        'params': {}
      };
    `;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "//www.highperformanceformat.com/af4b52344399872bbac2396d0584e669/invoke.js";
    script2.type = "text/javascript";
    script2.async = true;
    script2.onload = () => setIsLoading(false);

    const adContainer = document.getElementById("ad-container");
    if (adContainer) adContainer.appendChild(script2);

    return () => {
      document.head.removeChild(script1);
      if (adContainer) adContainer.removeChild(script2);
    };
  }, []);

  return (
    <div className=" flex flex-col items-center justify-center mx-auto mt-3 mb-3">
      {/* Ad Content */}
      <div id="ad-container" className="w-full h-full flex items-center justify-center">
        {isLoading && (
          <p className="text-sm text-gray-400">Loading ad...</p>
        )}
      </div>
    </div>
  );
}
