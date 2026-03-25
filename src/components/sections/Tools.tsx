'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { richTags } from '@/lib/richText';
import { CALCULATOR_URL, CALCULATOR_IOS_URL, CALCULATOR_ANDROID_URL, TIMEKEEPER_URL, TIMEKEEPER_ANDROID_URL, CHECKLIST_URL } from '@/lib/constants';

/* ── SVG Icon Components ── */
function CalculatorIcon() {
  return (
    <svg viewBox="0 0 64 64">
      <rect x="14" y="8" width="28" height="48" rx="3" style={{ '--pl': 152 } as React.CSSProperties} strokeDasharray="152" strokeDashoffset="152" className="fill-after" />
      <rect x="18" y="14" width="20" height="10" rx="1" style={{ '--pl': 60 } as React.CSSProperties} strokeDasharray="60" strokeDashoffset="60" />
      <rect x="18" y="30" width="5" height="5" rx="0.5" style={{ '--pl': 20 } as React.CSSProperties} strokeDasharray="20" strokeDashoffset="20" />
      <rect x="26" y="30" width="5" height="5" rx="0.5" style={{ '--pl': 20 } as React.CSSProperties} strokeDasharray="20" strokeDashoffset="20" />
      <rect x="34" y="30" width="5" height="5" rx="0.5" style={{ '--pl': 20 } as React.CSSProperties} strokeDasharray="20" strokeDashoffset="20" />
      <rect x="18" y="39" width="5" height="5" rx="0.5" style={{ '--pl': 20 } as React.CSSProperties} strokeDasharray="20" strokeDashoffset="20" />
      <rect x="26" y="39" width="5" height="5" rx="0.5" style={{ '--pl': 20 } as React.CSSProperties} strokeDasharray="20" strokeDashoffset="20" />
      <rect x="34" y="39" width="5" height="5" rx="0.5" style={{ '--pl': 20 } as React.CSSProperties} strokeDasharray="20" strokeDashoffset="20" />
      <path d="M48 26 Q52 32 48 38" style={{ '--pl': 20 } as React.CSSProperties} strokeDasharray="20" strokeDashoffset="20" />
      <path d="M52 22 Q58 32 52 42" className="detail" style={{ '--pl': 28 } as React.CSSProperties} strokeDasharray="28" strokeDashoffset="28" />
      <path d="M56 18 Q64 32 56 46" className="detail" style={{ '--pl': 36 } as React.CSSProperties} strokeDasharray="36" strokeDashoffset="36" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 64 64">
      <circle cx="32" cy="32" r="28" className="detail" style={{ '--pl': 176 } as React.CSSProperties} strokeDasharray="176" strokeDashoffset="176" />
      <circle cx="32" cy="32" r="20" style={{ '--pl': 126 } as React.CSSProperties} strokeDasharray="126" strokeDashoffset="126" className="fill-after" />
      <line x1="32" y1="32" x2="32" y2="20" style={{ '--pl': 12 } as React.CSSProperties} strokeDasharray="12" strokeDashoffset="12" />
      <line x1="32" y1="32" x2="42" y2="28" style={{ '--pl': 14 } as React.CSSProperties} strokeDasharray="14" strokeDashoffset="14" />
      <circle cx="32" cy="32" r="2" style={{ '--pl': 13 } as React.CSSProperties} strokeDasharray="13" strokeDashoffset="13" />
      <path d="M8 32 A24 24 0 0 1 14 16" className="detail" style={{ '--pl': 30 } as React.CSSProperties} strokeDasharray="30" strokeDashoffset="30" />
      <path d="M56 32 A24 24 0 0 1 50 48" className="detail" style={{ '--pl': 30 } as React.CSSProperties} strokeDasharray="30" strokeDashoffset="30" />
    </svg>
  );
}

