'use client';

import { useEffect, useRef } from 'react';

const AdScript = () => {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const s = document.createElement('script');
    s.src =
      '//fresh-kind.com/bxXpVIs.dOGWlQ0/YAWkc_/necms9ZuxZLUBltkVPuTHYpzrNGT/Yb2LNETjMjt/Njj_M/1rNEjJYS1zNJAH';
    s.async = true;
    s.referrerPolicy = 'no-referrer-when-downgrade';

    if (adContainerRef.current) {
      adContainerRef.current.appendChild(s);
    }
  }, []);

  return (
    <div className="bg-gray-100 p-4 rounded-md flex flex-col justify-center items-center">
                <p className="top-2 left-2 text-[10px] text-gray-700">Ads by Hiltopads Network</p>
      <div ref={adContainerRef} className="w-full flex justify-center" />
    </div>
  );
};

export default AdScript;
