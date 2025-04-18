"use client";

import { useEffect, useState } from "react";

export default function AdComponent() {
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
        script2.onload = () => setIsLoading(false); // Hide loading when script loads
        document.getElementById("ad-container")?.appendChild(script2);

        return () => {
            document.head.removeChild(script1);
            document.getElementById("ad-container")?.removeChild(script2);
        };
    }, []);

    return (
        <div className="bg-black/70 flex items-center justify-center p-4">
            <div className="relative bg-white shadow-lg border border-gray-300 rounded-lg w-[300px] h-[250px] flex items-center justify-center">
                {/* Small "Ads by Adsterra" text */}
                <p className="absolute top-2 left-2 text-[10px] text-white">Ads by Adsterra Network</p>

                {/* Ad Content or Loading Placeholder */}
                <div id="ad-container" className="w-full h-full flex items-center justify-center">
                    {isLoading ? (
                        <p className="text-gray-500 text-sm">Loading ad...</p>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
