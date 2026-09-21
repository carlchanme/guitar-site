# PROMPT 3 of 3 - Level 3: design-as-TDD

> Paste after CLAUDE.md + DESIGN.md exist and lint clean. Write the tests FIRST,
> confirm they fail for the right reason, then implement the remaining pages
> against them with the Vizzly loop.

---

Write a test suite that enforces the design system defined in `DESIGN.md`. The
purpose of these tests is to catch **design-system drift** - the moment someone
introduces a banned font, a hex color, a stat-card on an admin page, or a
hover-scale effect, a test fails with a clear message pointing to the violated
rule. This is **not** a functional test suite. Functional tests (form
submissions, auth, data fetching) belong elsewhere and must not be mixed in.

**Source of truth: `DESIGN.md`.** Every testable rule in that document should map
to at least one test. Where a rule is measurable, test it. Where a rule is
subjective ("feels editorial," "considered"), skip it - those are review-time
judgments, not assertions.

Write the tests **before** implementing the remaining pages, so the implementation
is forced to fit the tests rather than the tests fitting existing code.

## Test setup for this repo (Astro, no runner today)
- Add **Vitest** (`npm i -D vitest`) for layers 1 and 2. Layer 2 renders Astro
  components with the Astro Container API
  (`experimental_AstroContainer` from `astro/container`) and asserts on the HTML.
- Add **Playwright** (`npm i -D @playwright/test`, `npx playwright install
  chromium`) for layer 3. Screens: `/`, `/path/`, `/day/1/`, `/day/1/mute/`,
  `/progress/`, `/log/`, `/metronome/` at 1440×900 and 390×844. Run against
  `astro preview` on port 4321.
- Scripts: `"test": "vitest run"`, `"test:visual": "playwright test"`,
  `"test:all": "npm test && npm run test:visual"`.
- Static analysis (layer 1) scans `src/**/*.{astro,css,js,ts}` with a regex for
  `#[0-9a-f]{3,8}\b`, `rgb(`, `rgba(`, `hsl(`, the banned font names,
  `linear-gradient(`/`radial-gradient(` outside the hero mask, `box-shadow` other
  than the drawer scrim, `transform: scale`, and any `border-radius` value other
  than `var(--radius)`, `50%`, or `0`. Allow-list `src/lib/fretboard.js` SVG
  fills only where they reference `var(--...)`.

## Build the suite in four layers, in this order of priority

### 1. Static analysis - run on every commit (fastest, catches the most)
Scan source files for banned patterns:
- Banned fonts as a primary face (Inter, Geist, Poppins, Montserrat, Roboto, DM
  Sans, Plus Jakarta, Open Sans, Nunito, system-ui).
- Any hex, HSL, or rgb color literal (OKLCH only).
- Forbidden utilities: shadow-lift / scale-on-hover classes, glassmorphism, the
  default 8/12/16 radius ladder, banned gradients.

### 2. Component tests - render each primitive, assert correct states AND verify
forbidden variants do not exist. The point is to fail when someone introduces
"Card with subtle shadow" or "PrimaryActionLarge."
- **Card**: single radius value, single padding value, hairline border or
  transparent bg only. Refuses any prop that would override radius, padding, or
  shadow. Confirm no shadow utility classes are applied.
- **Field**: minimum 44px height; label rendered as a sibling element above the
  input (never as `placeholder` text); 1px border in `--line` by default, 2px in
  `--ink` on focus - assert the focus border color is not `--accent`.
- **Action (primary)**: exactly one component exports the primary variant; two or
  more near-duplicates fail. Disabled state documented and matches DESIGN.md.
- **Action (link)**: underline appears only on `:hover` and `:focus-visible`,
  never at rest. No hover translate, scale, or shadow.
- **Row**: dense vertical padding; mono metadata aligned right (assert it uses the
  mono font-family); single hairline bottom border; no striped variant in source.
- **Table**: two-column spec layout, hairline dividers, no icons.

### 3. Visual regression
Use Playwright to screenshot key screens and diff against committed baselines.

### 4. Vizzly - human-in-the-loop TDD loop
Requires Node 22+. One-time: `npm install -g @vizzly-testing/cli && vizzly init`.
- Start the local TDD server: `vizzly tdd start` (diffs at
  `http://localhost:47392`), and run `npm test -- --watch`.
- Then implement each remaining page part with TDD using the Vizzly CLI as the
  testing medium. Claude writes `vizzly` tests that push Playwright screenshots to
  the viewer; approve or deny each diff. Every rejected diff becomes feedback for
  the next pass until the design converges.

Pages still to implement against this suite: `/` (new landing) · `/path/` (pathway overview, moved from `/`) · `/day/N/` (lesson tab) · `/day/N/<exercise>/` (exercise) · `/progress/` · `/log/` · `/metronome/` · `/library/` · `/lesson-1..3/` · `/reference/` · plus one empty state (a phase with no days written yet, already shown in the sidebar) and one error state (404).

Testing depth requested for this project: **(d) full Vizzly TDD: static analysis + component tests + Playwright visual regression + Vizzly human-in-the-loop diffs**.
