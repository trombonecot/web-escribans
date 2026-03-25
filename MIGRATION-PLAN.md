# hipogeu.org → Astro Migration Plan

## 1. Site Audit Summary

### Current Stack
- WordPress with block editor
- Bilingual: **Catalan (ca)** (primary) + **Spanish (es)**
- Custom post type: `books` (for games/adventures)
- Standard posts for news
- Static pages: Home, Qui som, Contacte

### Design Tokens (pixel-perfect reference)
- **Background**: `#fee873` (warm yellow)
- **Primary/Links**: `#315EFF` (blue)
- **Text**: `#000000`
- **Secondary text**: `#666666`
- **Heading font**: DM Serif Display (serif)
- **Body font**: Source Sans Pro (sans-serif)
- **Layout**: Single-column centered, max-width ~720px content
- **Responsive breakpoints**: 768px, 782px

### Pages & Content Types

| Page | Route (ca) | Route (es) | Type |
|------|-----------|-----------|------|
| Home | `/ca/` | `/es/` | Static page |
| Qui som / Quiénes somos | `/ca/qui-som/` | `/es/qui-som/` | Static page |
| Notícies / Noticias | `/ca/noticies/` | `/es/noticies/` | News listing |
| Els nostres jocs / Nuestros juegos | `/ca/jocs/` | `/es/jocs/` | Books listing |
| Contacte / Contacto | `/ca/contacte/` | `/es/contacte/` | Static page |
| News article (x2) | `/ca/noticies/[slug]/` | `/es/noticies/[slug]/` | Markdown |
| Book/Game detail (x~20) | `/ca/jocs/[slug]/` | `/es/jocs/[slug]/` | Markdown |

### Content Inventory

**News posts (2):**
1. "Naufragi" (2026-02-27) — game launch announcement
2. "Estrenem web" (2025-10-19) — site launch announcement

**Books/Games (~20 unique titles across 4 categories):**

*Destacats (Featured):*
- Vides en guerra
- Un día de trabajo de película
- Naufragi

*Jocs (Games) — 7 titles:*
- Vides en guerra, Successió, Naufragi, La vida secreta de les joguines,
  Els guardians de les paraules, El crepuscle de l'heroi, Comando Chaplin

*Jocs en solitari (Solo Games) — 4 titles:*
- Vides en guerra edició de diari, Un día de trabajo de película,
  Naufragi, La veu del profeta

*Aventures (Adventures) — ~10 titles:*
- Vol 719, Temple de Musa Nusair, Teixint onades, Lucy,
  La unitat 731, La terra d'Alkebulan, L'últim senyor de la sal,
  L'abandonat, Horror al Labrador, Expedició 1907 Cthulhu d100

**Team members (3):** Roman Aixendri, Eduard Cot, Marc Martínez Dalmases

---

## 2. Astro Project Architecture

### Tech Stack
- **Framework**: Astro 5.x (static output)
- **Styling**: Vanilla CSS (custom properties) — keeps it simple, pixel-perfect
- **Content**: Astro Content Collections (Markdown + frontmatter)
- **i18n**: Astro's built-in i18n routing (`/ca/`, `/es/`)
- **Deployment**: Static hosting (Netlify, Vercel, or Cloudflare Pages)

### Directory Structure

```
WEB-HIPOGEU/
├── astro.config.mjs
├── package.json
├── public/
│   ├── fonts/                    # Self-hosted DM Serif Display + Source Sans Pro
│   ├── images/
│   │   ├── books/                # Book covers (naufragi.png, etc.)
│   │   ├── team/                 # Team member photos
│   │   ├── news/                 # News article images
│   │   └── logo.png
│   └── favicon.ico
├── src/
│   ├── content/
│   │   ├── config.ts             # Content collection schemas
│   │   ├── books/
│   │   │   ├── ca/               # Catalan book entries
│   │   │   │   ├── vides-en-guerra.md
│   │   │   │   ├── successio.md
│   │   │   │   ├── naufragi.md
│   │   │   │   └── ...
│   │   │   └── es/               # Spanish book entries
│   │   │       ├── vides-en-guerra.md
│   │   │       └── ...
│   │   ├── news/
│   │   │   ├── ca/
│   │   │   │   ├── naufragi.md
│   │   │   │   └── estrenem-web.md
│   │   │   └── es/
│   │   │       ├── naufragi.md
│   │   │       └── estrenem-web.md
│   │   └── team/
│   │       ├── ca/
│   │       │   ├── roman-aixendri.md
│   │       │   ├── eduard-cot.md
│   │       │   └── marc-martinez.md
│   │       └── es/
│   │           ├── roman-aixendri.md
│   │           ├── eduard-cot.md
│   │           └── marc-martinez.md
│   ├── components/
│   │   ├── Header.astro           # Nav + language switcher
│   │   ├── Footer.astro           # Social links + copyright
│   │   ├── LanguageSwitcher.astro  # ca/es toggle
│   │   ├── BookCard.astro          # Card for game listings
│   │   ├── NewsCard.astro          # Card for news listings
│   │   ├── TeamMember.astro        # Bio card with photo
│   │   └── SocialLinks.astro       # Twitter, Instagram, Facebook icons
│   ├── layouts/
│   │   ├── BaseLayout.astro        # HTML shell, fonts, meta, header+footer
│   │   ├── PageLayout.astro        # Static pages (home, contact, about)
│   │   ├── BookLayout.astro        # Individual book/game detail
│   │   └── NewsLayout.astro        # Individual news article
│   ├── pages/
│   │   ├── index.astro             # Redirect → /ca/
│   │   ├── ca/
│   │   │   ├── index.astro         # Homepage (ca)
│   │   │   ├── qui-som.astro       # About (ca)
│   │   │   ├── contacte.astro      # Contact (ca)
│   │   │   ├── noticies/
│   │   │   │   ├── index.astro     # News listing (ca)
│   │   │   │   └── [...slug].astro # Dynamic news detail (ca)
│   │   │   └── jocs/
│   │   │       ├── index.astro     # Games listing (ca)
│   │   │       └── [...slug].astro # Dynamic book detail (ca)
│   │   └── es/
│   │       ├── index.astro         # Homepage (es)
│   │       ├── qui-som.astro       # About (es)
│   │       ├── contacte.astro      # Contact (es)
│   │       ├── noticies/
│   │       │   ├── index.astro
│   │       │   └── [...slug].astro
│   │       └── jocs/
│   │           ├── index.astro
│   │           └── [...slug].astro
│   ├── i18n/
│   │   ├── ui.ts                   # UI string translations
│   │   ├── utils.ts                # getLangFromUrl, getTranslation helpers
│   │   └── routes.ts               # Route mapping between languages
│   └── styles/
│       └── global.css              # Design tokens, typography, base styles
└── MIGRATION-PLAN.md
```

