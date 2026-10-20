/**
 * ============================================================================
 * Admin.tsx — the HIDDEN article studio at #/admin (not linked anywhere).
 * ============================================================================
 *
 * FLOW
 *   1. Login gate — posts the password to the server (/api/login); the server
 *      checks it against the ADMIN_PASSWORD env var and sets an http-only
 *      session cookie. "Lock" calls /api/logout.
 *   2. Article list — create / edit / delete / see published vs draft.
 *   3. Editor form — title, author, excerpt, cover image (URL or upload), the
 *      rich text body (components/RichTextEditor), and a Published toggle.
 *   Articles are saved via src/articles.ts (the site's own /api/articles).
 *
 * SECURITY: auth is enforced server-side; the password lives only in the
 * server's ADMIN_PASSWORD env var, never in the front-end bundle.
 * ============================================================================
 */
import React, { useEffect, useRef, useState } from 'react';
import { useI18n } from '../i18n';
import { theme, gradients } from '../theme';
import { Article, listArticles, saveArticle, deleteArticle, newId } from '../articles';
import { RichTextEditor } from '../components/RichTextEditor';
import { IconArrow } from '../components/icons';

// Admin auth is handled by the SERVER (see server/server.js). The browser never
// holds the password; it logs in to get an http-only session cookie, then asks
// the server whether a valid session exists via /api/me.
export const Admin: React.FC<{ navigate: (to: string) => void }> = ({ navigate }) => {
  const [unlocked, setUnlocked] = useState<boolean | null>(null); // null = checking

  useEffect(() => {
    fetch('/api/me', { credentials: 'include' })
      .then((r) => r.json())
      .then((d) => setUnlocked(Boolean(d && d.authenticated)))
      .catch(() => setUnlocked(false));
  }, []);

  const logout = async () => {
    try { await fetch('/api/logout', { method: 'POST', credentials: 'include' }); } catch {}
    setUnlocked(false);
  };

  if (unlocked === null) {
    return <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: gradients.canvas, color: theme.textDim }}>…</main>;
  }
  if (!unlocked) return <Gate onUnlock={() => setUnlocked(true)} />;
  return <Studio navigate={navigate} onLock={logout} />;
};

