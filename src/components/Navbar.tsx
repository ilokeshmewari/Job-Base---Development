"use client";

import { useRouter } from "next/navigation";
{/*import { User } from "lucide-react";*/} // ✅ Import Lucide Profile Icon

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="flex justify-between items-center p-4 border-b bg-white shadow-md">
      <div className="text-xl font-bold cursor-pointer" onClick={() => router.push("/")}>
        JOB BASE<span className="text-green-500 text-4xl">.</span>
      </div>
      <div className="flex items-center gap-4">
        <button className="px-4 py-2 bg-red-600 text-white font-semibold hover:bg-red-500 rounded">Subscribe</button>
        {/* ✅ Circular Profile Icon from Lucide */}
        {/* <div className="px-2 flex justify-center items-center py-2 bg-gray-200 rounded">
        <User
          className="w-6 h-6 text-black cursor-pointer"
          onClick={() => router.push("/profile")}
        />
        </div> */}
      </div>
    </nav>
  );
}
