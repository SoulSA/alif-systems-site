/**
 * ============================================================================
 * Process.tsx — the 4-step "How it works" timeline.
 * ============================================================================
 *   The connecting line DRAWS from one side to the other as you scroll (its
 *   width = scroll progress `p`). Step text = process.* keys in src/i18n.tsx.
 *   Add/remove steps by editing the `steps` array AND the matching i18n keys.
 * ============================================================================
 */
import React from 'react';
import { useI18n } from '../i18n';
import { theme, gradients } from '../theme';
import { Scrub, useScrollProgress } from '../components/Scrub';
import { Eyebrow, maxW } from './Shared';

export const Process: React.FC = () => {
  const { t } = useI18n();
  const { ref, p } = useScrollProgress<HTMLDivElement>({ start: 0.85, end: 0.3 });
  const steps = [
    { n: '01', t: t('process.s1.t'), d: t('process.s1.d') },
    { n: '02', t: t('process.s2.t'), d: t('process.s2.d') },
    { n: '03', t: t('process.s3.t'), d: t('process.s3.d') },
    { n: '04', t: t('process.s4.t'), d: t('process.s4.d') },
  ];
  return (
    <section className="section-pad" style={{ background: theme.bg, position: 'relative' }}>
      <div style={{ maxWidth: maxW, margin: '0 auto' }}>
        <Scrub y={40} style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 3rem' }}>
          <Eyebrow center>{t('process.tag')}</Eyebrow>
          <h2 style={{ fontSize: 'clamp(1.9rem,4vw,3rem)', color: theme.text, margin: '1.1rem 0' }}>{t('process.title')}</h2>
        </Scrub>

        <div ref={ref} className="proc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, position: 'relative' }}>
          {/* connecting line that DRAWS with scroll */}
          <div className="proc-line" style={{ position: 'absolute', top: 36, insetInline: '12%', height: 2, background: theme.stroke }}>
            <div style={{ position: 'absolute', insetInlineStart: 0, top: 0, bottom: 0, width: `${p * 100}%`, background: `linear-gradient(90deg, ${theme.cyan}, ${theme.violet})` }} />
          </div>
          {steps.map((s, i) => (
            <Scrub key={i} y={60} fromScale={0.9} start={0.95} end={0.45} className="proc-cell">
              <div style={{ textAlign: 'center', position: 'relative' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', margin: '0 auto 1.3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: '1.4rem', fontStyle: 'italic', color: '#fff', background: gradients.aurora, boxShadow: '0 14px 30px -12px rgba(1,120,210,0.5)', position: 'relative', zIndex: 1 }}>{s.n}</div>
                <h3 style={{ fontSize: '1.2rem', color: theme.text, marginBottom: 8 }}>{s.t}</h3>
                <p style={{ color: theme.textDim, lineHeight: 1.7, fontSize: '0.95rem', maxWidth: 240, margin: '0 auto' }}>{s.d}</p>
              </div>
            </Scrub>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 820px) { .proc-grid { grid-template-columns: 1fr 1fr !important; } .proc-line { display: none; } }
        @media (max-width: 460px) { .proc-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
};

export default Process;
