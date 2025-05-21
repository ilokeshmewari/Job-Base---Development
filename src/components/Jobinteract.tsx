'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { FaRegHeart, FaHeart, FaBell } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { User } from '@supabase/supabase-js';

type JobInteractionProps = {
  slug: string;
};

type ToastType = 'success' | 'error' | 'login';

export default function JobInteractionStrip({ slug }: JobInteractionProps) {
  const router = useRouter();


  const [user, setUser] = useState<User | null>(null);
  const [upvoted, setUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(0);
  const [loading, setLoading] = useState({ upvote: false, alert: false });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [skillsInput, setSkillsInput] = useState('');
  const [toast, setToast] = useState<{ message: string, type: ToastType, show: boolean }>({ message: '', type: 'success', show: false });

  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data: upvoteData } = await supabase
          .from('upvotes')
          .select('*')
          .eq('slug', slug)
          .eq('user_id', user.id)
          .single();

        setUpvoted(!!upvoteData);

        const { count } = await supabase
          .from('upvotes')
          .select('*', { count: 'exact' })
          .eq('slug', slug);

        setUpvoteCount(count || 0);
      }
    };

    checkAuth();
  }, [slug]);

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type, show: true });
    setTimeout(() => setToast({ ...toast, show: false }), 4000);
  };

  const handleUpvote = async () => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }

    setLoading(prev => ({ ...prev, upvote: true }));

    try {
      if (upvoted) {
        await supabase
          .from('upvotes')
          .delete()
          .eq('slug', slug)
          .eq('user_id', user.id);

        setUpvoteCount(prev => prev - 1);
      } else {
        await supabase
          .from('upvotes')
          .insert({ slug, user_id: user.id });

        setUpvoteCount(prev => prev + 1);
      }

      setUpvoted(!upvoted);
    } catch (error) {
      console.error('Error updating upvote:', error);
      showToast('Something went wrong while upvoting.', 'error');
    } finally {
      setLoading(prev => ({ ...prev, upvote: false }));
    }
  };

  const handleRequestAlert = () => {
    if (!user) {
      setShowLoginPrompt(true);
      return;
    }
    setModalIsOpen(true);
  };

  const submitJobAlert = async () => {
  if (!skillsInput.trim() || !user) return;

  setLoading(prev => ({ ...prev, alert: true }));

  try {
    await supabase
      .from('job_alerts')
      .insert({
        user_id: user.id,
        user_email: user.email,
        skills: skillsInput,
        slug
      });

    setModalIsOpen(false);
    setSkillsInput('');
    showToast('Job alert request submitted successfully!', 'success');
  } catch (error) {
    console.error('Error submitting job alert:', error);
    showToast('Failed to submit job alert.', 'error');
  } finally {
    setLoading(prev => ({ ...prev, alert: false }));
  }
};

  const confirmLoginRedirect = () => {
    router.push('/auth');
  };

  return (
    <>
      {/* Toast */}
      {toast.show && (
        <div className={`fixed top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 rounded-md shadow-md z-[1001] ${
          toast.type === 'success' ? 'bg-green-500 text-white' :
          toast.type === 'error' ? 'bg-red-500 text-white' : ''
        }`}>
          {toast.message}
        </div>
      )}

      {/* Login Prompt Toast */}
      {showLoginPrompt && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-purple-50 border border-purple-500 text-purple-950 px-4 py-3 rounded-md z-[1001] shadow-md">
          <p className="mb-2">You need to login to perform this action.</p>
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => {
                confirmLoginRedirect();
                setShowLoginPrompt(false);
              }}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              OK
            </button>
            <button
              onClick={() => setShowLoginPrompt(false)}
              className="px-3 py-1 border border-gray-400 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Interaction Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200  p-4 z-10 md:relative md:rounded-lg md:border">
        <div className="flex justify-between items-center">
          <button
            onClick={handleUpvote}
            disabled={loading.upvote}
            className={`flex items-center gap-2 px-4 py-2 rounded-full ${upvoted ? 'text-red-500' : 'text-gray-600'} hover:bg-gray-100 transition-colors`}
          >
            {upvoted ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
            {upvoteCount > 0 && <span>{upvoteCount}</span>}
          </button>

          <button
            onClick={handleRequestAlert}
            disabled={loading.alert}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            <FaBell />
            <span>Request Job Alerts</span>
          </button>
        </div>
      </div>

      {/* Custom Modal */}
      {modalIsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl mx-4">
            <h2 className="text-xl font-bold mb-4">Request Job Alerts</h2>
            <p className="mb-4 text-sm text-gray-600">Tell us about your skills and expertise to receive matching job alerts:</p>

            <textarea
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              rows={5}
              placeholder="Example: React, Node.js, 5 years experience, looking for remote work..."
            />

            <div className="flex flex-col gap-3">
              <button
                onClick={submitJobAlert}
                disabled={loading.alert || !skillsInput.trim()}
                className="w-full py-2 text-white rounded-lg bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 disabled:opacity-50"
              >
                {loading.alert ? 'Submitting...' : 'Submit'}
              </button>

              <button
                onClick={() => setModalIsOpen(false)}
                className="w-full py-2 border border-gray-300 text-gray-800 rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
