/**
 * ============================================================================
 * Hero.tsx — the first full-screen section (headline + buttons + logo visual).
 * ============================================================================
 *
 * WHAT IT DOES
 *   Big italic headline (text-scramble reveal), subtitle, two buttons, and on
 *   the right a floating logo MARK inside rotating rings over the particle
 *   constellation + a soft generated-render glow.
 *
 * HOW TO CHANGE IT
 *   • Headline / subtitle / badge / button labels → hero.* keys in src/i18n.tsx.
 *   • "Explore" scrolls to #services; the other button → navigate('contact').
 *   • Headline size → the clamp() in the <h1> style.
 *   • The floating artwork → <AlifMark/> + the imgOrbit backdrop below it.
 * ============================================================================
 */
import React from 'react';
import { useI18n } from '../i18n';
import { theme, gradients } from '../theme';
import { AlifMark } from '../components/Logo';
import { ParticleField } from '../components/ParticleField';
import { Magnetic, Scramble } from '../components/Interactions';
import { imgOrbit } from '../sectionImages';
import { IconArrow } from '../components/icons';

export const Hero: React.FC<{ navigate: (to: string) => void }> = ({ navigate }) => {
  const { t, dir, lang } = useI18n();
  const flip = dir === 'rtl';

  return (
    <section
      className="hero-sec"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: gradients.canvas,
        paddingTop: 96,
      }}
    >
      <ParticleField />

      {/* animated grid floor */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '60px 60px', animation: 'gridFloat 20s linear infinite',
        maskImage: 'radial-gradient(ellipse at 50% 60%, black 20%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse at 50% 60%, black 20%, transparent 75%)',
      }} />
      {/* floating orbs */}
      <div style={{ position: 'absolute', top: '14%', insetInlineEnd: '10%', width: 320, height: 320, borderRadius: '50%', background: 'radial-gradient(circle, rgba(109,94,240,0.35), transparent 68%)', filter: 'blur(20px)', animation: 'orbPulse 8s ease-in-out infinite' }} />
      <div style={{ position: 'absolute', bottom: '10%', insetInlineStart: '6%', width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(1,184,244,0.3), transparent 70%)', filter: 'blur(24px)', animation: 'orbPulse 10s ease-in-out infinite 1s' }} />

      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '2rem 1.5rem 5rem', position: 'relative', width: '100%', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '3rem', alignItems: 'center' }} className="hero-grid">
        <div>
          <div className="glass" style={{ display: 'inline-flex', alignItems: 'center', gap: 9, padding: '0.5rem 1.1rem', borderRadius: 999, fontSize: '0.85rem', fontWeight: 500, color: theme.text, animation: 'fadeDown 0.8s ease both' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: theme.cyan, boxShadow: `0 0 14px ${theme.cyan}` }} />
            {t('hero.badge')}
          </div>

          <h1 style={{ fontSize: 'clamp(2.6rem, 6.2vw, 5.4rem)', lineHeight: 1.04, margin: '1.5rem 0 1.5rem', animation: 'fadeUp 0.9s ease both 0.05s', fontStyle: lang === 'ar' ? 'normal' : 'italic' }}>
            <Scramble text={t('hero.title')} rtl={lang === 'ar'} className="grad-text" />
          </h1>

          <p style={{ fontSize: 'clamp(1rem, 1.4vw, 1.2rem)', lineHeight: 1.8, color: theme.textDim, maxWidth: 560, animation: 'fadeUp 1s ease both 0.15s' }}>
            {t('hero.subtitle')}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: '2.4rem', animation: 'fadeUp 1.1s ease both 0.25s' }}>
            <Magnetic
              onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: gradients.aurora, backgroundSize: '200% 200%', animation: 'auroraShift 6s ease infinite', color: '#fff', border: 'none', padding: '1rem 1.9rem', borderRadius: 10, fontSize: '1rem', fontWeight: 600, boxShadow: '0 18px 44px -16px rgba(1,120,210,0.6)' }}
            >
              {t('hero.ctaPrimary')} <IconArrow flip={flip} />
            </Magnetic>
            <button
              onClick={() => navigate('contact')}
              className="glass"
              style={{ color: theme.text, padding: '1rem 1.9rem', borderRadius: 10, fontSize: '1rem', fontWeight: 600, transition: 'all 0.25s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = theme.strokeHi)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = theme.stroke)}
            >
              {t('hero.ctaSecondary')}
            </button>
          </div>

          {/* key chips */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: '2rem', animation: 'fadeUp 1.2s ease both 0.35s' }}>
            {['hero.k1', 'hero.k2', 'hero.k3'].map((k) => (
              <span key={k} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: '0.85rem', color: theme.textDim, padding: '0.4rem 0.9rem', borderRadius: 999, border: `1px solid ${theme.stroke}`, background: 'rgba(255,255,255,0.6)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={theme.cyan} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                {t(k)}
              </span>
            ))}
          </div>
        </div>

        {/* hero visual: floating logo mark in a glow ring */}
        <div className="hide-mobile" style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ position: 'relative', width: 360, height: 440, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* rotating ring */}
            <div style={{ position: 'absolute', width: 340, height: 340, borderRadius: '50%', border: `1px solid ${theme.stroke}`, animation: 'spinSlow 40s linear infinite' }}>
              <span style={{ position: 'absolute', top: -5, left: '50%', width: 10, height: 10, borderRadius: '50%', background: theme.cyan, boxShadow: `0 0 16px ${theme.cyan}` }} />
            </div>
            <div style={{ position: 'absolute', width: 260, height: 260, borderRadius: '50%', border: `1px dashed ${theme.stroke}`, animation: 'spinSlow 28s linear infinite reverse' }}>
              <span style={{ position: 'absolute', bottom: -4, left: '50%', width: 8, height: 8, borderRadius: '50%', background: theme.violet, boxShadow: `0 0 14px ${theme.violet}` }} />
            </div>
            {/* glow */}
            <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(1,184,244,0.18), transparent 65%)' }} />
            {/* generated orbit render as a soft circular backdrop */}
            <img src={imgOrbit} alt="" draggable={false} style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', objectFit: 'cover', opacity: 0.55, mixBlendMode: 'screen', filter: 'saturate(1.1)' }} />
            {/* the mark */}
            <div style={{ animation: 'floaty 7s ease-in-out infinite', position: 'relative' }}>
              <AlifMark variant="color" size={260} />
            </div>
          </div>
        </div>
      </div>

      {/* scroll hint */}
      <div style={{ position: 'absolute', bottom: 24, insetInline: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, color: theme.textFaint, fontSize: '0.8rem' }}>
        <span>{t('hero.scroll')}</span>
        <div style={{ width: 24, height: 38, borderRadius: 14, border: `2px solid ${theme.stroke}`, display: 'flex', justifyContent: 'center', paddingTop: 7 }}>
          <div style={{ width: 4, height: 8, borderRadius: 2, background: theme.cyan, animation: 'scrollDot 1.5s ease-in-out infinite' }} />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 520px) {
          .hero-sec { min-height: auto !important; padding-top: 120px !important; padding-bottom: 60px !important; }
          .hero-grid { padding: 1rem 1.1rem 1rem !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;