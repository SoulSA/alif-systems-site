/**
 * ============================================================================
 * SectionVisual.tsx — the framed ARTWORK shown on the image side of each
 * alternating section.
 * ============================================================================
 *
 * WHAT IT DOES
 *   Shows one of the generated on-brand renders (from src/sectionImages.ts) as
 *   a framed backdrop, with animated vector dots on top, a glow aura, corner
 *   ticks, and scroll-scrubbed parallax (it drifts/scales as you scroll).
 *
 * HOW TO CHANGE IT
 *   • Which picture per kind → the IMG map ('network'|'stack'|'orbit'|'pulse').
 *   • Replace the pictures   → regenerate src/sectionImages.ts.
 *   • Parallax amount        → the `ty` / `scale` math near the top.
 * ============================================================================
 */
import React from 'react';
import { useScrollProgress } from './Scrub';
import { theme } from '../theme';
import { imgNetwork, imgLayers, imgOrbit } from '../sectionImages';

/**
 * Rich section visual: a generated, on-brand abstract render as the backdrop,
 * with animated vector motion layered on top and scroll-scrubbed parallax,
 * a glow aura, and a subtle floating accent. Framed in glass with minimal edges.
 */

type Kind = 'network' | 'stack' | 'orbit' | 'pulse';
const IMG: Record<Kind, string> = {
  network: imgNetwork,
  stack: imgLayers,
  orbit: imgOrbit,
  pulse: imgNetwork,
};

export const SectionVisual: React.FC<{ kind: Kind }> = ({ kind }) => {
  const { ref, p } = useScrollProgress<HTMLDivElement>({ start: 1, end: 0.1 });
  // scrubbed parallax: image drifts + scales slightly as the section scrolls through
  const ty = (0.5 - p) * 26;
  const scale = 1.08 - p * 0.08;

  return (
    <div ref={ref} style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1', maxWidth: 470, margin: '0 auto' }}>
      {/* colored aura behind the frame */}
      <div style={{
        position: 'absolute', inset: '6%', borderRadius: 16,
        background: 'conic-gradient(from 160deg at 50% 50%, rgba(1,184,244,0.3), rgba(109,94,240,0.28), rgba(255,169,77,0.2), rgba(1,184,244,0.3))',
        filter: 'blur(34px)', opacity: 0.6 + p * 0.3,
        transform: `rotate(${p * 36}deg)`,
      }} />

      {/* framed image */}
      <div style={{ position: 'absolute', inset: 0, borderRadius: 12, overflow: 'hidden', border: `1px solid ${theme.stroke}`, boxShadow: '0 40px 80px -40px rgba(3,40,85,0.5)' }}>
        <img
          src={IMG[kind]}
          alt=""
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transform: `translateY(${ty}px) scale(${scale})`, transformOrigin: 'center', willChange: 'transform' }}
          draggable={false}
        />
        {/* light wash so dark render blends into the light site */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(247,250,255,0.05), rgba(247,250,255,0.14))' }} />

        {/* animated vector motion layered on top */}
        <svg viewBox="0 0 400 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          <defs>
            <linearGradient id="sv-a" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#8FE7FF" /><stop offset="1" stopColor="#B9ACFF" />
            </linearGradient>
          </defs>
          {kind === 'orbit' && <OrbitDots p={p} />}
          {kind !== 'orbit' && <FloatNodes p={p} />}
        </svg>

        {/* corner accent ticks (minimal, cutting-edge) */}
        <Corner p={p} />
      </div>
    </div>
  );
};

const OrbitDots: React.FC<{ p: number }> = ({ p }) => (
  <g transform="translate(200 200)">
    {[0, 1, 2].map((i) => {
      const ang = p * Math.PI * 2 + (i * Math.PI * 2) / 3;
      const r = 120;
      return <circle key={i} cx={Math.cos(ang) * r} cy={Math.sin(ang) * r * 0.72} r="6" fill="url(#sv-a)" opacity="0.95" />;
    })}
  </g>
);

const FloatNodes: React.FC<{ p: number }> = ({ p }) => {
  const pts = [[90, 120], [300, 150], [210, 250], [130, 300], [320, 300]] as [number, number][];
  return (
    <g>
      {pts.map((n, i) => (
        <circle key={i} cx={n[0]} cy={n[1] - p * (6 + i * 2)} r={i % 2 ? 5 : 7} fill="url(#sv-a)" opacity={0.5 + 0.5 * p} />
      ))}
    </g>
  );
};

const Corner: React.FC<{ p: number }> = ({ p }) => {
  const L = 26 + p * 10;
  const s = { stroke: '#fff', strokeWidth: 2, opacity: 0.5, fill: 'none' } as React.CSSProperties;
  return (
    <svg viewBox="0 0 400 400" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      <path d={`M16 ${16 + L} L16 16 L${16 + L} 16`} style={s} />
      <path d={`M384 ${384 - L} L384 384 L${384 - L} 384`} style={s} />
    </svg>
  );
};

export default SectionVisual;
