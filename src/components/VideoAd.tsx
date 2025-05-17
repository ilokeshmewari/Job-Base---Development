'use client';

import { useEffect, useState } from 'react';

export default function VideoAdScript() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsDesktop(window.innerWidth >= 640); // Tailwind 'sm:' breakpoint (640px)
    };

    check(); // run on mount
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const d = document;
    const s = d.createElement('script');
    const l = d.scripts[d.scripts.length - 1];

    s.src = '//fresh-kind.com/b.XtV/sKdWGFlO0qYkW/cD/heqmX9FuvZnUslokDPiTHYSzcNATHYj3RMUTXYntQN/jdM-1XNHjecCx/N/wy';
    s.async = true;
    s.referrerPolicy = 'no-referrer-when-downgrade';

    (s as any).settings = {};

    l.parentNode?.insertBefore(s, l);
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <div
      id="video-ad-container"
      className="hidden sm:flex w-full h-full justify-center items-center"
    >
      {/* Desktop-only video ad */}
    </div>
  );
}
