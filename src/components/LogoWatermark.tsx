import React from 'react';
import { useScrollProgress } from './Scrub';
import { mark } from '../logoAssets';

/**
 * ============================================================================
 * LogoWatermark — the big, faint "alif" MARK used as a background element.
 * ============================================================================
 *
 * WHAT IT DOES
 *   Renders ONLY the logo mark (the tall stroke + diamond — no text), blown up
 *   very large and bled off one edge so only PART of it shows. It is kept at a
 *   low opacity so it reads as a subtle brand watermark behind the content.
 *   As you scroll, it drifts, rotates and fades slightly — driven by the shared
 *   scroll-progress engine, so it rewinds when you scroll up and pauses when you
 *   stop (same behaviour as the rest of the site).
 *
 * HOW TO CHANGE IT (quick guide)
 *   • Make it MORE / LESS visible .......... change `baseOpacity` below.
 *   • Make it BIGGER / SMALLER ............. change `size` (it is a % of the section width).
 *   • Move which corner it bleeds from ..... change the `side` prop where the
 *                                            component is used ('left' | 'right').
 *   • Push it further off-screen ........... change `offset` (px it sits outside the edge).
 *   • Change how much it moves on scroll ... change `drift` (px) and `spin` (deg).
 *   • Use the WHITE mark instead ........... import { markWhite } and swap `src`.
 *
 * WHERE IT IS USED
 *   Dropped inside a <section> that has `position: relative; overflow: hidden`.
 *   It is absolutely positioned and `pointerEvents: none`, so it never blocks
 *   clicks and never adds scrollbars.
 */
export const LogoWatermark: React.FC<{
  side?: 'left' | 'right';   // which side the mark bleeds off
  vAlign?: 'top' | 'center' | 'bottom';
  size?: number;             // mark height as a fraction of the section height (e.g. 1.4 = 140%)
  baseOpacity?: number;      // resting opacity (0–1). Keep this low (0.03–0.1) for a watermark.
  drift?: number;            // px of vertical travel across the scroll range
  spin?: number;             // deg of rotation across the scroll range
}> = ({ side = 'right', vAlign = 'center', size = 1.5, baseOpacity = 0.06, drift = 80, spin = 8 }) => {
  // `p` goes 0 → 1 as the host section travels up through the viewport.
  // smooth:0.2 makes the watermark lag slightly for a cinematic, parallax feel.
  const { ref, p } = useScrollProgress<HTMLDivElement>({ start: 1, end: 0, smooth: 0.2 });

  // Scroll-reactive transform: the mark rises (`drift`), rotates (`spin`),
  // and gently scales as the section scrolls through.
  const ty = (0.5 - p) * drift;          // moves from +drift/2 down to -drift/2
  const rot = (p - 0.5) * spin;          // small rotation around centre
  const scale = 0.96 + p * 0.08;         // subtle grow-in
  const opacity = baseOpacity * (0.5 + 0.5 * Math.sin(Math.PI * p)); // fades in then out across the section

  // Vertical anchor
  const vStyle: React.CSSProperties =
    vAlign === 'top' ? { top: '-10%' } : vAlign === 'bottom' ? { bottom: '-10%' } : { top: '50%' };

  // Horizontal anchor — bleed off the chosen side. `insetInline*` is RTL-aware,
  // but a background watermark looks fine either way, so we use left/right directly.
  const hStyle: React.CSSProperties = side === 'right' ? { right: '-8%' } : { left: '-8%' };

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'absolute',
        ...hStyle,
        ...vStyle,
        height: `${size * 100}%`,
        // combine the vertical-centre offset (if any) with the scroll drift/rotate
        transform: `${vAlign === 'center' ? 'translateY(-50%) ' : ''}translateY(${ty}px) rotate(${rot}deg) scale(${scale})`,
        opacity,
        pointerEvents: 'none',
        zIndex: 0,
        userSelect: 'none',
        willChange: 'transform, opacity',
      }}
    >
      <img src={mark} alt="" draggable={false} style={{ height: '100%', width: 'auto', display: 'block' }} />
    </div>
  );
};

export default LogoWatermark;