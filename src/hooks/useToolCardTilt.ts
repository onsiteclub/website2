'use client';

import { useEffect } from 'react';

/**
 * 3D tilt hover effect on non-coming-soon tool cards.
 * Perspective: 800px, max rotation: ±3deg
 */
export function useToolCardTilt() {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(
      '.tool-card:not(.coming-soon)'
    );

    function onMove(this: HTMLElement, e: MouseEvent) {
      const rect = this.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - y) * 6;
      const rotateY = (x - 0.5) * 6;
      this.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    }

    function onLeave(this: HTMLElement) {
      this.style.transform = '';
    }

    cards.forEach((card) => {
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);
}
