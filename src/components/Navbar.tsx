"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase"; // Adjust path as needed
import {
  Instagram,
  Youtube,
  Linkedin,
  Twitter,
  Menu,
  X,
  User,
} from "lucide-react";

export default function Navbar() {
  const router = useRouter();
  const [backdropVisible, setBackdropVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Jobs", path: "/see-all-jobs" },
    { name: "Blogs", path: "/blogs" },
    { name: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    // Check Supabase session
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsLoggedIn(!!session);
    };
    checkAuth();

    // Optional: Listen for auth changes (login/logout)
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      checkAuth();
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const openMenu = () => {
    setBackdropVisible(true);
    setTimeout(() => setMenuVisible(true), 100);
  };

  const closeMenu = () => {
    setMenuVisible(false);
    setTimeout(() => setBackdropVisible(false), 200);
  };

  return (
    <nav className="w-full border-b bg-white shadow-sm z-50">
      {/* Top Bar */}
      <div className="flex justify-between items-center px-4 py-3 sm:px-16 sm:py-4">
        {/* Logo */}
        <div
          className="flex items-center justify-center cursor-pointer"
          onClick={() => router.push("/")}
        >
          <img src="/logo-ani1.gif" alt="Jobbase Logo" className="h-[34px]" />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => router.push(link.path)}
              className="text-gray-700 hover:text-black text-sm font-medium"
            >
              {link.name}
            </button>
          ))}

          {isLoggedIn && (
            <button
              onClick={() => router.push("/dashboard")}
              className="text-gray-700 hover:text-black text-sm font-medium flex items-center gap-1"
            >
              <User className="w-4 h-4" /> Profile
            </button>
          )}

          <div className="flex items-center gap-3 ml-4">
            <a href="https://instagram.com/jobbase02" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-5 h-5 text-gray-700 hover:text-black" />
            </a>
            <a href="https://youtube.com/@jobbase25" target="_blank" rel="noopener noreferrer">
              <Youtube className="w-5 h-5 text-gray-700 hover:text-black" />
            </a>
            <a href="https://linkedin.com/company/job-base-25" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-5 h-5 text-gray-700 hover:text-black" />
            </a>
            <a href="https://x.com/jobbase02" target="_blank" rel="noopener noreferrer">
              <Twitter className="w-5 h-5 text-gray-700 hover:text-black" />
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={openMenu}>
            <Menu className="w-8 h-8 text-black" />
          </button>
        </div>
      </div>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 transition-transform duration-300 ease-in-out transform ${
          backdropVisible ? "translate-x-0" : "translate-x-full"
        } bg-black bg-opacity-50`}
        onClick={closeMenu}
      ></div>

      {/* Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-[70%] sm:w-[300px] bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          menuVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 py-4 border-b">
          <div className="font-semibold text-lg">Menu</div>
          <button onClick={closeMenu}>
            <X className="w-6 h-6 text-black" />
          </button>
        </div>

        <div className="flex flex-col px-4 py-4 gap-4">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => {
                closeMenu();
                router.push(link.path);
              }}
              className="text-gray-700 hover:text-black text-base text-left"
            >
              {link.name}
            </button>
          ))}

          {isLoggedIn && (
            <button
              onClick={() => {
                closeMenu();
                router.push("/dashboard");
              }}
              className="text-gray-700 hover:text-black text-base text-left flex items-center gap-1"
            >
              <User className="w-4 h-4" /> Profile
            </button>
          )}

          <div className="flex items-center gap-4 mt-4">
            <a href="https://instagram.com/jobbase02" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-5 h-5 text-gray-700 hover:text-black" />
            </a>
            <a href="https://youtube.com/@jobbase25" target="_blank" rel="noopener noreferrer">
              <Youtube className="w-5 h-5 text-gray-700 hover:text-black" />
            </a>
            <a href="https://linkedin.com/company/job-base-25" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-5 h-5 text-gray-700 hover:text-black" />
            </a>
            <a href="https://x.com/jobbase02" target="_blank" rel="noopener noreferrer">
              <Twitter className="w-5 h-5 text-gray-700 hover:text-black" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
