'use client';

import { useEffect } from 'react';

/**
 * Observes `.assemble` elements and adds `.visible` when 12% in viewport.
 * Also triggers counter animation for `.counter` children.
 */
export function useScrollAssembly() {
  useEffect(() => {
    const els = document.querySelectorAll('.assemble');
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const counter = entry.target.querySelector('.counter');
            if (counter) animateCounters(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function animateCounters(container: Element) {
  container.querySelectorAll('.counter').forEach((counter) => {
    const target = parseInt(counter.getAttribute('data-target') || '0', 10);
    if (!target) return;
    let current = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = current.toString();
    }, 16);
  });
}
