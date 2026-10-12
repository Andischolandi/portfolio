import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

// One folder per case study: src/content/cases/<slug>/index.mdx + images/
const cases = defineCollection({
  loader: glob({ pattern: '*/index.mdx', base: './src/content/cases', generateId: ({ entry }) => entry.split('/')[0] }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),            // e.g. "Accessible streaming."
      tagline: z.string(),          // second, accent-coloured part
      accent: z.enum(['green', 'pink', 'blue', 'yellow', 'violet', 'archive-violet', 'archive-red', 'archive-green']),
      section: z.enum(['latest', 'older']).default('latest'),
      order: z.number().default(99),
      draft: z.boolean().default(false),     // draft = card visible, page says "coming soon"
      hidden: z.boolean().default(false),    // hidden = not listed at all
      company: z.string(),
      timeframe: z.string(),
      role: z.string(),
      platforms: z.string().optional(),
      partners: z.string().optional(),
      standard: z.string().optional(),
      tags: z.array(z.union([z.string(), z.object({ label: z.string(), to: z.string() })])).default([]),
      teaser: z.string(),                    // short description for cards
      summary: z.string().optional(),        // longer teaser, used as page meta description
      keyVisual: image(),
      keyVisualAlt: z.string(),
      keyVisualCredit: z.string().optional(),
      focus: z.string().default('center'),   // CSS object-position, e.g. "70% 30%"
      brief: z.object({ challenge: z.union([z.string(), z.array(z.string())]), role: z.union([z.string(), z.array(z.string())]), shift: z.union([z.string(), z.array(z.string())]) }).optional(),
      credits: z.string().optional(),
    }),
});

export const collections = { cases };
