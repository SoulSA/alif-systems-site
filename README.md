# Alif Systems Website

Standalone **React (Vite) + Express** app — no Amazon/Quick dependencies. One
repo, one Railway service. The Express server serves the built site **and** a
small JSON API that powers the article studio.

## Structure
```
alif-systems-site/
├── index.html            # app entry
├── src/                  # the React site (components, sections, pages, i18n, theme)
│   ├── articles.ts       # talks to /api/articles
│   └── pages/Admin.tsx   # hidden #/admin studio (server login)
├── server/server.js      # Express: serves dist/ + /api (articles + auth)
├── package.json
├── vite.config.ts
├── railway.json
└── .env.example          # copy to .env and fill in
```

## Run locally
Requires Node.js 18+.

```bash
npm install
cp .env.example .env        # then edit .env (Windows: copy .env.example .env)
```

Two terminals for development (hot reload):
```bash
# terminal 1 — the API/server
npm start
# terminal 2 — the Vite dev server (proxies /api to the server)
npm run dev
```
Open the Vite URL (http://localhost:5173). Admin: http://localhost:5173/#/admin

Or run it the way production does (build once, serve via Express):
```bash
npm run serve        # = npm run build && npm start
# open http://localhost:8080  (admin at http://localhost:8080/#/admin)
```

## Deploy on Railway (GitHub)
1. Push this folder to a GitHub repo.
2. Railway → **New Project → Deploy from GitHub repo** → pick it.
   Railway reads `railway.json`: build = `npm install && npm run build`,
   start = `npm start`. **No Root Directory change needed** — this IS the root.
3. Railway → your service → **Variables**, add:
   - `ADMIN_PASSWORD` — your admin login password
   - `SESSION_SECRET` — a long random string
     (`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
   - `DATA_DIR` — set to a **Volume** mount path (see next step)
4. **Articles persistence:** Railway → **+ New → Volume**, attach it to the
   service, note its mount path (e.g. `/data`), and set `DATA_DIR=/data`.
   Without a volume, articles reset on each redeploy (the container disk is
   ephemeral).
5. **Settings → Networking → Generate Domain** for your public URL.

## The article studio
- Hidden at **`/#/admin`** (nothing links to it).
- Log in with `ADMIN_PASSWORD`. Auth is a real server-side check; the browser
  only holds an http-only session cookie — the password is never in the
  front-end code.
- Write with the rich text editor (images by URL or upload), set cover/excerpt/
  author, toggle Published. Saved articles appear in the home **Insights**
  section and at `/#/article/<id>`, shared with all visitors.

## Where to change things
- **Text (EN/AR):** `src/i18n.tsx`
- **Colours:** `src/theme.ts`
- **Social links:** `src/components/Footer.tsx` (`SOCIAL`)
- **WhatsApp number:** `src/components/WhatsAppBadge.tsx` (`WHATSAPP_NUMBER`)
- **Phone/email/address:** `src/components/Footer.tsx` + `src/pages/Contact.tsx`
- **Admin password / session secret / data dir:** environment variables (`.env`)
