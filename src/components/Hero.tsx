'use client';

import { useEffect, useState } from 'react';
import {
  Users,
  BadgeCheck,
  Bell,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  MessageCircleMore,
  Send,
} from 'lucide-react';

export default function HeroSection() {
  const TARGET_MEMBERS = 2000;
  const TARGET_PLACED = 150;

  const [membersCount, setMembersCount] = useState(20);
  const [placedCount, setPlacedCount] = useState(13);

  useEffect(() => {
    const memStep = Math.ceil(TARGET_MEMBERS / 100);
    const memInterval = setInterval(() => {
      setMembersCount(c => {
        if (c + memStep >= TARGET_MEMBERS) {
          clearInterval(memInterval);
          return TARGET_MEMBERS;
        }
        return c + memStep;
      });
    }, 10);

    const plcStep = Math.ceil(TARGET_PLACED / 60);
    const plcInterval = setInterval(() => {
      setPlacedCount(c => {
        if (c + plcStep >= TARGET_PLACED) {
          clearInterval(plcInterval);
          return TARGET_PLACED;
        }
        return c + plcStep;
      });
    }, 15);

    return () => {
      clearInterval(memInterval);
      clearInterval(plcInterval);
    };
  }, []);

  return (
    <section className="bg-[#f9fbfc] py-7 sm:py-16 px-4 text-center">
      <h2 className="text-4xl font-bold text-black mb-4">
        Join Our Growing Community
      </h2>
      <p className="text-gray-600 max-w-xl mx-auto mb-12">
        We connect students with their dream jobs through personalized hiring alerts and career support
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <div className="flex justify-center items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
              <Users className="text-indigo-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-black">{membersCount.toLocaleString()}+</h3>
          <p className="text-gray-600 mt-1">Active Community Members</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <div className="flex justify-center items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
              <BadgeCheck className="text-green-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-black">{placedCount}+</h3>
          <p className="text-gray-600 mt-1">Students Successfully Placed</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6 border">
          <div className="flex justify-center items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Bell className="text-purple-600" />
            </div>
          </div>
          <h3 className="text-lg font-bold text-black">Personalized Hiring Alerts</h3>
          <p className="text-gray-600 mt-1">Get notified about opportunities that match your skills</p>
        </div>
      </div>

      {/* Social Icons */}
      <div className="flex justify-center gap-5 mt-4 flex-wrap">
        <a href="https://instagram.com/jobbase02" target="_blank" rel="noopener noreferrer">
          <Instagram className="w-6 h-6 text-pink-500 hover:text-pink-600" />
        </a>
        <a href="https://linkedin.com/company/job-base-25" target="_blank" rel="noopener noreferrer">
          <Linkedin className="w-6 h-6 text-blue-700 hover:text-blue-800" />
        </a>
        <a href="https://youtube.com/@jobbase25" target="_blank" rel="noopener noreferrer">
          <Youtube className="w-6 h-6 text-red-600 hover:text-red-700" />
        </a>
        <a href="https://x.com/jobbase02" target="_blank" rel="noopener noreferrer">
          <Twitter className="w-6 h-6 text-black hover:text-gray-800" />
        </a>
        <a href="https://chat.whatsapp.com/DXZJsmey0UlCqVdD2ztEbK" target="_blank" rel="noopener noreferrer">
          <MessageCircleMore className="w-6 h-6 text-green-500 hover:text-green-600" />
        </a>
        <a href="https://t.me/jobbase_25" target="_blank" rel="noopener noreferrer">
          <Send className="w-6 h-6 text-sky-500 hover:text-sky-600" />
        </a>
      </div>
    </section>
  );
}
