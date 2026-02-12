'use client';

import { useEffect } from 'react';

export function useScrollProgress(barId: string, navId: string) {
  useEffect(() => {
    const bar = document.getElementById(barId);
    const nav = document.getElementById(navId);
    if (!bar) return;

    function onScroll() {
      const pct =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;
      bar!.style.width = pct + '%';
      nav?.classList.toggle('scrolled', window.scrollY > 50);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [barId, navId]);
}
