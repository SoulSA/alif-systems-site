/**
 * ============================================================================
 * Interactions.tsx — reusable MICRO-INTERACTIONS.
 * ============================================================================
 *
 *   <Tilt>…</Tilt>        → children tilt in 3D toward the mouse, with a sheen.
 *                           `max` = max tilt angle in degrees.
 *   <Magnetic>…</Magnetic>→ a button that leans toward the cursor.
 *                           `strength` = how strongly it follows.
 *   <Scramble text=… />   → heading text "decodes" from random glyphs on first
 *                           view (Latin only; Arabic fades in cleanly because
 *                           scrambling Arabic breaks letter shaping — pass
 *                           rtl={lang==='ar'}).
 *
 * All three respect reduced-motion. These are purely visual wrappers — they
 * don't change the wording (that's in i18n.tsx).
 * ============================================================================
 */
import React, { useEffect, useRef, useState } from 'react';

/**
 * 3D tilt wrapper. Children tilt toward the pointer; a soft shine follows.
 * Disabled on touch / reduced-motion.
 */
export const Tilt: React.FC<{ children: React.ReactNode; max?: number; style?: React.CSSProperties; className?: string }> = ({
  children, max = 9, style, className,
}) => {
  const wrap = useRef<HTMLDivElement | null>(null);
  const inner = useRef<HTMLDivElement | null>(null);

  const onMove = (e: React.PointerEvent) => {
    const el = inner.current, w = wrap.current;
    if (!el || !w) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = w.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * max * 2;
    const ry = (px - 0.5) * max * 2;
    el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    w.style.setProperty('--mx', `${px * 100}%`);
    w.style.setProperty('--my', `${py * 100}%`);
  };
  const reset = () => {
    const el = inner.current;
    if (el) el.style.transform = 'rotateX(0) rotateY(0)';
  };

  return (
    <div ref={wrap} className={`tilt-wrap ${className ?? ''}`} style={style} onPointerMove={onMove} onPointerLeave={reset}>
      <div ref={inner} className="tilt" style={{ height: '100%' }}>
        {children}
        <span className="tilt-shine" />
      </div>
    </div>
  );
};

/** Magnetic button — gently pulls toward the pointer. */
export const Magnetic: React.FC<{ children: React.ReactNode; strength?: number; style?: React.CSSProperties; onClick?: () => void; className?: string }> = ({
  children, strength = 0.35, style, onClick, className,
}) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = 'translate(0,0)'; };
  return (
    <button ref={ref} className={`magnetic ${className ?? ''}`} style={style} onClick={onClick} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </button>
  );
};

/**
 * Text-scramble reveal. Scrambles glyphs then settles to the final text
 * when it first scrolls into view. Latin only; Arabic settles instantly
 * (scrambling Arabic shaping looks broken), so RTL just fades in.
 */
const GLYPHS = '!<>-_\\/[]{}—=+*^?#________';
export const Scramble: React.FC<{ text: string; className?: string; style?: React.CSSProperties; rtl?: boolean }> = ({
  text, className, style, rtl,
}) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(rtl ? text : '');
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (rtl || reduce) { setDisplay(text); return; }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting && !started.current) {
          started.current = true;
          run();
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.4 });
    io.observe(el);

    let frame = 0;
    const queue = text.split('').map((c, i) => ({ c, start: Math.floor(i * 2), end: Math.floor(i * 2) + 12 + Math.floor(Math.random() * 10) }));
    let raf = 0;
    const run = () => {
      const tick = () => {
        let out = '';
        let done = 0;
        for (const q of queue) {
          if (frame >= q.end) { out += q.c; done++; }
          else if (frame >= q.start) { out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]; }
          else out += '';
        }
        setDisplay(out);
        frame++;
        if (done < queue.length) raf = requestAnimationFrame(tick);
        else setDisplay(text);
      };
      tick();
    };
    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [text, rtl]);

  return <span ref={ref} className={className} style={style}>{display || (rtl ? text : '\u00A0')}</span>;
};