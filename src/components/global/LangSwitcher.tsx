'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';

const LOCALES = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
  { code: 'pt', label: 'Português' },
] as const;

export default function LangSwitcher({ inline = false }: { inline?: boolean }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [open]);

  // Close on ESC
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setOpen(false);
  };

  // Inline mode = list inside mobile menu (no dropdown)
  if (inline) {
    return (
      <div className="lang-inline">
        {LOCALES.map((l) => (
          <button
            key={l.code}
            className={`lang-inline-btn${l.code === locale ? ' lang-inline-active' : ''}`}
            onClick={() => switchLocale(l.code)}
            aria-label={`Switch to ${l.label}`}
          >
            {l.code.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }

  // Desktop: icon button + dropdown
  return (
    <div className="lang-switcher" ref={ref}>
      <button
        className={`lang-toggle${open ? ' lang-toggle-active' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Change language"
        aria-expanded={open}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
        <span className="lang-code">{locale.toUpperCase()}</span>
      </button>

      {open && (
        <div className="lang-dropdown">
          {LOCALES.map((l) => (
            <button
              key={l.code}
              className={`lang-option${l.code === locale ? ' lang-option-active' : ''}`}
              onClick={() => switchLocale(l.code)}
            >
              <span className="lang-option-code">{l.code.toUpperCase()}</span>
              <span className="lang-option-label">{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
