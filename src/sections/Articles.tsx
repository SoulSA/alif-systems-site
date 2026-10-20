/**
 * ============================================================================
 * Articles.tsx — the home-page section that lists PUBLISHED articles.
 * ============================================================================
 *   Reads published articles from storage (src/articles.ts) and shows them as
 *   cards. Clicking a card opens the reader at #/article/<id>. If there are no
 *   published articles, the whole section hides itself (returns null) so the
 *   home page never shows an empty block.
 *
 *   Text lives in the articles.* keys in src/i18n.tsx.
 * ============================================================================
 */
import React, { useEffect, useState } from 'react';
import { useI18n } from '../i18n';
import { theme, gradients } from '../theme';
import { Scrub } from '../components/Scrub';
import { Tilt } from '../components/Interactions';
import { Eyebrow, maxW } from './Shared';
import { IconArrow } from '../components/icons';
import { Article, listPublished, readingMinutes } from '../articles';

export const Articles: React.FC<{ navigate: (to: string) => void }> = ({ navigate }) => {
  const { t, dir } = useI18n();
  const flip = dir === 'rtl';
  const [items, setItems] = useState<Article[] | null>(null);

  useEffect(() => { listPublished().then(setItems).catch(() => setItems([])); }, []);

  // Hide the entire section until we know there's at least one published article.
  if (items === null || items.length === 0) return null;

  return (
    <section id="articles" className="section-pad" style={{ background: theme.bg2, position: 'relative' }}>
      <div style={{ maxWidth: maxW, margin: '0 auto' }}>
        <Scrub y={40} style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 3rem' }}>
          <Eyebrow center>{t('articles.tag')}</Eyebrow>
          <h2 style={{ fontSize: 'clamp(1.9rem,4vw,3rem)', color: theme.text, margin: '1.1rem 0 1rem' }}>{t('articles.title')}</h2>
          <p style={{ color: theme.textDim, fontSize: '1.05rem', lineHeight: 1.75 }}>{t('articles.subtitle')}</p>
        </Scrub>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 22 }}>
          {items.map((a, i) => (
            <Scrub key={a.id} y={60} fromScale={0.96} start={0.96} end={0.5}>
              <Tilt max={6} style={{ height: '100%' }}>
                <button
                  onClick={() => navigate(`article/${a.id}`)}
                  className="glass card-hover"
                  style={{ display: 'block', textAlign: dir === 'rtl' ? 'right' : 'left', width: '100%', height: '100%', borderRadius: 10, overflow: 'hidden', border: `1px solid ${theme.stroke}`, cursor: 'pointer', padding: 0 }}
                >
                  {/* cover */}
                  <div style={{ height: 170, background: a.cover ? `center/cover no-repeat url(${JSON.stringify(a.cover)})` : gradients.aurora, position: 'relative' }}>
                    {!a.cover && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.9)', fontFamily: "'Playfair Display','Changa',serif", fontSize: '1.4rem', fontWeight: 800, padding: '0 1rem', textAlign: 'center' }}>{a.title}</div>}
                  </div>
                  <div style={{ padding: '1.3rem 1.4rem' }}>
                    <h3 style={{ fontSize: '1.2rem', color: theme.text, marginBottom: 8, lineHeight: 1.3 }}>{a.title}</h3>
                    <p style={{ color: theme.textDim, fontSize: '0.95rem', lineHeight: 1.65, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{a.excerpt}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.8rem', color: theme.textFaint }}>{readingMinutes(a.body)} {t('articles.minRead')}</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: '#0A9BE0', fontWeight: 600, fontSize: '0.9rem' }}>{t('articles.readMore')} <IconArrow flip={flip} size={15} /></span>
                    </div>
                  </div>
                </button>
              </Tilt>
            </Scrub>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Articles;
