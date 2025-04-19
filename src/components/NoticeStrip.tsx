import React from "react";

const NoticeStrip = () => {
  return (
    <div className="w-full bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 text-white py-2 overflow-hidden">
      <div className="whitespace-nowrap animate-marquee px-4">
      Sorry for any inconvenience caused. Our goal is to provide you with the best possible experience on this platform. We are currently working on improvements and have removed ads that may have disrupted your experience. Thank you for your patience and understanding.
      </div>
    </div>
  );
};

export default NoticeStrip;

// Add this to your global CSS (e.g., styles/globals.css or tailwind.config.js via plugin)
// to define the marquee animation
/*
@tailwind base;
@tailwind components;
@tailwind utilities;


*/
