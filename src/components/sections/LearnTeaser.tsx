'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

const LEARN_CARDS = [
  { slug: 'construction-steps', image: '/images/learn.png', key: 'card_steps', alt: 'Construction career pathway guide' },
  { slug: 'safety-equipment', image: '/images/epis.png', key: 'card_safety', alt: 'Construction safety equipment and PPE' },
  { slug: 'trades-guide', image: '/images/trades.png', key: 'card_trades', alt: 'Construction trades overview' },
  { slug: 'starter-kit', image: '/images/kit-tools.webp', key: 'card_kit', alt: 'Construction starter toolkit' },
] as const;

export default function LearnTeaser() {
  const t = useTranslations('learn_teaser');

  return (
    <section id="learn">
      <div className="section-label assemble">
        <span className="num">05</span> <span>{t('label')}</span>
      </div>
      <h2 className="section-title assemble delay-1">{t('heading')}</h2>

      <div className="learn-teaser-grid">
        {LEARN_CARDS.map((card, i) => (
          <Link
            key={card.slug}
            href={`/learn/${card.slug}`}
            className={`learn-teaser-card assemble delay-${i + 2}`}
          >
            <div className="learn-teaser-img">
              <Image src={card.image} alt={card.alt} fill sizes="(max-width: 768px) 100vw, 33vw" />
            </div>
            <div className="learn-teaser-body">
              <span className="learn-teaser-title">{t(card.key)}</span>
              <span className="learn-teaser-cta">{t('card_cta')} &rarr;</span>
            </div>
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
