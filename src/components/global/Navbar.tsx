'use client';

import { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter, usePathname, routing } from '@/i18n/routing';
import { useTrade, TRADES } from '@/providers/TradeProvider';

const TradeSelector = dynamic(() => import('@/components/global/TradeSelector'), { ssr: false });

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { trade } = useTrade();

  const [menuOpen, setMenuOpen] = useState(false);
  const [tradeOpen, setTradeOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((v) => !v);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const closeTradeSelector = useCallback(() => setTradeOpen(false), []);

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

  // Listen for set-trade event from ChatWidget
  useEffect(() => {
    const handler = () => setTradeOpen(true);
    document.addEventListener('open-trade-selector', handler);
    return () => document.removeEventListener('open-trade-selector', handler);
  }, []);

  const handleLangCycle = () => {
    const locales = routing.locales;
    const idx = locales.indexOf(locale as (typeof locales)[number]);
    const next = locales[(idx + 1) % locales.length];
    router.replace(pathname, { locale: next });
  };

  const handleNavClick = () => closeMenu();

  const tradeInfo = TRADES[trade];

  return (
    <>
      <nav id="mainNav" aria-label="Main navigation">
        {/* Logo */}
        <a href="#home" className="logo" aria-label="OnSite Club home">
          <Image src="/images/logo-onsite-club-02.png" alt="OnSite Club" width={150} height={40} priority />
        </a>

        {/* Menu trigger */}
        <button
          className={`nav-menu-btn${menuOpen ? ' nav-menu-btn-active' : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls="navDropdown"
        >
          <svg className="nav-menu-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

          {/* Trade indicator */}
          <button
            className="trade-indicator"
            onClick={() => setTradeOpen(true)}
            aria-label="Choose trade"
          >
            <span className="trade-indicator-icon">{tradeInfo.icon}</span>
          </button>

          <button className="lang-toggle" id="langToggle" aria-label="Change language" onClick={handleLangCycle}>
            <svg className="lang-icon" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            <span className="lang-code">{locale.toUpperCase()}</span>
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
        id="navDropdown"
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
          <li><Link href="/learn/construction-steps" onClick={handleNavClick}>{t('learn')}</Link></li>
          <li><a href="#contact" onClick={handleNavClick}>{t('contact')}</a></li>
        </ul>
      </div>

      {/* Trade Selector Modal */}
      <TradeSelector open={tradeOpen} onClose={closeTradeSelector} />
    </>
  );
}
