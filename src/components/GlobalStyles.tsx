/**
 * ============================================================================
 * GlobalStyles.tsx — site-wide CSS injected once (fonts, resets, keyframes,
 * and reusable utility CLASSES). Think of this as the global stylesheet.
 * ============================================================================
 *
 * WHAT LIVES HERE
 *   • FONTS: the Google Fonts @import (Playfair Display for English headings,
 *     Changa for Arabic + body). Change the fonts by editing the @import URL
 *     and the font-family rules just below it.
 *   • KEYFRAMES: named animations (auroraShift, floaty, marquee, fadeUp, …)
 *     used across the site via `animation: <name> …`.
 *   • UTILITY CLASSES you will see on elements everywhere:
 *       .grad-text / .grad-text-amber → gradient-filled text
 *       .glass                        → frosted-glass card look
 *       .card-hover                   → lift + glow on hover
 *       .section-pad                  → consistent section padding (responsive)
 *       .nav-link                     → animated underline on nav links
 *       .marquee-track                → the scrolling keyword strip
 *       .tilt* / .magnetic            → helpers for the 3D-tilt & magnetic btns
 *   • The `prefers-reduced-motion` block near the end disables heavy motion for
 *     users who ask their OS to reduce animation (accessibility).
 *
 * HOW TO CHANGE IT
 *   • Different fonts ...... edit the @import URL + the font-family lines.
 *   • Softer/stronger card look ... edit `.glass` and `.card-hover`.
 *   • More/less section spacing ... edit `.section-pad` (and its @media sizes).
 * ============================================================================
 */
import React from 'react';
import { theme } from '../theme';

/**
 * Global CSS for the dark, creative "aurora tech" redesign.
 * Fonts, resets, keyframes, scrollbar, utility classes.
 */
export const GlobalStyles: React.FC = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600&family=Changa:wght@300;400;500;600;700;800&display=swap');

    * { box-sizing: border-box; }
    html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
    body {
      margin: 0;
      font-family: 'Playfair Display', 'Changa', serif;
      color: ${theme.text};
      background: ${theme.bg};
      overflow-x: hidden;
    }
    [dir="rtl"] body { font-family: 'Changa', 'Playfair Display', sans-serif; }
    /* Body copy stays highly readable; Playfair is reserved for display headings */
    p, span, a, button, input, textarea, label, li { font-family: 'Changa', 'Playfair Display', sans-serif; }
    [dir="ltr"] p, [dir="ltr"] span, [dir="ltr"] a, [dir="ltr"] button, [dir="ltr"] input, [dir="ltr"] textarea, [dir="ltr"] label, [dir="ltr"] li { font-family: 'Changa', system-ui, sans-serif; }
    h1,h2,h3,h4 { font-family: 'Playfair Display', 'Changa', serif; margin: 0; font-weight: 800; letter-spacing: -0.015em; }
    [dir="rtl"] h1,[dir="rtl"] h2,[dir="rtl"] h3,[dir="rtl"] h4 { font-family: 'Changa','Playfair Display', sans-serif; letter-spacing: 0; font-weight: 700; }
    a { text-decoration: none; color: inherit; }
    p { margin: 0; }
    button { font-family: inherit; cursor: pointer; }
    input, textarea { font-family: inherit; }
    img, svg, video { max-width: 100%; }

    ::selection { background: ${theme.cyan}; color: #fff; }

    ::-webkit-scrollbar { width: 11px; }
    ::-webkit-scrollbar-track { background: ${theme.bg2}; }
    ::-webkit-scrollbar-thumb { background: linear-gradient(${theme.cyan}, ${theme.violet}); border-radius: 6px; border: 3px solid ${theme.bg2}; }

    /* ---------- Keyframes ---------- */
    @keyframes auroraShift {
      0%,100% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
    }
    @keyframes floaty { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-22px) rotate(2deg); } }
    @keyframes floaty2 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(16px); } }
    @keyframes orbPulse { 0%,100% { opacity: 0.45; transform: scale(1); } 50% { opacity: 0.8; transform: scale(1.12); } }
    @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
    @keyframes marqueeRTL { from { transform: translateX(-50%); } to { transform: translateX(0); } }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(26px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes fadeDown { from { opacity: 0; transform: translateY(-16px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes scrollDot { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(16px); opacity: 0; } }
    @keyframes spinSlow { to { transform: rotate(360deg); } }
    @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
    @keyframes glowPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(1,184,244,0.35); } 50% { box-shadow: 0 0 36px 4px rgba(1,184,244,0.25); } }
    @keyframes gridFloat { 0% { background-position: 0 0; } 100% { background-position: 60px 60px; } }

    /* ---------- Utilities ---------- */
    .grad-text {
      background: ${'linear-gradient(100deg, #0A9BE0, ' + theme.violet + ')'};
      -webkit-background-clip: text; background-clip: text;
      -webkit-text-fill-color: transparent; color: transparent;
    }
    .grad-text-amber {
      background: ${'linear-gradient(100deg, #0A9BE0 30%, #F08A2C)'};
      -webkit-background-clip: text; background-clip: text;
      -webkit-text-fill-color: transparent; color: transparent;
    }
    .glass {
      background: rgba(255,255,255,0.72);
      border: 1px solid ${theme.stroke};
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      box-shadow: 0 20px 50px -32px rgba(3,40,85,0.28);
    }
    .card-hover { transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.4s ease, box-shadow 0.4s ease, background 0.4s ease; }
    .card-hover:hover { transform: translateY(-10px); border-color: ${theme.strokeHi}; box-shadow: 0 36px 70px -34px rgba(1,120,210,0.45); background: rgba(255,255,255,0.92); }

    .section-pad { padding: 7rem 1.5rem; }
    @media (max-width: 860px) { .section-pad { padding: 4.5rem 1.25rem; } }
    @media (max-width: 520px) { .section-pad { padding: 3.5rem 1.1rem; } }

    .nav-link { position: relative; transition: color 0.25s ease; }
    .nav-link::after {
      content: ''; position: absolute; left: 0; bottom: -5px; height: 2px; width: 0;
      background: ${'linear-gradient(90deg,' + theme.cyan + ',' + theme.violet + ')'}; transition: width 0.3s ease;
    }
    .nav-link:hover::after { width: 100%; }
    [dir="rtl"] .nav-link::after { left: auto; right: 0; }

    .marquee-track { display: flex; width: max-content; animation: marquee 32s linear infinite; }
    [dir="rtl"] .marquee-track { animation-name: marqueeRTL; }
    .marquee-track:hover { animation-play-state: paused; }

    /* 3D tilt helper — set perspective on wrapper, transform on inner */
    .tilt-wrap { perspective: 900px; }
    .tilt { transition: transform 0.18s ease-out, box-shadow 0.3s ease; transform-style: preserve-3d; will-change: transform; }
    .tilt-shine { position: absolute; inset: 0; border-radius: inherit; background: radial-gradient(circle at var(--mx,50%) var(--my,50%), rgba(1,184,244,0.14), transparent 45%); opacity: 0; transition: opacity 0.3s ease; pointer-events: none; }
    .tilt-wrap:hover .tilt-shine { opacity: 1; }

    .magnetic { transition: transform 0.2s cubic-bezier(0.16,1,0.3,1); }

    @media (max-width: 860px) { .hide-mobile { display: none !important; } }
    @media (min-width: 861px) { .only-mobile { display: none !important; } }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; }
    }
  `}</style>
);

export default GlobalStyles;
