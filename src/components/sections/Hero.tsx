'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { SHOP_URL, CALCULATOR_URL, TIMEKEEPER_URL } from '@/lib/constants';
import { useTrade, TRADES, TradeId } from '@/providers/TradeProvider';
import { getTradeText } from '@/data/tradeContent';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const { trade } = useTrade();
  const [floatingVisible, setFloatingVisible] = useState(true);

  /* Hide floating tool buttons on scroll */
  useEffect(() => {
    function onScroll() {
      setFloatingVisible(window.scrollY < 200);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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

  /* Trade-specific subtitle from centralised data */
  const subtitle = getTradeText(trade, 'hero_subtitle', locale);

  return (
    <div className="hero" id="home">
      {/* Hero background */}
      <div className="hero-bg assemble" id="heroBg">
        <Image
          src={TRADES[trade].heroImage}
          alt=""
          fill
          priority
          className="hero-bg-img hero-bg-img-active"
        />
      </div>

      <h1 className="assemble delay-1">
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

      <p className="hero-sub assemble delay-3">{subtitle}</p>

      <div className="hero-cta assemble delay-4">
        <button
          className="hero-btn-primary"
          onClick={() => document.dispatchEvent(new Event('open-trade-selector'))}
        >
          {t('cta_explore')}
        </button>
        <a href={SHOP_URL} target="_blank" rel="noopener noreferrer" className="hero-btn-ghost">
          {t('cta_shop')}
        </a>
      </div>

      {/* Mobile floating tool buttons */}
      <div className={`hero-float-tools${floatingVisible ? '' : ' hero-float-hidden'}`}>
        <a href={CALCULATOR_URL} target="_blank" rel="noopener noreferrer" className="hero-float-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <line x1="8" y1="6" x2="16" y2="6" />
          </svg>
          Calculator
        </a>
        <a href={TIMEKEEPER_URL} target="_blank" rel="noopener noreferrer" className="hero-float-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          Timekeeper
        </a>
      </div>
    </div>
  );
}
