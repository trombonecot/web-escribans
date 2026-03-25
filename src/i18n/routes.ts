import type { Lang } from './ui';

/** Maps canonical route keys to localized path segments */
export const routes: Record<string, Record<Lang, string>> = {
  about: { ca: '/qui-som/', es: '/quienes-somos/' },
  news: { ca: '/noticies/', es: '/noticias/' },
  games: { ca: '/jocs/', es: '/juegos/' },
  contact: { ca: '/contacte/', es: '/contacto/' },
};

/** Get localized path for a given route key */
export function getRoute(key: keyof typeof routes, lang: Lang): string {
  return `/${lang}${routes[key][lang]}`;
}

/** Get a localized detail path (e.g. /ca/jocs/slug/ → /es/juegos/slug/) */
export function getDetailRoute(
  routeKey: keyof typeof routes,
  slug: string,
  lang: Lang,
): string {
  return `/${lang}${routes[routeKey][lang]}${slug}/`;
}

/** Translate a full path from one lang to another */
export function translatePath(path: string, fromLang: Lang, toLang: Lang): string {
  let translated = path.replace(`/${fromLang}/`, `/${toLang}/`);
  for (const key of Object.keys(routes)) {
    const fromSegment = routes[key][fromLang];
    const toSegment = routes[key][toLang];
    translated = translated.replace(fromSegment, toSegment);
  }
  return translated;
}
