# PROMPT 2 of 3 - Level 2: extract the system into CLAUDE.md + DESIGN.md

> Paste after Prompt 1 has produced a page you are happy with. This makes the
> design survive across every page. Then run the lint + audit commands at the
> bottom.

---

Create `DESIGN.md` at the project root, and **update** the existing `CLAUDE.md`
(a symlink to `AGENTS.md` - edit `AGENTS.md`). Preserve its operational content
(Astro dev-server notes, doc links) and add the sections below. Do not overwrite.
Then derive the global styles in `src/layouts/App.astro` from `DESIGN.md`: every
token in `:root` must appear in `DESIGN.md` first.

## CLAUDE.md - the operational file
Lean. Process and project context, **not** the design system (it stays loaded all
session; design content there just distracts). It should cover:
- A short paragraph on the product and its audience: A worship guitarist's practice course, learned in public. The site is two things: a public landing page that says what the course is and who it is for, and the course app itself - a 14-week pathway of days, each day a page with a timer, a metronome and fretboard diagrams, plus a practice log and a progress view. The author is an intermediate acoustic player moving to electric on a church worship team; every lesson is written only after he can play it, and the log is the raw material the course is built from. /
  Church worship guitarists, mostly hymn-based teams, who play chords already and want to be heard: build energy, play one clean lead line, stop being the back seat. They care how things look the way a good notebook looks - clear, quiet, no noise - not the way a startup looks..
- The list of pages in scope: `/` (new landing) · `/path/` (pathway overview, moved from `/`) · `/day/N/` (lesson tab) · `/day/N/<exercise>/` (exercise) · `/progress/` · `/log/` · `/metronome/` · `/library/` · `/lesson-1..3/` · `/reference/` · plus one empty state (a phase with no days written yet, already shown in the sidebar) and one error state (404).
- A "working principles" section naming the four design fundamentals -
  **Contrast, Repetition, Alignment, Proximity** - defined specifically for this
  project (not textbook), each translated into a concrete rule the model can act
  on:
  - Contrast -> no adjacent type sizes.
  - Repetition -> the same primitives appear across every page.
  - Alignment -> strong left edge as the default anchor; centered layouts
    forbidden except single-object empty states.
  - Proximity -> whitespace carries hierarchy, dividers do not.
- A conventions section: sentence case, real typography (proper en-dashes and
  apostrophes), date formatting, no emoji in product UI, no decorative icon-set in
  headings, labels above inputs, errors as prose rather than red banners, exactly
  one primary action visible per screen.
- A "before you ship" checklist that includes running the screen against
  `DESIGN.md`'s anti-patterns and re-checking the two most common failure modes
  (layout too centered; the accent used more than once per section).

## DESIGN.md - the visual system
Comprehensive and opinionated. Begin with this exact instruction at the top:

> This document is the source of truth for every visual decision. If a value is
> not here, it does not exist yet - add it, then build against it. Whenever you
> discover a new design value while building, add it to this file.

