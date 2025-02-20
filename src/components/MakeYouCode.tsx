"use client";

import Image from "next/image";
import Link from "next/link";

export default function AdBanner() {
  return (
    <div className="bg-white p-6 flex flex-col h-full justify-around items-center text-center w-full mx-auto">
      {/* Logo */}
      <Image
        src="https://bikasjfxwokxjqwledqb.supabase.co/storage/v1/object/public/codeews/logo.png"
        alt="MakeYouCode Logo"
        width={104}
        height={104}
        unoptimized
      />

      {/* Description */}
      <h1 className="text-2xl font-bold text-blue-900 mt-4">MakeYouCode</h1>
      <p className="text-sm text-gray-700 mt-2">
        Learn, Practice, and Master Coding with DSA & Competitive Programming.
      </p>

      {/* Visit Button */}
      <Link
        href="https://makeyoucode.tech"
        target="_blank"
        className="mt-4 bg-[#EB5B00] hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-full shadow-md transition"
      >
        Visit MakeYouCode
      </Link>
    </div>
  );
}
