import React from 'react';
import Link from 'next/link';

const Sitemap = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-lg sm:text-3xl font-bold text-purple-600 mb-10">Sitemap</h1>

        <div className="flex flex-col md:flex-row gap-16">
          {/* Pages Section */}
          <div>
            <h2 className="text-md sm:text-xl font-semibold text-gray-800 mb-4">Pages</h2>
            <ul className="list-none text-sm sm:text-lg text-gray-700 space-y-2">
              <li>
                <Link href="/" className="text-blue-500 hover:underline">Home</Link>
              </li>
              <li>
                <Link href="/about" className="text-blue-500 hover:underline">About</Link>
              </li>
              <li>
                <Link href="/contact" className="text-blue-500 hover:underline">Contact</Link>
              </li>
              <li>
                <Link href="/terms" className="text-blue-500 hover:underline">Terms of Service</Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-blue-500 hover:underline">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Services Section */}
          <div>
            <h2 className="text-md sm:text-xl font-semibold text-gray-800 mb-4">Services</h2>
            <ul className="list-none text-sm sm:text-lg text-gray-700 space-y-2">
              <li>
                <Link href="/redirect/resume-review" className="text-blue-500 hover:underline">Resume Review</Link>
              </li>
              <li>
                <Link href="/redirect/top-90-dsa-sheet" className="text-blue-500 hover:underline">Top 90 DSA Sheet</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