Cover:
- **Color in OKLCH only.** No hex, no HSL, no rgb anywhere in source. Direction:
  warm near-black background (the existing app is dark and stays dark; do NOT switch to light paper), warm off-white ink, hairlines within 0.04 L of their surface, one committed ink-blue accent. Fretboard diagrams keep their wood tones (board, fret, string) as material colors expressed in OKLCH; the root-dot color becomes the accent.. Single committed accent: ink-blue, oklch(0.72 0.12 250) on dark surfaces. Define the full
  token set (bg, surface, ink, ink-soft, ink-faint, line, accent, and a danger
  color reserved for destructive confirmation only):
  ```
  --bg:        oklch(0.17 0.006 60);   /* warm near-black */
--surface:   oklch(0.21 0.007 60);   /* panels, sidebar */
--card:      oklch(0.24 0.008 60);   /* raised rows, timer, metronome */
--ink:       oklch(0.94 0.006 80);   /* body text, >= 12:1 on --bg */
--ink-soft:  oklch(0.70 0.008 70);   /* secondary text */
--ink-faint: oklch(0.52 0.008 70);   /* metadata, disabled */
--line:      oklch(0.27 0.008 60);   /* hairlines: within 0.04 L of --card */
--accent:    oklch(0.72 0.12 250);   /* ink-blue: status + the one primary action */
--accent-ink:oklch(0.15 0.02 250);   /* text on accent */
--danger:    oklch(0.55 0.16 25);    /* destructive confirmation ONLY */
/* fretboard material, not UI color */
--board:     oklch(0.28 0.04 50);
--fret:      oklch(0.74 0.03 85);
--string:    oklch(0.91 0.02 85);
--tone:      oklch(0.93 0.02 85);    /* scale-tone dot */
--root:      var(--accent);          /* root dot = the accent */
  ```
  Contrast: body on bg >= 12:1; hairlines within 0.04 L of their surface; accent
  at most once per screen.
- **Typography with an explicit banned list** - Inter, Geist, Poppins, Montserrat,
  Roboto, DM Sans, Plus Jakarta, Open Sans, Nunito, system-ui as a primary face.
  Display serif: Fraunces (Google Fonts, variable, with optical sizing `opsz`; use `SOFT 50, WONK 0`) - hero headline, day titles, section openings only. Text grotesque: Schibsted Grotesk (Google Fonts, variable) - everything else, sentence case, weight contrast for emphasis. Optional mono
  for metadata: JetBrains Mono - BPM, timer digits, minutes, dates, fret numbers, spec tables only. Never decorative.. Define a type scale with specific sizes,
  line-heights, and tracking. Require non-adjacent sizes (skip steps).
- **Layout & rhythm**, **materials**, **hover/motion**, **responsive**, and the
  full **anti-pattern list** - port all of these from the page you just built so
  every future page inherits them. The anti-patterns are:
  This list is the heart of Level 1 (and becomes test cases in Level 3). Carry it
into every generated prompt verbatim. The model should treat any of these as a
build failure.

## Hero / layout slop
- Centered hero text with two stacked CTAs over a gradient.
- "Trusted by" logo strip directly under the hero.
- A stats row of three big numbers under the hero.
- Tilted floating product cards stacked like a reference image - the signature
  product is the whole image, never duplicated as small cards.
- Bento grid of icon + heading + paragraph cards, three or four across.

## Color slop
- Any purple-to-blue, pink-to-orange, or rainbow gradient.
- More than one accent color, or the accent used more than once per section.
- Hex, HSL, or rgb values in source (OKLCH only).

## Material slop
- Glassmorphism anywhere (especially a glassmorphic navigation bar).
- Noise overlays heavier than a deliberate <3% paper grain.
- Hover scale transforms or shadow-lift tricks.
- An incremental default corner-radius ladder (Tailwind 8/12/16, or any
  6/10/16/24-style px ladder) instead of one committed radius language.
- Rectangular photo cards floating with drop shadows.

## Typography / iconography slop
- Banned fonts as a primary face: Inter, Geist, system-ui, Poppins, Montserrat,
  Roboto, DM Sans, Plus Jakarta, Open Sans, Nunito.
- Emoji as bullet points or section markers.
- Lucide / Heroicons used decoratively in the hero.
- Centered, justified, or italicized body copy.

## Behavior slop
- Sticky chat bubble.
- Intrusive cookie banner.
- Any modal on first load.

## The single failure test
If the result could be reused for a different product just by changing the noun,
it has failed. The design must be staged around *this* product, not next to a
generic template.

## After the files exist - lint and audit
1. Lint DESIGN.md against Google's template and iterate until `errors: 0`:
   ```
   npx @google/design.md lint DESIGN.md
   ```
2. Audit the built screens against Vercel's living guidelines. Fetch the rules
   first, then apply and fix what they flag:
   ```
   WebFetch https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
   ```
