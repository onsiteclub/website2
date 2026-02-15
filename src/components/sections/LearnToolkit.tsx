'use client';

import { useTranslations } from 'next-intl';
import { useTrade } from '@/providers/TradeProvider';
import { STARTER_KITS } from '@/data/starterKit';

export default function LearnToolkit() {
  const t = useTranslations('starter_kit');
  const { trade } = useTrade();
  const tools = STARTER_KITS[trade];

  const subtitleKey =
    trade === 'default'
      ? 'subtitle_default'
      : (`subtitle_${trade}` as const);

  return (
    <div className="learn-toolkit">
      <h2 className="learn-toolkit-heading">{t('heading')}</h2>
      <p className="learn-toolkit-subtitle">{t(subtitleKey)}</p>

      <div className="learn-toolkit-grid">
        {tools.map((tool) => (
          <div key={tool.key} className="learn-toolkit-card">
            <span className="learn-toolkit-emoji">{tool.emoji}</span>
            <span className="learn-toolkit-name">{t(tool.key)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
