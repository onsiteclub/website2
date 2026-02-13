'use client';

import { useTranslations } from 'next-intl';

export default function Manifesto() {
  const t = useTranslations('manifesto');

  return (
    <section
      aria-label="Mission statement"
      className="manifesto"
    >
      <div className="manifesto-rule assemble" aria-hidden="true" />
      <blockquote className="manifesto-quote assemble delay-1">
        <p>{t('line1')}</p>
        <p className="manifesto-highlight">{t('line2')}</p>
      </blockquote>
      <div className="manifesto-rule assemble delay-2" aria-hidden="true" />
    </section>
  );
}
