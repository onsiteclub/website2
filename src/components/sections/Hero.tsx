'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { SHOP_URL } from '@/lib/constants';
import { useTrade, TRADES, TradeId } from '@/providers/TradeProvider';
import { getTradeText } from '@/data/tradeContent';

export default function Hero() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const { trade } = useTrade();

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
      {/* Hero backgrounds — crossfade on trade change */}
      <div className="hero-bg assemble" id="heroBg">
        {(Object.keys(TRADES) as TradeId[]).map((tid) => (
          <Image
            key={tid}
            src={TRADES[tid].heroImage}
            alt=""
            fill
            priority={tid === 'default'}
            className={`hero-bg-img${trade === tid ? ' hero-bg-img-active' : ''}`}
          />
        ))}
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

      <p className="hero-sub assemble delay-4">{subtitle}</p>

      <div className="hero-cta assemble delay-5">
        <a href={SHOP_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
          {t('cta_shop')}
        </a>
        <button
          className="btn-secondary"
          onClick={() => document.dispatchEvent(new Event('open-trade-selector'))}
        >
          {t('cta_explore')}
        </button>
      </div>
    </div>
  );
}
