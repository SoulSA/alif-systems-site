/**
 * ============================================================================
 * WhyCta.tsx — two things: the "Why Alif" alternating section AND the big
 * call-to-action band beneath it.
 * ============================================================================
 *   • Why list → why.* keys in src/i18n.tsx (4 reasons, icon + title + desc).
 *   • CTA band → cta.* keys; the button runs navigate('contact').
 *   • visual="pulse" with `reverse` puts the artwork on the right.
 * ============================================================================
 */
import React from 'react';
import { useI18n } from '../i18n';
import { theme, gradients } from '../theme';
import { Scrub } from '../components/Scrub';
import { AltSection } from '../components/AltSection';
import { Magnetic } from '../components/Interactions';
import { maxW } from './Shared';
import { IconBolt, IconStar, IconSliders, IconServer, IconArrow } from '../components/icons';

export const WhyCta: React.FC<{ navigate: (to: string) => void }> = ({ navigate }) => {
  const { t, dir } = useI18n();
  const flip = dir === 'rtl';
  const items = [
    { icon: <IconBolt size={22} />, title: t('why.w1.title'), desc: t('why.w1.desc') },
    { icon: <IconStar size={22} />, title: t('why.w2.title'), desc: t('why.w2.desc') },
    { icon: <IconSliders size={22} />, title: t('why.w3.title'), desc: t('why.w3.desc') },
    { icon: <IconServer size={22} />, title: t('why.w4.title'), desc: t('why.w4.desc') },
  ];

  return (
    <>
      <AltSection id="why" eyebrow={t('why.tag')} visual="pulse" reverse title={t('why.title')}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="why-grid">
          {items.map((w, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 44, height: 44, borderRadius: 8, flexShrink: 0, background: 'rgba(1,184,244,0.1)', color: '#0A9BE0', display: 'flex', alignItems: 'center', justifyContent: 'center', border: `1px solid ${theme.stroke}` }}>{w.icon}</div>
              <div>
                <h3 style={{ fontSize: '1.02rem', color: theme.text, marginBottom: 4 }}>{w.title}</h3>
                <p style={{ color: theme.textDim, lineHeight: 1.6, fontSize: '0.88rem' }}>{w.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <style>{`@media (max-width: 420px){ .why-grid { grid-template-columns: 1fr !important; } }`}</style>
      </AltSection>

      {/* CTA */}
      <section className="cta-pad" style={{ background: theme.bg }}>
        <Scrub y={50} fromScale={0.97} style={{ maxWidth: 1040, margin: '0 auto' }}>
          <div style={{ borderRadius: 14, padding: 'clamp(2.5rem,5vw,4.5rem)', textAlign: 'center', position: 'relative', overflow: 'hidden', background: gradients.aurora, backgroundSize: '200% 200%', animation: 'auroraShift 10s ease infinite' }}>
            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '40px 40px', maskImage: 'radial-gradient(ellipse at 50% 50%, black, transparent 72%)', WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black, transparent 72%)' }} />
            <div style={{ position: 'relative' }}>
              <h2 style={{ fontSize: 'clamp(1.9rem,4vw,3rem)', color: '#fff', marginBottom: '1rem' }}>{t('cta.title')}</h2>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: 560, margin: '0 auto 2rem' }}>{t('cta.subtitle')}</p>
              <Magnetic onClick={() => navigate('contact')} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: '#fff', color: theme.navy, border: 'none', padding: '1rem 2.3rem', borderRadius: 10, fontSize: '1.05rem', fontWeight: 700, boxShadow: '0 18px 40px -14px rgba(0,0,0,0.3)' }}>
                {t('cta.button')} <IconArrow flip={flip} />
              </Magnetic>
            </div>
          </div>
        </Scrub>
      </section>

      <style>{`
        .cta-pad { padding: 2rem 1.5rem 7rem; }
        @media (max-width: 860px) { .cta-pad { padding: 1rem 1.25rem 4.5rem; } }
      `}</style>
    </>
  );
};

export default WhyCta;
