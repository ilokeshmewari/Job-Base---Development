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
    <div className="flex flex-col justify-center items-center">
      <div ref={adContainerRef} className="w-full flex justify-center" />
    </div>
  );
};

export default AdScript;
