'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { richTags } from '@/lib/richText';
import { PRODUCTS, SHOP_URL } from '@/lib/constants';
import { useTrade, TRADES } from '@/providers/TradeProvider';
import { getTradeText } from '@/data/tradeContent';

export default function Gear() {
  const t = useTranslations('gear');
  const locale = useLocale();
  const { trade } = useTrade();
  const slogan = getTradeText(trade, 'shop_slogan', locale);

  return (
    <section id="gear">
      <div className="shop-title assemble">
        <div className="section-label">
          <span className="num">02</span> <span>{t('label')}</span>
        </div>
        <h2 className="section-title assemble delay-1">
          {t.rich('title', richTags)}
        </h2>
      </div>

      <div className="gear-bar assemble delay-2">
        {slogan && (
          <span className="gear-slogan">
            {slogan} &mdash; {TRADES[trade].name} Collection
          </span>
        )}
        <a href={SHOP_URL} target="_blank" rel="noopener noreferrer" className="gear-collection-link">
          {t('see_all')} &rarr;
        </a>
      </div>

      <div className="gear-grid assemble delay-2">
        {PRODUCTS.map((product) => (
          <a
            key={product.name}
            href={SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="gear-card"
          >
            <div className="gear-card-image">
              <Image src={product.image} alt={product.alt} width={600} height={600} />
            </div>
            <div className="gear-card-info">
              <span className="gear-card-name">{product.name}</span>
              <span className="gear-card-price">{product.price}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
