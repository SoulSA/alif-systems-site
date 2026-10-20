/**
 * ============================================================================
 * Contact.tsx — the separate CONTACT page (form + info + map).
 * ============================================================================
 *
 * WHAT IT DOES
 *   • A message form (name, email, company, phone, subject, message) with
 *     validation. NOTE: it currently SIMULATES sending (shows a success
 *     message) — it is not yet wired to a real email/back-end. To make it
 *     actually deliver, that is a separate step we can add.
 *   • A contact-info card (address, phone, email, hours).
 *   • The <MapCard/> with the office location.
 *
 * HOW TO CHANGE IT
 *   • Phone / email / coordinates → the OFFICE object below (keep the phone &
 *     email in sync with the footer in src/components/Footer.tsx).
 *   • All labels/placeholders/messages → contact.* keys in src/i18n.tsx.
 * ============================================================================
 */
import React, { useState } from 'react';
import { useI18n } from '../i18n';
import { theme, gradients } from '../theme';
import { Scrub } from '../components/Scrub';
import { MapCard } from '../components/MapCard';
import { ParticleField } from '../components/ParticleField';
import { IconPhone, IconMail, IconPin, IconClock, IconArrow } from '../components/icons';

interface ContactProps {
  navigate: (to: string) => void;
}

const OFFICE = {
  lat: 24.7136,
  lng: 46.6753,
  phone: '+966 11 000 0000',
  email: 'info@alifsystems.com',
};

type Form = { name: string; email: string; company: string; phone: string; subject: string; message: string };
const empty: Form = { name: '', email: '', company: '', phone: '', subject: '', message: '' };

