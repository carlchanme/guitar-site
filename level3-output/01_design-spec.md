# PROMPT 1 of 3 - Level 1: build the signature page

> Paste this into Claude Code at the project root. It builds one page crafted so
> it does not read as AI-generated. Build the page, then move to Prompt 2.

---

## Mode: REDESIGN - convert and remove, do not build fresh

This repo already works. Keep every route, every data file, every component's
behaviour (timer, metronome engine, drawer, stepper auto-scroll). Change only how
it looks. Specific things to convert or remove, found in the codebase today:

| Today | Do this |
|---|---|
| 20 hex literals + 2 `rgba()` across `src/layouts/App.astro`, `Sidebar.astro`, `Metronome.astro`, `ExerciseTimer.astro`, `Stepper.astro`, `StatusIcon.astro`, `index.astro`, `progress.astro`, `lib/fretboard.js` | replace with the OKLCH tokens below; `fretboard.js` reads `var(--board)` etc. already, so only its literal `#6f5a48`, `#1a120c`, `#fff` need tokens (`--ink-faint`, `--accent-ink`, `--ink`) |
| font stack `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial` (banned) | Fraunces for display, Schibsted Grotesk for text, JetBrains Mono for numbers; load from Google Fonts with `font-display: swap`, preconnect in `<head>` |
| radius ladder 2 / 4 / 5 / 6 / 8 / 9 / 10 / 12 / 14px | one token `--radius: 2px`; status circles stay round |
| two `linear-gradient` (rail brand mark, sidebar pathway art) | flat: wordmark as type, art as a flat `--surface` square or removed |
| `/` = pathway overview with a 3-tile stats row and five identical phase cards | move it to `/path/`; stats row becomes one mono line; phase cards become one list with hairlines. `/` becomes the landing page described below |
| symbols ☰ ⏱ ♩ in UI | words: "Days", "10 min", "60 BPM" |
| accent on phase titles, timer bar, stepper underline, sidebar active border, sub-division button, timer and primary buttons | accent only on: status marks (done, current) and the ONE primary action per screen. Stepper active = `--ink` text + 1px `--ink` underline. Timer bar = `--ink-soft` |
| drawer overlay `box-shadow: 0 0 0 100vw rgba(0,0,0,.5)` | keep the behaviour; express the scrim as a separate element with `background: oklch(0 0 0 / 0.5)` |

Work on branch `redesign/level3` (already checked out). Do not commit; the author
reviews and commits.

## Intent

A worship guitarist's practice course, learned in public. The site is two things: a public landing page that says what the course is and who it is for, and the course app itself - a 14-week pathway of days, each day a page with a timer, a metronome and fretboard diagrams, plus a practice log and a progress view. The author is an intermediate acoustic player moving to electric on a church worship team; every lesson is written only after he can play it, and the log is the raw material the course is built from.

The signature visual is **the author's own electric guitar (Gretsch hollow-body or PRS), photographed on a plain surface with side light, desaturated 5-10%**. The page is staged *around* it, not
next to it. If the result could be reused for a different product just by changing
the noun, it has failed. Tone: quiet, disciplined, honest. Audience: Church worship guitarists, mostly hymn-based teams, who play chords already and want to be heard: build energy, play one clean lead line, stop being the back seat. They care how things look the way a good notebook looks - clear, quiet, no noise - not the way a startup looks..

Tech: Astro 7 (static output), hand-written CSS with custom properties in `src/layouts/App.astro` global styles plus scoped `<style>` blocks per component. No Tailwind, no CSS-in-JS. Repo at `~/Documents/code/guitar-site`, branch `redesign/level3`. Content: `src/data/course.json` (pathway, days, exercises, statuses), `src/data/roadmap.json` (skill ratings), `src/content/log/` (markdown), `src/exercises/*.astro` (exercise bodies), `src/lib/fretboard.js` (SVG diagrams). Keep all of that; this is a visual redesign, not a rebuild..

## Hero composition (non-negotiable)
- One large, photorealistic image of the author's own electric guitar (Gretsch hollow-body or PRS), photographed on a plain surface with side light, desaturated 5-10% is the hero's visual center,
  occupying ~60-75% of viewport height at the optical center (slightly above
  geometric center).
