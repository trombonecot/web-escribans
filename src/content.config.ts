import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const books = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/books' }),
  schema: z.object({
    title: z.string(),
    urlSlug: z.string(),
    author: z.string(),
    publishDate: z.coerce.date(),
    image: z.string(),
    category: z.array(z.enum(['jocs', 'solitari', 'aventures'])),
    tags: z.array(z.string()).default([]),
    downloadUrl: z.string().url().optional(),
    downloadLabel: z.string().default('Descarrega'),
    buyUrl: z.string().url().optional(),
    illustrator: z.string().optional(),
    lang: z.enum(['ca', 'es']),
    translationSlug: z.string(),
  }),
});

const news = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string(),
    urlSlug: z.string(),
    publishDate: z.coerce.date(),
    image: z.string(),
    author: z.string().default("Escrivans de l'Hipogeu"),
    lang: z.enum(['ca', 'es']),
    translationSlug: z.string(),
  }),
});

const team = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    image: z.string(),
    role: z.string(),
    order: z.number(),
    lang: z.enum(['ca', 'es']),
  }),
});

export const collections = { books, news, team };
