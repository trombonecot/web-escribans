import { ui, defaultLang, type Lang } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

export function getLocalizedPath(path: string, lang: Lang): string {
  return `/${lang}${path}`;
}

/** Get the alternate language version of the current path */
export function getAlternateLangPath(url: URL): { lang: Lang; path: string } {
  const currentLang = getLangFromUrl(url);
  const alternateLang: Lang = currentLang === 'ca' ? 'es' : 'ca';
  const pathWithoutLang = url.pathname.replace(/^\/(ca|es)/, '');
  return {
    lang: alternateLang,
    path: `/${alternateLang}${pathWithoutLang}`,
  };
}

export function formatDate(date: Date, lang: Lang): string {
  return date.toLocaleDateString(lang === 'ca' ? 'ca-ES' : 'es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
