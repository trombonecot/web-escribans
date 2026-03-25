export const languages = {
  ca: 'Català',
  es: 'Español',
} as const;

export const defaultLang = 'ca' as const;

export type Lang = keyof typeof languages;

export const ui = {
  ca: {
    'site.title': "Escrivans de l'hipogeu",
    'site.tagline': "Grup creatiu d'escriptura i disseny de jocs de rol",
    'nav.about': 'Qui som',
    'nav.news': 'Notícies',
    'nav.games': 'Els nostres jocs',
    'nav.contact': 'Contacte',
    'nav.language': 'Idioma',
    'games.intro': "Aquí pots trobar tots els jocs o aventures que hem fet col·lectivament o de forma individual.",
    'games.featured': 'Destacats',
    'games.games': 'Jocs',
    'games.solo': 'Jocs en solitari',
    'games.adventures': 'Aventures',
    'games.moreDetails': 'Més detalls »',
    'book.download': 'Descarrega',
    'book.buy': 'Compra',
    'book.author': 'Autor',
    'book.date': 'Data de publicació',
    'news.subtitle': 'Aquí hi trobaràs les nostres novetats',
    'contact.intro':
      "Si tens un encàrrec, ganes de col·laborar, idees o simplement ganes de xerrar, escriu-nos a",
    'footer.copyright': "Escrivans de l'Hipogeu",
    'footer.illustrations': "Il·lustracions de Toni Ruiz",
  },
  es: {
    'site.title': "Escrivans de l'hipogeu",
    'site.tagline': 'Grupo creativo de escritura y diseño de juegos de rol',
    'nav.about': 'Quiénes somos',
    'nav.news': 'Noticias',
    'nav.games': 'Nuestros juegos',
    'nav.contact': 'Contacto',
    'nav.language': 'Idioma',
    'games.intro': 'Aquí puedes encontrar todos los juegos o aventuras que hemos hecho colectiva o individualmente.',
    'games.featured': 'Destacados',
    'games.games': 'Juegos',
    'games.solo': 'Juegos en solitario',
    'games.adventures': 'Aventuras',
    'games.moreDetails': 'Más detalles »',
    'book.download': 'Descarga',
    'book.buy': 'Compra',
    'book.author': 'Autor',
    'book.date': 'Fecha de publicación',
    'news.subtitle': 'Aquí encontrarás nuestras novedades',
    'contact.intro':
      'Si tienes un encargo, ganas de colaborar, ideas o simplemente ganas de charlar, escríbenos a',
    'footer.copyright': "Escrivans de l'Hipogeu",
    'footer.illustrations': 'Ilustraciones de Toni Ruiz',
  },
} as const;
