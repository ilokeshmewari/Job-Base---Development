"use client";

import { useState, useEffect } from "react";

export default function AdPopup() {
    const [visible, setVisible] = useState(false);
    const [showClose, setShowClose] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Show ad after 5 seconds on first load
        const firstTimeout = setTimeout(() => {
            setVisible(true);
        }, 5000);

        return () => {
            clearTimeout(firstTimeout);
        };
    }, []);

    useEffect(() => {
        if (visible) {
            // Show close button after 5 seconds
            const closeTimeout = setTimeout(() => {
                setShowClose(true);
            }, 5000);
            return () => clearTimeout(closeTimeout);
        } else {
            setShowClose(false);
        }
    }, [visible]);

    useEffect(() => {
        if (visible) {
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
        }
    }, [visible]);

    if (!visible) return null;

    return (
        <div className="fixed inset-0 md:bottom-5 md:left-5 md:inset-auto bg-black/70 flex items-center justify-center z-50">
            <div className="relative bg-white shadow-lg border border-gray-300 rounded-lg w-[300px] h-[250px] md:w-[300px] md:h-[250px] flex items-center justify-center">
                {/* Small "Ads by Adsterra" text */}
                <p className="absolute top-2 left-2 text-[10px] text-white">Ads by Adsterra Network</p>

                {/* Ad Content or Loading Placeholder */}
                <div id="ad-container" className="w-full h-full flex items-center justify-center">
                    {isLoading ? (
                        <p className="text-gray-500 text-sm">Loading ad...</p>
                    ) : null}
                </div>

                {/* Close Button (Shows After 5 Seconds) */}
                {showClose && (
                    <button
                        onClick={() => setVisible(false)}
                        className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded"
                    >
                        ✕
                    </button>
                )}
            </div>
        </div>
    );
}
