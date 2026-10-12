import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://andreasschwankl.de',
  integrations: [mdx()],
  build: { format: 'directory' },
  image: { layout: 'constrained' },
});
