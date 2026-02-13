'use client';

import { useScrollProgress } from '@/hooks/useScrollProgress';

export default function BuildProgress() {
  useScrollProgress('buildProgress', 'mainNav');

  return <div className="build-progress" id="buildProgress" aria-hidden="true" />;
}
