'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import {
  SHOP_URL,
  CALCULATOR_URL,
  TIMEKEEPER_URL,
  DASHBOARD_URL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
} from '@/lib/constants';

/* ── Searchable item definition ── */
interface SearchItem {
  id: string;
  category: 'sections' | 'learn' | 'apps' | 'shop' | 'social';
  keywords: string[];
  href: string;
  isExternal: boolean;
  isAnchor: boolean; // scroll to section on same page
  labelKey: string;  // i18n key under 'sitemap' or 'nav' namespace
  namespace: 'sitemap' | 'nav';
}

const SEARCH_ITEMS: SearchItem[] = [
  // Sections (anchor scroll)
  { id: 'home', category: 'sections', keywords: ['home', 'inicio', 'accueil', 'hero', 'top'], href: '#home', isExternal: false, isAnchor: true, labelKey: 'home', namespace: 'sitemap' },
  { id: 'tools', category: 'sections', keywords: ['tools', 'ferramentas', 'outils', 'herramientas', 'apps', 'digital'], href: '#tools', isExternal: false, isAnchor: true, labelKey: 'tools_link', namespace: 'sitemap' },
  { id: 'gear', category: 'sections', keywords: ['gear', 'shop', 'loja', 'tienda', 'boutique', 'products', 'tshirt', 'clothing'], href: '#gear', isExternal: false, isAnchor: true, labelKey: 'gear_link', namespace: 'sitemap' },
  { id: 'learn', category: 'sections', keywords: ['learn', 'aprender', 'apprendre', 'education', 'guide', 'articles'], href: '#learn', isExternal: false, isAnchor: true, labelKey: 'learn_heading', namespace: 'sitemap' },
  { id: 'contact', category: 'sections', keywords: ['contact', 'contato', 'contacto', 'email', 'form', 'message'], href: '#contact', isExternal: false, isAnchor: true, labelKey: 'contact', namespace: 'sitemap' },

  // Learn articles (route links)
  { id: 'learn-steps', category: 'learn', keywords: ['construction', 'steps', 'started', 'getting', 'ontario', 'work', 'begin', 'passos'], href: '/learn/construction-steps', isExternal: false, isAnchor: false, labelKey: 'learn_construction_steps', namespace: 'sitemap' },
  { id: 'learn-safety', category: 'learn', keywords: ['safety', 'equipment', 'epi', 'ppe', 'helmet', 'boots', 'seguranca', 'securite'], href: '/learn/safety-equipment', isExternal: false, isAnchor: false, labelKey: 'learn_safety_equipment', namespace: 'sitemap' },
  { id: 'learn-trades', category: 'learn', keywords: ['trades', 'guide', 'career', 'electrician', 'plumber', 'carpenter', 'oficios'], href: '/learn/trades-guide', isExternal: false, isAnchor: false, labelKey: 'learn_trades_guide', namespace: 'sitemap' },
  { id: 'learn-calc', category: 'learn', keywords: ['calculator', 'calc', 'guide', 'voice', 'inch', 'measure', 'calculadora'], href: '/learn/calculator-guide', isExternal: false, isAnchor: false, labelKey: 'learn_calculator_guide', namespace: 'sitemap' },
  { id: 'learn-time', category: 'learn', keywords: ['timekeeper', 'time', 'setup', 'hours', 'gps', 'tracking', 'relogio'], href: '/learn/timekeeper-setup', isExternal: false, isAnchor: false, labelKey: 'learn_timekeeper_setup', namespace: 'sitemap' },
  { id: 'learn-terms', category: 'learn', keywords: ['terminology', 'terms', 'glossary', 'vocabulary', 'words', 'termos', 'terminologia'], href: '/learn/construction-terminology', isExternal: false, isAnchor: false, labelKey: 'learn_terminology', namespace: 'sitemap' },

  // Apps (external URLs)
  { id: 'app-calc', category: 'apps', keywords: ['calculator', 'calc', 'voice', 'inch', 'measure', 'app', 'calculadora'], href: CALCULATOR_URL, isExternal: true, isAnchor: false, labelKey: 'calculator', namespace: 'sitemap' },
  { id: 'app-time', category: 'apps', keywords: ['timekeeper', 'time', 'hours', 'gps', 'clock', 'tracker', 'relogio'], href: TIMEKEEPER_URL, isExternal: true, isAnchor: false, labelKey: 'timekeeper', namespace: 'sitemap' },
  { id: 'app-dashboard', category: 'apps', keywords: ['dashboard', 'member', 'hub', 'login', 'account', 'painel', 'membro'], href: DASHBOARD_URL, isExternal: true, isAnchor: false, labelKey: 'member_hub', namespace: 'sitemap' },

  // Shop
  { id: 'shop', category: 'shop', keywords: ['shop', 'store', 'buy', 'products', 'tshirt', 'loja', 'comprar', 'tienda'], href: SHOP_URL, isExternal: true, isAnchor: false, labelKey: 'all_products', namespace: 'sitemap' },

  // Social
  { id: 'facebook', category: 'social', keywords: ['facebook', 'fb', 'social', 'page'], href: FACEBOOK_URL, isExternal: true, isAnchor: false, labelKey: 'facebook', namespace: 'sitemap' },
  { id: 'instagram', category: 'social', keywords: ['instagram', 'ig', 'insta', 'social', 'photos'], href: INSTAGRAM_URL, isExternal: true, isAnchor: false, labelKey: 'instagram', namespace: 'sitemap' },
];

