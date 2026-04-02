'use client';

import { useTranslations } from 'next-intl';
import { LEARN_URL } from '@/lib/constants';

interface LearnCard {
  titleKey: string;
  descKey: string;
  badge: string;
  badgeClass: string;
  href: string;
  disabled?: boolean;
}

const CARDS: LearnCard[] = [
  {
    titleKey: 'card_certifications',
    descKey: 'card_certifications_desc',
    badge: 'FREE',
    badgeClass: 'learn-badge-free',
    href: LEARN_URL,
  },
  {
    titleKey: 'card_safety',
    descKey: 'card_safety_desc',
    badge: 'ESSENTIAL',
    badgeClass: 'learn-badge-essential',
    href: `${LEARN_URL}/safety-equipment`,
  },
  {
    titleKey: 'card_careers',
    descKey: 'card_careers_desc',
    badge: 'GUIDE',
    badgeClass: 'learn-badge-guide',
    href: `${LEARN_URL}/trades-guide`,
  },
  {
    titleKey: 'card_courses',
    descKey: 'card_courses_desc',
    badge: 'COMING SOON',
    badgeClass: 'learn-badge-coming',
    href: '#',
    disabled: true,
  },
];

export default function CoursesBadge() {
  const t = useTranslations('courses_badge');

  return (
    <section id="learn">
      <div className="section-label assemble">
        <span className="num">04</span> <span>{t('label')}</span>
      </div>
      <h2 className="section-title assemble delay-1">{t('title')}</h2>
      <p className="section-desc assemble delay-2">{t('desc')}</p>

      <div className="learn-cards-grid assemble delay-3">
        {CARDS.map((card) =>
          card.disabled ? (
            <div key={card.titleKey} className="learn-card learn-card-disabled">
              <span className={`learn-badge ${card.badgeClass}`}>
                {card.badge}
              </span>
              <h3 className="learn-card-title">{t(card.titleKey)}</h3>
              <p className="learn-card-desc">{t(card.descKey)}</p>
            </div>
          ) : (
            <a
              key={card.titleKey}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className="learn-card"
            >
              <span className={`learn-badge ${card.badgeClass}`}>
                {card.badge}
              </span>
              <h3 className="learn-card-title">{t(card.titleKey)}</h3>
              <p className="learn-card-desc">{t(card.descKey)}</p>
            </a>
          ),
        )}
      </div>
    </section>
  );
}
