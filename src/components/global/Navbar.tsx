'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname, routing } from '@/i18n/routing';
import BladesPopup from './BladesPopup';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [bladesOpen, setBladesOpen] = useState(false);

  const toggleMobile = () => setMobileOpen((v) => !v);
  const toggleBlades = () => setBladesOpen((v) => !v);
  const closeBlades = useCallback(() => setBladesOpen(false), []);

  const handleThemeToggle = () => {
    document.documentElement.classList.toggle('light-mode');
    const isLight = document.documentElement.classList.contains('light-mode');
    localStorage.setItem('onsite-theme', isLight ? 'light' : 'dark');
  };

  const handleLangCycle = () => {
    const locales = routing.locales;
    const idx = locales.indexOf(locale as (typeof locales)[number]);
    const next = locales[(idx + 1) % locales.length];
    router.replace(pathname, { locale: next });
  };

  return (
    <>
      <nav id="mainNav">
        <a href="#home" className="logo">
          <Image src="/images/logo-onsite-club-02.png" alt="OnSite Club" width={150} height={40} priority />
        </a>

        <button
          className="nav-toggle"
          id="navToggle"
          aria-label="Menu"
          onClick={toggleMobile}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul
          className={`nav-links${mobileOpen ? ' mobile-open' : ''}`}
          id="navLinks"
        >
          <li><a href="#home">{t('home')}</a></li>
          <li>
            <a href="https://shop.onsiteclub.ca" target="_blank" rel="noopener noreferrer">
              {t('shop')}
            </a>
          </li>
          <li><a href="#tools">{t('tools')}</a></li>
          <li><a href="#contact">{t('contact')}</a></li>
          <li>
            <button className="nav-blades" id="bladesPill" onClick={toggleBlades}>
              {t('earn_blades')}
            </button>
          </li>
          <li>
            <a href="https://dashboard.onsiteclub.ca" target="_blank" rel="noopener noreferrer" className="nav-cta">
              {t('member_area')}
            </a>
          </li>
        </ul>

        <button className="lang-toggle" id="langToggle" aria-label="Change language" onClick={handleLangCycle}>
          <svg className="lang-icon" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
          </svg>
          <span className="lang-code">{locale.toUpperCase()}</span>
        </button>

        <button className="theme-toggle" id="themeToggle" aria-label="Toggle theme" onClick={handleThemeToggle}>
          <svg className="icon-moon" viewBox="0 0 24 24">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
          <svg className="icon-sun" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        </button>
      </nav>

      <BladesPopup open={bladesOpen} onClose={closeBlades} />
    </>
  );
}
