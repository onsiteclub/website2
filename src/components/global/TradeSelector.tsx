'use client';

import { useEffect, useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useTrade, TRADES, TradeId } from '@/providers/TradeProvider';

const TRADE_IDS: TradeId[] = ['default', 'wood', 'drywall', 'electrical', 'plumbing', 'concrete'];

export default function TradeSelector({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations('trade_selector');
  const { trade, setTrade } = useTrade();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  /* Focus trap */
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'button, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => document.removeEventListener('keydown', handleTab);
  }, [open]);

  /* ESC to close */
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  /* Prevent body scroll */
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const handleSelect = useCallback((tid: TradeId) => {
    setTrade(tid);
    onClose();
  }, [setTrade, onClose]);

  if (!open) return null;

  return (
    <>
      <div className="trade-overlay" onClick={onClose} aria-hidden="true" />
      <div
        ref={dialogRef}
        className="trade-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={t('title')}
      >
        <div className="trade-cards" role="radiogroup" aria-label={t('title')}>
          {TRADE_IDS.map((tid) => (
            <button
              ref={tid === TRADE_IDS[0] ? closeRef : undefined}
              key={tid}
              className={`trade-card${trade === tid ? ' trade-card-selected' : ''}`}
              role="radio"
              aria-checked={trade === tid}
              onClick={() => handleSelect(tid)}
            >
              {t(tid)}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
