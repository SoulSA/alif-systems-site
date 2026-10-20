import React from 'react';
import { useI18n } from '../i18n';
import { theme, gradients } from '../theme';
import { Scrub } from '../components/Scrub';
import { Tilt, Scramble } from '../components/Interactions';
import { LogoWatermark } from '../components/LogoWatermark';
import { Eyebrow, maxW } from './Shared';
import { IconUsers, IconServer, IconSliders, IconShield, IconCode, IconArrow } from '../components/icons';

export const Services: React.FC<{ navigate: (to: string) => void }> = ({ navigate }) => {
  const { t, dir, lang } = useI18n();
  const flip = dir === 'rtl';

  const items = [
    { icon: <IconUsers size={30} />, title: t('services.s1.title'), desc: t('services.s1.desc'), feature: true },
    { icon: <IconServer size={26} />, title: t('services.s2.title'), desc: t('services.s2.desc') },
    { icon: <IconSliders size={26} />, title: t('services.s3.title'), desc: t('services.s3.desc') },
    { icon: <IconShield size={26} />, title: t('services.s4.title'), desc: t('services.s4.desc') },
  ];

  return (
    <section id="services" className="section-pad" style={{ background: theme.bg, position: 'relative', overflow: 'hidden' }}>
      <LogoWatermark side="left" vAlign="bottom" size={1.3} baseOpacity={0.05} />
      <div style={{ maxWidth: maxW, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <Scrub y={40} style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 3rem' }}>
          <Eyebrow center>{t('services.tag')}</Eyebrow>
          <h2 style={{ fontSize: 'clamp(1.9rem,4vw,3.1rem)', color: theme.text, margin: '1.1rem 0 1rem' }}><Scramble text={t('services.title')} rtl={lang === 'ar'} /></h2>
          <p style={{ color: theme.textDim, fontSize: '1.1rem', lineHeight: 1.75 }}>{t('services.subtitle')}</p>
        </Scrub>

        <div className="svc-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 16 }}>
          {items.map((s, i) => (
            <Scrub key={i} y={70} fromScale={0.96} start={0.95} end={0.5} style={{ gridColumn: s.feature ? 'span 6' : 'span 3' }} className={s.feature ? 'svc-feature' : 'svc-cell'}>
              <Tilt style={{ height: '100%' }} max={7}>
                <div className="glass card-hover" style={{ borderRadius: 8, padding: 'clamp(1.5rem,2.5vw,2rem)', height: '100%', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <span style={{ position: 'absolute', insetInlineStart: 0, top: 0, bottom: 0, width: 3, background: gradients.aurora }} />
                  {s.feature && <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(400px 200px at 100% 0%, rgba(1,184,244,0.1), transparent 60%)', pointerEvents: 'none' }} />}
                  <div style={{ width: s.feature ? 60 : 52, height: s.feature ? 60 : 52, borderRadius: 10, background: s.feature ? gradients.aurora : 'rgba(1,184,244,0.1)', color: s.feature ? '#fff' : '#0A9BE0', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.2rem', position: 'relative', boxShadow: s.feature ? '0 14px 30px -12px rgba(1,120,210,0.5)' : 'none' }}>{s.icon}</div>
                  <h3 style={{ fontSize: s.feature ? '1.5rem' : '1.15rem', color: theme.text, marginBottom: '0.7rem', position: 'relative' }}>{s.title}</h3>
                  <p style={{ color: theme.textDim, lineHeight: 1.75, fontSize: s.feature ? '1rem' : '0.95rem', position: 'relative' }}>{s.desc}</p>
                </div>
              </Tilt>
            </Scrub>
          ))}

          <Scrub y={60} style={{ gridColumn: 'span 12' }}>
            <div style={{ borderRadius: 10, padding: 'clamp(1.8rem,3vw,2.6rem)', position: 'relative', overflow: 'hidden', background: 'linear-gradient(120deg, rgba(255,169,77,0.14), rgba(109,94,240,0.12))', border: `1px solid ${theme.stroke}`, display: 'flex', alignItems: 'center', gap: 26, flexWrap: 'wrap' }} className="soon-banner">
              <div style={{ position: 'absolute', insetInlineEnd: -40, top: -40, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,169,77,0.3), transparent 70%)' }} />
              <div className="soon-icon" style={{ width: 68, height: 68, borderRadius: 12, background: gradients.flame, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#fff', boxShadow: '0 14px 30px -12px rgba(255,126,95,0.6)' }}>
                <IconCode size={30} />
              </div>
              <div style={{ flex: 1, minWidth: 240, position: 'relative' }}>
                <span style={{ display: 'inline-block', fontSize: '0.72rem', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#D97A1E', marginBottom: 8 }}>{t('services.soon.tag')}</span>
                <h3 style={{ fontSize: '1.5rem', color: theme.text, marginBottom: 8 }}>{t('services.soon.title')}</h3>
                <p style={{ color: theme.textDim, lineHeight: 1.75, maxWidth: 640 }}>{t('services.soon.desc')}</p>
              </div>
              <button onClick={() => navigate('contact')} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: theme.text, border: 'none', color: '#fff', padding: '0.8rem 1.4rem', borderRadius: 8, fontWeight: 600, position: 'relative' }}>
                {t('nav.cta')} <IconArrow flip={flip} size={16} />
              </button>
            </div>
          </Scrub>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .svc-feature { grid-column: span 12 !important; }
          .svc-cell { grid-column: span 6 !important; }
        }
        @media (max-width: 560px) { .svc-cell { grid-column: span 12 !important; } }
      `}</style>
    </section>
  );
};

export default Services;
