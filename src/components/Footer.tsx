/**
 * ============================================================================
 * Footer.tsx — the page footer (4-column links + bottom bar with socials).
 * ============================================================================
 *
 * LAYOUT (matches the approved design)
 *   Row 1: four columns →  Office | Company | Solutions | Services
 *   Row 2 (after a divider): white logo (left) · copyright (centre) ·
 *                            social icons (right)
 *   Background = FOOTER_BLUE (the logo's navy-blue, from theme.ts).
 *
 * ░░ WHERE TO REPLACE THINGS ░░
 *   • PHONE / EMAIL / ADDRESS → edit the CONTACT object just below.
 *                               (Also update src/pages/Contact.tsx → OFFICE so
 *                                the Contact page stays in sync.)
 *   • SOCIAL MEDIA LINKS ★★★ → edit the SOCIAL array below. Each entry has a
 *                               `href` — put your real profile URL there. Set a
 *                               link to '' (empty) to hide that icon. Add more
 *                               by importing another icon and adding an entry.
 *   • COLUMN LINK WORDING → edit the footer.* keys in src/i18n.tsx.
 *   • Which section each link scrolls to → the `target` values below
 *     ('home' | 'about' | 'services' | 'why'); 'contact' opens the Contact page.
 * ============================================================================
 */
import React from 'react';
import { Logo } from './Logo';
import { useI18n } from '../i18n';
import { theme, FOOTER_BLUE, gradients } from '../theme';
import { WhatsAppBadge } from './WhatsAppBadge';
import { IconX, IconLinkedIn, IconInstagram, IconFacebook, IconPhone, IconMail, IconPin } from './icons';

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// CONTACT DETAILS — replace with the real office phone, email and address.
// Keep the phone/email identical to src/pages/Contact.tsx (OFFICE object).
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
const CONTACT = {
  phone: '+966 11 000 0000',
  email: 'info@alifsystems.com',
};

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// ★ SOCIAL MEDIA LINKS — PUT YOUR REAL PROFILE URLs IN `href` BELOW. ★
//   • Empty href ('') hides that icon.
//   • Order here = display order. Add/remove freely.
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
const SOCIAL = [
  { name: 'X',         href: 'https://x.com/',          Icon: IconX },
  { name: 'LinkedIn',  href: 'https://www.linkedin.com/', Icon: IconLinkedIn },
  { name: 'Instagram', href: 'https://www.instagram.com/', Icon: IconInstagram },
  { name: 'Facebook',  href: 'https://www.facebook.com/',  Icon: IconFacebook },
];

