'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { richTags } from '@/lib/richText';
import { FACEBOOK_COMMUNITY_URL, INSTAGRAM_URL } from '@/lib/constants';

export default function Manifesto() {
  const c = useTranslations('community');

  return (
    <section id="community" aria-label="Vision & Community">
      {/* ── Vision Banner ── */}
      <div className="section-label assemble">
        <span className="num">05</span> <span>{c('label')}</span>
      </div>
      <h2 className="section-title assemble delay-3">
        {c.rich('title', richTags)}
      </h2>
      <p className="section-desc assemble delay-3">{c('description')}</p>

      <div className="manifesto-banner assemble delay-3">
        <div className="manifesto-text">
          <p className="manifesto-lead">{c('manifesto_lead')}</p>
          <p className="manifesto-body">{c('manifesto_body')}</p>
        </div>
        <div className="manifesto-photos">
          <div className="manifesto-photo">
            <Image src="/images/vision1.png" alt="Worker looking at skyline" width={200} height={280} />
          </div>
          <div className="manifesto-photo">
            <Image src="/images/vision2.png" alt="Crew on site" width={200} height={280} />
          </div>
          <div className="manifesto-photo">
            <Image src="/images/vision3.png" alt="Builder at sunrise" width={200} height={280} />
          </div>
        </div>
      </div>

      {/* ── Social Cards ── */}
      <div className="community-grid assemble delay-4">
        <a
          href={FACEBOOK_COMMUNITY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="social-card fb-card"
        >
          <div className="social-icon fb">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </div>
          <h3>{c('fb_title')}</h3>
          <p>{c('fb_desc')}</p>
          <span className="social-cta">{c('fb_cta')}</span>
        </a>
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="social-card ig-card"
        >
          <div className="social-icon ig">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </div>
          <h3>{c('ig_title')}</h3>
          <p>{c('ig_desc')}</p>
          <span className="social-cta">{c('ig_cta')}</span>
        </a>
      </div>
    </section>
  );
}
