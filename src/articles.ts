/**
 * ============================================================================
 * articles.ts — article data layer. Talks to the site's own Express API.
 * ============================================================================
 *
 * WHAT IT DOES
 *   All articles are stored on the server (see server/server.js) and are shared
 *   with every visitor. This file just calls the REST API:
 *     GET    /api/articles        → list all (admin)
 *     GET    /api/articles/:id     → one article
 *     POST   /api/articles         → create/update (requires admin session)
 *     DELETE /api/articles/:id      → delete (requires admin session)
 *   Published filtering for the public site is done client-side in listPublished.
 *
 * NOTE: no third-party/platform storage — this is a plain fetch to our own
 *       backend, so it works anywhere the Node server runs (e.g. Railway).
 * ============================================================================
 */

export interface Article {
  id: string;
  title: string;
  author: string;
  excerpt: string;
  cover: string;
  body: string;
  published: boolean;
  createdAt: number;
  updatedAt: number;
}

const API = '/api/articles';

export async function listArticles(): Promise<Article[]> {
  try {
    const r = await fetch(API, { credentials: 'include' });
    if (!r.ok) return [];
    const data = await r.json();
    return (data.articles ?? []).sort((a: Article, b: Article) => b.createdAt - a.createdAt);
  } catch (e) {
    console.error('listArticles failed', e);
    return [];
  }
}

export async function listPublished(): Promise<Article[]> {
  return (await listArticles()).filter((a) => a.published);
}

export async function getArticle(id: string): Promise<Article | null> {
  try {
    const r = await fetch(`${API}/${encodeURIComponent(id)}`);
    if (!r.ok) return null;
    const data = await r.json();
    return data.article ?? null;
  } catch (e) {
    console.error('getArticle failed', e);
    return null;
  }
}

/** Create or update. Requires an authenticated admin session (cookie). */
export async function saveArticle(a: Article): Promise<void> {
  const r = await fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(a),
  });
  if (!r.ok) {
    const msg = await r.text().catch(() => '');
    throw new Error(`Save failed (${r.status}). ${msg}`);
  }
}

export async function deleteArticle(id: string): Promise<void> {
  const r = await fetch(`${API}/${encodeURIComponent(id)}`, { method: 'DELETE', credentials: 'include' });
  if (!r.ok) throw new Error(`Delete failed (${r.status}).`);
}

export function readingMinutes(html: string): number {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = text ? text.split(' ').length : 0;
  return Math.max(1, Math.round(words / 200));
}

export function newId(): string {
  return 'a_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
