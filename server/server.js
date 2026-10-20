/**
 * ============================================================================
 * server/server.js — the site's own backend (Express). No Amazon/Quick.
 * ============================================================================
 *
 * WHAT IT DOES
 *   1. Serves the built React site from ../dist (after `npm run build`).
 *   2. Provides a small JSON API for articles, stored in a file on disk:
 *        GET    /api/articles       → { articles: [...] }        (public)
 *        GET    /api/articles/:id    → { article }               (public)
 *        POST   /api/articles        → create/update              (admin only)
 *        DELETE /api/articles/:id     → delete                    (admin only)
 *   3. Admin auth (real, server-side):
 *        POST /api/login   { password }  → sets an http-only session cookie
 *        POST /api/logout                → clears it
 *        GET  /api/me                    → { authenticated: boolean }
 *
 * CONFIG (environment variables — set these in Railway → Variables):
 *   ADMIN_PASSWORD   the admin login password  (REQUIRED in production)
 *   SESSION_SECRET   random string signing the session token (REQUIRED in prod)
 *   DATA_DIR         where articles.json is stored (default ./data).
 *                    On Railway, attach a Volume and set DATA_DIR to its mount
 *                    path so articles survive restarts/redeploys.
 *   PORT             provided automatically by Railway.
 * ============================================================================
 */
import express from 'express';
import cookieParser from 'cookie-parser';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const PORT = process.env.PORT || 8080;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'change-me-admin';
const SESSION_SECRET = process.env.SESSION_SECRET || 'dev-insecure-secret-change-me';
const DATA_DIR = process.env.DATA_DIR || path.join(ROOT, 'data');
const DATA_FILE = path.join(DATA_DIR, 'articles.json');

// ---- tiny signed-token session (no external session lib needed) ----
function sign(value) {
  const mac = crypto.createHmac('sha256', SESSION_SECRET).update(value).digest('hex');
  return `${value}.${mac}`;
}
function verify(token) {
  if (!token) return false;
  const i = token.lastIndexOf('.');
  if (i < 0) return false;
  const value = token.slice(0, i);
  return sign(value) === token && value === 'admin';
}
function isAuthed(req) {
  return verify(req.cookies?.alif_session);
}

// ---- article storage (JSON file) ----
function ensureStore() {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf8');
}
function readArticles() {
  ensureStore();
  try { return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8')); } catch { return []; }
}
function writeArticles(list) {
  ensureStore();
  fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), 'utf8');
}

const app = express();
app.use(express.json({ limit: '12mb' })); // articles may embed uploaded images as data URIs
app.use(cookieParser());

// ---- auth ----
app.post('/api/login', (req, res) => {
  const { password } = req.body || {};
  if (typeof password === 'string' && password.length > 0 && password === ADMIN_PASSWORD) {
    res.cookie('alif_session', sign('admin'), {
      httpOnly: true, sameSite: 'lax', secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 12, // 12h
    });
    return res.json({ ok: true });
  }
  return res.status(401).json({ error: 'invalid password' });
});
app.post('/api/logout', (req, res) => { res.clearCookie('alif_session'); res.json({ ok: true }); });
app.get('/api/me', (req, res) => res.json({ authenticated: isAuthed(req) }));

// ---- articles ----
app.get('/api/articles', (req, res) => res.json({ articles: readArticles() }));
app.get('/api/articles/:id', (req, res) => {
  const a = readArticles().find((x) => x.id === req.params.id);
  if (!a) return res.status(404).json({ error: 'not found' });
  res.json({ article: a });
});
app.post('/api/articles', (req, res) => {
  if (!isAuthed(req)) return res.status(401).json({ error: 'unauthorized' });
  const a = req.body;
  if (!a || typeof a.id !== 'string' || typeof a.title !== 'string') {
    return res.status(400).json({ error: 'bad article' });
  }
  const list = readArticles();
  const i = list.findIndex((x) => x.id === a.id);
  if (i >= 0) list[i] = a; else list.push(a);
  writeArticles(list);
  res.json({ ok: true });
});
app.delete('/api/articles/:id', (req, res) => {
  if (!isAuthed(req)) return res.status(401).json({ error: 'unauthorized' });
  writeArticles(readArticles().filter((x) => x.id !== req.params.id));
  res.json({ ok: true });
});

// ---- static site + SPA fallback ----
const DIST = path.join(ROOT, 'dist');
app.use(express.static(DIST));
app.get('*', (req, res) => {
  if (req.path.startsWith('/api/')) return res.status(404).json({ error: 'not found' });
  res.sendFile(path.join(DIST, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Alif Systems site running on http://localhost:${PORT}`);
  if (ADMIN_PASSWORD === 'change-me-admin') console.warn('⚠ Set ADMIN_PASSWORD env var — using insecure default.');
  if (SESSION_SECRET.startsWith('dev-')) console.warn('⚠ Set SESSION_SECRET env var — using insecure default.');
});
