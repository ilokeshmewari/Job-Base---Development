"use client";

import { useState, useEffect } from "react";

const VideoAdPopup = () => {
  const [isOpen, setIsOpen] = useState(true); // Popup starts open
  const [showClose, setShowClose] = useState(false); // Close button hidden initially

  useEffect(() => {
    // Show the close button after 5 seconds
    const timer = setTimeout(() => {
      setShowClose(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div id="video-ad-popup" className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative bg-white p-4 rounded-lg shadow-lg w-96">
            {/* Conditional Close Button (Appears after 5s) */}
            {showClose && (
              <button
                className="absolute top-2 right-3 text-2xl font-bold text-gray-600 hover:text-gray-900"
                onClick={closePopup}
              >
                &times;
              </button>
            )}

            {/* Video Content */}
            <video className="w-full rounded-lg" controls autoPlay>
              <source src="/your-video-ad.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoAdPopup;