export const Contact: React.FC<ContactProps> = ({ navigate }) => {
  const { t, dir } = useI18n();
  const flip = dir === 'rtl';
  const [form, setForm] = useState<Form>(empty);
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle');
  const [error, setError] = useState('');

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = () => {
    setError('');
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError(t('contact.form.errRequired'));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError(t('contact.form.errEmail'));
      return;
    }
    setStatus('sending');
    setTimeout(() => { setStatus('done'); setForm(empty); }, 1100);
  };

  const field = (
    key: keyof Form,
    labelKey: string,
    phKey: string,
    opts?: { required?: boolean; textarea?: boolean; type?: string; half?: boolean }
  ) => (
    <div style={{ gridColumn: opts?.half ? 'span 1' : 'span 2', display: 'flex', flexDirection: 'column', gap: 7 }} className={opts?.half ? 'c-half' : ''}>
      <label style={{ fontSize: '0.85rem', fontWeight: 600, color: theme.text }}>
        {t(labelKey)} {opts?.required && <span style={{ color: theme.cyanSoft }}>*</span>}
      </label>
      {opts?.textarea ? (
        <textarea value={form[key]} onChange={set(key)} placeholder={t(phKey)} rows={5} style={inputStyle(dir)} onFocus={(e) => focus(e, true)} onBlur={(e) => focus(e, false)} />
      ) : (
        <input type={opts?.type ?? 'text'} value={form[key]} onChange={set(key)} placeholder={t(phKey)} style={inputStyle(dir)} onFocus={(e) => focus(e, true)} onBlur={(e) => focus(e, false)} />
      )}
    </div>
  );

  return (
    <main style={{ background: theme.bg }}>
      {/* Hero band */}
      <section style={{ position: 'relative', overflow: 'hidden', background: gradients.canvas, padding: '10rem 1.5rem 4.5rem' }}>
        <ParticleField density={45} />
        <div style={{ position: 'absolute', top: '20%', insetInlineEnd: '12%', width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(109,94,240,0.3), transparent 68%)', filter: 'blur(20px)', animation: 'orbPulse 8s ease-in-out infinite' }} />
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <span style={{ display: 'inline-block', fontSize: '0.8rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#0A9BE0', marginBottom: 14 }}>{t('contact.hero.tag')}</span>
          <h1 style={{ fontSize: 'clamp(2.1rem,5vw,3.4rem)', marginBottom: '1rem', animation: 'fadeUp 0.8s ease both' }}><span className="grad-text">{t('contact.hero.title')}</span></h1>
          <p style={{ color: theme.textDim, fontSize: '1.1rem', lineHeight: 1.7, animation: 'fadeUp 0.9s ease both 0.1s' }}>{t('contact.hero.subtitle')}</p>
        </div>
      </section>

      {/* Content */}
      <section style={{ padding: '4.5rem 1.5rem 5rem' }}>
        <div style={{ maxWidth: 1150, margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0,1.1fr) minmax(0,0.9fr)', gap: 40, alignItems: 'start' }} className="contact-grid">
          {/* Form */}
          <Scrub y={50}>
            <div className="glass" style={{ borderRadius: 10, padding: 'clamp(1.6rem, 3vw, 2.5rem)' }}>
              <h2 style={{ fontSize: '1.5rem', color: theme.text, marginBottom: '1.6rem' }}>{t('contact.form.title')}</h2>

              {status === 'done' ? (
                <div style={{ padding: '2rem', textAlign: 'center' }}>
                  <div style={{ width: 72, height: 72, borderRadius: '50%', background: gradients.aurora, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.2rem', boxShadow: '0 14px 30px -12px rgba(1,184,244,0.6)' }}>
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <p style={{ color: theme.text, fontSize: '1.08rem', lineHeight: 1.7, fontWeight: 500 }}>{t('contact.form.success')}</p>
                  <button onClick={() => setStatus('idle')} style={{ marginTop: 20, background: 'rgba(255,255,255,0.06)', border: `1px solid ${theme.stroke}`, color: theme.text, padding: '0.6rem 1.4rem', borderRadius: 10, fontWeight: 600 }}>{t('contact.form.send')}</button>
                </div>
              ) : (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    {field('name', 'contact.form.name', 'contact.form.namePh', { required: true, half: true })}
                    {field('email', 'contact.form.email', 'contact.form.emailPh', { required: true, half: true, type: 'email' })}
                    {field('company', 'contact.form.company', 'contact.form.companyPh', { half: true })}
                    {field('phone', 'contact.form.phone', 'contact.form.phonePh', { half: true, type: 'tel' })}
                    {field('subject', 'contact.form.subject', 'contact.form.subjectPh')}
                    {field('message', 'contact.form.message', 'contact.form.messagePh', { required: true, textarea: true })}
                  </div>

                  {error && (<div style={{ marginTop: 14, color: '#FF9D8A', fontSize: '0.9rem', background: 'rgba(255,100,80,0.1)', padding: '0.7rem 1rem', borderRadius: 10, border: '1px solid rgba(255,100,80,0.2)' }}>{error}</div>)}

                  <button onClick={submit} disabled={status === 'sending'}
                    style={{ marginTop: 22, width: '100%', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: gradients.aurora, backgroundSize: '200% 200%', animation: 'auroraShift 6s ease infinite', color: '#fff', border: 'none', padding: '1rem', borderRadius: 12, fontSize: '1rem', fontWeight: 600, opacity: status === 'sending' ? 0.75 : 1, boxShadow: '0 16px 34px -16px rgba(1,184,244,0.7)', transition: 'transform 0.2s ease' }}
                    onMouseEnter={(e) => { if (status !== 'sending') e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}>
                    {status === 'sending' ? t('contact.form.sending') : t('contact.form.send')}
                    {status !== 'sending' && <IconArrow flip={flip} />}
                  </button>
                </>
              )}
            </div>
          </Scrub>

          {/* Info + Map */}
          <Scrub y={60}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div style={{ background: gradients.aurora, borderRadius: 10, padding: '2rem', color: '#fff', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', insetInlineEnd: -30, bottom: -30, width: 160, height: 160, borderRadius: '50%', background: 'rgba(255,255,255,0.12)' }} />
                <h3 style={{ fontSize: '1.3rem', marginBottom: '1.4rem', position: 'relative' }}>{t('contact.info.title')}</h3>
                <InfoRow icon={<IconPin />} label={t('contact.info.addressLabel')} value={t('contact.info.address')} />
                <InfoRow icon={<IconPhone />} label={t('contact.info.phoneLabel')} value={OFFICE.phone} href={`tel:${OFFICE.phone.replace(/\s/g, '')}`} ltr />
                <InfoRow icon={<IconMail />} label={t('contact.info.emailLabel')} value={OFFICE.email} href={`mailto:${OFFICE.email}`} ltr />
                <InfoRow icon={<IconClock />} label={t('contact.info.hoursLabel')} value={t('contact.info.hours')} last />
              </div>

              <div style={{ borderRadius: 10, overflow: 'hidden', border: `1px solid ${theme.stroke}` }}>
                <MapCard lat={OFFICE.lat} lng={OFFICE.lng} />
              </div>
            </div>
          </Scrub>
        </div>

        <div style={{ maxWidth: 1150, margin: '2.5rem auto 0', textAlign: 'center' }}>
          <button onClick={() => navigate('home')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.05)', border: `1px solid ${theme.stroke}`, color: theme.text, padding: '0.7rem 1.5rem', borderRadius: 10, fontWeight: 600, transition: 'all 0.25s ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = theme.strokeHi; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = theme.stroke; }}>
            <IconArrow flip={!flip} /> {t('contact.back')}
          </button>
        </div>
      </section>

      <style>{`
        @media (max-width: 860px) { .contact-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 520px) { .c-half { grid-column: span 2 !important; } }
      `}</style>
    </main>
  );
};

const InfoRow: React.FC<{ icon: React.ReactNode; label: string; value: string; href?: string; ltr?: boolean; last?: boolean }> = ({ icon, label, value, href, ltr, last }) => (
  <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', paddingBottom: last ? 0 : 16, marginBottom: last ? 0 : 16, borderBottom: last ? 'none' : '1px solid rgba(255,255,255,0.2)', position: 'relative' }}>
    <div style={{ width: 42, height: 42, borderRadius: 8, background: 'rgba(255,255,255,0.16)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
    <div>
      <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.75)', marginBottom: 3 }}>{label}</div>
      {href ? (
        <a href={href} style={{ fontSize: '1rem', fontWeight: 500, color: '#fff', direction: ltr ? 'ltr' : undefined, display: 'inline-block' }}>{value}</a>
      ) : (
        <div style={{ fontSize: '1rem', fontWeight: 500, color: '#fff', direction: ltr ? 'ltr' : undefined }}>{value}</div>
      )}
    </div>
  </div>
);

function inputStyle(dir: 'ltr' | 'rtl'): React.CSSProperties {
  return {
    width: '100%', padding: '0.8rem 1rem', borderRadius: 8,
    border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.04)',
    fontSize: '0.97rem', color: '#EAF1FB', outline: 'none',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease',
    textAlign: dir === 'rtl' ? 'right' : 'left', resize: 'vertical',
  };
}
function focus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>, on: boolean) {
  e.currentTarget.style.borderColor = on ? 'rgba(63,208,255,0.6)' : 'rgba(255,255,255,0.12)';
  e.currentTarget.style.background = on ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.04)';
  e.currentTarget.style.boxShadow = on ? '0 0 0 3px rgba(1,184,244,0.12)' : 'none';
}

export default Contact;
