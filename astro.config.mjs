// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  redirects: {
    '/drills': '/day/',
    '/drills/week-01': '/day/1/',
  },
});
