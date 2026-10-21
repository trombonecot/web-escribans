# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Build & Dev Commands

```bash
npm run dev       # Dev server at localhost:4321
npm run build     # Static build to ./dist/
npm run preview   # Preview built site
```

No test or lint scripts are configured. Always run `npm run build` after changes to verify nothing breaks.

## Architecture

Astro 5.x static site for **hipogeu.org** — Escrivans de l'Hipogeu, a tabletop RPG creative collective. Bilingual: Catalan (ca, primary) and Spanish (es).

### Key Dependencies

- `astro` 5.x — static site generator
- `@astrojs/sitemap` — auto-generates `sitemap-index.xml` with hreflang

### Content Collections (`src/content.config.ts`)

Three collections using `glob` loader with Markdown files:

- **books** (`src/content/books/{ca,es}/`) — ~20 games/adventures per language. Schema: `urlSlug`, `category` (jocs/solitari/aventures), `tags`, `downloadUrl`, `buyUrl`, `lang`, `translationSlug`.
- **news** (`src/content/news/{ca,es}/`) — Articles. Schema: `urlSlug`, `lang`, `translationSlug`.
- **team** (`src/content/team/{ca,es}/`) — 3 members. Schema: `name`, `role`, `order`, `lang`.

Each content file exists in both `ca/` and `es/` subdirectories. Books and news use `translationSlug` to link translations across languages.

### i18n System (`src/i18n/`)

- `ui.ts` — UI string translations keyed by `'section.key'` format
- `utils.ts` — `getLangFromUrl()`, `useTranslations()`, `getLocalizedPath()`, `getAlternateLangPath()`, `formatDate()`
- `routes.ts` — Route mapping between languages (e.g., `jocs` ↔ `juegos`, `qui-som` ↔ `quienes-somos`)

### URL Structure

All routes are locale-prefixed. Root `/` redirects to `/ca/`.

| Route       | Catalan              | Spanish                |
|-------------|----------------------|------------------------|
| home        | `/ca/`               | `/es/`                 |
| about       | `/ca/qui-som/`       | `/es/quienes-somos/`   |
| games       | `/ca/jocs/`          | `/es/juegos/`          |
| game detail | `/ca/jocs/[slug]/`   | `/es/juegos/[slug]/`   |
| news        | `/ca/noticies/`      | `/es/noticias/`        |
| news detail | `/ca/noticies/[slug]/` | `/es/noticias/[slug]/` |
| contact     | `/ca/contacte/`      | `/es/contacto/`        |

Old WordPress URLs are redirected in `astro.config.mjs`.

### Layouts & Components

- **BaseLayout** — Root HTML shell with `<head>` (meta, OG, Twitter Card, hreflang, JSON-LD Organization, font preloads, favicon, sitemap)
- **BookLayout** — Extends BaseLayout for game detail pages. Side-by-side layout (content left, cover right). Includes CreativeWork JSON-LD.
- **NewsLayout** — Extends BaseLayout for news articles. Same side-by-side layout. Includes Article JSON-LD.
- **Header** — Site title + tagline + nav bar (black) + mobile hamburger menu (≤768px)
- **Footer** — Black background, copyright, social links (Twitter/X + Bluesky), contact email
- **SocialLinks** — Twitter (X) and Bluesky icons with inline SVGs
- **BookCard** / **NewsCard** / **TeamMember** — Content display components
- **LanguageSwitcher** — Uses `getAlternateLangPath()` for intelligent route swapping

### Styling

Vanilla CSS only (`src/styles/global.css`) + scoped `<style>` in components. No CSS frameworks.

**Design tokens:**
- Background: `#fee873` (yellow), Buttons/CTAs: `#000` (black with yellow text), Text: `#000`
- Fonts: DM Serif Display (headings), Source Sans Pro (body) — self-hosted in `public/fonts/` (GDPR compliant)
- Max content width: 960px (`--content-max-width`), single-column centered layout

**Key classes:** `.container`, `.card-grid`, `.section`, `.btn`, `.site-main`

**Responsive:** Mobile breakpoint at 768px. Header collapses to hamburger, card grid adapts, font sizes scale down.

### SEO

- **Meta tags** — unique `<title>` and `<meta description>` per page (passed as props to BaseLayout)
- **Hreflang** — self-referential `ca` + `es` + `x-default` on every page
- **Open Graph** — title, description, type, url, site_name, locale, image
- **Twitter Card** — summary_large_image with title, description, image
- **JSON-LD** — Organization (BaseLayout), CreativeWork (BookLayout), Article (NewsLayout)
- **Sitemap** — auto-generated via `@astrojs/sitemap`
- **robots.txt** — in `public/`
- **Fonts** — self-hosted woff2 with `font-display: swap` and preloads
- **404 page** — bilingual, at `src/pages/404.astro`

### Pages Structure

Pages live in `src/pages/{ca,es}/` with parallel structure. Dynamic routes (`[slug].astro`) use `getStaticPaths()` filtering content by `lang` and matching via `urlSlug`.

### Public Assets

```
public/
├── favicon.ico          # Legacy fallback
├── favicon.svg          # Yellow rounded square with black "h"
├── fonts/               # Self-hosted woff2 (DM Serif Display + Source Sans Pro)
├── images/
│   ├── books/           # Book cover images (PNG)
│   ├── news/            # News article images
│   └── team/            # Team member portraits
├── robots.txt
└── site.webmanifest
```

## When Adding Content

- Create both `ca/` and `es/` Markdown files with matching `translationSlug`
- Books need a cover image in `public/images/books/`
- Use existing frontmatter schemas as reference — see `src/content.config.ts`
- Add `tags: ["featured"]` to show a book in the "Destacats" section at the top of the games page (`/ca/jocs/`, `/es/juegos/`)
- Pass unique `description` prop to BaseLayout on any new page

## When Adding New Pages

- Create parallel pages in both `src/pages/ca/` and `src/pages/es/`
- Add route mappings in `src/i18n/routes.ts`
- Add nav labels in `src/i18n/ui.ts` if the page appears in navigation
- Pass `description` prop to BaseLayout for SEO

## Conventions

- No emojis in code or content unless user asks
- Catalan is the primary language — when in doubt, default to `ca`
- All anchors: `text-decoration: none` (no underlines anywhere)
- Buttons: black background with yellow text (`.btn` class)
- Keep things simple — vanilla CSS, no frameworks, no over-engineering