// ---------- Server-backed login gate ----------
const Gate: React.FC<{ onUnlock: () => void }> = ({ onUnlock }) => {
  const { t } = useI18n();
  const [pw, setPw] = useState('');
  const [err, setErr] = useState(false);
  const [busy, setBusy] = useState(false);
  const submit = async () => {
    setBusy(true); setErr(false);
    try {
      const r = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ password: pw }),
      });
      if (r.ok) onUnlock(); else setErr(true);
    } catch {
      setErr(true);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: gradients.canvas, padding: '2rem' }}>
      <div className="glass" style={{ maxWidth: 420, width: '100%', borderRadius: 14, padding: '2.5rem' }}>
        <div style={{ width: 60, height: 60, borderRadius: 14, background: gradients.aurora, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.3rem' }}>
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
        </div>
        <h1 style={{ fontSize: '1.6rem', color: theme.text, marginBottom: 6 }}>{t('admin.lock.title')}</h1>
        <p style={{ color: theme.textDim, marginBottom: '1.4rem', fontSize: '0.95rem' }}>{t('admin.lock.prompt')}</p>
        <input
          type="password" value={pw} autoFocus
          onChange={(e) => { setPw(e.target.value); setErr(false); }}
          onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
          placeholder={t('admin.lock.placeholder')}
          style={{ width: '100%', padding: '0.85rem 1rem', borderRadius: 9, border: `1px solid ${err ? '#E0564B' : theme.stroke}`, background: '#fff', fontSize: '1rem', color: theme.text, outline: 'none' }}
        />
        {err && <div style={{ color: '#E0564B', fontSize: '0.88rem', marginTop: 8 }}>{t('admin.lock.wrong')}</div>}
        <button onClick={submit} style={{ marginTop: 16, width: '100%', background: gradients.aurora, color: '#fff', border: 'none', padding: '0.9rem', borderRadius: 10, fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>{t('admin.lock.enter')}</button>
      </div>
    </main>
  );
};

// ---------- Studio (list + editor) ----------
const emptyArticle = (): Article => ({ id: newId(), title: '', author: 'Alif Systems', excerpt: '', cover: '', body: '', published: true, createdAt: Date.now(), updatedAt: Date.now() });

const Studio: React.FC<{ navigate: (to: string) => void; onLock: () => void }> = ({ navigate, onLock }) => {
  const { t, dir } = useI18n();
  const [list, setList] = useState<Article[]>([]);
  const [editing, setEditing] = useState<Article | null>(null);
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [loading, setLoading] = useState(true);
  const coverFileRef = useRef<HTMLInputElement | null>(null);

  const refresh = async () => { setLoading(true); setList(await listArticles()); setLoading(false); };
  useEffect(() => { refresh(); }, []);

  const startNew = () => { setEditing(emptyArticle()); setStatus('idle'); };
  const startEdit = (a: Article) => { setEditing({ ...a }); setStatus('idle'); };

  const save = async () => {
    if (!editing) return;
    if (!editing.title.trim()) { alert(t('admin.err.title')); return; }
    setStatus('saving');
    const rec = { ...editing, updatedAt: Date.now() };
    try {
      await saveArticle(rec);
      setStatus('saved');
      await refresh();
      setTimeout(() => { setEditing(null); setStatus('idle'); }, 700);
    } catch (e) {
      console.error('save failed', e);
      setStatus('idle');
      alert('Could not save the article. Please try again. (' + (e as Error)?.message + ')');
    }
  };

  const remove = async (a: Article) => {
    if (!window.confirm(t('admin.confirmDelete'))) return;
    await deleteArticle(a.id);
    await refresh();
  };

  const onCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (!f || !editing) return;
    const r = new FileReader();
    r.onload = () => setEditing({ ...editing, cover: String(r.result) });
    r.readAsDataURL(f); e.target.value = '';
  };

  const field = (label: string, node: React.ReactNode) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: theme.text, marginBottom: 6 }}>{label}</label>
      {node}
    </div>
  );
  const inputCss: React.CSSProperties = { width: '100%', padding: '0.75rem 0.9rem', borderRadius: 9, border: `1px solid ${theme.stroke}`, background: '#fff', fontSize: '0.97rem', color: theme.text, outline: 'none', textAlign: dir === 'rtl' ? 'right' : 'left' };

  return (
    <main style={{ minHeight: '100vh', background: theme.bg, padding: '2rem 1.25rem 4rem' }}>
      <div style={{ maxWidth: 980, margin: '0 auto' }}>
        {/* header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: '1.8rem' }}>
          <div>
            <h1 style={{ fontSize: '1.9rem', color: theme.text }}>{t('admin.title')}</h1>
            <p style={{ color: theme.textDim, marginTop: 4 }}>{t('admin.subtitle')}</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => navigate('home')} style={ghostBtn}>← {t('nav.home')}</button>
            <button onClick={onLock} style={ghostBtn}>🔒 {t('admin.lock.logout')}</button>
          </div>
        </div>

        {!editing && (
          <>
            <button onClick={startNew} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: gradients.aurora, color: '#fff', border: 'none', padding: '0.85rem 1.4rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', marginBottom: '1.5rem' }}>
              + {t('admin.new')}
            </button>
            <h2 style={{ fontSize: '1.1rem', color: theme.text, marginBottom: 12 }}>{t('admin.list.title')}</h2>
            {loading ? <p style={{ color: theme.textDim }}>…</p> : list.length === 0 ? (
              <p style={{ color: theme.textDim }}>{t('admin.list.empty')}</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {list.map((a) => (
                  <div key={a.id} className="glass" style={{ borderRadius: 10, padding: '1rem 1.2rem', display: 'flex', alignItems: 'center', gap: 14, justifyContent: 'space-between' }}>
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontWeight: 700, color: theme.text, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.title || '—'}</span>
                        <span style={{ fontSize: '0.72rem', fontWeight: 700, padding: '0.15rem 0.55rem', borderRadius: 999, background: a.published ? 'rgba(37,180,120,0.15)' : 'rgba(150,150,150,0.15)', color: a.published ? '#1C9E63' : theme.textFaint }}>{a.published ? t('admin.publish') : t('admin.draft')}</span>
                      </div>
                      <div style={{ fontSize: '0.84rem', color: theme.textFaint, marginTop: 3 }}>{new Date(a.createdAt).toLocaleDateString()}</div>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                      <button onClick={() => startEdit(a)} style={smallBtn}>{t('admin.edit')}</button>
                      <button onClick={() => remove(a)} style={{ ...smallBtn, color: '#E0564B', borderColor: 'rgba(224,86,75,0.4)' }}>{t('admin.delete')}</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {editing && (
          <div>
            {field(t('admin.f.title'), <input style={inputCss} value={editing.title} placeholder={t('admin.f.titlePh')} onChange={(e) => setEditing({ ...editing, title: e.target.value })} />)}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {field(t('admin.f.author'), <input style={inputCss} value={editing.author} placeholder={t('admin.f.authorPh')} onChange={(e) => setEditing({ ...editing, author: e.target.value })} />)}
              {field(t('admin.f.cover'), (
                <div style={{ display: 'flex', gap: 8 }}>
                  <input style={{ ...inputCss, flex: 1 }} value={editing.cover.startsWith('data:') ? '(uploaded image)' : editing.cover} placeholder={t('admin.f.coverPh')} onChange={(e) => setEditing({ ...editing, cover: e.target.value })} />
                  <button onClick={() => coverFileRef.current?.click()} style={smallBtn}>{t('admin.f.coverUpload')}</button>
                  <input ref={coverFileRef} type="file" accept="image/*" onChange={onCoverUpload} style={{ display: 'none' }} />
                </div>
              ))}
            </div>
            {field(t('admin.f.excerpt'), <textarea style={{ ...inputCss, minHeight: 70, resize: 'vertical' }} value={editing.excerpt} placeholder={t('admin.f.excerptPh')} onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })} />)}
            {field(t('admin.f.body'), <RichTextEditor value={editing.body} onChange={(html) => setEditing({ ...editing, body: html })} />)}

            <label style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '14px 0', cursor: 'pointer', color: theme.text }}>
              <input type="checkbox" checked={editing.published} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} style={{ width: 18, height: 18 }} />
              {t('admin.f.published')}
            </label>

            <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
              <button onClick={save} disabled={status === 'saving'} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: gradients.aurora, color: '#fff', border: 'none', padding: '0.9rem 1.6rem', borderRadius: 10, fontWeight: 700, cursor: 'pointer', opacity: status === 'saving' ? 0.7 : 1 }}>
                {status === 'saving' ? t('admin.saving') : status === 'saved' ? t('admin.saved') : t('admin.save')}
              </button>
              <button onClick={() => setEditing(null)} style={ghostBtn}>{t('admin.cancel')}</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

const ghostBtn: React.CSSProperties = { background: 'rgba(3,40,85,0.05)', border: `1px solid ${theme.stroke}`, color: theme.text, padding: '0.55rem 1rem', borderRadius: 9, fontWeight: 600, cursor: 'pointer' };
const smallBtn: React.CSSProperties = { background: '#fff', border: `1px solid ${theme.stroke}`, color: theme.text, padding: '0.45rem 0.9rem', borderRadius: 8, fontWeight: 600, cursor: 'pointer', fontSize: '0.88rem' };

export default Admin;
