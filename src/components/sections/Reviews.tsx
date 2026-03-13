'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { richTags } from '@/lib/richText';

interface ShopReview {
  id: string;
  customer_name: string;
  rating: number;
  title: string;
  comment: string;
  product_names: string[];
  created_at: string;
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="review-stars" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < rating ? 'star filled' : 'star'}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function Reviews() {
  const t = useTranslations('reviews');
  const [reviews, setReviews] = useState<ShopReview[]>([]);

  useEffect(() => {
    fetch('https://shop.onsiteclub.ca/api/reviews')
      .then((r) => r.json())
      .then((data) => {
        if (data.reviews?.length) {
          setReviews(data.reviews);
        }
      })
      .catch(() => {
        // silently fail — section stays hidden
      });
  }, []);

  if (reviews.length === 0) return null;

  return (
    <section id="reviews">
      <div className="section-label assemble">
        <span className="num">03</span> <span>{t('label')}</span>
      </div>
      <h2 className="section-title assemble delay-1">
        {t.rich('title', richTags)}
      </h2>

      <div className="reviews-grid assemble delay-2">
        {reviews.map((review, i) => (
          <div key={review.id} className={`review-card assemble delay-${i + 2}`}>
            <div className="review-avatar">
              {review.customer_name.charAt(0).toUpperCase()}
            </div>
            <Stars rating={review.rating} />
            {review.title && (
              <span className="review-title">{review.title}</span>
            )}
            <p className="review-text">&ldquo;{review.comment}&rdquo;</p>
            <div className="review-author">
              <span className="review-name">{review.customer_name}</span>
              <span className="review-badge">{t('verified')}</span>
            </div>
            {review.product_names.length > 0 && (
              <span className="review-product">{review.product_names[0]}</span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
