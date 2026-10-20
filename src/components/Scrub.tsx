/**
 * ============================================================================
 * Scrub.tsx — the SCROLL-SCRUBBED animation engine (the "cinematic scroll").
 * ============================================================================
 *
 * THE IDEA
 *   Instead of playing an animation once, these tie the animation to your
 *   SCROLL POSITION. So: scroll down = plays forward, STOP = freezes, scroll
 *   up = REWINDS. A little inertia makes it glide (cinematic) rather than snap.
 *
 * TWO THINGS LIVE HERE
 *   1. useScrollProgress(opts) → a hook returning { ref, p } where `p` is a
 *      0→1 number for how far the element has travelled through the viewport.
 *      Attach `ref` to the element you want to track.
 *        • start / end : the viewport window (fractions) the 0→1 maps across.
 *        • smooth      : 0 = snaps to scroll, higher (≈0.1–0.25) = more glide.
 *   2. <Scrub> → a ready-made wrapper that fades + slides (+ optional scale /
 *      blur) its children using that progress. Props you'll tweak:
 *        • y / x     : how far (px) it slides in from.
 *        • fromScale : starting scale (<1 = grows in).
 *        • blur      : starting blur (px) that sharpens as it settles.
 *        • smooth    : glide amount (default 0.14).
 *
 * HOW TO CHANGE THE SCROLL FEEL GLOBALLY
 *   • Snappier → lower the `smooth` default (e.g. 0.08).
 *   • More floaty/cinematic → raise it (e.g. 0.2).
 *   Per-section, pass `smooth=` on an individual <Scrub>.
 * ============================================================================
 */
import React, { useEffect, useRef, useState } from 'react';

/**
 * Scroll-SCRUBBED progress for an element.
 * Returns a ref and a progress value 0→1 that tracks the element's travel
 * through the viewport. Because it is derived from scrollY on every scroll
 * event, it naturally:
 *   • freezes when the user stops scrolling,
 *   • rewinds when the user scrolls up,
 *   • plays forward when scrolling down.
 *
 * `start`/`end` define the mapping window as fractions of the viewport:
 *   progress = 0 when the element top is at `start` * vh (default 0.9, near bottom)
 *   progress = 1 when the element top is at `end`   * vh (default 0.35, upper third)
 */
export function useScrollProgress<T extends HTMLElement = HTMLDivElement>(opts?: {
  start?: number;
  end?: number;
  /** 0 = instant (snaps to scroll), →1 = heavier easing (more cinematic). Default 0.12 */
  smooth?: number;
}) {
  const ref = useRef<T | null>(null);
  const [p, setP] = useState(0);
  const start = opts?.start ?? 0.9;
  const end = opts?.end ?? 0.35;
  const smooth = opts?.smooth ?? 0.12;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let raf = 0;
    let current = -1;         // smoothed value
    let target = 0;           // scroll-derived target
    let animating = false;

    const measure = () => {
      const vh = window.innerHeight || 1;
      const rect = el.getBoundingClientRect();
      const topFrac = rect.top / vh;
      target = Math.max(0, Math.min(1, (start - topFrac) / (start - end)));
    };

    const loop = () => {
      // ease current toward target; settle when close enough
      const diff = target - current;
      if (Math.abs(diff) < 0.0015) {
        current = target;
        setP(current);
        animating = false;
        return;
      }
      current += diff * (1 - smooth); // smooth∈[0,1): higher = slower approach
      setP(current);
      raf = requestAnimationFrame(loop);
    };

    const kick = () => {
      measure();
      if (reduce || smooth <= 0) { current = target; setP(target); return; }
      if (!animating) { animating = true; raf = requestAnimationFrame(loop); }
    };

    // init
    measure();
    current = target;
    setP(target);

    const onScroll = () => kick();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [start, end, smooth]);

  return { ref, p };
}

const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);

interface ScrubProps {
  children: React.ReactNode;
  /** travel distance in px for the slide (default 60) */
  y?: number;
  x?: number;
  /** starting scale (default 1; set <1 for a grow-in) */
  fromScale?: number;
  /** starting blur px (default 0) */
  blur?: number;
  start?: number;
  end?: number;
  /** easing weight toward the scroll target (default 0.14, cinematic) */
  smooth?: number;
  style?: React.CSSProperties;
  className?: string;
}

/**
 * Scrubbed reveal: opacity + translate + optional scale/blur driven by
 * scroll position. Rewinds on scroll-up, pauses when scrolling stops.
 */
export const Scrub: React.FC<ScrubProps> = ({
  children, y = 60, x = 0, fromScale = 1, blur = 0, start, end, smooth = 0.14, style, className,
}) => {
  const { ref, p } = useScrollProgress<HTMLDivElement>({ start, end, smooth });
  const e = easeOutCubic(p);
  const tx = x * (1 - e);
  const ty = y * (1 - e);
  const sc = fromScale + (1 - fromScale) * e;
  const bl = blur * (1 - e);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0.15 + 0.85 * e,
        transform: `translate3d(${tx}px, ${ty}px, 0) scale(${sc})`,
        filter: bl > 0.05 ? `blur(${bl}px)` : 'none',
        willChange: 'opacity, transform, filter',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Scrub;