- The headline overlays the image - not above, not beside. Type sits *on* the
  subject, reading through and around the letterforms.
- Headline: a single statement, 4-7 words, tight tracking (-0.02em). No stacked
  subhead. Any secondary line goes below as a small-caps tracked kicker.
- Exactly one CTA: **"Start day 1"**, anchored bottom-left or bottom-center.
  No paired "Learn more" ghost button.
- No floating testimonial cards, no "Trusted by" strip, no stats row in or under
  the hero.

## Color system - OKLCH only
No hex, no HSL, no rgb anywhere in source. Direction: warm near-black background (the existing app is dark and stays dark; do NOT switch to light paper), warm off-white ink, hairlines within 0.04 L of their surface, one committed ink-blue accent. Fretboard diagrams keep their wood tones (board, fret, string) as material colors expressed in OKLCH; the root-dot color becomes the accent.. Single
committed accent: **ink-blue, oklch(0.72 0.12 250) on dark surfaces** (the only saturated element on the page).
Token set:

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

## Contrast rules
- Body text on `--bg`: minimum 12:1 (editorial sharpness, not WCAG-minimum greys).
- Hero headline over the image must never depend on the photo for legibility:
  either place it over a deliberately negative-space region, or feather a subtle
  dark gradient mask (L drop <= 0.15, opacity ramped, no hard edges). Verify at
  375px.
- Hairline dividers/borders sit within 0.04 L of the surface they are on. No
  grey-on-grey shadow stacks.
- The accent appears at most once per section. Never on two elements in the hero.

## Typography
- **Banned** (read as AI-default): Inter, Geist, system-ui, Poppins, Montserrat,
  Roboto, DM Sans, Plus Jakarta, Open Sans, Nunito.
- **Display** (hero + section openings only): Fraunces (Google Fonts, variable, with optical sizing `opsz`; use `SOFT 50, WONK 0`) - hero headline, day titles, section openings only.
- **Text** (everything else): Schibsted Grotesk (Google Fonts, variable) - everything else, sentence case, weight contrast for emphasis.
- **Mono** (spec tables / technical callouts only): JetBrains Mono - BPM, timer digits, minutes, dates, fret numbers, spec tables only. Never decorative..
- Type scale base 16px, with non-adjacent sizes (skip steps). Define sizes,
  line-heights, tracking. No justified body, no centered paragraphs, no italics
  for emphasis - use weight.

## Layout & rhythm
- 12-column grid, but the design must feel asymmetric (7 of 10 on the landing page: editorial, asymmetric, negative space as a feature; 4 of 10 inside the app, where the sidebar + main grid is the structure and the asymmetry comes from a strong left edge and generous right-hand space).
  Headlines start at column 2 / end at column 9, or run off-grid. No section reads
  as "centered everything."
- 8px baseline. Section vertical padding scales 96 / 144 / 192px on desktop.
- Max content width ~1280-1440px, generous gutters. Only the hero and the
  product-detail shot go full-bleed.
- Negative space is a feature. If a section feels dense, remove something.

## Sections (six max, each visually distinct)
Landing page (`/`), six sections max, each visually distinct:
1. **Hero** as specified: the guitar photo, headline overlaid, single CTA "Start day 1". Headline candidates (pick one, 4-7 words): "From the back seat to the lift." / "Learn to be heard on Sunday." No subhead; kicker below the guitar in small-caps mono: "14 weeks · 5 × 30 min · learned in public".
2. **Three moments, not three cards**: (a) text-only set large in Fraunces - "Hands before theory." with two sentences on why muting and picking come first; (b) a product-detail shot: one fretboard SVG (the muting test) full-bleed on the continuous background, no card; (c) one numeric callout set at 200px+ in Fraunces - "14" with "weeks to 31 December" as a mono kicker. No identical components in a row.
3. **Editorial paragraph** at 24-28px, positioned left, columns 2-8: what the course is (a daily path with a timer and metronome on the page) and what it is not (no theory before you can play it). Negative space to the right.
4. **Spec table in mono**, two columns, hairlines: Phases (5) · Days (70) · Session (30 min) · Sessions per week (5) · Gate rule (fail = repeat the week) · Gear assumed (any electric, any amp or modeller) · Cost (free).
5. **One quiet pull-quote** set large: a line from the author's own baseline log entry ("On Sundays the guitar sits in the back seat and mostly isn't heard."). No avatar, no star rating, no testimonial from anyone else - there are none yet and none may be invented.
6. **Footer CTA**: "Start day 1" again, extreme negative space. Footer chrome: one line of mono ("I play guitar at my church. Notes to myself, shared.") plus a small wordmark.

