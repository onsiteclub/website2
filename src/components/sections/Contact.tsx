'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { richTags } from '@/lib/richText';
import { FACEBOOK_URL, INSTAGRAM_URL } from '@/lib/constants';

export default function Contact() {
  const t = useTranslations('contact');

  return (
    <section id="contact">
      <div className="section-label assemble">
        <span className="num">05</span> <span>{t('label')}</span>
      </div>
      <h2 className="section-title assemble delay-1">
        {t.rich('title', richTags)}
      </h2>
      <p className="section-desc assemble delay-2">{t('description')}</p>

      <div className="contact-grid">
        <div className="assemble delay-3">
          <form className="contact-form" onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const name = formData.get('name') || '';
            const email = formData.get('email') || '';
            const message = formData.get('message') || '';
            const subject = encodeURIComponent(`Contact from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
            window.location.href = `mailto:contact@onsiteclub.ca?subject=${subject}&body=${body}`;
          }}>
            <div className="form-group">
              <label htmlFor="contact-name">{t('name_label')}</label>
              <input type="text" id="contact-name" name="name" placeholder={t('name_placeholder')} required />
            </div>
            <div className="form-group">
              <label htmlFor="contact-email">{t('email_label')}</label>
              <input type="email" id="contact-email" name="email" placeholder={t('email_placeholder')} required />
            </div>
            <div className="form-group">
              <label htmlFor="contact-message">{t('message_label')}</label>
              <textarea id="contact-message" name="message" placeholder={t('message_placeholder')} required />
            </div>
            <button type="submit" className="btn-primary">{t('submit')}</button>
            <span className="form-note">{t('note')}</span>
          </form>
        </div>

        <div className="assemble delay-4">
          <div className="contact-photo">
            <Image src="/images/contact-worker-phone.png" alt="Construction worker on phone" width={480} height={360} />
          </div>
          <div className="contact-info-row">
            <div className="contact-info-col">
              <div style={{ marginBottom: '28px' }}>
                <span className="section-label" style={{ marginBottom: '8px' }}>{t('info_location_label')}</span>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{t('info_location')}</p>
              </div>
              <div>
                <span className="section-label" style={{ marginBottom: '8px' }}>{t('info_email_label')}</span>
                <p>
                  <a href="mailto:contact@onsiteclub.ca" style={{ color: 'var(--accent)', fontSize: '0.95rem' }}>
                    contact@onsiteclub.ca
                  </a>
                </p>
              </div>
            </div>
            <div className="contact-social-big">
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="contact-social-card fb">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Facebook</span>
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="contact-social-card ig">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E1306C" strokeWidth="1.5" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle cx="17.5" cy="6.5" r="1.5" fill="#E1306C" stroke="none" />
                </svg>
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
