"use client";

import { useRouter } from "next/navigation";
import { Instagram, Youtube, Linkedin, Twitter } from "lucide-react";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="flex justify-between items-center px-4 py-2 sm:px-16 sm:py-4 border-b bg-white shadow-sm">
      <div
        className="flex items-center justify-center cursor-pointer"
        onClick={() => router.push("/")}
      >
        {/**<div className="text-xl flex items-center justify-center font-bold cursor-pointer" onClick={() => router.push("/")}> 
        JOB BASE<span className="text-green-500 text-4xl relative bottom-[5px]">.</span>
      </div> */}
        <img
          src="/logo-ani1.gif"
          alt="Job Base Logo"
          className="h-[30px]" // Adjust the height as needed
        />
      </div>
      <div className="flex items-center gap-4">
        <a
          href="https://instagram.com/jobbase02"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram className="w-6 h-6 text-gray-700 hover:text-gray-900" />
        </a>
        <a
          href="https://youtube.com/@jobbase25"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Youtube className="w-6 h-6 text-gray-700 hover:text-gray-900" />
        </a>
        <a
          href="https://linkedin.com/company/job-base-25"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Linkedin className="w-6 h-6 text-gray-700 hover:text-gray-900" />
        </a>
        <a
          href="https://x.com/jobbase02"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter className="w-6 h-6 text-gray-700 hover:text-gray-900" />
        </a>
      </div>
    </nav>
  );
}
