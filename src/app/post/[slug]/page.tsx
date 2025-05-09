'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function RedirectPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [error, setError] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number>(5);

  useEffect(() => {
    if (!slug) return;

    const fetchRedirect = async () => {
      const { data, error } = await supabase
        .from('redirects')
        .select('url')
        .eq('slug', slug)
        .single();

      if (error || !data) {
        setError('Redirect not found!');
      } else {
        // Start countdown
        const countdownInterval = setInterval(() => {
          setSecondsLeft((prev) => {
            if (prev === 1) {
              clearInterval(countdownInterval);
              window.location.href = data.url;
            }
            return prev - 1;
          });
        }, 1000);
      }
    };

    fetchRedirect();
  }, [slug]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-[500px] sm:min-h-[550px] flex flex-col items-center justify-center text-gray-600 space-y-4">
      <div className="text-lg font-medium">Redirecting...</div>

      {/* Gradient loading spinner */}
      <div className="w-10 h-10 flex justify-center items-center rounded-full animate-spin bg-gradient-to-tr from-violet-600 via-purple-500 to-purple-400 p-[3px]">
        <div className="w-full h-full rounded-full bg-white"></div>
      </div>


      {/* Countdown timer */}
      <div className="text-sm text-gray-400">
        Please wait, you&apos;ll be redirected in {secondsLeft} seconds.
      </div>

    </div>
  );
}
