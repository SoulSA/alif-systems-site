/**
 * ============================================================================
 * ParticleField.tsx — the animated "constellation" canvas in the hero.
 * ============================================================================
 *
 * WHAT IT DOES
 *   Draws drifting dots that link with faint lines and gently react to the
 *   mouse. Pure <canvas> — no images. Respects reduced-motion.
 *
 * HOW TO CHANGE IT
 *   • Fewer/more dots ..... `density` prop (and the (w*h)/14000 divisor).
 *   • Dot/line colours .... `color` and `accent` props (rgba prefix strings).
 *   • Link distance ....... the `if (dist < 120)` threshold.
 * ============================================================================
 */
import React, { useEffect, useRef } from 'react';

/**
 * Lightweight animated constellation canvas for the hero.
 * Particles drift and link with lines; a soft parallax follows the pointer.
 * Pure canvas 2D — no external assets, respects reduced-motion.
 */
export const ParticleField: React.FC<{ color?: string; accent?: string; density?: number }> = ({
  color = 'rgba(10,120,200,',
  accent = 'rgba(109,94,240,',
  density = 70,
}) => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const raf = useRef<number>(0);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const mouse = { x: -9999, y: -9999 };

    type P = { x: number; y: number; vx: number; vy: number; r: number; a: boolean };
    let pts: P[] = [];

    const resize = () => {
      const parent = canvas.parentElement!;
      w = parent.clientWidth;
      h = parent.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(density, Math.floor((w * h) / 14000));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.6,
        a: Math.random() > 0.7,
      }));
    };

    const step = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // pointer attraction
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 14000) {
          const f = (14000 - d2) / 14000 * 0.6;
          p.x += (dx / Math.sqrt(d2 + 0.1)) * f;
          p.y += (dy / Math.sqrt(d2 + 0.1)) * f;
        }

        const base = p.a ? accent : color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = base + '0.9)';
        ctx.fill();

        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const lx = p.x - q.x, ly = p.y - q.y;
          const dist = Math.sqrt(lx * lx + ly * ly);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = color + (0.22 * (1 - dist / 120)).toFixed(3) + ')';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      raf.current = requestAnimationFrame(step);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerleave', onLeave);
    if (!reduce) step();
    else {
      // static single frame
      step();
      cancelAnimationFrame(raf.current);
    }

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
    };
  }, [color, accent, density]);

  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />;
};

export default ParticleField;