App shell (`/path/`, `/day/N/`, `/day/N/<ex>/`, `/progress/`, `/log/`, `/metronome/`, `/library/`): keep the current structure (icon rail · sidebar of phases and days · main with breadcrumb, title, exercise stepper, timer, metronome, body). Convert its styling to this system: tokens, fonts, 2px radius, accent only on status marks and the one primary action per screen, mono for every number. Move the current `/` (pathway overview with the Continue card) to `/path/`; remove its stats row and its five identical phase cards in favour of a single list with hairlines.

## Materials
- the author's own electric guitar (Gretsch hollow-body or PRS), photographed on a plain surface with side light, desaturated 5-10% is cleanly cut out or on a continuous tonal background matching
  `--bg`. No rectangular photo cards with shadows. Soft contact shadow only where
  it touches a surface. Available imagery: none yet. The author shoots the guitar this week. Until then the hero uses a rendered fretboard SVG on the continuous background as a stand-in, sized and placed exactly where the photo will go, so the swap is a file change. Fretboard diagrams (SVG from `src/lib/fretboard.js`) are the only imagery inside the app..
- Photography desaturated 5-10%, never punched.
- Corner radius: 2px everywhere - every button, card, row, panel, input, image. One value, one token `--radius: 2px`. Status circles are the only round shapes.. Never an incremental default radius ladder
  (the ladder in the repo today: 2 / 4 / 5 / 6 / 8 / 9 / 10 / 12 / 14px across App.astro, Sidebar.astro, Metronome.astro, ExerciseTimer.astro, Stepper.astro, index.astro - replace all with `var(--radius)`).
- No glassmorphism. No noise overlays beyond a deliberate <3% paper grain. No
  gradients except the optional hero legibility mask.
- Hover: 150ms opacity shifts or 1px underline reveals. No scale transforms, no
  shadow-lift.

## Responsive
The hero overlay composition must survive 375px. On mobile, the author's own electric guitar (Gretsch hollow-body or PRS), photographed on a plain surface with side light, desaturated 5-10% stays
the dominant visual; the headline reflows beneath or on top depending on which
negative-space region carries it. Do not solve mobile by stacking "image above,
text below" - that defeats the premise.

## Anti-patterns - reject the output if any appear
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

## Project-specific anti-patterns (this site)
- Naming the author's employer, its products, colleagues, paying clients, any freelance platform, or any company name. "I play guitar at my church" is the whole bio. This is a compliance rule, not a style rule.
- Any testimonial, review, subscriber count, student count, or "trusted by" that is not real. There are zero students and zero reviews today. The pull-quote is the author's own log line.
- Symbols or emoji as UI labels (the current ☰ ⏱ ♩). Use words ("Days", "10 min", "60 BPM") or one drawn SVG glyph from the existing StatusIcon set.
- Gradients on the wordmark or pathway art (the current two `linear-gradient` blocks). Wordmark is type set in Fraunces; pathway art is a flat accent square or nothing.
- A stats row on `/path/` (the current three tiles). Progress is one line of mono text.
- Accent on more than: status marks (done / current) + one primary action per screen. Not on phase titles, not on the timer bar, not on stepper underlines, not on sidebar borders. Those become `--ink` or `--line`.
- A light theme. The product is dark; do not "fix" it to paper.
- Changing routes, content, `course.json`, `roadmap.json`, the log, or the fretboard renderer's geometry. Visual only.

## Reference feel (do not visually copy)
- pickupmusic.com course player (the screenshot the author supplied): sidebar of days with status, exercise stepper, media area. Take the information architecture, not the violet or the video-first framing.
- origami.me tutorial pages: one numbered step per diagram with a one-sentence caption, metadata block (difficulty, time), a tip callout. Take the step rhythm.
- Neither is to be visually copied.
