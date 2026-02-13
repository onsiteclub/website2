'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type TradeId = 'default' | 'wood' | 'drywall' | 'electrical' | 'plumbing' | 'concrete';

interface TradeInfo {
  id: TradeId;
  name: string;
  icon: string;
  heroImage: string;
  mode: 'light' | 'dark';
}

export const TRADES: Record<TradeId, TradeInfo> = {
  default: {
    id: 'default',
    name: 'All Trades',
    icon: '🏗️',
    heroImage: '/images/hero-default.webp',
    mode: 'dark',
  },
  wood: {
    id: 'wood',
    name: 'Wood & Framing',
    icon: '🪚',
    heroImage: '/images/hero-wood.webp',
    mode: 'light',
  },
  drywall: {
    id: 'drywall',
    name: 'Drywall & Finishing',
    icon: '🖌️',
    heroImage: '/images/hero-drywall.webp',
    mode: 'light',
  },
  electrical: {
    id: 'electrical',
    name: 'Electrical',
    icon: '⚡',
    heroImage: '/images/hero-electrical.webp',
    mode: 'light',
  },
  plumbing: {
    id: 'plumbing',
    name: 'Plumbing & HVAC',
    icon: '🔧',
    heroImage: '/images/hero-plumbing.webp',
    mode: 'dark',
  },
  concrete: {
    id: 'concrete',
    name: 'Concrete & Masonry',
    icon: '🧱',
    heroImage: '/images/hero-concrete.webp',
    mode: 'dark',
  },
};

interface TradeContextType {
  trade: TradeId;
  tradeInfo: TradeInfo;
  setTrade: (trade: TradeId) => void;
}

const TradeContext = createContext<TradeContextType | null>(null);

export function TradeProvider({ children }: { children: ReactNode }) {
  const [trade, setTradeState] = useState<TradeId>('default');

  useEffect(() => {
    const saved = localStorage.getItem('onsite-trade') as TradeId | null;
    if (saved && TRADES[saved]) {
      setTradeState(saved);
      document.documentElement.setAttribute('data-trade', saved);
    }
  }, []);

  const setTrade = (newTrade: TradeId) => {
    setTradeState(newTrade);
    localStorage.setItem('onsite-trade', newTrade);
    document.documentElement.setAttribute('data-trade', newTrade);
  };

  // Listen for set-trade CustomEvent from ChatWidget
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      const tid = detail?.trade as TradeId | undefined;
      if (tid && TRADES[tid]) {
        setTrade(tid);
      }
    };
    document.addEventListener('set-trade', handler);
    return () => document.removeEventListener('set-trade', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TradeContext.Provider value={{ trade, tradeInfo: TRADES[trade], setTrade }}>
      {children}
    </TradeContext.Provider>
  );
}

export const useTrade = () => {
  const ctx = useContext(TradeContext);
  if (!ctx) throw new Error('useTrade must be used within TradeProvider');
  return ctx;
};
