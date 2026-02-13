'use client';

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
            window.location.href = `mailto:contact@shabba.ca?subject=${subject}&body=${body}`;
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

        <div className="assemble delay-4" style={{ paddingTop: '20px' }}>
          <div style={{ marginBottom: '32px' }}>
            <span className="section-label" style={{ marginBottom: '8px' }}>{t('info_location_label')}</span>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>{t('info_location')}</p>
          </div>
          <div style={{ marginBottom: '32px' }}>
            <span className="section-label" style={{ marginBottom: '8px' }}>{t('info_email_label')}</span>
            <p>
              <a href="mailto:contact@shabba.ca" style={{ color: 'var(--accent)', fontSize: '0.95rem' }}>
                contact@shabba.ca
              </a>
            </p>
          </div>
          <div>
            <span className="section-label" style={{ marginBottom: '8px' }}>{t('info_social_label')}</span>
            <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
              <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}>
                Facebook
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }}>
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
