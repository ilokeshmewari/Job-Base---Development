"use client";

import React from 'react';
import { Download } from 'lucide-react';

const Home = () => {
  return (
    <div className="font-sans text-gray-800 px-4 py-10 sm:px-6 lg:px-20">
      {/* YouTube Video Embed Section */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="flex justify-center mb-6">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/A4aQJICI3J8"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Promotional YouTube Video"
            className="rounded-lg shadow-lg"
          ></iframe>
        </div>
      </div>

      {/* DSA Sheet Promotional Section */}
      <div className="relative bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-2xl shadow-sm p-6 my-8 max-w-md mx-auto text-center">
        <div className="rounded-xl p-6 text-center">
          {/* Promo Badge */}
          <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-pink-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
            GET IT FOR FREE
          </div>

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Top 90 DSA Sheet
          </h3>
          <p className="text-base text-gray-700 mb-6">
            Stop doing random problems. Focus on these curated ones to level up efficiently.
          </p>

          <div className="flex justify-center">
            <a href="/DSA_JOBBASE.pdf" download="TOP_90_DSA_PROBLEMS_JOBBASE">
              <button className="flex items-center bg-gradient-to-r from-purple-600 to-indigo-500 text-white py-3 px-8 rounded-full text-lg font-medium transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <Download className="mr-2" size={22} /> Download Now
              </button>
            </a>
          </div>

          <p className="text-xs text-gray-500 mt-3 italic">
            🚀 Get the edge you need for FAANG interviews!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
