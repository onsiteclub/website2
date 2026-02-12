'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { richTags } from '@/lib/richText';
import { PRODUCTS, SHOP_URL } from '@/lib/constants';

export default function Shop() {
  const t = useTranslations('shop');

  return (
    <section id="shop">
      <div className="shop-title assemble">
        <div className="section-label">
          <span className="num">02</span> <span>{t('label')}</span>
        </div>
        <h2 className="section-title assemble delay-1">
          {t.rich('title', richTags)}
        </h2>
      </div>

      <div className="product-showcase assemble delay-2" id="productShowcase">
        {PRODUCTS.map((product) => (
          <a
            key={product.name}
            href={SHOP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`showcase-item ${product.variant === 'main' ? 'showcase-main' : 'showcase-thumb'}`}
          >
            <div className="showcase-image">
              <Image src={product.image} alt={product.alt} width={600} height={600} />
            </div>
            <div className="showcase-overlay">
              <span className="showcase-name">{product.name}</span>
              <span className="showcase-price">{product.price}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
