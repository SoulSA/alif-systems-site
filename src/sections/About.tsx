/**
 * ============================================================================
 * About.tsx — "Who we are" (alternating: artwork LEFT, text RIGHT).
 * ============================================================================
 *   Uses <AltSection>. Text = about.* keys in src/i18n.tsx. The three little
 *   stat boxes use about.stat1v/stat1 … Change `visual="network"` for a
 *   different background render, or add `reverse` to swap sides.
 * ============================================================================
 */
import React from 'react';
import { useI18n } from '../i18n';
import { theme, gradients } from '../theme';
import { AltSection } from '../components/AltSection';
import { Scrub } from '../components/Scrub';
import { Scramble } from '../components/Interactions';

export const About: React.FC = () => {
  const { t, lang } = useI18n();
  const stats = [
    { v: t('about.stat1v'), l: t('about.stat1') },
    { v: t('about.stat2v'), l: t('about.stat2') },
    { v: t('about.stat3v'), l: t('about.stat3') },
  ];

  return (
    <AltSection
      id="about"
      eyebrow={t('about.tag')}
      visual="network"
      title={<Scramble text={t('about.title')} rtl={lang === 'ar'} />}
    >
      <p style={{ color: theme.textDim, fontSize: '1.05rem', lineHeight: 1.9, marginBottom: '1.1rem' }}>{t('about.p1')}</p>
      <p style={{ color: theme.textDim, fontSize: '1.05rem', lineHeight: 1.9, marginBottom: '1.8rem' }}>{t('about.p2')}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ flex: '1 1 120px', padding: '1.1rem 1rem', borderRadius: 6, border: `1px solid ${theme.stroke}`, background: 'rgba(255,255,255,0.55)', borderInlineStart: `3px solid transparent`, borderImage: gradients.aurora, borderImageSlice: 1 }}>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, fontFamily: "'Playfair Display', 'Changa', serif", color: theme.text, lineHeight: 1 }}>{s.v}</div>
            <div style={{ fontSize: '0.82rem', color: theme.textDim, marginTop: 6 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </AltSection>
  );
};

export default About;
