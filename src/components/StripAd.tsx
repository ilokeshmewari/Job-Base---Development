import { useEffect, useRef } from "react";

const StripAd = () => {
  const adContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!adContainerRef.current) return;

    console.log("Initializing Adsterra Ad...");

    // Clear previous ad content
    adContainerRef.current.innerHTML = "";

    // Define global Adsterra options
    Object.assign(globalThis, {
      atOptions: {
        key: "e3ec45e1fd85b4d25b74ccf9c7f21620",
        format: "iframe",
        height: 90,
        width: 728,
        params: {},
      },
    });

    // Create script element
    const script = document.createElement("script");
    script.src = "//www.highperformanceformat.com/e3ec45e1fd85b4d25b74ccf9c7f21620/invoke.js";
    script.async = true;
    script.type = "text/javascript";

    // Inject script into the ad container
    adContainerRef.current.appendChild(script);

    return () => {
      console.log("Removing Adsterra script...");
      if (adContainerRef.current) {
        adContainerRef.current.innerHTML = ""; // Cleanup on unmount
      }
    };
  });

  return (
    <div className="relative flex justify-center items-center my-4">

      {/* Ad Container */}
      <div
        ref={adContainerRef}
        className="w-[728px] h-[90px] bg-gray-200 flex justify-center items-center"
      ></div>
    </div>
  );
};

export default StripAd;
