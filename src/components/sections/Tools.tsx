'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { richTags } from '@/lib/richText';
import { CALCULATOR_URL, TIMEKEEPER_URL } from '@/lib/constants';

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

function AgendaIcon() {
  return (
    <svg viewBox="0 0 64 64">
      <rect x="10" y="6" width="44" height="52" rx="3" style={{ '--pl': 192 } as React.CSSProperties} strokeDasharray="192" strokeDashoffset="192" className="fill-after" />
      <line x1="22" y1="2" x2="22" y2="12" style={{ '--pl': 10 } as React.CSSProperties} strokeDasharray="10" strokeDashoffset="10" />
      <line x1="42" y1="2" x2="42" y2="12" style={{ '--pl': 10 } as React.CSSProperties} strokeDasharray="10" strokeDashoffset="10" />
      <line x1="10" y1="18" x2="54" y2="18" style={{ '--pl': 44 } as React.CSSProperties} strokeDasharray="44" strokeDashoffset="44" />
      <rect x="18" y="24" width="8" height="7" rx="1" style={{ '--pl': 30 } as React.CSSProperties} strokeDasharray="30" strokeDashoffset="30" />
      <rect x="30" y="24" width="8" height="7" rx="1" style={{ '--pl': 30 } as React.CSSProperties} strokeDasharray="30" strokeDashoffset="30" />
      <rect x="42" y="24" width="8" height="7" rx="1" className="detail" style={{ '--pl': 30 } as React.CSSProperties} strokeDasharray="30" strokeDashoffset="30" />
      <rect x="18" y="36" width="8" height="7" rx="1" style={{ '--pl': 30 } as React.CSSProperties} strokeDasharray="30" strokeDashoffset="30" />
      <rect x="30" y="36" width="8" height="7" rx="1" className="detail" style={{ '--pl': 30 } as React.CSSProperties} strokeDasharray="30" strokeDashoffset="30" />
      <rect x="42" y="36" width="8" height="7" rx="1" className="detail" style={{ '--pl': 30 } as React.CSSProperties} strokeDasharray="30" strokeDashoffset="30" />
    </svg>
  );
}

function AppleSvg() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

function GooglePlaySvg() {
  return (
    <svg viewBox="0 0 24 24">
      <path d="M3.61 1.02L13.43 12 3.61 22.98c-.38-.22-.61-.63-.61-1.09V2.11c0-.46.23-.87.61-1.09zM14.85 13.43l2.62 1.48-9.85 5.51 7.23-6.99zM14.85 10.57L7.62 3.58l9.85 5.51-2.62 1.48zM18.73 12.93l-2.46 1.38L14.08 12l2.19-2.31 2.46 1.38c.78.44.78 1.42 0 1.86z" />
    </svg>
  );
}

function StoreBadges() {
  return (
    <div className="store-badges">
      <a href="#" className="store-badge" target="_blank" rel="noopener noreferrer">
        <AppleSvg />
        <div className="store-badge-text">
          <small>Download on the</small>
          <span>App Store</span>
        </div>
      </a>
      <a href="#" className="store-badge" target="_blank" rel="noopener noreferrer">
        <GooglePlaySvg />
        <div className="store-badge-text">
          <small>Get it on</small>
          <span>Google Play</span>
        </div>
      </a>
    </div>
  );
}

export default function Tools() {
  const t = useTranslations('tools');

  return (
    <section id="tools">
      <div className="section-label assemble">
        <span className="num">01</span> <span>{t('label')}</span>
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
        <div className="tool-card assemble delay-1">
          <div className="tool-card-header">
            <a href={CALCULATOR_URL} target="_blank" rel="noopener noreferrer" className="tool-icon-link">
              <div className="tool-icon"><CalculatorIcon /></div>
            </a>
            <div className="tool-card-text">
              <h3>{t('calculator.name')}</h3>
              <p>{t('calculator.description')}</p>
            </div>
          </div>
          <StoreBadges />
          <div className="app-screenshots">
            <div className="app-screenshot"><Image src="/images/calc1.jpeg" alt="OnSite Calculator" width={240} height={520} /></div>
            <div className="app-screenshot"><Image src="/images/calc2.jpeg" alt="OnSite Easy-Square" width={240} height={520} /></div>
          </div>
        </div>

        <div className="tool-card assemble delay-2">
          <div className="tool-card-header">
            <a href={TIMEKEEPER_URL} target="_blank" rel="noopener noreferrer" className="tool-icon-link">
              <div className="tool-icon"><ClockIcon /></div>
            </a>
            <div className="tool-card-text">
              <h3>{t('timekeeper.name')}</h3>
              <p>{t('timekeeper.description')}</p>
            </div>
          </div>
          <StoreBadges />
          <div className="app-screenshots">
            <div className="app-screenshot"><Image src="/images/time1.jpeg" alt="OnSite Timer" width={240} height={520} /></div>
            <div className="app-screenshot"><Image src="/images/time2.jpeg" alt="OnSite Reports" width={240} height={520} /></div>
          </div>
        </div>

        <div className="tool-card coming-soon assemble delay-3">
          <div className="tool-card-header">
            <div className="tool-icon"><ChecklistIcon /></div>
            <div className="tool-card-text">
              <h3>{t('checklist.name')}</h3>
              <p>{t('checklist.description')}</p>
            </div>
          </div>
          <span className="tool-tag">{t('checklist.tag')}</span>
        </div>

        <div className="tool-card coming-soon assemble delay-4">
          <div className="tool-card-header">
            <div className="tool-icon"><AgendaIcon /></div>
            <div className="tool-card-text">
              <h3>{t('agenda.name')}</h3>
              <p>{t('agenda.description')}</p>
            </div>
          </div>
          <span className="tool-tag">{t('agenda.tag')}</span>
        </div>
      </div>
    </section>
  );
}
