'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const LEARN_CARDS = [
  { slug: 'construction-steps', icon: '\u{1F3D7}\uFE0F', key: 'card_steps' },
  { slug: 'safety-equipment', icon: '\u{1F512}', key: 'card_safety' },
  { slug: 'trades-guide', icon: '\u{1F4CB}', key: 'card_trades' },
] as const;

export default function LearnTeaser() {
  const t = useTranslations('learn_teaser');

  return (
    <section id="learn">
      <div className="section-label assemble">
        <span className="num">03</span> <span>{t('label')}</span>
      </div>
      <h2 className="section-title assemble delay-1">{t('heading')}</h2>

      <div className="learn-teaser-grid">
        {LEARN_CARDS.map((card, i) => (
          <Link
            key={card.slug}
            href={`/learn/${card.slug}`}
            className={`learn-teaser-card assemble delay-${i + 2}`}
          >
            <span className="learn-teaser-icon">{card.icon}</span>
            <span className="learn-teaser-title">{t(card.key)}</span>
            <span className="learn-teaser-cta">{t('card_cta')} &rarr;</span>
          </Link>
        ))}
      </div>

      <div className="learn-teaser-footer assemble delay-5">
        <Link href="/learn/construction-steps" className="btn-secondary">
          {t('see_all')} &rarr;
        </Link>
      </div>
    </section>
  );
}
