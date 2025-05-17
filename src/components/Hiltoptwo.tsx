'use client';

import { useEffect, useState } from 'react';

export default function AdScript2() {
  const [visible, setVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // Show ad after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Load ad script when ad becomes visible
  useEffect(() => {
    if (!visible) return;

    const container = document.getElementById('my-ad-container');
    if (!container) return;

    container.innerHTML = '';
    const script = document.createElement('script');
    script.src =
      '//fresh-kind.com/bvX.VHsUdZG/lz0_YdWYcF/FePmQ9ZuxZHUMlDk/PQT/Y/z/N/ThYp2sN/j/MTtYNzjQMX1FNyjuYe2INAAt';
    script.async = true;
    script.referrerPolicy = 'no-referrer-when-downgrade';
    container.appendChild(script);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="fixed left-0 w-full flex justify-center z-50 sm:hidden transition-all duration-500 ease-in-out"
      style={{
        bottom: collapsed ? -140 : 0, // Moves down when collapsed
      }}
    >
      <div
        className="relative w-full max-w-md bg-white border border-gray-300 shadow-md transition-all duration-300"
        style={{ height: 140 }}
      >
        {/* Collapse Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute bg-gray-100 border border-gray-300 rounded-sm p-2 shadow-sm z-10"
          aria-label={collapsed ? 'Expand ad' : 'Collapse ad'}
        >
          <svg
            className={`w-4 h-4 text-gray-700 transform transition-transform duration-300 ${
              collapsed ? '' : 'rotate-120'
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* Ad container with reduced padding */}
        <div
          id="my-ad-container"
          className="w-full h-full flex justify-center items-center px-2 py-1"
        />
      </div>
    </div>
  );
}
