# Vyntrix QR — Free 3D QR Code Generator

A production-grade, immersive QR code studio. Design branded QR codes with logos, colors, and gradients, preview them live on a rotatable 3D tile, and export print-ready PNG/SVG — all client-side, no sign-up.

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **React Three Fiber** + **@react-three/drei** (3D layer)
- **Zustand** (state) · **Framer Motion** (motion)
- **qr-code-styling** (encoding engine, wrapped to feed a Three.js texture)

## Getting started

```bash
npm install
cp .env.example .env.local   # optional; fill in for prod features
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

## Routes

| Route | Description |
| --- | --- |
| `/` | Landing page (hero 3D, how-it-works, features, FAQ) |
| `/studio` | The generator: forms, customization, 2D/3D preview, export, dynamic QR |
| `/gallery` | Preset design gallery |
| `/manage/[slug]` | Token-gated analytics + destination editor for a dynamic code |
| `/r/[slug]` | Short-link redirect that logs a scan then forwards to the destination |
| `/privacy`, `/terms` | Legal pages (required for AdSense) |
| `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` | SEO/PWA |
| `/opengraph-image` | Auto-generated social share image |
| `/ads.txt` | Auto-generated from your AdSense publisher id |

### API

| Method + path | Description |
| --- | --- |
| `POST /api/qr` | Create a dynamic code → `{ slug, shortUrl, manageUrl, editToken }` |
| `GET /api/qr/[slug]` | Public metadata for a code |
| `PATCH /api/qr/[slug]` | Update destination/title (requires `editToken`) |
| `DELETE /api/qr/[slug]?token=` | Delete a code |
| `GET /api/qr/[slug]/analytics?token=` | Scan analytics (requires `editToken`) |

## Dynamic QR codes + analytics (SQLite)

Enable the **Dynamic QR** toggle in the studio (URL type) to mint a short link
that you can re-point anytime without reprinting, plus scan analytics (count over
time, device/browser/OS breakdown, recent feed). Data is stored in a local
**SQLite** database via `better-sqlite3` (`lib/db.ts`), at `./data/vyntrix.db` by
default (override with `DATABASE_PATH`).

Access is secured with a per-code **edit token** returned at creation — no
accounts needed. Keep it safe; it's the only key to edit a code or view its stats.

> Serverless note: Vercel's filesystem is ephemeral, so a local SQLite file won't
> persist there. For production dynamic features, deploy on a persistent host
> (Fly.io, Railway, a VPS) with a mounted volume, or swap `lib/db.ts` for
> **Turso/libSQL** (same SQL, hosted, serverless-friendly). Static QR generation,
> SEO, and ads work fine on Vercel regardless.

## Environment variables

Set these in Vercel → Project Settings → Environment Variables (all optional for local dev):

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for SEO/sitemap/OG (no trailing slash) |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console verification token |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | AdSense publisher id, e.g. `ca-pub-XXXXXXXXXXXXXXXX` |
| `NEXT_PUBLIC_ADSENSE_SLOT_HOME` / `_GALLERY` / `_STUDIO` | Ad unit slot ids |

Ads and verification only render when the matching variables are set, so nothing
breaks before your AdSense account is approved.

## SEO checklist (done)

- Rich metadata: title templates, description, keywords, canonical URLs
- Open Graph + Twitter cards with an auto-generated OG image (`next/og`)
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest`
- JSON-LD structured data: `WebApplication` (site) + `FAQPage` (home)
- Semantic headings, per-page metadata, keyword-focused copy

### After deploy
1. Add the domain to **Google Search Console**, submit `/sitemap.xml`.
2. Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (or verify via DNS).
3. Apply for **Google AdSense**; once approved, set `NEXT_PUBLIC_ADSENSE_CLIENT`
   and the slot ids, then redeploy. `/ads.txt` populates automatically.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it in Vercel (framework auto-detected as Next.js).
3. Add the environment variables above.
4. Deploy. Point your domain at Vercel and update `NEXT_PUBLIC_SITE_URL`.

## Suggested next enhancements

- Accounts (auth) with a personal dashboard listing all your dynamic codes
- Approximate geo-location on scans (via edge headers or an IP lookup)
- PDF + animated WebM/GIF export of the rotating 3D code
- CSV batch generation → zip
- PWA offline caching, WebXR AR preview, postprocessing bloom
- Swap in-memory rate limiting for Upstash Redis when running multi-instance

### Done recently
- ✅ Dynamic (editable) QR codes with short-link redirect + scan analytics (SQLite)
- ✅ Token-gated manage/analytics page with charts (recharts)
- ✅ Cookie-consent banner gating AdSense (EEA/UK compliance)
