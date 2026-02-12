'use client';

import { useEffect } from 'react';

/**
 * SVG stroke re-animation on hover for tool cards and pathway trigger.
 * Resets stroke-dashoffset to --pl, then animates back to 0.
 */
export function useIconRedraw() {
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(
      '.tool-card, .pathway-trigger'
    );

    function onEnter(this: HTMLElement) {
      const iconRoot = this.querySelector('.tool-icon, .pathway-icon');
      if (!iconRoot) return;

      const els = iconRoot.querySelectorAll<SVGElement>(
        'svg path, svg line, svg circle, svg rect, svg polyline'
      );

      // Reset to dashed state
      els.forEach((el) => {
        const pl = el.style.getPropertyValue('--pl') || '200';
        el.style.transition = 'none';
        el.style.strokeDashoffset = pl;
        if (el.classList.contains('fill-after')) {
          el.style.fill = 'none';
        }
      });

      // Force reflow
      void this.offsetHeight;

      // Animate back
      els.forEach((el, i) => {
        setTimeout(() => {
          el.style.transition =
            'stroke-dashoffset 0.6s cubic-bezier(0.4,0,0.2,1)';
          el.style.strokeDashoffset = '0';
          if (el.classList.contains('fill-after')) {
            setTimeout(() => {
              el.style.fill = '';
            }, 400);
          }
        }, i * 40);
      });
    }

    cards.forEach((card) => {
      card.addEventListener('mouseenter', onEnter);
    });

    return () => {
      cards.forEach((card) => {
        card.removeEventListener('mouseenter', onEnter);
      });
    };
  }, []);
}
