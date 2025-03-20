import { useEffect } from "react";
import Script from "next/script";

const NativeBanner = () => {
  useEffect(() => {
    // Ensure the script runs only after the component is mounted
    const script = document.createElement("script");
    script.src = "//pl26170379.effectiveratecpm.com/24dabe765f38887ea3fa8f94c68ac56d/invoke.js";
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex justify-center items-center my-4">
      {/* Ad Container */}
      <div id="container-24dabe765f38887ea3fa8f94c68ac56d" className="w-full max-w-screen-lg"></div>
    </div>
  );
};

export default NativeBanner;
