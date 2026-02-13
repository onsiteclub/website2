'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { SHOP_URL } from '@/lib/constants';

export default function Hero() {
  const t = useTranslations('hero');

  /* Staggered hero assembly on page load */
  useEffect(() => {
    const timer = setTimeout(() => {
      document.querySelectorAll('.hero .assemble').forEach((el, i) => {
        setTimeout(() => el.classList.add('visible'), i * 120);
      });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  /* Hero background scroll fade */
  useEffect(() => {
    const heroBg = document.getElementById('heroBg');
    const heroSection = document.getElementById('home');
    if (!heroBg || !heroSection) return;

    function onScroll() {
      const heroH = heroSection!.offsetHeight;
      const fadeStart = heroH * 0.3;
      const fadeEnd = heroH * 0.9;
      if (window.scrollY <= fadeStart) {
        heroBg!.style.opacity = '1';
      } else if (window.scrollY >= fadeEnd) {
        heroBg!.style.opacity = '0';
      } else {
        const progress = (window.scrollY - fadeStart) / (fadeEnd - fadeStart);
        heroBg!.style.opacity = (1 - progress).toFixed(3);
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Split title into words, last word is highlighted */
  const title = t('title');
  const words = title.split(' ');
  const lastIdx = words.length - 1;

  return (
    <div className="hero" id="home">
      <div className="hero-bg assemble" id="heroBg">
        <Image src="/images/hero-bg.webp" alt="" fill priority />
      </div>

      <div className="hero-kicker assemble delay-1">
        <span className="line"></span>
        <span>{t('kicker')}</span>
      </div>

      <h1 className="assemble delay-2">
        {words.map((word, i) => (
          <span
            key={i}
            className={`word${i === lastIdx ? ' highlight' : ''}`}
            style={{ transitionDelay: `${0.2 + i * 0.1}s` }}
          >
            {word}{' '}
          </span>
        ))}
      </h1>

      <p className="hero-sub assemble delay-4">{t('subtitle')}</p>

      <div className="hero-cta assemble delay-5">
        <a href={SHOP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
          {t('cta_shop')}
        </a>
      </div>
    </div>
  );
}
