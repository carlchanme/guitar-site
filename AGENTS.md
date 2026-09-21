# Worship electric — working notes

## Product

A worship guitarist's practice course, learned in public. The site is two
things: a public landing page that says what the course is and who it is for,
and the course app itself — a 14-week pathway of days, each day a page with a
timer, a metronome and fretboard diagrams, plus a practice log and a progress
view. The author is an intermediate acoustic player moving to electric on a
church worship team; every lesson is written only after he can play it, and the
log is the raw material the course is built from.

Audience: church worship guitarists, mostly hymn-based teams, who play chords
already and want to be heard — build energy, play one clean lead line, stop
being the back seat. They care how things look the way a good notebook looks:
clear, quiet, no noise. Not the way a startup looks.

Compliance, not style: the site never names the author's employer, its
products, colleagues, paying clients, any freelance platform, or any company.
"I play guitar at my church" is the whole bio. No testimonials, reviews, or
counts that are not real; there are none today.

## Pages in scope

- `/` — landing page (public)
- `/path/` — pathway overview (moved from `/`)
- `/day/N/` — a day: lesson tab
- `/day/N/<exercise>/` — an exercise: timer, metronome, body
- `/progress/` — skill ratings
- `/log/` — practice log
- `/metronome/` — standalone metronome
- `/library/` — lessons and reference outside the pathway
- `/lesson-1/`, `/lesson-2/`, `/lesson-3/` — scale lessons
- `/reference/` — hexatonic scales, full neck
- Empty state — a phase with no days written yet (already in the sidebar)
- Error state — 404

Content lives in `src/data/course.json` (pathway, days, exercises, statuses),
`src/data/roadmap.json` (skill ratings), `src/content/log/` (markdown),
`src/exercises/*.astro` (exercise bodies), `src/lib/fretboard.js` (SVG
diagrams). Visual work does not touch these, and does not change routes or the
fretboard renderer's geometry.

## Design system

`DESIGN.md` at the project root is the source of truth for every visual
decision. Read it before touching any `.astro` or `.css` file. Tokens in its
front matter map one to one onto `:root` in `src/styles/global.css`; a value
that is not in `DESIGN.md` does not exist yet — add it there first, then build.

## Working principles

Four fundamentals, each as a rule for this project:

- **Contrast** — no adjacent type sizes on one screen. The scale is
  13 / 16 / 20 / 28 / 44 / 88; a title next to body copy skips at least one
  step. Weight is the second axis (400 vs 700), never italic.
- **Repetition** — the same primitives on every page: hairline lists, the
  status marks from `StatusIcon.astro`, mono for every number, one primary
  button, the `card` panel for timer and metronome. A new page composes these;
  it does not invent a new row style.
- **Alignment** — a strong left edge is the anchor. In the app it is the main
  column's left padding; on the landing page it is column 2. Centered layouts
  are forbidden except a single-object empty or error state.
- **Proximity** — whitespace carries hierarchy, dividers do not. Group by
  spacing (8px steps) first; a hairline is a last resort and sits within
  0.04 L of its surface.

## Conventions

- Sentence case everywhere. The mono kicker is the only uppercase.
- Real typography: en-dashes for ranges (Weeks 1–2), proper apostrophes, a
  middle dot (·) between metadata items.
- Dates: `21 Sep 2026` in prose; `2026-09-21` in mono metadata. Times as
  `10 min`, tempos as `60 BPM`, subdivisions as `4 per click`.
- No emoji in product UI. No symbols as labels (☰ ⏱ ♩ are gone: "Days",
  "10 min", "60 BPM"). No decorative icon set in headings; the only glyphs are
  the drawn SVGs in the rail and `StatusIcon.astro`.
- Labels above inputs, in `ink-soft`.
- Errors as prose, in place, in ink. Never a red banner. `danger` is for a
  destructive confirmation button only.
- Exactly one primary action visible per screen. The accent is spent on that
  and on status marks, nothing else.
- All colours in OKLCH. No hex, HSL or rgb anywhere in source, SVG and
  `theme-color` included.
- Author the work as Carlos. No AI attribution in commits, comments or docs.

## Before you ship

1. Run the screen against the anti-pattern list in `DESIGN.md` → Do's and
   Don'ts. Any hit is a build failure.
2. Re-check the two most common failure modes:
   - Layout too centered. Is there a strong left edge? Does anything read as
     "centered everything"?
   - The accent used more than once per section. Count blue things. Status
     marks plus one primary action is the whole budget.
3. `grep -rnE '#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(|linear-gradient|box-shadow' src`
   returns nothing but `setInterval` false positives.
4. `grep -rn border-radius src` shows only `var(--radius)`, `50%` (status
   marks, beat dots) or `0`.
5. `npm run build` is clean. Check 375, 768, 1024 and 1440 with no horizontal
   scroll; the hero overlay survives 375.
6. `npx @google/design.md lint DESIGN.md` reports `errors: 0`.
7. `npm test` (static drift + component primitives) is green. `npm run
   test:visual` matches the committed baselines in `tests/visual/__baselines__`;
   an intended visual change is re-baselined with `npm run test:visual:update`
   and the new PNGs go in the same commit.
8. Do not commit. The author reviews and commits.

## Tests

Design-drift only; no functional tests live here.

- Layer 1 `tests/static/design-drift.test.ts` — scans `src/**` for hex/rgb/hsl,
  banned fonts, gradients, shadows, radius ladders, scale transforms, symbols,
  the accent budget, and that every `:root` token exists in `DESIGN.md`.
- Layer 2 `tests/components/primitives.test.ts` — renders `Card`, `Field`,
  `Action`, `Row`, `SpecTable`, `StatusIcon` through the Astro Container API and
  asserts the allowed states exist and the forbidden variants do not. New UI
  composes these primitives; a second "button" or "card" file fails the suite.
- Layer 3 `tests/visual/screens.spec.ts` — Playwright screenshots of `/`,
  `/path/`, `/day/1/`, `/day/1/mute/`, `/progress/`, `/log/`, `/metronome/`,
  `/404.html` at 1440×900 and 390×844 plus the open drawer, served from `dist/`
  by `tests/visual/serve.mjs` on :4321.
- Layer 4 Vizzly — `npm run vizzly:start` (viewer at http://localhost:47392),
  then every `npm run test:visual` also pushes the PNGs there for approve /
  reject. `npm run vizzly:stop` when done. `.vizzly/` is local, not committed.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

Screenshots: the Chrome extension may not be connected; Playwright with the
system Chrome works (`chromium.launch({ executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" })`
from the globally installed `@playwright/mcp` package). Headless
`--window-size` under ~500px does not shrink the viewport; use Playwright.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
