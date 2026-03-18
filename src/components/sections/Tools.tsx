'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { richTags } from '@/lib/richText';
import { CALCULATOR_URL, CALCULATOR_IOS_URL, CALCULATOR_ANDROID_URL, TIMEKEEPER_URL, CHECKLIST_URL } from '@/lib/constants';

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

export default function Tools() {
  const t = useTranslations('tools');

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

      {/* Top row — Calculator & Timekeeper */}
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
          <span className="tool-availability">{t('available')}</span>
          <div className="tool-store-badges">
            <a href={CALCULATOR_IOS_URL} target="_blank" rel="noopener noreferrer" aria-label="Download on the App Store">
              <svg viewBox="0 0 120 40" className="store-badge">
                <rect width="120" height="40" rx="5" fill="#000" />
                <text x="42" y="12" fill="#fff" fontSize="6" fontFamily="system-ui,sans-serif">Download on the</text>
                <text x="42" y="26" fill="#fff" fontSize="12" fontWeight="600" fontFamily="system-ui,sans-serif">App Store</text>
                <g transform="translate(10,6) scale(0.55)" fill="#fff">
                  <path d="M24.769 20.3a4.949 4.949 0 0 1 2.356-4.151 5.066 5.066 0 0 0-3.99-2.158c-1.68-.176-3.308 1.005-4.164 1.005-.872 0-2.19-.988-3.608-.958a5.315 5.315 0 0 0-4.473 2.728c-1.934 3.348-.491 8.269 1.361 10.976.927 1.325 2.01 2.805 3.428 2.753 1.387-.058 1.905-.885 3.58-.885 1.658 0 2.144.885 3.59.852 1.489-.025 2.426-1.332 3.32-2.669a10.962 10.962 0 0 0 1.52-3.092 4.782 4.782 0 0 1-2.92-4.4zM22.037 12.21a4.872 4.872 0 0 0 1.115-3.49 4.957 4.957 0 0 0-3.208 1.66 4.636 4.636 0 0 0-1.144 3.36 4.1 4.1 0 0 0 3.237-1.53z" />
                </g>
              </svg>
            </a>
            <a href={CALCULATOR_ANDROID_URL} target="_blank" rel="noopener noreferrer" aria-label="Get it on Google Play">
              <svg viewBox="0 0 135 40" className="store-badge">
                <rect width="135" height="40" rx="5" fill="#000" />
                <text x="50" y="12" fill="#fff" fontSize="6" fontFamily="system-ui,sans-serif">GET IT ON</text>
                <text x="50" y="27" fill="#fff" fontSize="13" fontWeight="500" fontFamily="system-ui,sans-serif">Google Play</text>
                <g transform="translate(10,8)">
                  <path d="M4 0L20 12L4 24V0Z" fill="#4285F4" />
                  <path d="M4 0L16 8L4 16V0Z" fill="#34A853" />
                  <path d="M4 8L16 16L4 24V8Z" fill="#EA4335" />
                  <path d="M4 0L4 24L16 12L4 0Z" fill="#FBBC04" opacity="0.5" />
                </g>
              </svg>
            </a>
          </div>
          <div className="tool-card-img">
            <Image src="/images/tool-calculator-woman.png" alt="OnSite Calculator" fill sizes="(max-width:768px) 100vw, 50vw" style={{ objectPosition: '50% 50%' }} />
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
          <span className="tool-availability">{t('available')}</span>
          <div className="tool-card-img">
            <Image src="/images/timekeeper-men.png" alt="OnSite Timekeeper" fill sizes="(max-width:768px) 100vw, 50vw" style={{ objectPosition: '50% 35%' }} />
          </div>
        </div>
      </div>

      {/* Bottom row — Checklist & Agenda */}
      <div className="tools-grid">
        <div className="tool-card assemble delay-3">
          <div className="tool-card-header">
            <a href={CHECKLIST_URL} target="_blank" rel="noopener noreferrer" className="tool-icon-link">
              <div className="tool-icon"><ChecklistIcon /></div>
            </a>
            <div className="tool-card-text">
              <h3>{t('checklist.name')}</h3>
              <p>{t('checklist.description')}</p>
            </div>
          </div>
          <span className="tool-availability">{t('available')}</span>
          <div className="tool-card-img">
            <Image src="/images/tool-checklist.png" alt="OnSite Checklist" fill sizes="(max-width:768px) 100vw, 50vw" style={{ objectPosition: '50% 50%' }} />
          </div>
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
