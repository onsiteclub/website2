'use client';

import { useTranslations } from 'next-intl';
import { richTags } from '@/lib/richText';

export default function ManifestoStrip() {
  const c = useTranslations('community');

  return (
    <div className="manifesto-strip assemble" aria-label="Brand statement">
      <p className="manifesto-strip-text">
        {c.rich('manifesto_strip', richTags)}
      </p>
    </div>
  );
}
