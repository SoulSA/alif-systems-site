/**
 * ============================================================================
 * Shared.tsx — small pieces shared by several sections.
 * ============================================================================
 *   • maxW    → the max content width used across sections (change site width).
 *   • Eyebrow → the small uppercase label above each section title.
 *   • Marquee → the horizontal scrolling strip of role keywords under the hero.
 *               The words come from the marquee.* keys in src/i18n.tsx.
 * ============================================================================
 */
import React from 'react';
import { useI18n } from '../i18n';
import { theme, gradients } from '../theme';

export const maxW = 1240;

/** Small eyebrow tag used atop each section. */
export const Eyebrow: React.FC<{ children: React.ReactNode; center?: boolean }> = ({ children, center }) => (
  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontSize: '0.8rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#0A9BE0', ...(center ? { justifyContent: 'center' } : {}) }}>
    <span style={{ width: 26, height: 2, borderRadius: 2, background: gradients.aurora }} />
    {children}
  </span>
);

/** Infinite marquee of role keywords. */
export const Marquee: React.FC = () => {
  const { t } = useI18n();
  const words = ['marquee.1', 'marquee.2', 'marquee.3', 'marquee.4', 'marquee.5', 'marquee.6', 'marquee.7'].map((k) => t(k));
  const row = [...words, ...words];
  return (
    <div style={{ borderTop: `1px solid ${theme.stroke}`, borderBottom: `1px solid ${theme.stroke}`, background: theme.bg2, padding: '1.4rem 0', overflow: 'hidden', position: 'relative' }}>
      <div className="marquee-track">
        {row.map((w, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 28, padding: '0 28px', fontSize: '1.5rem', fontWeight: 700, fontStyle: 'italic', fontFamily: "'Playfair Display', 'Changa', serif", color: i % 2 ? theme.textFaint : 'transparent', background: i % 2 ? 'none' : gradients.aurora, WebkitBackgroundClip: i % 2 ? 'initial' : 'text', backgroundClip: i % 2 ? 'initial' : 'text', WebkitTextFillColor: i % 2 ? theme.textFaint : 'transparent', whiteSpace: 'nowrap' }}>
            {w}
            <span style={{ color: theme.violet, WebkitTextFillColor: theme.violet, fontSize: '0.8rem' }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
};