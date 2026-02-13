'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useTrade, TRADES, TradeId } from '@/providers/TradeProvider';
import { getTradeText } from '@/data/tradeContent';

const TRADE_IDS: TradeId[] = ['default', 'wood', 'drywall', 'electrical', 'plumbing', 'concrete'];

export default function TradeSelector({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations('trade_selector');
  const locale = useLocale();
  const { trade, setTrade } = useTrade();
  const [selected, setSelected] = useState<TradeId>(trade);
  const [toast, setToast] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  /* Sync selected when trade changes externally */
  useEffect(() => { setSelected(trade); }, [trade]);

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

  const handleApply = useCallback(() => {
    setTrade(selected);
    const msg = getTradeText(selected, 'welcome_toast', locale);
    if (msg) {
      setToast(msg);
      setTimeout(() => setToast(''), 3000);
    }
    onClose();
  }, [selected, setTrade, onClose, locale]);

  if (!open && !toast) return null;

  return (
    <>
      {/* Welcome toast */}
      {toast && (
        <div className="trade-toast" role="status" aria-live="polite">
          {toast}
        </div>
      )}

      {open && (
        <>
          <div className="trade-overlay" onClick={onClose} aria-hidden="true" />
          <div
            ref={dialogRef}
            className="trade-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={t('title')}
          >
        <div className="trade-dialog-header">
          <h2>{t('title')}</h2>
          <p>{t('description')}</p>
          <button
            ref={closeRef}
            className="trade-dialog-close"
            onClick={onClose}
            aria-label={t('close')}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="trade-cards" role="radiogroup" aria-label={t('title')}>
          {TRADE_IDS.map((tid) => (
            <button
              key={tid}
              className={`trade-card${selected === tid ? ' trade-card-selected' : ''}`}
              role="radio"
              aria-checked={selected === tid}
              onClick={() => setSelected(tid)}
            >
              <span className="trade-card-icon">{TRADES[tid].icon}</span>
              <span className="trade-card-name">{t(tid)}</span>
              <span className="trade-card-desc">{t(`${tid}_desc`)}</span>
            </button>
          ))}
        </div>

        <div className="trade-dialog-footer">
          <button className="btn-primary" onClick={handleApply}>
            {t('apply')}
          </button>
        </div>
          </div>
        </>
      )}
    </>
  );
}
