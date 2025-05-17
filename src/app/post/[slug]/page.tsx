'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function RedirectPage() {
  const params = useParams();
  const slug = params?.slug as string | undefined;

  const [error, setError] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

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
        setRedirectUrl(data.url);
      }
    };

    fetchRedirect();
  }, [slug]);

  useEffect(() => {
    if (!redirectUrl) return;

    const countdown = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          window.location.href = redirectUrl;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [redirectUrl]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600 text-lg font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-[500px] sm:min-h-[550px] flex flex-col items-center justify-center text-gray-600 space-y-6 px-4">
      {/* YouTube iframe embed */}
      <div className="w-full max-w-xl aspect-video">
        <iframe
          src="https://www.youtube.com/embed/A4aQJICI3J8?autoplay=1&mute=1&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1"
          allow="autoplay; encrypted-media"
          allowFullScreen
          loading="lazy"
          title="Redirect Video"
          className="w-full h-full"
          frameBorder="0"
        />
      </div>

      <div className="text-lg font-medium">Redirecting...</div>

      {/* Gradient loading spinner */}
      <div className="w-10 h-10 flex justify-center items-center rounded-full animate-spin bg-gradient-to-tr from-violet-600 via-purple-500 to-purple-400 p-[3px]">
        <div className="w-full h-full rounded-full bg-white"></div>
      </div>

      <div className="text-sm text-gray-400">
        Please wait, you&apos;ll be redirected in {secondsLeft} second
        {secondsLeft !== 1 ? 's' : ''}.
      </div>
    </div>
  );
}
