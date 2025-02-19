"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="flex justify-between items-center p-4 border-b bg-white shadow-md">
      <div className="text-xl font-bold cursor-pointer">JOB BASE<span className="text-green-500 text-4xl">.</span></div>
      <div className="flex items-center gap-4">
        <button className="px-4 py-2 bg-gray-200 rounded">Subscribe</button>
        <div
          className="w-8 h-8 bg-red-500 rounded-full cursor-pointer"
          onClick={() => router.push("/profile")}
        ></div>
      </div>
    </nav>
  );
}
