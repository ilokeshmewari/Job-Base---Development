'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { Session } from '@supabase/supabase-js';
import { User, Gift, BookOpen, FileText } from 'lucide-react';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [showCoupon, setShowCoupon] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      const session: Session | null = data?.session ?? null;

      if (!session) {
        router.push('/');
      } else {
        const email = session.user?.email || '';
        const nameBeforeAt = email.split('@')[0];
        setUsername(nameBeforeAt);
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600 text-md">Checking authentication...</p>
      </div>
    );
  }

  return (
    <div className="min-h-max bg-gray-50">
      <nav className="bg-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center text-gray-700 font-medium">
              {username && <span>Welcome, {username}</span>}
            </div>
            <div className="ml-4 flex items-center md:ml-6 relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className={`p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none ring-2 ring-offset-2 ${
                  showDropdown ? 'ring-blue-500' : 'ring-gray-100'
                }`}
              >
                <User className="h-6 w-6" />
              </button>

              {showDropdown && (
                <div className="origin-top-right absolute right-0 top-1 mt-8 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
                  {username && (
                    <div className="block px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                      {username}
                    </div>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Resume Review Promo */}
          <div className="mt-10 bg-blue-50 border border-blue-300 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Gift className="text-yellow-600 w-5 h-5" />
              <h2 className="text-lg font-bold text-blue-800">Claim Free Resume Review</h2>
            </div>
            <p className="text-sm text-blue-700 mb-4">Get your resume reviewed by experts. Limited-time offer for JobBase members!</p>
            {!showCoupon ? (
              <button
                onClick={() => setShowCoupon(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Claim Offer
              </button>
            ) : (
              <div className="mt-3">
                <p className="text-green-700 font-medium mb-2">Your coupon code: <span className="font-bold">JBMEMBER25</span></p>
                <Link
                  href="/redirect/resume-review"
                  className="inline-block mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Go to Resume Review
                </Link>
              </div>
            )}
          </div>

          {/* Study Material Section */}
          <div className="mt-10 bg-gray-100 border border-gray-300 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="text-gray-800 w-5 h-5" />
              <h2 className="text-lg font-bold text-gray-800">Study Materials</h2>
            </div>
            <div className="space-y-3">
              <a
                href="/Leetcode-JobBase.zip"
                download
                className="block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-center"
              >
                LeetCode Premium Company-wise Questions
              </a>
              <Link
                href="/redirect/top-90-dsa-sheet"
                className="block px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-center"
              >
                Explore Top 90 DSA Questions
              </Link>
            </div>
          </div>

          {/* Resume Template Section */}
          <div className="mt-10 bg-green-50 border border-green-300 rounded-lg p-6 shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-3">
              <FileText className="text-blue-600 w-5 h-5" />
              <h2 className="text-lg font-bold text-green-800">ATS Friendly Resume</h2>
            </div>
            <a
              href="/Jobbase_Simple_Template.pdf"
              download
              className="inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Download Resume Template
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
