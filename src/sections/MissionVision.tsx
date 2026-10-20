/**
 * ============================================================================
 * MissionVision.tsx — Mission & Vision (alternating, artwork on the RIGHT via
 * `reverse`). Text = mv.* keys in src/i18n.tsx. visual="orbit".
 * ============================================================================
 */
import React from 'react';
import { useI18n } from '../i18n';
import { theme, gradients } from '../theme';
import { AltSection } from '../components/AltSection';
import { IconTarget, IconEye } from '../components/icons';

export const MissionVision: React.FC = () => {
  const { t } = useI18n();
  const items = [
    { icon: <IconTarget size={24} />, title: t('mv.missionTitle'), text: t('mv.mission') },
    { icon: <IconEye size={24} />, title: t('mv.visionTitle'), text: t('mv.vision') },
  ];
  return (
    <AltSection
      eyebrow={t('about.tag')}
      visual="orbit"
      reverse
      bg={theme.bg2}
      title={t('mv.missionTitle') + ' & ' + t('mv.visionTitle')}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
        {items.map((c, i) => (
          <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
            <div style={{ width: 48, height: 48, borderRadius: 8, flexShrink: 0, background: gradients.aurora, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 24px -12px rgba(1,120,210,0.5)' }}>{c.icon}</div>
            <div>
              <h3 style={{ fontSize: '1.2rem', color: theme.text, marginBottom: 6 }}>{c.title}</h3>
              <p style={{ color: theme.textDim, lineHeight: 1.8, fontSize: '0.98rem' }}>{c.text}</p>
            </div>
          </div>
        ))}
      </div>
    </AltSection>
  );
};

export default MissionVision;