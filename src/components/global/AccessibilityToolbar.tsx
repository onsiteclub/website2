'use client';

import { useState } from 'react';
import { useAccessibility } from '@/providers/AccessibilityProvider';

/* ── SVG Icons ── */
const A11yIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="4.5" r="2.5" />
    <path d="M12 7v5" />
    <path d="M8 10h8" />
    <path d="M9 22l3-7 3 7" />
  </svg>
);

const ContrastIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a10 10 0 0 1 0 20z" fill="currentColor" />
  </svg>
);

const FontSizeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <text x="2" y="18" fontSize="16" fill="currentColor" stroke="none" fontWeight="bold">A</text>
    <text x="14" y="18" fontSize="11" fill="currentColor" stroke="none" fontWeight="bold">A</text>
  </svg>
);

const MotionIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="M12 5v14" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const SpeakerIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="currentColor" stroke="none" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export default function AccessibilityToolbar() {
  const [open, setOpen] = useState(false);
  const {
    highContrast,
    largeFont,
    reducedMotion,
    ttsActive,
    toggleHighContrast,
    toggleLargeFont,
    toggleReducedMotion,
    toggleTTS,
  } = useAccessibility();

  return (
    <div className="a11y-toolbar-wrapper">
      {/* FAB toggle */}
      <button
        className="a11y-fab"
        onClick={() => setOpen((v) => !v)}
        aria-label="Accessibility options"
        aria-expanded={open}
      >
        {open ? <CloseIcon /> : <A11yIcon />}
      </button>

      {/* Panel */}
      {open && (
        <div className="a11y-panel" role="toolbar" aria-label="Accessibility tools">
          <button
            className={`a11y-option${highContrast ? ' a11y-active' : ''}`}
            onClick={toggleHighContrast}
            aria-pressed={highContrast}
            title="High Contrast"
          >
            <ContrastIcon />
            <span>Contrast</span>
          </button>

          <button
            className={`a11y-option${largeFont ? ' a11y-active' : ''}`}
            onClick={toggleLargeFont}
            aria-pressed={largeFont}
            title="Large Font"
          >
            <FontSizeIcon />
            <span>Font Size</span>
          </button>

          <button
            className={`a11y-option${reducedMotion ? ' a11y-active' : ''}`}
            onClick={toggleReducedMotion}
            aria-pressed={reducedMotion}
            title="Reduced Motion"
          >
            <MotionIcon />
            <span>Motion</span>
          </button>

          <button
            className={`a11y-option${ttsActive ? ' a11y-active' : ''}`}
            onClick={toggleTTS}
            aria-pressed={ttsActive}
            title="Read Aloud"
          >
            <SpeakerIcon />
            <span>{ttsActive ? 'Stop' : 'Read'}</span>
          </button>
        </div>
      )}
    </div>
  );
}
