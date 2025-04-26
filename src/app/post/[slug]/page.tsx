'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function RedirectPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [error, setError] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number>(10);

  useEffect(() => {
    // Create Monetag script element
    const script = document.createElement('script');
    script.src = 'https://ligheechoagool.com/88/tag.min.js';
    script.async = true;
    script.dataset.zone = '132627';
    script.setAttribute('data-cfasync', 'false');
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

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
              window.location.href = data.url; // Redirect when timer reaches 0
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
    <div className="min-h-screen flex flex-col items-center justify-center text-gray-600 space-y-4">
      <div className="text-lg font-medium">Redirecting to job...</div>

      {/* Loading spinner */}
      <div className="w-10 h-10 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>

      {/* Countdown timer */}
      <div className="text-sm text-gray-400">
        Please wait, you&apos;ll be redirected in {secondsLeft} seconds.
      </div>

      {/* Placeholder for ad */}
      <div id="monetag-ad" className="mt-6 w-full flex justify-center" />
    </div>
  );
}
