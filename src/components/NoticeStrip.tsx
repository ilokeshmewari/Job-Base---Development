// components/InternshipStrip.js
import React from 'react';

const InternshipStrip = () => {
  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2">
        <p className="text-sm sm:text-base font-medium text-left">
        Stay updated with the latest in tech.
        </p>
        <a
          href="/blogs"
          target="_self"
          rel="noopener noreferrer"
          className="text-sm sm:text-base bg-white text-purple-700 font-semibold px-4 py-2 rounded hover:bg-purple-100 transition whitespace-nowrap"
        >
          Read Now
        </a>
      </div>
    </div>
  );
};

export default InternshipStrip;