const CATEGORY_ORDER: SearchItem['category'][] = ['sections', 'learn', 'apps', 'shop', 'social'];

interface Props {
  open: boolean;
  query: string;
  onClose: () => void;
}

export default function SearchDropdown({ open, query, onClose }: Props) {
  const t = useTranslations('sitemap');
  const ts = useTranslations('search');
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === '/';
  const [activeIdx, setActiveIdx] = useState(-1);
  const listRef = useRef<HTMLDivElement>(null);

  /* ── Filter items ── */
  const q = query.toLowerCase().trim();
  const filtered = q.length === 0
    ? SEARCH_ITEMS
    : SEARCH_ITEMS.filter((item) => {
        const label = t(item.labelKey).toLowerCase();
        if (label.includes(q)) return true;
        return item.keywords.some((kw) => kw.includes(q));
      });

  /* ── Group by category ── */
  const grouped = CATEGORY_ORDER
    .map((cat) => ({
      category: cat,
      items: filtered.filter((item) => item.category === cat),
    }))
    .filter((group) => group.items.length > 0);

  const flatItems = grouped.flatMap((g) => g.items);

  /* Reset active index on query change */
  useEffect(() => { setActiveIdx(-1); }, [query]);

  /* ── Keyboard navigation ── */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIdx((prev) => (prev < flatItems.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIdx((prev) => (prev > 0 ? prev - 1 : flatItems.length - 1));
      } else if (e.key === 'Enter' && activeIdx >= 0 && activeIdx < flatItems.length) {
        e.preventDefault();
        const item = flatItems[activeIdx];
        handleSelect(item);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [open, flatItems.length, activeIdx],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  /* ── Scroll active item into view ── */
  useEffect(() => {
    if (activeIdx < 0 || !listRef.current) return;
    const el = listRef.current.querySelector(`[data-idx="${activeIdx}"]`);
    if (el) el.scrollIntoView({ block: 'nearest' });
  }, [activeIdx]);

  /* ── Handle selection ── */
  function handleSelect(item: SearchItem) {
    onClose();
    if (item.isAnchor) {
      if (isHome) {
        const el = document.querySelector(item.href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        router.push(`/${item.href}`);
      }
    } else if (item.isExternal) {
      window.open(item.href, '_blank', 'noopener,noreferrer');
    }
    // For internal routes (learn pages), the Link component handles navigation
  }

  function openChat() {
    onClose();
    document.dispatchEvent(new Event('open-chat'));
  }

  if (!open) return null;

  const categoryLabel = (cat: SearchItem['category']) => {
    switch (cat) {
      case 'sections': return ts('cat_sections');
      case 'learn': return ts('cat_learn');
      case 'apps': return ts('cat_apps');
      case 'shop': return ts('cat_shop');
      case 'social': return ts('cat_social');
    }
  };

  let runningIdx = 0;

  return (
    <div className="search-dropdown" ref={listRef}>
      {grouped.length === 0 ? (
        <div className="search-no-results">
          <p>{ts('no_results')}</p>
          <button className="search-ask-prumo" onClick={openChat}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            {ts('ask_assistant')}
          </button>
        </div>
      ) : (
        <>
          {grouped.map((group) => {
            const startIdx = runningIdx;
            return (
              <div key={group.category} className="search-group">
                <div className="search-category">{categoryLabel(group.category)}</div>
                {group.items.map((item, i) => {
                  const idx = startIdx + i;
                  runningIdx = idx + 1;

                  const inner = (
                    <>
                      <span className="search-item-label">{t(item.labelKey)}</span>
                      {item.isExternal && (
                        <svg className="search-item-external" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <polyline points="15 3 21 3 21 9" />
                          <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                      )}
                    </>
                  );

                  if (!item.isExternal && !item.isAnchor) {
                    // Internal route (learn pages)
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        className={`search-item${idx === activeIdx ? ' search-item-active' : ''}`}
                        data-idx={idx}
                        onClick={() => onClose()}
                        onMouseEnter={() => setActiveIdx(idx)}
                      >
                        {inner}
                      </Link>
                    );
                  }

                  return (
                    <button
                      key={item.id}
                      className={`search-item${idx === activeIdx ? ' search-item-active' : ''}`}
                      data-idx={idx}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setActiveIdx(idx)}
                    >
                      {inner}
                    </button>
                  );
                })}
              </div>
            );
          })}
          {q.length > 0 && (
            <div className="search-footer">
              <button className="search-ask-prumo" onClick={openChat}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
                {ts('ask_assistant')}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
