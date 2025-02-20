"use client";

import Image from "next/image";
import Link from "next/link";

export default function AdBanner() {
  return (
    <div className="bg-slate-200 p-6 flex flex-col h-full justify-around items-center text-center w-full mx-auto">
      {/* Logo */}
      <Image
        src="https://bikasjfxwokxjqwledqb.supabase.co/storage/v1/object/public/codeews/logo.png"
        alt="MakeYouCode Logo"
        width={250}
        height={250}
        unoptimized
      />

      {/* Description */}
      {/* <h1 className="text-2xl font-bold text-blue-900 mt-4">MakeYouCode</h1> */}
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
