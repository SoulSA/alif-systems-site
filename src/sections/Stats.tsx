/**
 * ============================================================================
 * Stats.tsx — the "By the numbers" strip with COUNT-UP numbers.
 * ============================================================================
 *   The numbers animate from 0 to the target when scrolled into view (works
 *   with Arabic digits too). Values/labels = stats.* keys in src/i18n.tsx:
 *   e.g. stats.1v = "500", stats.1s = "+", stats.1 = the label.
 * ============================================================================
 */
import React, { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n';
import { theme, gradients } from '../theme';
import { Scrub } from '../components/Scrub';
import { Eyebrow, maxW } from './Shared';

const CountUp: React.FC<{ value: string; suffix: string }> = ({ value, suffix }) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [n, setN] = useState(0);
  const done = useRef(false);
  const arabic = /[\u0660-\u0669]/.test(value);
  const toLatin = (s: string) => s.replace(/[\u0660-\u0669]/g, (d) => String(d.charCodeAt(0) - 0x0660));
  const target = parseInt(toLatin(value), 10) || 0;
  const toArabic = (num: number) => String(num).replace(/[0-9]/g, (d) => String.fromCharCode(0x0660 + Number(d)));
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          if (reduce) { setN(target); io.unobserve(e.target); return; }
          const dur = 1400, t0 = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - t0) / dur, 1);
            setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);
  return <span ref={ref}>{arabic ? toArabic(n) : n}{suffix}</span>;
};

export const Stats: React.FC = () => {
  const { t } = useI18n();
  const items = [
    { v: t('stats.1v'), s: t('stats.1s'), l: t('stats.1') },
    { v: t('stats.2v'), s: t('stats.2s'), l: t('stats.2') },
    { v: t('stats.3v'), s: t('stats.3s'), l: t('stats.3') },
    { v: t('stats.4v'), s: t('stats.4s'), l: t('stats.4') },
  ];
  return (
    <section className="section-pad" style={{ background: theme.bg2 }}>
      <div style={{ maxWidth: maxW, margin: '0 auto' }}>
        <Scrub y={40} style={{ textAlign: 'center', maxWidth: 620, margin: '0 auto 2.8rem' }}>
          <Eyebrow center>{t('stats.tag')}</Eyebrow>
          <h2 style={{ fontSize: 'clamp(1.9rem,4vw,3rem)', color: theme.text, margin: '1.1rem 0' }}>{t('stats.title')}</h2>
        </Scrub>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
          {items.map((it, i) => (
            <Scrub key={i} y={70} fromScale={0.95} start={0.95} end={0.5}>
              <div className="glass card-hover" style={{ borderRadius: 8, padding: '2.2rem 1.4rem', textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(2.4rem,5vw,3.4rem)', fontWeight: 800, fontFamily: "'Playfair Display', 'Changa', serif", lineHeight: 1, background: i === 2 ? gradients.textCyanAmber : gradients.textCyanViolet, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  <CountUp value={it.v} suffix={it.s} />
                </div>
                <div style={{ marginTop: 10, fontSize: '0.92rem', color: theme.textDim }}>{it.l}</div>
              </div>
            </Scrub>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
