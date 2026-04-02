'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { richTags } from '@/lib/richText';
import { SHOP_URL } from '@/lib/constants';

interface GearProduct {
  name: string;
  slug: string;
  price: number;
  image: string;
  sku: string;
}

const FALLBACK_PRODUCTS: GearProduct[] = [
  { name: 'The Jump', slug: 'the-jump', price: 38, image: '/images/product-men.webp', sku: 'CTEE-FR001' },
  { name: 'Mascot', slug: 'mascot', price: 38, image: '/images/product-women.webp', sku: 'STEE-GR001' },
  { name: 'Classic', slug: 'classic', price: 45, image: '/images/product-members.webp', sku: 'CTEE-FR002' },
];

export default function Gear() {
  const t = useTranslations('gear');
  const [products, setProducts] = useState<GearProduct[]>(FALLBACK_PRODUCTS);

  useEffect(() => {
    fetch('/api/products/random')
      .then((r) => r.json())
      .then((data) => {
        if (data.products?.length >= 3) setProducts(data.products);
      })
      .catch(() => { /* keep fallbacks */ });
  }, []);

  return (
    <section id="gear">
      <div className="section-label assemble">
        <span className="num">02</span> <span>{t('label')}</span>
      </div>
      <h2 className="section-title assemble delay-1">
        {t.rich('title', richTags)}
      </h2>
      <p className="section-desc assemble delay-2">{t('subtitle')}</p>

      <div className="gear-banner assemble delay-3">
        {/* Background image */}
        <div className="gear-banner-bg">
          <Image
            src="/images/banner-shop.png"
            alt=""
            fill
            sizes="(max-width:768px) 100vw, 1200px"
            style={{ objectFit: 'cover', objectPosition: 'center 25%' }}
            priority={false}
          />
        </div>

        <div className="gear-banner-inner">
          {/* Left: Tag + Title + Desc + CTA */}
          <div className="gear-banner-content">
            <span className="gear-banner-tag">{t('label')}</span>
            <h3 className="gear-banner-title">{t.rich('title', richTags)}</h3>
            <p className="gear-banner-desc">{t('subtitle')}</p>
            <a
              href={SHOP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="gear-cta-btn"
            >
              {t('cta')}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>

          {/* Right: Product thumbnails (dynamic from Supabase) */}
          <div className="gear-product-cards">
            {products.map((p) => (
              <a
                key={p.sku || p.slug}
                href={`${SHOP_URL}/product/${p.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="gear-product-card"
              >
                <div className="gear-product-img">
                  <Image
                    src={p.image}
                    alt={p.name}
                    width={120}
                    height={120}
                    unoptimized={p.image.startsWith('http')}
                  />
                </div>
                <span className="gear-product-name">{p.name}</span>
                <span className="gear-product-price">CA${p.price}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
