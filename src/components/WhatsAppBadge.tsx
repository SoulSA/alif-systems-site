/**
 * ============================================================================
 * WhatsAppBadge.tsx — the circular "WE'RE HERE!" badge that opens WhatsApp.
 * ============================================================================
 *
 * WHAT IT DOES
 *   A round badge with rotating circular text around a WhatsApp glyph. Clicking
 *   it opens a WhatsApp chat with your business number (wa.me link). It gently
 *   spins, and pauses/scales on hover.
 *
 * ░░ WHERE TO PUT THE WHATSAPP NUMBER (do this when you have it) ░░
 *   Edit WHATSAPP_NUMBER below. Rules:
 *     • DIGITS ONLY — include the country code, NO "+", NO spaces, NO dashes.
 *       Example for Saudi Arabia +966 55 123 4567  →  '966551234567'
 *     • Leave it '' (empty) to HIDE the badge entirely until you're ready.
 *   Optionally edit WHATSAPP_MESSAGE — the text pre-filled in the chat box.
 *
 *   You can also change the ring words via the `label` prop where the badge is
 *   used (default "WE'RE HERE!").
 * ============================================================================
 */
import React from 'react';
import { useI18n } from '../i18n';
import { theme } from '../theme';
import { IconWhatsApp } from './icons';

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// ★ YOUR WHATSAPP NUMBER GOES HERE — digits only, with country code, no "+". ★
//   e.g. '966551234567'.  Empty string hides the badge.
const WHATSAPP_NUMBER = '';
// Pre-filled first message (optional). Shown in the user's WhatsApp compose box.
const WHATSAPP_MESSAGE = 'Hello Alif Systems, I would like to know more about your services.';
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

export const WhatsAppBadge: React.FC<{ label?: string; size?: number; color?: string }> = ({
  label = "WE'RE HERE! · WE'RE HERE! · ",
  size = 150,
  color,
}) => {
  const { lang } = useI18n();
  // Arabic ring label (used automatically when the site is in Arabic)
  const ring = lang === 'ar' ? 'نحن هنا! · نحن هنا! · ' : label;

  // Until WHATSAPP_NUMBER is filled in, the badge still SHOWS (so you can see
  // the design) but is inert — clicking explains it's coming soon. Once you add
  // the number it becomes a live WhatsApp link automatically.
  const ready = Boolean(WHATSAPP_NUMBER);
  const href = ready
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`
    : undefined;
  const r = size / 2;
  const textR = r - 14; // radius the circular text sits on
  const id = 'wa-ring';

  // Build the circular text path
  const pathD = `M ${r},${r} m -${textR},0 a ${textR},${textR} 0 1,1 ${textR * 2},0 a ${textR},${textR} 0 1,1 -${textR * 2},0`;

  return (
    <a
      href={href}
      onClick={(e) => { if (!ready) e.preventDefault(); }}
      target={ready ? '_blank' : undefined}
      rel="noopener noreferrer"
      aria-label={ready ? 'Chat with us on WhatsApp' : 'WhatsApp coming soon'}
      title={ready ? 'WhatsApp' : 'WhatsApp number coming soon'}
      className="wa-badge"
      style={{ width: size, height: size, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', position: 'relative', textDecoration: 'none', cursor: ready ? 'pointer' : 'default', opacity: ready ? 1 : 0.9 }}
    >
      {/* rotating ring of text */}
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: 'absolute', inset: 0, animation: 'spinSlow 18s linear infinite' }} className="wa-ring">
        <defs><path id={id} d={pathD} /></defs>
        <text fill={color ?? theme.text} fontSize="12" fontWeight="700" letterSpacing="2" style={{ fontFamily: "'Changa', sans-serif", textTransform: 'uppercase' }}>
          <textPath href={`#${id}`} startOffset="0">{ring}</textPath>
        </text>
      </svg>

      {/* center WhatsApp disc */}
      <span style={{ width: size * 0.46, height: size * 0.46, borderRadius: '50%', background: 'linear-gradient(135deg, #25D366, #128C7E)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 26px -10px rgba(37,211,102,0.8)', transition: 'transform 0.3s ease' }} className="wa-core">
        <IconWhatsApp size={size * 0.24} />
      </span>

      <style>{`
        .wa-badge:hover .wa-ring { animation-play-state: paused; }
        .wa-badge:hover .wa-core { transform: scale(1.08); }
        @media (prefers-reduced-motion: reduce) { .wa-ring { animation: none !important; } }
      `}</style>
    </a>
  );
};

export default WhatsAppBadge;