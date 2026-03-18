'use client';

import { useShopSwap } from '@/hooks/useShopSwap';

/**
 * Invisible component that activates interactive behaviors.
 * Simplified: removed cursor glow, parallax stagger, 3D tilt, icon redraw.
 */
export default function Interactions() {
  useShopSwap('productShowcase');
  return null;
}
