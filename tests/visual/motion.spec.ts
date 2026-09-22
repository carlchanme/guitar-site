// Motion checks against the built site on :4321 (astro preview or
// tests/visual/serve.mjs). Unlike screens.spec.ts these are functional: each
// one proves an animation reports a state (DESIGN.md → Motion) and that the
// scripts survive a client-side page change.
import { test, expect, type Page } from "@playwright/test";

// headless Chromium needs this for the metronome's AudioContext to start on a click
test.use({ launchOptions: { args: ["--autoplay-policy=no-user-gesture-required"] } });

const ringOffset = (page: Page) => page.locator("[data-ring]").evaluate((el) => getComputedStyle(el).strokeDashoffset);
const ringTransition = (page: Page) => page.locator("[data-ring]").evaluate((el) => getComputedStyle(el).transitionDuration);

test.describe("motion on", () => {
  test.use({ reducedMotion: "no-preference" });

  test("timer ring and beat dots move after Start", async ({ page }) => {
    await page.goto("/day/1/pick/", { waitUntil: "networkidle" });
    const before = await ringOffset(page);
    await page.click("[data-xt] [data-go]");
    await page.waitForTimeout(1500);
    expect(await ringOffset(page), "ring has advanced").not.toBe(before);
    await expect(page.locator(".beat i.hit"), "one beat dot is hit").toHaveCount(1);
    expect(await ringTransition(page)).toBe("0.25s");
  });

  test("stepper navigation is client-side and the metronome rebinds on the new page", async ({ page }) => {
    await page.goto("/day/1/pick/", { waitUntil: "networkidle" });
    await page.evaluate(() => { (window as any).__marker = 1; });
    await page.click('.stepper a:has-text("Song")');
    await page.waitForURL("**/day/1/song/");
    await page.click('.stepper a:has-text("Picking")');
    await page.waitForURL("**/day/1/pick/");
    expect(await page.evaluate(() => (window as any).__marker), "no full reload").toBe(1);
    await expect(page.locator(".stepper a.on .under")).toHaveCount(1);
    await page.click("[data-metronome] [data-go]");
    await page.waitForTimeout(1200);
    expect(await page.evaluate(() => (window as any).gm.running)).toBe(true);
    await expect(page.locator(".beat i.hit"), "beat dots pulse on the new page").toHaveCount(1);
  });

  test("Play shape steps the four-note diagram; a second press stops it", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    const btn = page.locator(".m3 .play-shape");
    await expect(btn).toHaveText("Play shape");
    await btn.click();
    await page.waitForTimeout(1200);
    await expect(page.locator(".m3 svg[data-player] g.on")).toHaveCount(1);
    await expect(btn).toHaveText("Stop");
    await btn.click();
    await expect(page.locator(".m3 svg[data-player] g.on")).toHaveCount(0);
    await expect(page.locator(".m3 svg[data-player] g.was")).toHaveCount(0);
    await expect(btn).toHaveText("Play shape");
  });
});

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("the ring still fills, with no transition", async ({ page }) => {
    await page.goto("/day/1/pick/", { waitUntil: "networkidle" });
    const before = await ringOffset(page);
    await page.click("[data-xt] [data-go]");
    await page.waitForTimeout(1500);
    expect(await ringOffset(page)).not.toBe(before);
    expect(await ringTransition(page)).toBe("0s");
  });
});

test("no horizontal overflow at 390", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const path of ["/", "/day/1/", "/day/1/pick/"]) {
    await page.goto(path, { waitUntil: "networkidle" });
    const [sw, cw] = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
    expect(sw, `${path} scrolls horizontally`).toBeLessThanOrEqual(cw);
  }
});
