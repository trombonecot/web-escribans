# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

```bash
npm run dev       # Dev server at localhost:4321
npm run build     # Static build to ./dist/
npm run preview   # Preview built site
```

No test or lint scripts are configured.

## Architecture

Astro 5.x static site for **hipogeu.org** — a tabletop RPG creative collective. Bilingual: Catalan (ca, primary) and Spanish (es).

### Content Collections (`src/content.config.ts`)

Three collections using `glob` loader with Markdown files:

- **books** (`src/content/books/{ca,es}/`) — ~20 games/adventures per language. Schema includes `urlSlug`, `category` (jocs/solitari/aventures), `tags`, `downloadUrl`, `buyUrl`, `lang`, `translationSlug`.
- **news** (`src/content/news/{ca,es}/`) — Articles. Schema includes `urlSlug`, `lang`, `translationSlug`.
- **team** (`src/content/team/{ca,es}/`) — 3 members. Schema includes `name`, `role`, `order`, `lang`.

Each content file exists in both `ca/` and `es/` subdirectories. Books and news use `translationSlug` to link translations across languages.

### i18n System (`src/i18n/`)

- `ui.ts` — UI string translations keyed by `'section.key'` format
- `utils.ts` — `getLangFromUrl()`, `useTranslations()`, `getLocalizedPath()`, `getAlternateLangPath()`, `formatDate()`
- `routes.ts` — Route mapping between languages (e.g., `jocs` ↔ `juegos`, `qui-som` ↔ `quienes-somos`)

### URL Structure

All routes are locale-prefixed. Root `/` redirects to `/ca/`.

| Route key | Catalan | Spanish |
|-----------|---------|---------|
| home | `/ca/` | `/es/` |
| about | `/ca/qui-som/` | `/es/quienes-somos/` |
| games | `/ca/jocs/` | `/es/juegos/` |
| news | `/ca/noticies/` | `/es/noticias/` |
| contact | `/ca/contacte/` | `/es/contacto/` |

Old WordPress URLs are redirected in `astro.config.mjs`.

### Layouts & Components

- **BaseLayout** — Root HTML shell with header, footer, meta/OG/hreflang tags
- **BookLayout** / **NewsLayout** — Extend BaseLayout for detail pages
- **Header** — Nav + language switcher + mobile hamburger menu (≤768px)
- **BookCard** / **NewsCard** / **TeamMember** — Content display components
- **LanguageSwitcher** — Uses `translatePath()` for intelligent route swapping

### Styling

Vanilla CSS only (`src/styles/global.css`) + scoped `<style>` in components.

**Design tokens:**
- Background: `#fee873`, Links/CTAs: `#315EFF`, Text: `#000`
- Fonts: DM Serif Display (headings), Source Sans Pro (body) — currently Google Fonts
- Max content width: 720px, single-column centered layout

**Key classes:** `.container`, `.card-grid`, `.section`, `.btn`

### Pages Structure

Pages live in `src/pages/{ca,es}/` with parallel structure. Dynamic routes (`[slug].astro`) use `getStaticPaths()` filtering content by `lang` and matching via `urlSlug`.

## When Adding Content

- Create both `ca/` and `es/` versions with matching `translationSlug`
- Books need a cover image in `public/images/books/`
- Use existing frontmatter schemas as reference — see `src/content.config.ts`