interface FooterProps {
  route: string;
  navigate: (to: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ route, navigate }) => {
  const { t, dir, lang } = useI18n();

  // Smooth-scroll to a home section (or jump home first if on another page).
  const goSection = (target: string) => {
    const doScroll = () => {
      if (target === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
      else document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
    };
    if (route !== 'home') { navigate('home'); setTimeout(doScroll, 110); }
    else doScroll();
  };

  // Shared style for a clickable footer link (used in the Company/Solutions/Services columns).
  const linkStyle: React.CSSProperties = {
    background: 'none', border: 'none', color: 'rgba(255,255,255,0.62)',
    fontSize: '0.95rem', padding: '0.4rem 0', textAlign: dir === 'rtl' ? 'right' : 'left',
    transition: 'color 0.25s ease, padding-inline-start 0.25s ease', cursor: 'pointer', display: 'block',
  };
  const hov = (e: React.MouseEvent<HTMLElement>, on: boolean) => {
    (e.currentTarget as HTMLElement).style.color = on ? '#fff' : 'rgba(255,255,255,0.62)';
    (e.currentTarget as HTMLElement).style.paddingInlineStart = on ? '7px' : '0px';
  };
  const colTitle: React.CSSProperties = { fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: '1.1rem', fontFamily: "'Playfair Display', 'Changa', serif" };

  // The four link columns besides "Office".
  const companyLinks = [
    { label: t('footer.col.about'), target: 'about' },
    { label: t('footer.col.why'), target: 'why' },
    { label: t('footer.services'), target: 'services' },
  ];
  const solutionLinks = [t('footer.sol.manpower'), t('footer.sol.talent'), t('footer.sol.staffing'), t('footer.sol.vetting')];
  const serviceLinks = [t('services.s1.title'), t('services.s2.title'), t('services.s3.title'), t('services.s4.title')];

  return (
    <footer style={{ background: FOOTER_BLUE, color: '#fff', position: 'relative', overflow: 'hidden' }}>
      {/* thin aurora accent line at the very top of the footer */}
      <div style={{ height: 3, width: '100%', background: gradients.aurora }} />
      {/* soft decorative glows */}
      <div style={{ position: 'absolute', top: -140, insetInlineEnd: -80, width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(1,184,244,0.18), transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -120, insetInlineStart: -60, width: 300, height: 300, borderRadius: '50%', background: 'radial-gradient(circle, rgba(109,94,240,0.16), transparent 70%)', pointerEvents: 'none' }} />

      {/* ===== Row 1: four columns ===== */}
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '4.5rem 1.5rem 2.5rem', position: 'relative', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2.5rem' }}>
        {/* "We're here!" circular WhatsApp badge — floats at the end edge like the
            reference. Its number lives in src/components/WhatsAppBadge.tsx.
            Hidden on narrow screens so it never overlaps the columns. */}
        <div className="hide-mobile" style={{ position: 'absolute', insetInlineEnd: '1.5rem', top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}>
          <WhatsAppBadge color="rgba(255,255,255,0.85)" />
        </div>
        {/* Office column (address + phone + email) */}
        <div>
          <h4 style={colTitle}>{t('footer.office')}</h4>
          <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.92rem', marginBottom: 6 }}>{t('footer.addrCountry')}</div>
          <div style={{ display: 'flex', gap: 8, color: 'rgba(255,255,255,0.62)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: 10 }}>
            <span style={{ opacity: 0.7, flexShrink: 0, marginTop: 2 }}><IconPin size={16} /></span>
            <span>{t('footer.addrLine')}</span>
          </div>
          <a href={`tel:${CONTACT.phone.replace(/\s/g, '')}`} style={{ ...linkStyle, direction: 'ltr', display: 'flex', gap: 8, alignItems: 'center' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')} onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.62)')}>
            <IconPhone size={16} /> {CONTACT.phone}
          </a>
          <a href={`mailto:${CONTACT.email}`} style={{ ...linkStyle, display: 'flex', gap: 8, alignItems: 'center', color: theme.cyanSoft }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')} onMouseLeave={(e) => (e.currentTarget.style.color = theme.cyanSoft)}>
            <IconMail size={16} /> {CONTACT.email}
          </a>
        </div>

        {/* Company column */}
        <div>
          <h4 style={colTitle}>{t('footer.company')}</h4>
          {companyLinks.map((l) => (
            <button key={l.target} style={linkStyle} onClick={() => goSection(l.target)} onMouseEnter={(e) => hov(e, true)} onMouseLeave={(e) => hov(e, false)}>{l.label}</button>
          ))}
          <button style={linkStyle} onClick={() => navigate('contact')} onMouseEnter={(e) => hov(e, true)} onMouseLeave={(e) => hov(e, false)}>{t('footer.col.contact')}</button>
        </div>

        {/* Solutions column (scrolls to services section) */}
        <div>
          <h4 style={colTitle}>{t('footer.solutions')}</h4>
          {solutionLinks.map((l, i) => (
            <button key={i} style={linkStyle} onClick={() => goSection('services')} onMouseEnter={(e) => hov(e, true)} onMouseLeave={(e) => hov(e, false)}>{l}</button>
          ))}
        </div>

        {/* Services column */}
        <div>
          <h4 style={colTitle}>{t('footer.services')}</h4>
          {serviceLinks.map((l, i) => (
            <button key={i} style={linkStyle} onClick={() => goSection('services')} onMouseEnter={(e) => hov(e, true)} onMouseLeave={(e) => hov(e, false)}>{l}</button>
          ))}
        </div>
      </div>

      {/* ===== Row 2: bottom bar (logo · copyright · socials) ===== */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', position: 'relative' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto', padding: '1.6rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }} className="foot-bottom">
          <Logo variant="white" size={64} />
          <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', textAlign: 'center', flex: '1 1 auto' }}>
            © {new Date().getFullYear()} {lang === 'ar' ? 'ألف لأنظمة المعلومات' : 'Alif Systems'}. {t('footer.rights')}
          </div>
          {/* Social icons — hrefs live in the SOCIAL array at the top of this file */}
          <div style={{ display: 'flex', gap: 10 }} aria-label={t('footer.follow')}>
            {SOCIAL.filter((s) => s.href).map(({ name, href, Icon }) => (
              <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name} title={name}
                style={{ width: 38, height: 38, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.14)', transition: 'all 0.25s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.14)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 620px) {
          .foot-bottom { flex-direction: column !important; text-align: center; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
