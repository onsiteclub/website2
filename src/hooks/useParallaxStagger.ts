'use client';

import { useEffect } from 'react';

/**
 * Hovered card "lags" on scroll — creates parallax weight effect.
 * Applies to tool cards, showcase items, and social cards.
 */
export function useParallaxStagger() {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(
      '.tool-card, .showcase-item, .social-card'
    );
    let hoveredCard: HTMLElement | null = null;
    let lastScrollY = window.scrollY;
    let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

    function onEnter(e: Event) {
      hoveredCard = e.currentTarget as HTMLElement;
    }

    function onLeave(e: Event) {
      const card = e.currentTarget as HTMLElement;
      if (hoveredCard === card) {
        hoveredCard = null;
        card.classList.add('parallax-lagging');
        card.style.transform = 'translateY(0px)';
        setTimeout(() => card.classList.remove('parallax-lagging'), 600);
      }
    }

    function onScroll() {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY;
      lastScrollY = currentY;

      if (!hoveredCard) return;

      const lagAmount = delta * 0.35;
      const currentTransform = getComputedStyle(hoveredCard).transform;
      let currentOffset = 0;

      if (currentTransform && currentTransform !== 'none') {
        const matrix = new DOMMatrixReadOnly(currentTransform);
        currentOffset = matrix.m42;
      }

      let newOffset = currentOffset + lagAmount;
      newOffset = Math.max(-30, Math.min(30, newOffset));

      hoveredCard.style.transition = 'transform 0.05s linear';
      hoveredCard.style.transform = `translateY(${newOffset}px)`;

      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (hoveredCard) {
          hoveredCard.classList.add('parallax-lagging');
          hoveredCard.style.transform = 'translateY(0px)';
          setTimeout(() => {
            if (hoveredCard) hoveredCard.classList.remove('parallax-lagging');
          }, 600);
        }
      }, 150);
    }

    cards.forEach((card) => {
      card.addEventListener('mouseenter', onEnter);
      card.addEventListener('mouseleave', onLeave);
    });

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mouseenter', onEnter);
        card.removeEventListener('mouseleave', onLeave);
      });
      window.removeEventListener('scroll', onScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);
}