---

## 3. Content Collection Schemas

### Books (Markdown frontmatter)

```yaml
---
title: "Vides en guerra"
slug: "vides-en-guerra"
author: "Marc Martínez Dalmases"
publishDate: 2023-04-23
image: "/images/books/vides-en-guerra.png"
category: "jocs"           # jocs | solitari | aventures
tags: ["featured"]         # optional, used for "Destacats" section
downloadUrl: "https://marc-martinez.itch.io/vides-en-guerra"
downloadLabel: "Descarrega" # or "Compra" for paid
buyUrl: ""                 # optional: Amazon, Ko-fi, etc.
illustrator: ""            # optional
lang: "ca"                 # ca | es
translationSlug: "vides-en-guerra"  # links ca ↔ es versions
---

Description body in Markdown...
```

### News (Markdown frontmatter)

```yaml
---
title: "Naufragi"
slug: "naufragi"
publishDate: 2026-02-27
image: "/images/news/naufragi.png"
author: "Escrivans de l'Hipogeu"
lang: "ca"
translationSlug: "naufragi"
---

Article body in Markdown...
```

### Team Members (Markdown frontmatter)

```yaml
---
name: "Roman Aixendri"
slug: "roman-aixendri"
image: "/images/team/roman-aixendri.jpg"
role: "Escriptor i dissenyador"
order: 1
lang: "ca"
---

Bio in Markdown...
```

---

## 4. i18n Strategy

### URL Structure
- Default locale: `ca` → `/ca/...`
- Secondary locale: `es` → `/es/...`
- Root `/` redirects to `/ca/`

### UI Strings (`src/i18n/ui.ts`)

```ts
export const ui = {
  ca: {
    'nav.about': 'Qui som',
    'nav.news': 'Notícies',
    'nav.games': 'Els nostres jocs',
    'nav.contact': 'Contacte',
    'games.featured': 'Destacats',
    'games.games': 'Jocs',
    'games.solo': 'Jocs en solitari',
    'games.adventures': 'Aventures',
    'book.download': 'Descarrega',
    'book.buy': 'Compra',
    'footer.copyright': "Escrivans de l'Hipogeu",
    'contact.cta': "Posa't en contacte amb nosaltres",
    // ...
  },
  es: {
    'nav.about': 'Quiénes somos',
    'nav.news': 'Noticias',
    'nav.games': 'Nuestros juegos',
    'nav.contact': 'Contacto',
    'games.featured': 'Destacados',
    'games.games': 'Juegos',
    'games.solo': 'Juegos en solitario',
    'games.adventures': 'Aventuras',
    'book.download': 'Descarga',
    'book.buy': 'Compra',
    'footer.copyright': "Escrivans de l'Hipogeu",
    'contact.cta': 'Ponte en contacto con nosotros',
    // ...
  },
} as const;
```

### Language Switcher
- Reads current path, swaps `/ca/` ↔ `/es/`
- For content pages, uses `translationSlug` to find the equivalent page

---

## 5. Component Breakdown

### Header.astro
- Site title: "Escrivans de l'hipogeu"
- Subtitle/tagline (language-aware)
- Nav links (4 items, language-aware routes)
- Language switcher (`ca` | `es`)
- Mobile hamburger menu at ≤768px

### Footer.astro
- Social links row: Twitter, Instagram, Facebook
- Contact email: escrivans@hipogeu.org
- Copyright: "Escrivans de l'Hipogeu {year}"
- Illustration credit: "Il·lustracions de Toni Ruiz"

