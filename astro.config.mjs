// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://dork.my',
  integrations: [sitemap()],
  redirects: {
    '/drills': '/day/',
    '/drills/week-01': '/day/1/',
  },
});
