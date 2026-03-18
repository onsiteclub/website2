'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/routing';
import { CALCULATOR_URL, TIMEKEEPER_URL } from '@/lib/constants';
import SearchDropdown from '@/components/global/SearchDropdown';

const TradeSelector = dynamic(() => import('@/components/global/TradeSelector'), { ssr: false });

export default function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [tradeOpen, setTradeOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

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

  // Listen for open-trade-selector event from ChatWidget
  useEffect(() => {
    const handler = () => setTradeOpen(true);
    document.addEventListener('open-trade-selector', handler);
    return () => document.removeEventListener('open-trade-selector', handler);
  }, []);

  // Close search on outside click
  useEffect(() => {
    if (!searchOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.search-wrapper')) {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [searchOpen]);

  const isHome = pathname === '/';
  const sectionHref = (hash: string) => (isHome ? hash : `/${hash}`);
  const handleNavClick = () => closeMenu();

  return (
    <>
      <nav id="mainNav" aria-label="Main navigation">
        {/* Logo */}
        <Link href="/" className="logo" aria-label="OnSite Club home">
          <Image src="/images/logo-onsite-club-02.png" alt="OnSite Club" width={150} height={40} priority />
        </Link>

        {/* Desktop nav links — visible on desktop, hidden on mobile */}
        <ul className="nav-links">
          <li><Link href="/" onClick={handleNavClick}>{t('home')}</Link></li>
          <li>
            <a href="https://shop.onsiteclub.ca" target="_blank" rel="noopener noreferrer">
              {t('shop')}
            </a>
          </li>
          <li><a href={sectionHref('#tools')}>{t('tools')}</a></li>
          <li><Link href="/learn/construction-steps">{t('learn')}</Link></li>
          <li><a href={sectionHref('#contact')}>{t('contact')}</a></li>
        </ul>

        {/* Right side: search + CTA */}
        <div className="nav-actions">
          {/* Search icon */}
          <div className="search-wrapper" ref={searchRef}>
            <button
              className={`nav-search-btn${searchOpen ? ' nav-search-btn-active' : ''}`}
              onClick={() => { setSearchOpen(true); setTimeout(() => searchInputRef.current?.focus(), 100); }}
              aria-label="Search"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            {searchOpen && (
              <div className="search-panel">
                <input
                  ref={searchInputRef}
                  type="text"
                  className="search-panel-input"
                  placeholder={t('search_placeholder')}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoComplete="off"
                />
              </div>
            )}
            <SearchDropdown
              open={searchOpen}
              query={searchQuery}
              onClose={() => { setSearchOpen(false); setSearchQuery(''); }}
            />
          </div>

          {/* CTA */}
          <a
            href="https://dashboard.onsiteclub.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
          >
            {t('member_area')}
          </a>
        </div>

        {/* Mobile hamburger — hidden on desktop */}
        <button
          className={`nav-menu-btn${menuOpen ? ' nav-menu-btn-active' : ''}`}
          onClick={toggleMenu}
          aria-label="Menu"
          aria-expanded={menuOpen}
          aria-controls="navDropdown"
        >
          <svg className="nav-menu-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        className={`nav-overlay${menuOpen ? ' nav-overlay-visible' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile dropdown */}
      <div
        id="navDropdown"
        className={`nav-dropdown${menuOpen ? ' nav-dropdown-open' : ''}`}
        role="navigation"
        aria-label="Main menu"
      >
        <ul className="nav-dropdown-links">
          <li><Link href="/" onClick={handleNavClick}>{t('home')}</Link></li>
          <li>
            <a href="https://shop.onsiteclub.ca" target="_blank" rel="noopener noreferrer" onClick={handleNavClick}>
              {t('shop')}
            </a>
          </li>
          <li><a href={sectionHref('#tools')} onClick={handleNavClick}>{t('tools')}</a></li>
          <li><Link href="/learn/construction-steps" onClick={handleNavClick}>{t('learn')}</Link></li>
          <li><a href={sectionHref('#contact')} onClick={handleNavClick}>{t('contact')}</a></li>
        </ul>

        <div className="nav-dropdown-extras">
          <div className="nav-dropdown-divider" />
          <a href={CALCULATOR_URL} target="_blank" rel="noopener noreferrer" className="nav-dropdown-tool" onClick={handleNavClick}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="4" y="2" width="16" height="20" rx="2" />
              <line x1="8" y1="6" x2="16" y2="6" />
            </svg>
            Calculator
          </a>
          <a href={TIMEKEEPER_URL} target="_blank" rel="noopener noreferrer" className="nav-dropdown-tool" onClick={handleNavClick}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            Timekeeper
          </a>
          <div className="nav-dropdown-divider" />
          <a
            href="https://dashboard.onsiteclub.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-dropdown-cta"
            onClick={handleNavClick}
          >
            {t('member_area')}
          </a>
        </div>
      </div>

      {/* Trade Selector Modal */}
      <TradeSelector open={tradeOpen} onClose={closeTradeSelector} />
    </>
  );
}
