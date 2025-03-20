import { useEffect, useRef, useState } from "react";

const StripAd = () => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const [isAdVisible, setIsAdVisible] = useState(true);

  useEffect(() => {
    if (!isAdVisible) return; // Don't load the ad if closed

    console.log("Initializing Adsterra Ad...");

    // Define atOptions globally
    (globalThis as any).atOptions = {
      key: "e3ec45e1fd85b4d25b74ccf9c7f21620",
      format: "iframe",
      height: 90,
      width: 728,
      params: {},
    };

    // Create script element
    const script = document.createElement("script");
    script.src = "//www.highperformanceformat.com/e3ec45e1fd85b4d25b74ccf9c7f21620/invoke.js";
    script.async = true;
    script.type = "text/javascript";

    // Inject the script into the component instead of <body>
    if (adContainerRef.current) {
      adContainerRef.current.appendChild(script);
    }

    return () => {
      console.log("Removing Adsterra script...");
      if (adContainerRef.current) {
        adContainerRef.current.innerHTML = ""; // Clean up ad container
      }
    };
  }, [isAdVisible]);

  // Close ad function
  const closeAd = () => {
    setIsAdVisible(false);
  };

  if (!isAdVisible) return null; // Hide ad if closed

  return (
    <div className="relative flex justify-center items-center my-4">
      {/* Close Button */}
      <button
        onClick={closeAd}
        className="absolute top-0 right-14 bg-black/20 text-white px-1 py-1 text-[8px] rounded-full"
      >
        ✖
      </button>

      {/* Ad Container */}
      <div
        ref={adContainerRef}
        className="w-[728px] h-[90px] bg-gray-200 flex justify-center items-center"
      ></div>
    </div>
  );
};

export default StripAd;
