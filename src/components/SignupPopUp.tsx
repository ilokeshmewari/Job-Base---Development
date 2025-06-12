'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Gift, BookOpen, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PromotionalPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      const session = data?.session;

      if (!session) {
        setTimeout(() => {
          setShowPopup(true);
        }, 3000);
      }
    };
    checkAuth();
  }, []);

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-200 w-full max-w-md p-6 rounded-2xl shadow-lg relative text-center animate-slideInUp">
       

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Unlock Free Resources</h2>

        {/* Features */}
        <div className="space-y-3 text-sm text-gray-700 mb-5">
          <div className="flex items-center gap-3">
            <Gift className="text-purple-600 w-5 h-5" />
            <span>Claim Free Resume Review</span>
          </div>
          <div className="flex items-center gap-3">
            <BookOpen className="text-indigo-600 w-5 h-5" />
            <span>Get Study & Prep Materials</span>
          </div>
          <div className="flex items-center gap-3">
            <FileText className="text-pink-500 w-5 h-5" />
            <span>ATS-Friendly Resume</span>
          </div>
        </div>

        {/* Sign Up Button */}
        <button
          onClick={() => router.push('/auth')}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-full font-medium hover:scale-105 hover:shadow-lg transition-transform duration-300"
        >
          Sign Up to Claim
        </button>

        {/* Not Now Button */}
        <button
          onClick={() => setShowPopup(false)}
          className="mt-3 text-sm text-gray-500 hover:text-gray-700 transition"
        >
          Not Now
        </button>
      </div>
    </div>
  );
}
