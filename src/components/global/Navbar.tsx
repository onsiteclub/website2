'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname, routing } from '@/i18n/routing';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((v) => !v);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Close on ESC
  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [menuOpen, closeMenu]);

  // Prevent body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

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

  const handleNavClick = () => closeMenu();

  return (
    <>
      <nav id="mainNav">
        {/* Logo */}
        <a href="#home" className="logo">
          <Image src="/images/logo-onsite-club-02.png" alt="OnSite Club" width={150} height={40} priority />
        </a>

        {/* Menu trigger */}
        <button
          className={`nav-menu-btn${menuOpen ? ' nav-menu-btn-active' : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          <svg className="nav-menu-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
          <span className="nav-menu-label">{t('menu')}</span>
        </button>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Right actions */}
        <div className="nav-actions">
          <a
            href="https://dashboard.onsiteclub.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
          >
            {t('member_area')}
          </a>

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
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`nav-overlay${menuOpen ? ' nav-overlay-visible' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Dropdown panel */}
      <div
        className={`nav-dropdown${menuOpen ? ' nav-dropdown-open' : ''}`}
        role="navigation"
        aria-label="Main menu"
      >
        <ul className="nav-dropdown-links">
          <li><a href="#home" onClick={handleNavClick}>{t('home')}</a></li>
          <li>
            <a href="https://shop.onsiteclub.ca" target="_blank" rel="noopener noreferrer" onClick={handleNavClick}>
              {t('shop')}
            </a>
          </li>
          <li><a href="#tools" onClick={handleNavClick}>{t('tools')}</a></li>
          <li><a href="/learn/construction-steps" onClick={handleNavClick}>{t('learn')}</a></li>
          <li><a href="#contact" onClick={handleNavClick}>{t('contact')}</a></li>
        </ul>
      </div>
    </>
  );
}
