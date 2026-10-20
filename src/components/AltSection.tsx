import React from 'react';
import { useI18n } from '../i18n';
import { theme } from '../theme';
import { Scrub } from './Scrub';
import { SectionVisual } from './SectionVisual';
import { LogoWatermark } from './LogoWatermark';
import { Eyebrow } from '../sections/Shared';

/**
 * ============================================================================
 * AltSection — the reusable "image on one side, text on the other" section.
 * ============================================================================
 *
 * WHAT IT DOES
 *   Lays out a VISUAL half and a CONTENT half side by side. On scroll the two
 *   halves slide IN toward the centre (converging) — this is the "become one in
 *   the middle" effect. A big faint logo watermark sits behind everything and
 *   reacts to scroll. On narrow screens the two halves stack vertically.
 *
 * PROPS (what each one controls)
 *   id        — anchor id for nav links (e.g. "about" → navbar "About" scrolls here)
 *   eyebrow   — the small uppercase label above the title
 *   title     — the big heading (can be plain text or a <Scramble> element)
 *   visual    — which abstract render to show: 'network' | 'stack' | 'orbit' | 'pulse'
 *   reverse   — false = visual LEFT / text RIGHT; true = swapped
 *   bg        — section background colour (defaults to the page background)
 *   children  — the body content (paragraphs, lists, etc.) you pass in
 *
 * HOW TO CHANGE IT
 *   • Edit the WORDS .......... in the i18n dictionary (src/i18n.tsx), not here.
 *   • Flip image/text sides ... pass `reverse` (or remove it) where it is used in
 *                               the section file (src/sections/About.tsx, etc.).
 *   • Change the picture ...... pass a different `visual` value.
 *   • Change the watermark .... edit the <LogoWatermark .../> props below.
 *   • Change the slide-in distance / feel ... edit the `x`, `blur`, `smooth`
 *     props on the two <Scrub> wrappers below.
 */
export const AltSection: React.FC<{
  id?: string;
  eyebrow: string;
  title: React.ReactNode;
  visual: 'network' | 'stack' | 'orbit' | 'pulse';
  reverse?: boolean;
  bg?: string;
  children: React.ReactNode;
}> = ({ id, eyebrow, title, visual, reverse, bg, children }) => {
  const { dir } = useI18n();
  // `reverse` flips the flex order so the visual and content swap sides.
  const rowDir = reverse ? 'row-reverse' : 'row';

  return (
    <section
      id={id}
      className="section-pad alt-sec"
      // position:relative + overflow:hidden are REQUIRED so the big watermark
      // can bleed off the edge without creating a horizontal scrollbar.
      style={{ background: bg ?? theme.bg, position: 'relative', overflow: 'hidden' }}
    >
      {/* Big faint logo mark in the background — bleeds off the side opposite
          the visual, and animates with scroll. Purely decorative. */}
      <LogoWatermark side={reverse ? 'left' : 'right'} />

      {/* zIndex:1 keeps the real content ABOVE the watermark (which is zIndex:0). */}
      <div
        className="alt-wrap"
        style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: rowDir, alignItems: 'center', gap: 'clamp(2rem, 5vw, 5rem)', position: 'relative', zIndex: 1 }}
      >
        {/* VISUAL half — slides in from its outer edge toward the centre.
            x = horizontal start offset (px). Sign depends on which side it is on. */}
        <Scrub x={reverse ? 90 : -90} y={0} fromScale={0.92} blur={6} smooth={0.17} className="alt-visual" style={{ flex: '1 1 0', minWidth: 0 }}>
          <SectionVisual kind={visual} />
        </Scrub>

        {/* CONTENT half — slides in from the opposite outer edge. */}
        <Scrub x={reverse ? -90 : 90} y={0} blur={4} smooth={0.17} className="alt-content" style={{ flex: '1 1 0', minWidth: 0 }}>
          <div style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 style={{ fontSize: 'clamp(1.9rem, 3.6vw, 3rem)', lineHeight: 1.12, color: theme.text, margin: '1rem 0 1.3rem' }}>{title}</h2>
            {children}
          </div>
        </Scrub>
      </div>

      {/* Responsive: stack the two halves on tablets/phones. */}
      <style>{`
        @media (max-width: 880px) {
          .alt-wrap { flex-direction: column !important; }
          .alt-visual { width: 100%; max-width: 420px; }
        }
      `}</style>
    </section>
  );
};

export default AltSection;