### BookCard.astro
- Cover image thumbnail
- Title (linked to detail page)
- "Més detalls »" link

### NewsCard.astro
- Featured image
- Title (linked to article)
- Grid layout (2 columns on desktop)

### TeamMember.astro
- Portrait photo
- Name heading
- Bio text (rendered from Markdown)

---

## 6. Page-by-Page Implementation

### 6.1 Homepage (`/ca/index.astro`, `/es/index.astro`)
- Logo image centered
- Group description paragraph
- CTA link to contact
- Social links block

### 6.2 About — Qui som (`/ca/qui-som.astro`)
- Page title
- Query `team` collection filtered by `lang`
- Render each TeamMember component (photo + bio)
- Ordered by `order` field

### 6.3 News Listing (`/ca/noticies/index.astro`)
- Page title + subtitle "Aquí hi trobaràs les nostres novetats"
- Query `news` collection filtered by `lang`, sorted by `publishDate` desc
- Grid of NewsCard components (2-col)

### 6.4 News Detail (`/ca/noticies/[...slug].astro`)
- Uses NewsLayout
- Renders Markdown body
- Shows featured image, title, date
- Purchase/external links if present in body

### 6.5 Games Listing (`/ca/jocs/index.astro`)
- 4 sections with headings: Destacats, Jocs, Jocs en solitari, Aventures
- Query `books` collection filtered by `lang`
- Filter by `category` and `tags` for each section
- Grid of BookCard components

### 6.6 Game Detail (`/ca/jocs/[...slug].astro`)
- Uses BookLayout
- Cover image (large, prominent)
- Title, author, publication date
- Markdown description body
- Download/buy button(s)

### 6.7 Contact (`/ca/contacte.astro`)
- Page title
- Invitation paragraph
- Email link: escrivans@hipogeu.org

---

## 7. Implementation Steps (Ordered)

### Phase 1: Project Scaffolding
1. Initialize Astro project (`npm create astro@latest`)
2. Configure `astro.config.mjs` (i18n, static output)
3. Set up directory structure
4. Install fonts (DM Serif Display, Source Sans Pro)
5. Create `global.css` with all design tokens
6. Create `BaseLayout.astro` with HTML shell

### Phase 2: Components & Layouts
7. Build `Header.astro` (nav + language switcher + mobile menu)
8. Build `Footer.astro` (social + copyright)
9. Build `LanguageSwitcher.astro`
10. Build `SocialLinks.astro`
11. Build `PageLayout.astro` (extends Base, adds header/footer)
12. Build `BookLayout.astro`
13. Build `NewsLayout.astro`
14. Build `BookCard.astro`
15. Build `NewsCard.astro`
16. Build `TeamMember.astro`

### Phase 3: i18n Setup
17. Create `src/i18n/ui.ts` with all UI strings
18. Create `src/i18n/utils.ts` helper functions
19. Wire up language switcher logic

### Phase 4: Content Collections
20. Define schemas in `src/content/config.ts`
21. Create all book Markdown files (ca) — ~20 files
22. Create all book Markdown files (es) — ~20 files
23. Create news Markdown files (ca) — 2 files
24. Create news Markdown files (es) — 2 files
25. Create team Markdown files (ca + es) — 6 files
26. Download and place all images in `public/images/`

### Phase 5: Pages
27. Build homepage (ca + es)
28. Build about page (ca + es)
29. Build news listing + detail pages (ca + es)
30. Build games listing + detail pages (ca + es)
31. Build contact page (ca + es)
32. Root `/` redirect to `/ca/`

### Phase 6: Polish & Deploy
33. Pixel-perfect CSS review (compare screenshots)
34. SEO meta tags, Open Graph
35. 301 redirects from old WordPress URLs → new routes
36. Responsive testing (mobile, tablet, desktop)
37. Accessibility audit (skip links, alt text, semantic HTML)
38. Deploy to static hosting

---

## 8. URL Redirect Map (old → new)

```
/                        → /ca/
/qui-som/                → /ca/qui-som/
/noticies/               → /ca/noticies/
/jocs/                   → /ca/jocs/
/contacte/               → /ca/contacte/
/naufragi/               → /ca/noticies/naufragi/
/estrenem-web/           → /ca/noticies/estrenem-web/
/books/vides-en-guerra/  → /ca/jocs/vides-en-guerra/
/books/[slug]/           → /ca/jocs/[slug]/
/es/                     → /es/
/es/qui-som/             → /es/qui-som/
/es/jocs/                → /es/jocs/
/es/contacte/            → /es/contacte/
```

---

## 9. Notes

- **No contact form needed** — current site only shows an email address
- **Comments disabled** — WordPress had them hidden via CSS, no need to migrate
- **Some books appear in multiple categories** (e.g., Naufragi is in Featured, Games, and Solo). Handle with `category` array or `tags` in frontmatter
- **Image optimization**: Use Astro's `<Image>` component for automatic format conversion (WebP/AVIF) and responsive sizing
- **Fonts**: Self-host to avoid Google Fonts GDPR issues (already relevant for EU/Catalan audience)
