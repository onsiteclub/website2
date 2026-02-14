'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, useRouter, usePathname, routing } from '@/i18n/routing';
import { CALCULATOR_URL, TIMEKEEPER_URL } from '@/lib/constants';
import SearchDropdown from '@/components/global/SearchDropdown';

const TradeSelector = dynamic(() => import('@/components/global/TradeSelector'), { ssr: false });

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [tradeOpen, setTradeOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [toolOpen, setToolOpen] = useState<'calc' | 'time' | null>(null);
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

  // Listen for set-trade event from ChatWidget
  useEffect(() => {
    const handler = () => setTradeOpen(true);
    document.addEventListener('open-trade-selector', handler);
    return () => document.removeEventListener('open-trade-selector', handler);
  }, []);

  const handleLangSelect = (lang: string) => {
    setLangOpen(false);
    if (lang !== locale) {
      router.replace(pathname, { locale: lang });
    }
  };

  // Close dropdowns on outside click
  useEffect(() => {
    if (!langOpen && !toolOpen && !searchOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (langOpen && !target.closest('.lang-dropdown-wrapper')) setLangOpen(false);
      if (toolOpen && !target.closest('.tool-dropdown-wrapper')) setToolOpen(null);
      if (searchOpen && !target.closest('.search-wrapper')) {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [langOpen, toolOpen, searchOpen]);

  const isHome = pathname === '/';

  /* Build href for section anchors — on homepage scroll, on other pages navigate to /#section */
  const sectionHref = (hash: string) => (isHome ? hash : `/${hash}`);

  const handleNavClick = () => closeMenu();

  return (
    <>
      <nav id="mainNav" aria-label="Main navigation">
        {/* Logo */}
        <Link href="/" className="logo" aria-label="OnSite Club home">
          <Image src="/images/logo-onsite-club-02.png" alt="OnSite Club" width={150} height={40} priority />
        </Link>

        {/* Menu trigger */}
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

        {/* Search bar with dropdown */}
        <div className="search-wrapper" ref={searchRef}>
          <div
            className={`nav-search-bar${searchOpen ? ' nav-search-bar-active' : ''}`}
            onClick={() => { setSearchOpen(true); searchInputRef.current?.focus(); }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              className="nav-search-input"
              placeholder={t('search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchOpen(true)}
              aria-label="Search"
              autoComplete="off"
            />
          </div>
          <SearchDropdown
            open={searchOpen}
            query={searchQuery}
            onClose={() => { setSearchOpen(false); setSearchQuery(''); }}
          />
        </div>

        {/* Tool buttons */}
        <div className="nav-tools">
          <div className="tool-dropdown-wrapper">
            <button
              className="nav-tool-btn"
              onClick={() => setToolOpen(toolOpen === 'calc' ? null : 'calc')}
              aria-expanded={toolOpen === 'calc'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="4" y="2" width="16" height="20" rx="2" />
                <line x1="8" y1="6" x2="16" y2="6" />
                <line x1="8" y1="14" x2="8" y2="14.01" />
                <line x1="12" y1="14" x2="12" y2="14.01" />
                <line x1="16" y1="14" x2="16" y2="14.01" />
                <line x1="8" y1="18" x2="8" y2="18.01" />
                <line x1="12" y1="18" x2="12" y2="18.01" />
                <line x1="16" y1="18" x2="16" y2="18.01" />
              </svg>
              Calculator
            </button>
            {toolOpen === 'calc' && (
              <ul className="tool-dropdown">
                <li><a href={CALCULATOR_URL} target="_blank" rel="noopener noreferrer">Web App</a></li>
                <li><span className="tool-dropdown-soon">iOS (soon)</span></li>
                <li><span className="tool-dropdown-soon">Android (soon)</span></li>
              </ul>
            )}
          </div>
          <div className="tool-dropdown-wrapper">
            <button
              className="nav-tool-btn"
              onClick={() => setToolOpen(toolOpen === 'time' ? null : 'time')}
              aria-expanded={toolOpen === 'time'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Timekeeper
            </button>
            {toolOpen === 'time' && (
              <ul className="tool-dropdown">
                <li><a href={TIMEKEEPER_URL} target="_blank" rel="noopener noreferrer">Web App</a></li>
                <li><span className="tool-dropdown-soon">iOS (soon)</span></li>
                <li><span className="tool-dropdown-soon">Android (soon)</span></li>
              </ul>
            )}
          </div>
        </div>

        {/* Right actions */}
        <div className="nav-actions">
          <div className="lang-dropdown-wrapper">
            <button
              className="lang-toggle"
              onClick={() => setLangOpen((v) => !v)}
              aria-label="Change language"
              aria-expanded={langOpen}
            >
              <svg className="lang-icon" viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <span className="lang-code">{locale.toUpperCase()}</span>
            </button>
            {langOpen && (
              <ul className="lang-dropdown" role="listbox" aria-label="Language">
                {routing.locales.map((loc) => (
                  <li key={loc}>
                    <button
                      className={`lang-option${loc === locale ? ' lang-option-active' : ''}`}
                      role="option"
                      aria-selected={loc === locale}
                      onClick={() => handleLangSelect(loc)}
                    >
                      {loc.toUpperCase()}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <a
            href="https://dashboard.onsiteclub.ca"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
          >
            {t('member_area')}
          </a>
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

        {/* Extra items shown inside menu on mobile */}
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
