'use client';

import { useEffect } from 'react';

/**
 * Click-to-swap: clicking a thumbnail swaps it with the main product,
 * with a cross-fade animation.
 */
export function useShopSwap(showcaseId: string) {
  useEffect(() => {
    const showcase = document.getElementById(showcaseId);
    if (!showcase) return;

    function handleClick(e: MouseEvent) {
      const thumb = (e.target as Element).closest('.showcase-thumb');
      if (!thumb) return;
      e.preventDefault();

      const main = showcase!.querySelector('.showcase-main') as HTMLElement;
      if (!main) return;

      const mainImg = main.querySelector('img') as HTMLImageElement;
      const mainName = main.querySelector('.showcase-name') as HTMLElement;
      const mainPrice = main.querySelector('.showcase-price') as HTMLElement;
      const thumbEl = thumb as HTMLElement;
      const thumbImg = thumbEl.querySelector('img') as HTMLImageElement;
      const thumbName = thumbEl.querySelector('.showcase-name') as HTMLElement;
      const thumbPrice = thumbEl.querySelector('.showcase-price') as HTMLElement;

      // Cross-fade out
      main.style.transition = 'opacity 0.25s ease';
      thumbEl.style.transition = 'opacity 0.25s ease';
      main.style.opacity = '0';
      thumbEl.style.opacity = '0';

      setTimeout(() => {
        // Swap image src & alt
        const tmpSrc = mainImg.src;
        const tmpAlt = mainImg.alt;
        mainImg.src = thumbImg.src;
        mainImg.alt = thumbImg.alt;
        thumbImg.src = tmpSrc;
        thumbImg.alt = tmpAlt;

        // Swap name
        const tmpName = mainName.textContent;
        mainName.textContent = thumbName.textContent;
        thumbName.textContent = tmpName;

        // Swap price
        const tmpPrice = mainPrice.textContent;
        mainPrice.textContent = thumbPrice.textContent;
        thumbPrice.textContent = tmpPrice;

        // Swap href
        const mainAnchor = main as HTMLAnchorElement;
        const thumbAnchor = thumbEl as HTMLAnchorElement;
        const tmpHref = mainAnchor.href;
        mainAnchor.href = thumbAnchor.href;
        thumbAnchor.href = tmpHref;

        // Fade in
        main.style.opacity = '1';
        thumbEl.style.opacity = '1';

        setTimeout(() => {
          main.style.transition = '';
          thumbEl.style.transition = '';
        }, 300);
      }, 250);
    }

    showcase.addEventListener('click', handleClick);
    return () => showcase.removeEventListener('click', handleClick);
  }, [showcaseId]);
}
