/**
 * ============================================================================
 * Logos.tsx — "Who we serve" grid of industry tiles (icon + label).
 * ============================================================================
 *   Labels = logos.* keys in src/i18n.tsx. Icons come from components/icons.
 *   To change an industry, edit its logos.iN text; to change its icon, swap the
 *   icon component in the `items` array here.
 * ============================================================================
 */
import React from 'react';
import { useI18n } from '../i18n';
import { theme } from '../theme';
import { Scrub } from '../components/Scrub';
import { Eyebrow, maxW } from './Shared';
import { IconCode, IconServer, IconLayers, IconBolt, IconShield, IconUsers, IconSliders, IconStar } from '../components/icons';

export const Logos: React.FC = () => {
  const { t } = useI18n();
  const items = [
    { icon: <IconCode size={24} />, l: t('logos.i1') },
    { icon: <IconLayers size={24} />, l: t('logos.i2') },
    { icon: <IconServer size={24} />, l: t('logos.i3') },
    { icon: <IconBolt size={24} />, l: t('logos.i4') },
    { icon: <IconStar size={24} />, l: t('logos.i5') },
    { icon: <IconSliders size={24} />, l: t('logos.i6') },
    { icon: <IconShield size={24} />, l: t('logos.i7') },
    { icon: <IconUsers size={24} />, l: t('logos.i8') },
  ];
  return (
    <section className="section-pad" style={{ background: theme.bg }}>
      <div style={{ maxWidth: maxW, margin: '0 auto' }}>
        <Scrub y={40} style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 2.8rem' }}>
          <Eyebrow center>{t('logos.tag')}</Eyebrow>
          <h2 style={{ fontSize: 'clamp(1.9rem,4vw,3rem)', color: theme.text, margin: '1.1rem 0 1rem' }}>{t('logos.title')}</h2>
          <p style={{ color: theme.textDim, fontSize: '1.05rem', lineHeight: 1.75 }}>{t('logos.subtitle')}</p>
        </Scrub>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 14 }}>
          {items.map((it, i) => (
            <Scrub key={i} y={50} fromScale={0.95} start={0.98} end={0.55}>
              <div className="glass card-hover" style={{ borderRadius: 8, padding: '1.6rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, textAlign: 'center' }}>
                <div style={{ width: 50, height: 50, borderRadius: 10, background: 'rgba(1,184,244,0.1)', color: '#0A9BE0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{it.icon}</div>
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: theme.text }}>{it.l}</span>
              </div>
            </Scrub>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Logos;
