/**
 * ============================================================================
 * Faq.tsx — the accordion of frequently-asked questions.
 * ============================================================================
 *   Click a question to expand its answer (one open at a time). Q&A text =
 *   faq.q1/faq.a1 … in src/i18n.tsx. Add a Q&A by adding a pair there and a new
 *   entry in the `qa` array here.
 * ============================================================================
 */
import React, { useState } from 'react';
import { useI18n } from '../i18n';
import { theme, gradients } from '../theme';
import { Scrub } from '../components/Scrub';
import { Eyebrow } from './Shared';

export const Faq: React.FC = () => {
  const { t, dir } = useI18n();
  const [open, setOpen] = useState<number | null>(0);
  const qa = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') },
  ];
  return (
    <section className="section-pad" style={{ background: theme.bg2 }}>
      <div style={{ maxWidth: 820, margin: '0 auto' }}>
        <Scrub y={40} style={{ textAlign: 'center', margin: '0 auto 2.6rem' }}>
          <Eyebrow center>{t('faq.tag')}</Eyebrow>
          <h2 style={{ fontSize: 'clamp(1.9rem,4vw,3rem)', color: theme.text, margin: '1.1rem 0' }}>{t('faq.title')}</h2>
        </Scrub>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {qa.map((item, i) => {
            const isOpen = open === i;
            return (
              <Scrub key={i} y={40} start={0.98} end={0.6}>
                <div className="glass" style={{ borderRadius: 8, overflow: 'hidden', borderColor: isOpen ? theme.strokeHi : undefined }}>
                  <button onClick={() => setOpen(isOpen ? null : i)}
                    style={{ width: '100%', background: 'none', border: 'none', padding: '1.25rem 1.4rem', display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'space-between', textAlign: dir === 'rtl' ? 'right' : 'left', color: theme.text }}>
                    <span style={{ fontSize: '1.05rem', fontWeight: 700, fontFamily: "'Playfair Display', 'Changa', serif" }}>{item.q}</span>
                    <span style={{ flexShrink: 0, width: 30, height: 30, borderRadius: '50%', background: isOpen ? gradients.aurora : 'rgba(3,40,85,0.06)', color: isOpen ? '#fff' : theme.textDim, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease', transform: isOpen ? 'rotate(45deg)' : 'none' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                    </span>
                  </button>
                  <div style={{ maxHeight: isOpen ? 320 : 0, overflow: 'hidden', transition: 'max-height 0.4s cubic-bezier(0.16,1,0.3,1)' }}>
                    <p style={{ padding: '0 1.4rem 1.3rem', color: theme.textDim, lineHeight: 1.8, fontSize: '0.98rem' }}>{item.a}</p>
                  </div>
                </div>
              </Scrub>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Faq;
