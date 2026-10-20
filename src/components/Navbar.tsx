/**
 * ============================================================================
 * Navbar.tsx — the fixed top navigation bar.
 * ============================================================================
 *
 * WHAT IT DOES
 *   • Shows the logo (click → scroll to top / go Home), the section links,
 *     the language toggle (globe), and the "Get in Touch" button.
 *   • Becomes a frosted bar once you scroll down (the `scrolled` state).
 *   • Shows a thin AURORA SCROLL-PROGRESS bar under the bar (the `progress`
 *     value = how far down the page you are).
 *   • On mobile it collapses the links into a hamburger dropdown.
 *
 * HOW TO CHANGE IT
 *   • Which links appear → edit the NAV_ITEMS array (each item's `key` is an
 *     i18n text key, `target` is the section id to scroll to).
 *   • Link text → edit the matching nav.* keys in src/i18n.tsx (not here).
 *   • Logo size → the <Logo size=… /> values.
 * ============================================================================
 */
import React, { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { useI18n } from '../i18n';
import { theme, gradients } from '../theme';

interface NavbarProps {
  route: string;
  navigate: (to: string) => void;
}

const NAV_ITEMS = [
  { key: 'nav.home', target: 'home' },
  { key: 'nav.about', target: 'about' },
  { key: 'nav.services', target: 'services' },
  { key: 'nav.why', target: 'why' },
];

export const Navbar: React.FC<NavbarProps> = ({ route, navigate }) => {
  const { t, toggle, dir } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goSection = (target: string) => {
    setMenuOpen(false);
    const doScroll = () => {
      if (target === 'home') window.scrollTo({ top: 0, behavior: 'smooth' });
      else document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
    };
    if (route !== 'home') {
      navigate('home');
      setTimeout(doScroll, 110);
    } else doScroll();
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        insetInline: 0,
        zIndex: 200,
        transition: 'all 0.35s ease',
        background: scrolled || menuOpen ? 'rgba(247,250,255,0.78)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(16px) saturate(160%)' : 'none',
        WebkitBackdropFilter: scrolled || menuOpen ? 'blur(16px) saturate(160%)' : 'none',
        borderBottom: `1px solid ${scrolled ? theme.stroke : 'transparent'}`,
      }}
    >
      <nav
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: scrolled ? '0.6rem 1.5rem' : '1.1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          transition: 'padding 0.35s ease',
        }}
      >
        <button onClick={() => goSection('home')} style={{ background: 'none', border: 'none', padding: 0 }} aria-label="Alif home">
          <Logo variant="color" size={scrolled ? 40 : 48} />
        </button>

        <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: '2.2rem' }}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              onClick={() => goSection(item.target)}
              className="nav-link"
              style={{ background: 'none', border: 'none', fontSize: '0.95rem', fontWeight: 500, color: theme.textDim, padding: '0.25rem 0' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = theme.text)}
              onMouseLeave={(e) => (e.currentTarget.style.color = theme.textDim)}
            >
              {t(item.key)}
            </button>
          ))}

          <LangToggle onClick={toggle} label={t('lang.switch')} />

          <button
            onClick={() => { setMenuOpen(false); navigate('contact'); }}
            style={{
              background: gradients.aurora,
              backgroundSize: '200% 200%',
              animation: 'auroraShift 6s ease infinite',
              border: 'none', color: '#fff', fontSize: '0.95rem', fontWeight: 600,
              padding: '0.65rem 1.5rem', borderRadius: 999,
              boxShadow: '0 10px 30px -10px rgba(1,184,244,0.7)', transition: 'transform 0.25s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
          >
            {t('nav.cta')}
          </button>
        </div>

        <div className="only-mobile" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <LangToggle onClick={toggle} label={t('lang.switch')} compact />
          <button onClick={() => setMenuOpen((o) => !o)} aria-label="Menu"
            style={{ background: 'none', border: 'none', width: 40, height: 40, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 5, padding: 8 }}>
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                display: 'block', height: 2.5, borderRadius: 2, background: theme.text, transition: 'all 0.3s ease',
                transform: menuOpen && i === 0 ? 'translateY(7.5px) rotate(45deg)' : menuOpen && i === 2 ? 'translateY(-7.5px) rotate(-45deg)' : 'none',
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* scroll progress */}
      <div style={{ height: 2, width: '100%', background: 'transparent' }}>
        <div style={{ height: '100%', width: `${progress}%`, background: gradients.aurora, transition: 'width 0.1s linear' }} />
      </div>

      {/* mobile dropdown */}
      <div className="only-mobile" style={{
        overflow: 'hidden', maxHeight: menuOpen ? 380 : 0,
        transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1)',
        background: 'rgba(247,250,255,0.98)', borderBottom: menuOpen ? `1px solid ${theme.stroke}` : 'none',
      }}>
        <div style={{ padding: '0.5rem 1.5rem 1.25rem', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {NAV_ITEMS.map((item) => (
            <button key={item.key} onClick={() => goSection(item.target)}
              style={{ background: 'none', border: 'none', textAlign: dir === 'rtl' ? 'right' : 'left', fontSize: '1.05rem', fontWeight: 500, color: theme.text, padding: '0.85rem 0', borderBottom: `1px solid ${theme.stroke}` }}>
              {t(item.key)}
            </button>
          ))}
          <button onClick={() => { setMenuOpen(false); navigate('contact'); }}
            style={{ marginTop: 12, background: gradients.aurora, border: 'none', color: '#fff', fontSize: '1rem', fontWeight: 600, padding: '0.9rem', borderRadius: 12 }}>
            {t('nav.cta')}
          </button>
        </div>
      </div>
    </header>
  );
};

const LangToggle: React.FC<{ onClick: () => void; label: string; compact?: boolean }> = ({ onClick, label, compact }) => (
  <button
    onClick={onClick}
    style={{
      display: 'flex', alignItems: 'center', gap: 6,
      background: 'rgba(3,40,85,0.04)', border: `1px solid ${theme.stroke}`, color: theme.text,
      fontSize: compact ? '0.82rem' : '0.9rem', fontWeight: 600,
      padding: compact ? '0.4rem 0.7rem' : '0.5rem 0.95rem', borderRadius: 999, transition: 'all 0.25s ease',
    }}
    onMouseEnter={(e) => { e.currentTarget.style.borderColor = theme.strokeHi; e.currentTarget.style.background = 'rgba(1,184,244,0.1)'; }}
    onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.stroke; e.currentTarget.style.background = 'rgba(3,40,85,0.04)'; }}
    aria-label="Switch language"
  >
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
    </svg>
    {label}
  </button>
);

export default Navbar;
