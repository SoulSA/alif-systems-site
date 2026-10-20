/**
 * ============================================================================
 * MapCard.tsx — the office location card on the Contact page.
 * ============================================================================
 *   The app sandbox blocks live map tiles, so this draws a stylised vector map
 *   with a pin and an "open in Google Maps" button (opens the real location).
 *   Set the real coordinates via the lat/lng passed in from Contact.tsx (the
 *   OFFICE object there). The button builds a Google Maps link from them.
 * ============================================================================
 */
import React from 'react';
import { useI18n } from '../i18n';
import { theme } from '../theme';
import { IconPin, IconArrow } from './icons';

/**
 * A stylized, self-contained map card. The sandbox CSP blocks external
 * tile images (img-src is data:/blob: only), so instead of a live tile
 * map we render a clean branded vector map of the district with the
 * office pin, plus a button that opens the real location in Google Maps
 * (opens Google Maps in a new browser tab).
 */
export const MapCard: React.FC<{ lat: number; lng: number }> = ({ lat, lng }) => {
  const { t, dir, lang } = useI18n();
  const flip = dir === 'rtl';
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  const label = lang === 'ar' ? 'ألف لأنظمة المعلومات' : 'Alif Systems';

  return (
    <div style={{ position: 'relative', height: 300, width: '100%', background: '#0a2a4f', overflow: 'hidden' }}>
      {/* Vector "map" backdrop */}
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="mapbg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0b2e56" />
            <stop offset="1" stopColor="#06203f" />
          </linearGradient>
        </defs>
        <rect width="400" height="300" fill="url(#mapbg)" />

        {/* "parks" / blocks */}
        <rect x="30" y="40" width="90" height="60" rx="6" fill="rgba(4,145,224,0.07)" />
        <rect x="250" y="180" width="110" height="80" rx="6" fill="rgba(4,145,224,0.07)" />
        <rect x="60" y="200" width="70" height="55" rx="6" fill="rgba(4,145,224,0.05)" />

        {/* roads */}
        {[60, 150, 240].map((y) => (
          <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
        ))}
        {[90, 200, 310].map((x) => (
          <line key={`v${x}`} x1={x} y1="0" x2={x} y2="300" stroke="rgba(255,255,255,0.1)" strokeWidth="6" />
        ))}
        {/* thin secondary roads */}
        {[25, 115, 185, 275].map((y) => (
          <line key={`sh${y}`} x1="0" y1={y} x2="400" y2={y} stroke="rgba(255,255,255,0.045)" strokeWidth="2" />
        ))}
        {[45, 145, 250, 350].map((x) => (
          <line key={`sv${x}`} x1={x} y1="0" x2={x} y2="300" stroke="rgba(255,255,255,0.045)" strokeWidth="2" />
        ))}

        {/* glow under pin */}
        <circle cx="200" cy="150" r="46" fill="rgba(1,184,244,0.18)" />
        <circle cx="200" cy="150" r="26" fill="rgba(1,184,244,0.25)" />
      </svg>

      {/* Pin */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -100%)', textAlign: 'center' }}>
        <div style={{ color: '#fff', filter: 'drop-shadow(0 6px 10px rgba(0,0,0,0.4))', display: 'flex', justifyContent: 'center' }}>
          <svg width="40" height="52" viewBox="0 0 40 52">
            <path d="M20 0C9 0 0 9 0 20c0 14 20 32 20 32s20-18 20-32C40 9 31 0 20 0z" fill="#032855" stroke="#01B8F4" strokeWidth="2" />
            <circle cx="20" cy="20" r="7" fill="#01B8F4" />
          </svg>
        </div>
      </div>

      {/* Label chip */}
      <div style={{ position: 'absolute', top: 14, insetInlineStart: 14, display: 'inline-flex', alignItems: 'center', gap: 7, background: 'rgba(255,255,255,0.95)', color: theme.navy, padding: '0.4rem 0.75rem', borderRadius: 999, fontSize: '0.82rem', fontWeight: 600, boxShadow: '0 4px 14px rgba(0,0,0,0.2)' }}>
        <span style={{ color: theme.cyan, display: 'inline-flex' }}><IconPin size={15} /></span>
        {label}
      </div>

      {/* Open in maps */}
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'absolute',
          bottom: 14,
          insetInlineEnd: 14,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: theme.cyan,
          color: '#fff',
          padding: '0.6rem 1.1rem',
          borderRadius: 10,
          fontSize: '0.88rem',
          fontWeight: 600,
          boxShadow: '0 8px 20px -8px rgba(1,184,244,0.9)',
          transition: 'transform 0.2s ease',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
      >
        {t('contact.map.title')} <IconArrow flip={flip} size={16} />
      </a>
    </div>
  );
};

export default MapCard;
