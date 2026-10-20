/**
 * ============================================================================
 * ArticlePage.tsx — the public reader at #/article/<id>.
 * ============================================================================
 *   Loads one article by id and renders it: cover image, title, author +
 *   reading time, then the rich HTML body (sanitised with DOMPurify before
 *   rendering, since it was authored in the editor). A "back to articles" link
 *   returns to the home Articles section.
 * ============================================================================
 */
import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { useI18n } from '../i18n';
import { theme, gradients } from '../theme';
import { IconArrow } from '../components/icons';
import { Article, getArticle, readingMinutes } from '../articles';

export const ArticlePage: React.FC<{ id: string; navigate: (to: string) => void }> = ({ id, navigate }) => {
  const { t, dir } = useI18n();
  const flip = dir === 'rtl';
  const [article, setArticle] = useState<Article | null | 'missing'>(null);

  useEffect(() => {
    getArticle(id).then((a) => setArticle(a ?? 'missing')).catch(() => setArticle('missing'));
    window.scrollTo({ top: 0 });
  }, [id]);

  const backBar = (
    <button onClick={() => { navigate('home'); setTimeout(() => document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' }), 120); }}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(3,40,85,0.05)', border: `1px solid ${theme.stroke}`, color: theme.text, padding: '0.6rem 1.2rem', borderRadius: 9, fontWeight: 600, cursor: 'pointer' }}>
      <IconArrow flip={!flip} size={16} /> {t('articles.back')}
    </button>
  );

  if (article === null) {
    return <main style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: theme.bg, color: theme.textDim, paddingTop: 100 }}>…</main>;
  }
  if (article === 'missing') {
    return (
      <main style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center', justifyContent: 'center', background: theme.bg, paddingTop: 100 }}>
        <p style={{ color: theme.textDim }}>{t('articles.empty')}</p>
        {backBar}
      </main>
    );
  }

  const clean = DOMPurify.sanitize(article.body || '');

  return (
    <main style={{ background: theme.bg, paddingTop: 90 }}>
      {/* hero */}
      <header style={{ position: 'relative', overflow: 'hidden', background: gradients.canvas, padding: '3rem 1.5rem 2.5rem' }}>
        <div style={{ maxWidth: 820, margin: '0 auto', position: 'relative' }}>
          {backBar}
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: theme.text, lineHeight: 1.12, margin: '1.3rem 0 1rem' }}>{article.title}</h1>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center', color: theme.textDim, fontSize: '0.92rem' }}>
            <span>{t('articles.by')} <strong style={{ color: theme.text }}>{article.author || 'Alif Systems'}</strong></span>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: theme.textFaint }} />
            <span>{new Date(article.createdAt).toLocaleDateString()}</span>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: theme.textFaint }} />
            <span>{readingMinutes(article.body)} {t('articles.minRead')}</span>
          </div>
        </div>
      </header>

      {article.cover && (
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 1.5rem' }}>
          <img src={article.cover} alt="" style={{ width: '100%', maxHeight: 460, objectFit: 'cover', borderRadius: 12, marginTop: '-1rem', boxShadow: '0 30px 60px -36px rgba(3,40,85,0.4)' }} />
        </div>
      )}

      {/* body */}
      <article
        className="article-body"
        dir={dir}
        style={{ maxWidth: 740, margin: '0 auto', padding: '2.5rem 1.5rem 4rem', color: theme.text, fontSize: '1.1rem', lineHeight: 1.9, textAlign: dir === 'rtl' ? 'right' : 'left' }}
        dangerouslySetInnerHTML={{ __html: clean }}
      />

      <div style={{ maxWidth: 740, margin: '0 auto', padding: '0 1.5rem 4rem' }}>{backBar}</div>

      <style>{`
        .article-body h2 { font-size: 1.9rem; margin: 1.8rem 0 0.8rem; font-family: 'Playfair Display','Changa',serif; color: ${theme.text}; }
        .article-body h3 { font-size: 1.45rem; margin: 1.4rem 0 0.6rem; font-family: 'Playfair Display','Changa',serif; color: ${theme.text}; }
        .article-body p { margin: 0 0 1.2rem; }
        .article-body img { max-width: 100%; height: auto; border-radius: 10px; margin: 1.2rem 0; }
        .article-body a { color: #0A9BE0; text-decoration: underline; }
        .article-body blockquote { margin: 1.4rem 0; padding: 0.8rem 1.3rem; border-inline-start: 4px solid ${theme.cyan}; background: rgba(1,184,244,0.06); font-style: italic; color: ${theme.textDim}; }
        .article-body ul, .article-body ol { padding-inline-start: 1.6rem; margin: 0 0 1.2rem; }
        .article-body li { margin-bottom: 0.4rem; }
      `}</style>
    </main>
  );
};

export default ArticlePage;
