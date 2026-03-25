// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://hipogeu.org',
  output: 'static',
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'ca',
    locales: ['ca', 'es'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  redirects: {
    '/': '/ca/',
    // Old WordPress Catalan routes
    '/qui-som/': '/ca/qui-som/',
    '/noticies/': '/ca/noticies/',
    '/jocs/': '/ca/jocs/',
    '/contacte/': '/ca/contacte/',
    // Old WordPress Spanish routes
    '/es/qui-som/': '/es/quienes-somos/',
    '/es/jocs/': '/es/juegos/',
    '/es/contacte/': '/es/contacto/',
    // Old WordPress book routes (add individual redirects as needed)
  },
});
