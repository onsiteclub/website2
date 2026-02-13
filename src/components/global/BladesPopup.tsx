'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { richTags } from '@/lib/richText';
import { DASHBOARD_URL } from '@/lib/constants';

interface BladesPopupProps {
  open: boolean;
  onClose: () => void;
}

export default function BladesPopup({ open, onClose }: BladesPopupProps) {
  const t = useTranslations('blades');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }

    const timer = setTimeout(() => {
      document.addEventListener('click', handleClick);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('click', handleClick);
    };
  }, [open, onClose]);

  return (
    <div
      ref={ref}
      className={`blades-popup${open ? ' open' : ''}`}
      id="bladesPopup"
      role="dialog"
      aria-label="Blades loyalty program"
      aria-modal="true"
      aria-hidden={!open}
    >
      <h4>{t('title')}</h4>
      <p>{t.rich('description', richTags)}</p>
      <a
        href={DASHBOARD_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary"
        style={{ display: 'block', textAlign: 'center' }}
      >
        {t('cta')}
      </a>
    </div>
  );
}
