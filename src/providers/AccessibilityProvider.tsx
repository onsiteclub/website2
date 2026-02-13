'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

interface AccessibilityState {
  highContrast: boolean;
  largeFont: boolean;
  reducedMotion: boolean;
  ttsActive: boolean;
}

interface AccessibilityContextValue extends AccessibilityState {
  toggleHighContrast: () => void;
  toggleLargeFont: () => void;
  toggleReducedMotion: () => void;
  toggleTTS: () => void;
  stopTTS: () => void;
  speakText: (text: string) => void;
}

const STORAGE_KEY = 'onsite-a11y';

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

function loadState(): AccessibilityState {
  if (typeof window === 'undefined') {
    return { highContrast: false, largeFont: false, reducedMotion: false, ttsActive: false };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        highContrast: !!parsed.highContrast,
        largeFont: !!parsed.largeFont,
        reducedMotion: !!parsed.reducedMotion,
        ttsActive: false, // never persist TTS
      };
    }
  } catch { /* ignore */ }
  return { highContrast: false, largeFont: false, reducedMotion: false, ttsActive: false };
}

function persistState(state: AccessibilityState) {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        highContrast: state.highContrast,
        largeFont: state.largeFont,
        reducedMotion: state.reducedMotion,
      })
    );
  } catch { /* ignore */ }
}

function applyClasses(state: AccessibilityState) {
  const root = document.documentElement;
  root.classList.toggle('high-contrast', state.highContrast);
  root.classList.toggle('large-font', state.largeFont);
  root.classList.toggle('reduced-motion', state.reducedMotion);
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AccessibilityState>(loadState);

  // Apply classes on mount and on every state change
  useEffect(() => {
    applyClasses(state);
    persistState(state);
  }, [state]);

  const toggleHighContrast = useCallback(() => {
    setState((s) => ({ ...s, highContrast: !s.highContrast }));
  }, []);

  const toggleLargeFont = useCallback(() => {
    setState((s) => ({ ...s, largeFont: !s.largeFont }));
  }, []);

  const toggleReducedMotion = useCallback(() => {
    setState((s) => ({ ...s, reducedMotion: !s.reducedMotion }));
  }, []);

  const stopTTS = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setState((s) => ({ ...s, ttsActive: false }));
  }, []);

  const speakText = useCallback((text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.slice(0, 5000));
    utterance.onend = () => setState((s) => ({ ...s, ttsActive: false }));
    utterance.onerror = () => setState((s) => ({ ...s, ttsActive: false }));
    setState((s) => ({ ...s, ttsActive: true }));
    window.speechSynthesis.speak(utterance);
  }, []);

  const toggleTTS = useCallback(() => {
    if (state.ttsActive) {
      stopTTS();
    } else {
      const main = document.querySelector('main') || document.body;
      const text = main.textContent || '';
      speakText(text);
    }
  }, [state.ttsActive, stopTTS, speakText]);

  return (
    <AccessibilityContext.Provider
      value={{
        ...state,
        toggleHighContrast,
        toggleLargeFont,
        toggleReducedMotion,
        toggleTTS,
        stopTTS,
        speakText,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return ctx;
}
