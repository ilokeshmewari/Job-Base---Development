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
import Link from 'next/link';

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

  const socialLinks = [
    {
      icon: <Instagram className="w-5 h-5 mr-1" />,
      label: 'Instagram',
      url: 'https://instagram.com/jobbase02',
      color: 'text-pink-500',
    },
    {
      icon: <Linkedin className="w-5 h-5 mr-1" />,
      label: 'LinkedIn',
      url: 'https://linkedin.com/company/job-base-25',
      color: 'text-blue-700',
    },
    {
      icon: <Youtube className="w-5 h-5 mr-1" />,
      label: 'YouTube',
      url: 'https://youtube.com/@jobbase25',
      color: 'text-red-600',
    },
    {
      icon: <Twitter className="w-5 h-5 mr-1" />,
      label: 'Twitter',
      url: 'https://x.com/jobbase02',
      color: 'text-black',
    },
    {
      icon: <MessageCircleMore className="w-5 h-5 mr-1" />,
      label: 'WhatsApp',
      url: 'https://chat.whatsapp.com/HpM7OdWPlTs0A8Sm913WKF',
      color: 'text-green-500',
    },
    {
      icon: <Send className="w-5 h-5 mr-1" />,
      label: 'Telegram',
      url: 'https://t.me/jobbase_25',
      color: 'text-sky-500',
    },
  ];

  return (
    <section className="bg-[#f9fbfc] py-7 sm:py-16 px-4 text-center">
      <h2 className="text-4xl font-bold text-black mb-4">Join Jobbase Community</h2>
      <p className="text-gray-600 max-w-xl mx-auto mb-6">
        We connect students with their dream jobs through personalized hiring alerts and career support
      </p>

      <Link href="/auth">
        <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300 mb-10">
          Join Now
        </button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-10">
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
          <p className="text-gray-600 mt-1">
            Get notified about opportunities that match your skills
          </p>
        </div>
      </div>

      <div className="relative w-full bg-white py-3 border-t border-b overflow-hidden h-14">
  {/* Left Fade */}
  <div className="absolute left-[-2rem] top-0 h-full w-10 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />

  {/* Right Fade */}
  <div className="absolute right-[-2rem] top-0 h-full w-10 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

  {/* Moving Strip */}
  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pingPong flex gap-10 whitespace-nowrap z-0">
    {socialLinks.map((item, idx) => (
      <a
        key={idx}
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`flex items-center gap-1 ${item.color} text-sm font-medium hover:underline`}
      >
        {item.icon}
        {item.label}
      </a>
    ))}
  </div>

  {/* Animation */}
  <style jsx>{`
    @keyframes pingPong {
      0% {
        transform: translateX(-50%) translateY(-50%);
      }
      25% {
        transform: translateX(-60%) translateY(-50%);
      }
      50% {
        transform: translateX(-40%) translateY(-50%);
      }
      75% {
        transform: translateX(-60%) translateY(-50%);
      }
      100% {
        transform: translateX(-50%) translateY(-50%);
      }
    }
    .animate-pingPong {
      animation: pingPong 14s ease-in-out infinite;
    }
  `}</style>
</div>

    </section>
  );
}
