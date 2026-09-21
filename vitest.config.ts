import { getViteConfig } from "astro/config";

// Component tests render .astro files through the Astro Container API, so
// Vitest runs on Astro's Vite config.
export default getViteConfig({
  test: {
    include: ["tests/static/**/*.test.ts", "tests/components/**/*.test.ts"],
  },
});
