'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { richTags } from '@/lib/richText';
import { PRODUCTS, SHOP_URL } from '@/lib/constants';
import { useTrade, TRADES } from '@/providers/TradeProvider';
import { getTradeText } from '@/data/tradeContent';

interface ShopProduct {
  name: string;
  price: number;
  image: string;
  url: string;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Gear() {
  const t = useTranslations('gear');
  const locale = useLocale();
  const { trade } = useTrade();
  const slogan = getTradeText(trade, 'shop_slogan', locale);

  const [products, setProducts] = useState<ShopProduct[] | null>(null);

  useEffect(() => {
    fetch('https://shop.onsiteclub.ca/api/featured')
      .then((r) => r.json())
      .then((data) => {
        if (data.products?.length) {
          setProducts(shuffle(data.products));
        }
      })
      .catch(() => {
        // fallback handled by render below
      });
  }, []);

  // Fallback to hardcoded products
  const fallback = PRODUCTS.map((p) => ({
    name: p.name,
    price: p.price,
    image: p.image,
    url: SHOP_URL,
    isLocal: true,
  }));

  const items = products
    ? products.map((p) => ({ ...p, price: `CA$${p.price.toFixed(2)}`, isLocal: false }))
    : fallback.map((p) => ({ ...p, price: p.price, isLocal: true }));

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
        {items.map((product) => (
          <a
            key={product.name}
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="gear-card"
          >
            <div className="gear-card-image">
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={600}
                {...(!product.isLocal && { unoptimized: true })}
              />
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
