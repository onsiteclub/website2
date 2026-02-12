'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { richTags } from '@/lib/richText';
import { FACEBOOK_URL, INSTAGRAM_URL } from '@/lib/constants';

export default function Community() {
  const t = useTranslations('community');

  return (
    <section id="community">
      <div className="section-label assemble">
        <span className="num">04</span> <span>{t('label')}</span>
      </div>
      <h2 className="section-title assemble delay-1">
        {t.rich('title', richTags)}
      </h2>
      <p className="section-desc assemble delay-2">{t('description')}</p>

      <div className="manifesto-banner assemble delay-2">
        <div className="manifesto-text">
          <p className="manifesto-lead">{t('manifesto_lead')}</p>
          <p className="manifesto-body">{t('manifesto_body')}</p>
        </div>
        <div className="manifesto-photos">
          <div className="manifesto-photo"><Image src="/images/vision1.png" alt="Worker looking at skyline" width={200} height={280} /></div>
          <div className="manifesto-photo"><Image src="/images/vision2.png" alt="Crew on site" width={200} height={280} /></div>
          <div className="manifesto-photo"><Image src="/images/vision3.png" alt="Builder at sunrise" width={200} height={280} /></div>
        </div>
      </div>

      <div className="community-counter assemble delay-3">
        <span className="counter-number">{t('counter_number')}</span>
        <span className="counter-label">{t('counter_label')}</span>
      </div>

      <div className="community-grid">
        <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="social-card fb-card assemble delay-3">
          <div className="social-icon fb">
            <svg viewBox="0 0 24 24" fill="#1877F2">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </div>
          <h3>{t('fb_title')}</h3>
          <p>{t('fb_desc')}</p>
          <span className="social-cta">{t('fb_cta')}</span>
        </a>

        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="social-card ig-card assemble delay-4">
          <div className="social-icon ig">
            <svg viewBox="0 0 24 24" fill="none" stroke="#E1306C" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle cx="17.5" cy="6.5" r="1.5" fill="#E1306C" stroke="none" />
            </svg>
          </div>
          <h3>{t('ig_title')}</h3>
          <p>{t('ig_desc')}</p>
          <span className="social-cta">{t('ig_cta')}</span>
        </a>
      </div>
    </section>
  );
}
