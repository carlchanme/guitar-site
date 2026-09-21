// Layer 3 + 4: screenshot the key screens, diff against committed baselines
// (Playwright), and push the same PNGs to a running Vizzly TDD server for
// human review when one is up (`npx vizzly tdd start`). Design drift only —
// no functional assertions here.
import { test, expect, type Page } from "@playwright/test";
import { vizzlyScreenshot } from "@vizzly-testing/cli/client";

const SCREENS: [string, string][] = [
  ["landing", "/"],
  ["path", "/path/"],
  ["day-1", "/day/1/"],
  ["day-1-mute", "/day/1/mute/"],
  ["progress", "/progress/"],
  ["log", "/log/"],
  ["metronome", "/metronome/"],
  ["not-found", "/404.html"],
];

// vizzlyScreenshot is a silent no-op when no TDD server (.vizzly/server.json) is running.

async function settle(page: Page) {
  await page.evaluate(() => (document as any).fonts.ready);
  // the dev toolbar never exists in preview, but freeze the timer bar just in case
  await page.addStyleTag({ content: "*{transition:none!important;animation:none!important}" });
  await page.waitForTimeout(150);
}

for (const [name, path] of SCREENS) {
  test(`${name} matches the design baseline`, async ({ page }, info) => {
    await page.goto(path, { waitUntil: "networkidle" });
    await settle(page);
    const png = await page.screenshot({ fullPage: true });
    await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true });
    await vizzlyScreenshot(`${name}-${info.project.name}`, png, {
      properties: { viewport: info.project.name, path },
      fullPage: true,
    });
  });
}

test("drawer open on mobile", async ({ page }, info) => {
  test.skip(info.project.name !== "mobile", "drawer only exists under 900px");
  await page.goto("/day/1/", { waitUntil: "networkidle" });
  await settle(page);
  await page.click("#menu");
  await page.waitForTimeout(250);
  const png = await page.screenshot();
  await expect(page).toHaveScreenshot("drawer-open.png");
  await vizzlyScreenshot("drawer-open-mobile", png, { properties: { viewport: "mobile" } });
});

test("no horizontal overflow on any screen", async ({ page }) => {
  for (const [, path] of SCREENS) {
    await page.goto(path, { waitUntil: "networkidle" });
    const [sw, cw] = await page.evaluate(() => [document.documentElement.scrollWidth, document.documentElement.clientWidth]);
    expect(sw, `${path} scrolls horizontally`).toBeLessThanOrEqual(cw);
  }
});
