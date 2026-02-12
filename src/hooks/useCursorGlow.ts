'use client';

import { useEffect } from 'react';

export function useCursorGlow(glowId: string) {
  useEffect(() => {
    const glow = document.getElementById(glowId);
    if (!glow) return;

    function onMove(e: MouseEvent) {
      glow!.style.left = e.clientX + 'px';
      glow!.style.top = e.clientY + 'px';
      glow!.style.opacity = '0.35';
    }

    function onLeave() {
      glow!.style.opacity = '0';
    }

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [glowId]);
}
