"use client";

import Image from "next/image";
import Link from "next/link";
import { Info } from "lucide-react";

export default function AdBanner() {
  return (
    <div className="relative bg-gray-100 p-6 flex flex-col h-full justify-around items-center text-center w-full mx-auto rounded-md shadow">
      {/* Sponsored Label */}
      <div className="absolute top-2 right-2 flex items-center text-xs text-gray-600">
        <Info className="w-3 h-3 mr-1 text-black" />
        <span className="text-black">Sponsored</span>
      </div>

      {/* Logo */}
      <Image
        src="https://bikasjfxwokxjqwledqb.supabase.co/storage/v1/object/public/codeews/logo.png"
        alt="MakeYouCode Logo"
        width={250}
        height={250}
        unoptimized
      />

      {/* Description */}
      <p className="text-xl text-gray-700 mt-2 text-left">
        Learn DSA, Web Development, Competitive Programming,  
        prepare for placements, practice coding, and get certified!
        <br />
        An all-in-one platform for beginners.
      </p>

      {/* Visit Button */}
      <Link
        href="https://makeyoucode.tech"
        target="_blank"
        className="mt-4 bg-[#EB5B00] hover:bg-orange-500 text-white font-semibold px-5 py-2 rounded-full shadow-md transition"
      >
        Visit MakeYouCode
      </Link>
    </div>
  );
}
