'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function RedirectPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchRedirect = async () => {
      const { data, error } = await supabase
        .from('redirects')
        .select('url')
        .eq('slug', slug)
        .single();

      if (error || !data) {
        setError('🔍 Redirect not found!');
        // Optionally redirect to 404 or homepage
        // router.push('/404'); 
      } else {
        window.location.href = data.url;
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
    <div className="min-h-screen flex items-center justify-center text-gray-600">
      Redirecting to job...
    </div>
  );
}
