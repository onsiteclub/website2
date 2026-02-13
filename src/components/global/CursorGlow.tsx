'use client';

import { useCursorGlow } from '@/hooks/useCursorGlow';

export default function CursorGlow() {
  useCursorGlow('cursorGlow');

  return <div className="cursor-glow" id="cursorGlow" aria-hidden="true" />;
}
