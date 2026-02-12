'use client';

import { useToolCardTilt } from '@/hooks/useToolCardTilt';
import { useIconRedraw } from '@/hooks/useIconRedraw';
import { useParallaxStagger } from '@/hooks/useParallaxStagger';
import { useShopSwap } from '@/hooks/useShopSwap';

/**
 * Invisible component that activates all interactive behaviors.
 * Must be rendered after all sections are in the DOM.
 */
export default function Interactions() {
  useToolCardTilt();
  useIconRedraw();
  useParallaxStagger();
  useShopSwap('productShowcase');
  return null;
}
