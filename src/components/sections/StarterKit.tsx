'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useTrade } from '@/providers/TradeProvider';
import { STARTER_KITS } from '@/data/starterKit';

export default function StarterKit() {
  const t = useTranslations('starter_kit');
  const { trade } = useTrade();
  const tools = STARTER_KITS[trade];

  const subtitleKey =
    trade === 'default'
      ? 'subtitle_default'
      : `subtitle_${trade}` as const;

  return (
    <section id="starter-kit">
      <div className="section-label assemble">
        <span className="num">05</span> <span>{t('label')}</span>
      </div>
      <h2 className="section-title assemble delay-1">{t('heading')}</h2>
      <p className="starter-kit-subtitle assemble delay-2">
        {t(subtitleKey)}
      </p>

      <div className="starter-kit-grid assemble delay-3">
        {tools.map((tool) => (
          <div key={tool.key} className="starter-kit-card">
            <span className="starter-kit-emoji">{tool.emoji}</span>
            <span className="starter-kit-name">{t(tool.key)}</span>
          </div>
        ))}
      </div>

      <div className="starter-kit-footer assemble delay-4">
        <Link href="/learn/safety-equipment" className="btn-secondary">
          {t('cta')} &rarr;
        </Link>
      </div>
    </section>
  );
}
