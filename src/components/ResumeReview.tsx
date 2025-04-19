"use client";

import Link from "next/link";

export default function ResumeReview() {
  return (
    <div className="relative bg-gradient-to-br from-purple-50 to-white border border-purple-200 rounded-2xl shadow-sm p-6 my-8 max-w-md mx-auto text-center">
      {/* Promo Badge */}
      <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-pink-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
        LIMITED TIME OFFER
      </div>

      {/* Main CTA */}
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        Boost Your Chances with a Pro Review!
      </h2>

      <p className="text-sm text-gray-600 mb-4">
        Get expert feedback on your resume and stand out from the crowd.
      </p>

      <Link href="https://topmate.io/ilokeshmewari/1473678">
        <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300">
          Get Resume Review
        </button>
      </Link>

      <p className="text-xs text-gray-500 mt-3 italic">
        ✨ Free for first-time users only. Don{`'`}t miss out!
      </p>
    </div>
  );
}
