'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { richTags } from '@/lib/richText';
import { PATHWAY_STEPS, DASHBOARD_URL } from '@/lib/constants';

const DownloadSvg = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

function HardHatIcon() {
  return (
    <svg viewBox="0 0 64 64">
      <path d="M12 36 Q12 16 32 12 Q52 16 52 36" style={{ '--pl': 90 } as React.CSSProperties} />
      <path d="M8 36 L56 36" style={{ '--pl': 48 } as React.CSSProperties} />
      <path d="M8 36 Q8 40 12 40 L52 40 Q56 40 56 36" style={{ '--pl': 56 } as React.CSSProperties} />
      <path d="M18 36 L18 30 Q18 24 32 22 Q46 24 46 30 L46 36" style={{ '--pl': 60 } as React.CSSProperties} className="detail" />
      <path d="M28 12 L28 8 Q32 6 36 8 L36 12" style={{ '--pl': 20 } as React.CSSProperties} />
      <polyline points="24 50 30 56 42 46" style={{ '--pl': 30 } as React.CSSProperties} />
      <path d="M12 36 Q12 16 32 12 Q52 16 52 36 L56 36 Q56 40 52 40 L12 40 Q8 40 8 36 Z" style={{ '--pl': 0 } as React.CSSProperties} className="fill-after" />
    </svg>
  );
}

function PathwayStepRow({ step, t }: { step: (typeof PATHWAY_STEPS)[number]; t: ReturnType<typeof useTranslations> }) {
  return (
    <div className="pathway-step">
      <div className="pathway-step-content">
        {step.badges.length > 0 && (
          <div className="pw-badges">
            {step.badges.map((badge, i) => (
              <span key={badge} className={`pw-badge ${step.badgeClasses[i]}`}>
                {t(badge.replace('pathway.', ''))}
              </span>
            ))}
          </div>
        )}
        <h4>{t(`steps.${step.i18nKey}.title`)}</h4>
        <p>{t(`steps.${step.i18nKey}.description`)}</p>
        <a
          href={step.link}
          target="_blank"
          rel="noopener noreferrer"
          className={`pw-link${step.isGovLink ? ' gov-link' : ''}`}
        >
          {t(`steps.${step.i18nKey}.link`)}
        </a>
      </div>
      <div className="pathway-step-status">
        <div className="pw-status-indicator active" data-status="not-started">
          <span className="pw-indicator-dot"></span>
          <span className="pw-indicator-label">{t('status_not_started')}</span>
        </div>
        <div className="pw-status-indicator" data-status="completed">
          <span className="pw-indicator-dot"></span>
          <span className="pw-indicator-label">{t('status_completed')}</span>
        </div>
        <div className="pw-status-indicator" data-status="expired">
          <span className="pw-indicator-dot"></span>
          <span className="pw-indicator-label">{t('status_expired')}</span>
        </div>
        <button className="pw-download">
          <DownloadSvg /> <span>{t('certificate')}</span>
        </button>
      </div>
    </div>
  );
}

export default function Pathway() {
  const t = useTranslations('pathway');
  const [panelOpen, setPanelOpen] = useState(false);

  return (
    <section id="pathway">
      <div className="section-label assemble">
        <span className="num">03</span> <span>{t('label')}</span>
      </div>
      <h2 className="section-title assemble delay-1">
        {t.rich('title', richTags)}
      </h2>
      <p className="section-desc assemble delay-2">{t('description')}</p>

      <div className="pathway-connector assemble delay-3"></div>

      <div className="assemble delay-3">
        <div
          className={`pathway-trigger assemble${panelOpen ? ' active' : ''}`}
          id="pathwayTrigger"
          role="button"
          tabIndex={0}
          onClick={() => setPanelOpen((v) => !v)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setPanelOpen((v) => !v); } }}
          aria-expanded={panelOpen}
          aria-controls="pathwayPanel"
        >
          <div className="pathway-icon"><HardHatIcon /></div>
          <div className="pathway-trigger-middle">
            <h3>{t('trigger_title')}</h3>
            <p>{t('trigger_desc')}</p>
            <span className="pathway-explore">{t('explore')}</span>
          </div>
          <span className="pathway-badge">{t('badge')}</span>
          <div className="pathway-trigger-arrow">
            <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9" /></svg>
          </div>
        </div>

        <div className={`pathway-panel${panelOpen ? ' open' : ''}`} id="pathwayPanel">
          <div className="pathway-inner">
            <p className="pathway-intro">{t('intro')}</p>

            <div className="pathway-timeline" id="pathwayTimeline">
              {PATHWAY_STEPS.map((step) => (
                <PathwayStepRow key={step.i18nKey} step={step} t={t} />
              ))}
            </div>

            <div className="pathway-cta">
              <svg className="pathway-cta-icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <polyline points="9 12 11 14 15 10" />
              </svg>
              <div className="pathway-cta-text">
                <h4>{t('cta_title')}</h4>
                <p>{t('cta_desc')}</p>
              </div>
              <a href={DASHBOARD_URL} target="_blank" rel="noopener noreferrer" className="btn-primary">
                {t('cta_button')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
