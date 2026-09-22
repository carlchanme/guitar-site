import { defineConfig, devices } from "@playwright/test";

// Layer 3: visual regression against the built site on astro preview :4321.
// Baselines live in tests/visual/__baselines__ and are committed.
// BASE_URL points the suite at a server you started yourself (e.g. an
// `astro preview` on another port); the config's own server is reused or
// started otherwise.
const base = process.env.BASE_URL || "http://127.0.0.1:4321";
export default defineConfig({
  testDir: "tests/visual",
  snapshotPathTemplate: "{testDir}/__baselines__/{arg}-{projectName}{ext}",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [["list"]],
  timeout: 60_000,
  expect: {
    toHaveScreenshot: { maxDiffPixelRatio: 0.005, animations: "disabled", caret: "hide" },
  },
  use: {
    baseURL: base,
    colorScheme: "dark",
    reducedMotion: "reduce",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", use: { ...devices["Desktop Chrome"], viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
  webServer: {
    command: "npm run build && node tests/visual/serve.mjs",
    url: base + "/",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