function ChecklistIcon() {
  return (
    <svg viewBox="0 0 64 64">
      <rect x="12" y="6" width="40" height="52" rx="3" style={{ '--pl': 184 } as React.CSSProperties} strokeDasharray="184" strokeDashoffset="184" className="fill-after" />
      <line x1="22" y1="20" x2="44" y2="20" style={{ '--pl': 22 } as React.CSSProperties} strokeDasharray="22" strokeDashoffset="22" />
      <line x1="22" y1="30" x2="44" y2="30" style={{ '--pl': 22 } as React.CSSProperties} strokeDasharray="22" strokeDashoffset="22" />
      <line x1="22" y1="40" x2="38" y2="40" style={{ '--pl': 16 } as React.CSSProperties} strokeDasharray="16" strokeDashoffset="16" />
      <polyline points="15 19 17 21 20 17" style={{ '--pl': 10 } as React.CSSProperties} strokeDasharray="10" strokeDashoffset="10" />
      <polyline points="15 29 17 31 20 27" style={{ '--pl': 10 } as React.CSSProperties} strokeDasharray="10" strokeDashoffset="10" />
      <rect x="15" y="38" width="5" height="5" rx="0.5" className="detail" style={{ '--pl': 20 } as React.CSSProperties} strokeDasharray="20" strokeDashoffset="20" />
    </svg>
  );
}

/* ── Small CTA icons ── */
function AppleIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12L3.84 21.85C3.34 21.6 3 21.09 3 20.5M16.81 15.12L6.05 21.34L14.54 12.85L16.81 15.12M20.16 10.81C20.5 11.08 20.75 11.5 20.75 12C20.75 12.5 20.5 12.92 20.16 13.19L17.89 14.5L15.39 12L17.89 9.5L20.16 10.81M6.05 2.66L16.81 8.88L14.54 11.15L6.05 2.66Z" />
    </svg>
  );
}

function WebIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function OpenIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export default function Tools() {
  const t = useTranslations('tools');
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const handleCardTap = (cardId: string) => {
    if (window.innerWidth > 768) return;
    if (cardId === 'checklist') {
      window.open(CHECKLIST_URL, '_blank', 'noopener,noreferrer');
      return;
    }
    setExpandedCard((prev) => (prev === cardId ? null : cardId));
  };

  return (
    <section id="tools">
      <div className="section-label assemble">
        <span className="num">04</span> <span>{t('label')}</span>
      </div>
      <h2 className="section-title section-title-logo assemble delay-1">
        <Image
          src="/images/logo-onsite-club-02.png"
          alt="OnSite Club"
          width={140}
          height={38}
          className="section-logo"
        />
        {t.rich('title', richTags)}
      </h2>
      <p className="section-desc assemble delay-2">{t('description')}</p>

      <div className="tools-grid">
        {/* Calculator */}
        <div
          className={`tool-card assemble delay-1${expandedCard === 'calculator' ? ' tool-card-expanded' : ''}`}
          onClick={() => handleCardTap('calculator')}
        >
          <div className="tool-card-header">
            <a href={CALCULATOR_URL} target="_blank" rel="noopener noreferrer" className="tool-icon-link" onClick={(e) => e.stopPropagation()}>
              <div className="tool-icon"><CalculatorIcon /></div>
            </a>
            <div className="tool-card-text">
              <h3>{t('calculator.name')}</h3>
              <p>{t('calculator.description')}</p>
            </div>
          </div>
          <span className="tool-availability">{t('available')}</span>
          <div className="tool-actions">
            <a href={CALCULATOR_IOS_URL} target="_blank" rel="noopener noreferrer" className="tool-cta-btn" onClick={(e) => e.stopPropagation()}>
              <AppleIcon /> {t('cta_appstore')}
            </a>
            <a href={CALCULATOR_ANDROID_URL} target="_blank" rel="noopener noreferrer" className="tool-cta-btn" onClick={(e) => e.stopPropagation()}>
              <PlayIcon /> {t('cta_googleplay')}
            </a>
            <a href={CALCULATOR_URL} target="_blank" rel="noopener noreferrer" className="tool-cta-btn" onClick={(e) => e.stopPropagation()}>
              <WebIcon /> {t('cta_web')}
            </a>
          </div>
          <div className="tool-mobile-options">
            <a href={CALCULATOR_IOS_URL} target="_blank" rel="noopener noreferrer" className="tool-mobile-btn" onClick={(e) => e.stopPropagation()}>
              <AppleIcon /> App Store
            </a>
            <a href={CALCULATOR_ANDROID_URL} target="_blank" rel="noopener noreferrer" className="tool-mobile-btn" onClick={(e) => e.stopPropagation()}>
              <PlayIcon /> Google Play
            </a>
            <a href={CALCULATOR_URL} target="_blank" rel="noopener noreferrer" className="tool-mobile-btn" onClick={(e) => e.stopPropagation()}>
              <WebIcon /> Web App
            </a>
          </div>
          <div className="tool-card-img">
            <Image src="/images/tool-calculator-woman.png" alt="OnSite Calculator" fill sizes="(max-width:768px) 100vw, 33vw" style={{ objectPosition: '50% 50%' }} />
          </div>
        </div>

        {/* Timekeeper */}
        <div
          className={`tool-card assemble delay-2${expandedCard === 'timekeeper' ? ' tool-card-expanded' : ''}`}
          onClick={() => handleCardTap('timekeeper')}
        >
          <div className="tool-card-header">
            <a href={TIMEKEEPER_URL} target="_blank" rel="noopener noreferrer" className="tool-icon-link" onClick={(e) => e.stopPropagation()}>
              <div className="tool-icon"><ClockIcon /></div>
            </a>
            <div className="tool-card-text">
              <h3>{t('timekeeper.name')}</h3>
              <p>{t('timekeeper.description')}</p>
            </div>
          </div>
          <span className="tool-availability">{t('available')}</span>
          <div className="tool-actions">
            <a href={TIMEKEEPER_ANDROID_URL} target="_blank" rel="noopener noreferrer" className="tool-cta-btn" onClick={(e) => e.stopPropagation()}>
              <PlayIcon /> {t('cta_googleplay')}
            </a>
            <a href={TIMEKEEPER_URL} target="_blank" rel="noopener noreferrer" className="tool-cta-btn" onClick={(e) => e.stopPropagation()}>
              <WebIcon /> {t('cta_web')}
            </a>
          </div>
          <div className="tool-mobile-options">
            <a href={TIMEKEEPER_ANDROID_URL} target="_blank" rel="noopener noreferrer" className="tool-mobile-btn" onClick={(e) => e.stopPropagation()}>
              <PlayIcon /> Google Play
            </a>
            <a href={TIMEKEEPER_URL} target="_blank" rel="noopener noreferrer" className="tool-mobile-btn" onClick={(e) => e.stopPropagation()}>
              <WebIcon /> Web App
            </a>
          </div>
          <div className="tool-card-img">
            <Image src="/images/timekeeper-men.png" alt="OnSite Timekeeper" fill sizes="(max-width:768px) 100vw, 33vw" style={{ objectPosition: '50% 35%' }} />
          </div>
        </div>

        {/* Checklist */}
        <div
          className="tool-card assemble delay-3"
          onClick={() => handleCardTap('checklist')}
        >
          <div className="tool-card-header">
            <a href={CHECKLIST_URL} target="_blank" rel="noopener noreferrer" className="tool-icon-link" onClick={(e) => e.stopPropagation()}>
              <div className="tool-icon"><ChecklistIcon /></div>
            </a>
            <div className="tool-card-text">
              <h3>{t('checklist.name')}</h3>
              <p>{t('checklist.description')}</p>
            </div>
          </div>
          <span className="tool-availability">{t('available')}</span>
          <div className="tool-actions">
            <a href={CHECKLIST_URL} target="_blank" rel="noopener noreferrer" className="tool-cta-btn" onClick={(e) => e.stopPropagation()}>
              <OpenIcon /> {t('cta_open')}
            </a>
          </div>
          <div className="tool-card-img">
            <Image src="/images/tool-checklist.png" alt="OnSite Checklist" fill sizes="(max-width:768px) 100vw, 33vw" style={{ objectPosition: '50% 50%' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
