---
version: alpha
name: Worship electric
description: A worship guitarist's practice course, learned in public. Dark, warm, quiet. One accent.
colors:
  bg: "oklch(0.17 0.006 60)"
  surface: "oklch(0.21 0.007 60)"
  card: "oklch(0.24 0.008 60)"
  ink: "oklch(0.94 0.006 80)"
  ink-soft: "oklch(0.70 0.008 70)"
  ink-faint: "oklch(0.52 0.008 70)"
  line: "oklch(0.27 0.008 60)"
  accent: "oklch(0.72 0.12 250)"
  accent-ink: "oklch(0.15 0.02 250)"
  danger: "oklch(0.55 0.16 25)"
  board: "oklch(0.28 0.04 50)"
  fret: "oklch(0.74 0.03 85)"
  string: "oklch(0.91 0.02 85)"
  tone: "oklch(0.93 0.02 85)"
  root: "{colors.accent}"
  scrim: "oklch(0 0 0 / 0.5)"
  primary: "{colors.ink}"
  secondary: "{colors.ink-soft}"
  tertiary: "{colors.accent}"
  neutral: "{colors.bg}"
typography:
  display-hero:
    fontFamily: Fraunces
    fontSize: 88px
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: -0.02em
    fontVariation: "'SOFT' 50, 'WONK' 0"
  display-number:
    fontFamily: Fraunces
    fontSize: 320px
    fontWeight: 400
    lineHeight: 0.9
    letterSpacing: -0.04em
    fontVariation: "'SOFT' 50, 'WONK' 0"
  headline-lg:
    fontFamily: Fraunces
    fontSize: 44px
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: -0.02em
    fontVariation: "'SOFT' 50, 'WONK' 0"
  headline-md:
    fontFamily: Fraunces
    fontSize: 28px
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: -0.02em
    fontVariation: "'SOFT' 50, 'WONK' 0"
  headline-sm:
    fontFamily: Fraunces
    fontSize: 20px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: -0.02em
    fontVariation: "'SOFT' 50, 'WONK' 0"
  body-lg:
    fontFamily: Schibsted Grotesk
    fontSize: 28px
    fontWeight: 400
    lineHeight: 1.4
  body-md-plus:
    fontFamily: Schibsted Grotesk
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.45
  body-md:
    fontFamily: Schibsted Grotesk
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: Schibsted Grotesk
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
  label-strong:
    fontFamily: Schibsted Grotesk
    fontSize: 13px
    fontWeight: 700
    lineHeight: 1.5
  label-rail:
    fontFamily: Schibsted Grotesk
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1
  mono-figure:
    fontFamily: JetBrains Mono
    fontSize: 44px
    fontWeight: 500
    lineHeight: 1
    letterSpacing: -0.01em
    fontFeature: "'tnum' 1"
  mono-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
    fontFeature: "'tnum' 1"
  mono-kicker:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0.12em
    fontFeature: "'tnum' 1"
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  section-1: 96px
  section-2: 144px
  section-3: 192px
  gutter: 72px
  gutter-min: 16px
  gap: 24px
  columns: 12
  max-width: 1440px
  app-rail: 72px
  app-sidebar: 320px
  app-sidebar-narrow: 280px
  app-main-max: 760px
  app-main-pad: 40px
  touch-min: 44px
rounded:
  base: 2px
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.base}"
    padding: 10px
    height: 44px
  button-primary-hover:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
  button-secondary:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.base}"
    padding: 10px
    height: 44px
  button-cta:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.base}"
    padding: 24px
    height: 48px
  panel:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.base}"
    padding: 16px
  sidebar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    padding: 24px
    width: 320px
  rail:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-soft}"
    width: 72px
  rail-item-active:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.base}"
  list-row:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    padding: 14px
    height: 44px
  list-row-active:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.base}"
  stepper-item:
    textColor: "{colors.ink-soft}"
    typography: "{typography.label-strong}"
  stepper-item-active:
    textColor: "{colors.ink}"
    typography: "{typography.label-strong}"
  status-done:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.accent-ink}"
    size: 22px
  status-current:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.accent}"
    size: 22px
  status-todo:
    backgroundColor: "{colors.line}"
    size: 22px
  status-locked:
    backgroundColor: "{colors.ink-faint}"
    size: 22px
  button-danger:
    backgroundColor: "{colors.card}"
    textColor: "{colors.danger}"
    typography: "{typography.body-md}"
    rounded: "{rounded.base}"
    padding: 10px
    height: 44px
  timer-clock:
    typography: "{typography.mono-figure}"
    textColor: "{colors.ink}"
  timer-bar:
    backgroundColor: "{colors.ink-soft}"
    height: 2px
  metronome-bpm:
    typography: "{typography.mono-figure}"
    textColor: "{colors.ink}"
  subdivision-on:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.bg}"
  hairline:
    backgroundColor: "{colors.line}"
    height: 1px
  note-callout:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    padding: 16px
  code:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    typography: "{typography.mono-md}"
    rounded: "{rounded.base}"
    padding: 1px
  select:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.base}"
    padding: 8px
  scrim:
    backgroundColor: "{colors.scrim}"
  fretboard-board:
    backgroundColor: "{colors.board}"
  fretboard-fret:
    backgroundColor: "{colors.fret}"
    width: 3px
  fretboard-string:
    backgroundColor: "{colors.string}"
    height: 1px
  fretboard-root-dot:
    backgroundColor: "{colors.root}"
    textColor: "{colors.accent-ink}"
    size: 30px
  fretboard-tone-dot:
    backgroundColor: "{colors.tone}"
    textColor: "{colors.accent-ink}"
    size: 30px
---

# Worship electric — design system

> This document is the source of truth for every visual decision. If a value is
> not here, it does not exist yet - add it, then build against it. Whenever you
> discover a new design value while building, add it to this file.

The tokens in the front matter are normative. The CSS custom properties in
`src/styles/global.css` are derived from them, one to one, same names with a
`--` prefix. A token that is not in this file must not appear in `:root`.

## Overview

A worship guitarist's practice course, learned in public. Two things share one
system: a public landing page that says what the course is and who it is for,
and the course app — a 14-week pathway of days, each day a page with a timer, a
metronome and fretboard diagrams, plus a practice log and a progress view.

The audience is church worship guitarists, mostly hymn-based teams, who already
play chords and want to be heard. They care how things look the way a good
notebook looks: clear, quiet, no noise. Not the way a startup looks.

Tone: quiet, disciplined, honest. The page is staged around the author's own
electric guitar (a Gretsch hollow-body or PRS), photographed on a plain surface
with side light, desaturated 5–10%. Until the photo exists, a rendered fretboard
SVG stands in, in the same box. Fretboard diagrams are the only imagery inside
the app.

The single failure test: if the result could be reused for a different product
just by changing the noun, it has failed. The design must be staged around
*this* product, not next to a generic template.

The product is dark. It stays dark. Do not "fix" it to light paper.

## Colors

OKLCH only. No hex, no HSL, no rgb anywhere in source. Warm near-black
background, warm off-white ink, hairlines within 0.04 L of their surface, one
committed ink-blue accent. Every hue sits between 50 and 85 (warm) except the
accent (250) and danger (25).

- **Background (`bg`, oklch 0.17 0.006 60):** warm near-black. The page. Every
  full-bleed image sits on this with no card around it.
- **Surface (`surface`, 0.21):** the rail and the sidebar. One step up.
- **Card (`card`, 0.24):** raised rows, the timer, the metronome, the active
  day in the sidebar, `code`. Two steps up. This is the top of the tonal stack.
- **Ink (`ink`, 0.94 0.006 80):** body text. ≥ 12:1 on `bg`. Editorial
  sharpness, not WCAG-minimum grey. Also the "active" colour in chrome: the
  active stepper step, the active rail item, the selected subdivision, the
  progress-bar fill, the goal tick.
- **Ink soft (`ink-soft`, 0.70):** secondary text, kickers, crumbs, the note
  callout's left rule, the timer bar.
- **Ink faint (`ink-faint`, 0.52):** metadata, disabled, locked phases, day
  numbers, fret-marker dots, string names.
- **Line (`line`, 0.27 0.008 60):** hairlines. 0.03 L above `card`. Borders,
  dividers, the todo ring, the empty track of a bar.
- **Accent (`accent`, 0.72 0.12 250):** ink-blue. The only saturated element
  on any screen. Appears on exactly two kinds of thing: status marks (done,
  current) and the one primary action per screen. Nowhere else. Not on phase
  titles, not on the timer bar, not on stepper underlines, not on sidebar
  borders, not on hover.
- **Accent ink (`accent-ink`, 0.15 0.02 250):** text on the accent. Also the
  outline and label on fretboard dots.
- **Danger (`danger`, 0.55 0.16 25):** destructive confirmation only, as
  `button-danger` (danger text and border on `card`; never a filled red
  button). Not yet used anywhere. Never for
  validation, never for "error" banners.
- **Scrim (`scrim`, oklch 0 0 0 / 0.5):** the drawer backdrop under 900px, as
  its own element.

Fretboard material, not UI colour: `board` (0.28 0.04 50, the wood),
`fret` (0.74 0.03 85, the wire), `string` (0.91 0.02 85), `tone` (0.93 0.02 85,
a scale-tone dot). `root` is the accent: the root dot is the one thing on a
diagram that is allowed to be blue. The renderer in `src/lib/fretboard.js`
reads these as `var(--board)` etc.; its geometry is not a design value and does
not change.

The generic names `primary`, `secondary`, `tertiary`, `neutral` are aliases for
`ink`, `ink-soft`, `accent`, `bg` so that tooling expecting them resolves.

Contrast rules:

- Body text on `bg`: ≥ 12:1.
- Hairlines sit within 0.04 L of the surface they are on. No grey-on-grey
  shadow stacks.
- The accent appears at most once per section on the landing page and at most
  on status marks + one primary action inside the app. Never on two elements
  in the hero.
- A hero headline over the image never depends on the photo for legibility:
  either it sits over negative space, or a feathered mask of the page colour
  (`bg` at ≤ 0.9 opacity, ramped, no hard edge, L drop ≤ 0.15) sits behind it.
  Verify at 375px.

## Typography

Three faces, loaded from Google Fonts with `display=swap` and a `preconnect`
in `<head>`.

- **Display: Fraunces** (variable, optical sizing on, `SOFT 50, WONK 0`).
  Hero headline, day titles (`h1`), section openings (`h2`), the pull-quote,
  the wordmark, the pathway title in the sidebar. Weight 500, tracking
  −0.02em. Never for body copy, never below 20px.
- **Text: Schibsted Grotesk** (variable). Everything else. Sentence case.
  Emphasis is weight (700), never italic. `h3` is Schibsted 700 at 16px.
- **Mono: JetBrains Mono.** BPM, timer digits, minutes, dates, fret numbers,
  the progress line, spec tables, kickers. Tabular numerals. Never decorative.
  Never for a paragraph.

Banned as a primary face, they read as AI-default: Inter, Geist, system-ui,
Poppins, Montserrat, Roboto, DM Sans, Plus Jakarta, Open Sans, Nunito. The old
`-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial` stack
is gone and stays gone.

Type scale, base 16px, non-adjacent sizes only. Two sizes that sit next to each
other on the ladder never sit next to each other on a screen.

| Token | Face | Size | Line | Tracking | Where |
|---|---|---|---|---|---|
| display-hero | Fraunces 500 | clamp(40px, 6.5vw, 88px) | 1.0 | −0.02em | landing hero only |
| display-number | Fraunces 400 | clamp(160px, 22vw, 320px) | 0.9 | −0.04em | the "14" callout |
| headline-lg | Fraunces 500 | 44px | 1.08 | −0.02em | `h1`, "Hands before theory", pull-quote |
| headline-md | Fraunces 500 | 28px | 1.25 | −0.02em | `h2`; `h1` under 600px |
| headline-sm | Fraunces 500 | 20px | 1.2 | −0.02em | wordmark, sidebar title, Continue row |
| body-lg | Schibsted 400 | clamp(22px, 2vw, 28px) | 1.4 | 0 | landing editorial paragraph |
| body-md-plus | Schibsted 400 | 20px | 1.45 | 0 | landing "two sentences" |
| body-md | Schibsted 400 | 16px | 1.55 | 0 | body, buttons, `h3` at 700 |
| body-sm | Schibsted 400 | 13px | 1.5 | 0 | `.small`, crumbs, table cells, stepper |
| label-strong | Schibsted 700 | 13px | 1.5 | 0 | stepper step names, phase names |
| label-rail | Schibsted 400 | 11px | 1 | 0 | rail labels, BPM unit, stepper sub-labels |
| mono-figure | JetBrains 500 | 44px | 1 | −0.01em | timer clock, BPM |
| mono-md | JetBrains 400 | 13px | 1.5 | 0 | every number, date, spec table |
| mono-kicker | JetBrains 400 | 13px | 1.5 | 0.12em, uppercase | kickers, captions |

Rules: no justified body, no centered paragraphs, no italics for emphasis.
Paragraph measure ≤ 64ch. Real typography: en-dashes for ranges (Weeks 1–2),
proper apostrophes, a middle dot (·) as the metadata separator.

## Layout

12-column grid, but the design must feel asymmetric. On the landing page
(7 of 10 asymmetry): editorial, negative space as a feature. Headlines start
at column 2 and end at column 9 or 10, or run off-grid. No section reads as
"centered everything". Inside the app (4 of 10): the rail + sidebar + main grid
is the structure; the asymmetry comes from a strong left edge and generous
right-hand space.

- Landing: `max-width` 1440px, gutter `clamp(16px, 5vw, 72px)`, column gap
  24px. Only the hero and the product-detail fretboard go full-bleed.
- App: rail 72px · sidebar 320px (280px under 1200px) · main. Main content
  max 760px, padding 40px (32px under 1200px, 16px under 600px). Under 900px
  the sidebar is a drawer with a scrim and a "Days" button in a sticky top bar.
- 8px baseline. Section vertical padding on the landing page scales
  96 / 144 / 192px on desktop and drops one step under 900px.
- Landing sections: 1 hero · 2 three moments (large text, full-bleed diagram,
  giant number; never three identical components) · 3 editorial paragraph
  columns 2–9 · 4 mono spec table columns 2–8 · 5 pull-quote columns 3–11 ·
  6 footer CTA with extreme negative space. Six max.
- Tablet (721–1024px): same asymmetry, text spans widen to 8–10 of 12
  columns. Phone (≤ 720px): everything spans full width except the hero,
  which keeps the overlay.
- Negative space is a feature. If a section feels dense, remove something.
- Touch targets ≥ 44px tall in the app.

## Elevation & Depth

Flat. There are no shadows anywhere. Depth is three tonal layers, `bg` →
`surface` → `card`, each 0.03–0.04 L apart, and hairlines in `line`. A raised
element is a `card` rectangle with a 1px `line` border. Nothing lifts on hover.
The only translucency on the site is the drawer scrim and the hero legibility
mask, both the page colour or black at partial opacity.

Photography and diagrams sit on the continuous background. No rectangular
photo cards, no drop shadows. A soft contact shadow is allowed only where the
guitar touches its surface in the photograph itself.

## Shapes

One radius: 2px, everywhere — every button, card, row, panel, input, image.
One value, one token (`rounded.base`, `--radius`). Status circles and the
metronome beat dots are the only round shapes. Never an incremental
radius ladder (the old 2 / 4 / 5 / 6 / 8 / 9 / 10 / 12 / 14px is gone).

## Components

- **Buttons.** Primary: `accent` background, `accent-ink` text, weight 700,
  44px tall, 10px 14px padding. Exactly one primary per screen: the timer's
  Start on an exercise page, "Start with …" on a day page, the metronome's
  Start on `/metronome/`, "Start day 1" on the landing page. When a timer
  finishes, Start reverts to secondary and the Next link takes the accent, so
  there is still one. Secondary: `card` background, 1px `line` border, `ink`
  text, weight 400. The landing CTA is the primary at 48px tall, 24px
  horizontal padding. Hover on any button: opacity 0.85 over 150ms.
  Disabled: the same button at 0.4 opacity, `cursor: not-allowed`, no colour
  change, `aria-disabled="true"`. All three live in `Action.astro`;
  `variant="link"` is a text link with no underline at rest and a 1px
  underline on hover and focus-visible only. No other component may define a
  primary look.
- **Rail.** 72px, `surface`, right hairline. Wordmark in Fraunces set
  vertically. Items are a 20px drawn SVG glyph over an 11px text label; active
  = `ink` on `card`. Never accent.
- **Sidebar.** `surface`, 24px padding, hairline lists. Phases are `details`
  rows separated by hairlines with a 1px progress bar (`line` track,
  `ink-soft` fill). Days are 44px rows: mono day number in `ink-faint`, title
  in 13px, status mark right. Active day = `card` background, title 700.
  Locked = `ink-faint`. Empty state for a phase with no days is one sentence
  in `ink-faint`.
- **Status marks.** 20–22px circles from `StatusIcon.astro`: done = `accent`
  fill with `accent-ink` check; current = `accent` ring with play; todo =
  `line` ring (the stroke is the mark's only colour); locked = `ink-faint`
  padlock (same). A partially done current day
  shows an `accent` arc on a `line` ring. These plus the one primary action
  are the whole accent budget.
- **Stepper.** Horizontal scroll, hairline below. Step name 13px 700, sub
  label 11px `ink-faint`. Active = `ink` text and a 1px `ink` underline. Done
  steps carry the 16px done mark. No chevrons.
- **Timer.** `card` panel, mono clock at 44px, Start primary, Next secondary,
  2px bar in `ink-soft` on `line`.
- **Metronome.** `card` panel. ±5 / ±1 secondary buttons in mono, BPM 44px
  mono with an 11px tracked unit, subdivision segmented control (on = `ink`
  on `bg`), Tap, Start (secondary unless it is the page's primary). Beat dots
  8px, `line`, hit = `ink`.
- **Lists.** Rows separated by hairlines, 14px vertical padding, never boxed.
  Leading status mark, title, trailing mono metadata. Under 600px the
  metadata drops under the title.
- **Tables.** 13px, hairline rows, `th` in `ink-soft` 700. Spec tables are
  `dl` in mono, two columns, hairlines.
- **Note callout.** 1px `ink-soft` left rule, 16px inset. No fill, no icon.
- **Inputs.** `select`: `card`, 1px `line`, 2px radius, 8px 10px. Labels
  above inputs, in `ink-soft`.
- **Kicker.** Mono 13px, uppercase, 0.12em tracking, `ink-soft`. The only
  uppercase on the site.
- **Hero.** Full-bleed. The guitar (or its stand-in) in a 4/5 box at
  ~70svh, optical centre slightly above geometric, columns 5–12. Headline in
  display-hero over columns 2–10 overlaying the subject with the feathered
  mask. Kicker and one CTA bottom-left. Under 720px the image spans full width
  at 62svh and the headline overlays its lower third.
- **Fretboard diagrams.** SVG from `src/lib/fretboard.js`, `.board` max 600px
  in the app, full-bleed on the landing page. Wood tones as above, root dot
  `accent`, tone dot `tone`, labels and dot outlines `accent-ink`, mute marks
  `string` with a `board` stroke. Chord boxes: `ink` lines, `ink` dots with
  `bg` finger numbers, root dot `accent`.
- **Drawer scrim.** Own element after the sidebar, `scrim`, fades in 200ms.
- **404 / empty states.** A single object, left-aligned like everything else
  unless it is truly a single object on an otherwise empty page, in which case
  centering is allowed. One sentence in body-md, one secondary link back.

## Do's and Don'ts

- Do keep every colour in OKLCH. Don't write hex, HSL or rgb anywhere in
  source, including SVG fills and `theme-color`.
- Do spend the accent on status marks and one primary action. Don't put it on
  a title, a border, an underline, a bar, a hover, or a second button.
- Do use words as labels ("Days", "10 min", "60 BPM"). Don't use symbols or
  emoji as UI labels (the old ☰ ⏱ ♩ are gone).
- Do set numbers in mono. Don't set prose in mono.
- Do use one 2px radius. Don't introduce a second radius.
- Do lean on a strong left edge and negative space. Don't center a section.
- Do use hairlines within 0.04 L of their surface. Don't stack greys or
  shadows.
- Do use opacity shifts or 1px underline reveals on hover, 150ms. Don't scale
  or lift.
- Do keep the wordmark as type. Don't put a gradient on it or on the pathway
  art.
- Do keep the product dark. Don't add a light theme.
- Do keep the pull-quote as the author's own log line. Don't invent a
  testimonial, review, subscriber count or "trusted by".
- Do describe the author as "I play guitar at my church". Don't name an
  employer, product, colleague, client, freelance platform or company. This is
  a compliance rule, not a style rule.
- Do keep routes, content, `course.json`, `roadmap.json`, the log and the
  fretboard renderer's geometry as they are. Visual only.

Anti-patterns. Any of these is a build failure. Carry this list verbatim into
every generated prompt; it becomes the Level 3 test cases.

Hero / layout slop:

- Centered hero text with two stacked CTAs over a gradient.
- "Trusted by" logo strip directly under the hero.
- A stats row of three big numbers under the hero.
- Tilted floating product cards stacked like a reference image — the
  signature product is the whole image, never duplicated as small cards.
- Bento grid of icon + heading + paragraph cards, three or four across.

Color slop:

- Any purple-to-blue, pink-to-orange, or rainbow gradient.
- More than one accent color, or the accent used more than once per section.
- Hex, HSL, or rgb values in source (OKLCH only).

Material slop:

- Glassmorphism anywhere (especially a glassmorphic navigation bar).
- Noise overlays heavier than a deliberate <3% paper grain.
- Hover scale transforms or shadow-lift tricks.
- An incremental default corner-radius ladder (Tailwind 8/12/16, or any
  6/10/16/24-style px ladder) instead of one committed radius language.
- Rectangular photo cards floating with drop shadows.

Typography / iconography slop:

- Banned fonts as a primary face: Inter, Geist, system-ui, Poppins,
  Montserrat, Roboto, DM Sans, Plus Jakarta, Open Sans, Nunito.
- Emoji as bullet points or section markers.
- Lucide / Heroicons used decoratively in the hero.
- Centered, justified, or italicized body copy.

Behavior slop:

- Sticky chat bubble.
- Intrusive cookie banner.
- Any modal on first load.

Project-specific slop:

- Naming the author's employer, its products, colleagues, paying clients, any
  freelance platform, or any company name.
- Any testimonial, review, subscriber count, student count, or "trusted by"
  that is not real. There are zero students and zero reviews today.
- Symbols or emoji as UI labels.
- Gradients on the wordmark or pathway art.
- A stats row on `/path/`. Progress is one line of mono text.
- Accent on more than status marks + one primary action per screen.
- A light theme.
- Changing routes, content, data files, the log, or the fretboard renderer's
  geometry.

The single failure test: if the result could be reused for a different product
just by changing the noun, it has failed.

## Motion

Hover: 150ms opacity shift to 0.8–0.85, or a 1px underline reveal. Drawer:
200ms translate, scrim 200ms opacity. Timer bar: 500ms linear width. Nothing
else moves. No scale transforms, no shadow-lift, no parallax, no entrance
animations.

## Responsive

Breakpoints: 1200px (sidebar narrows), 1024px (landing text spans widen),
900px (app sidebar becomes a drawer, landing section padding drops a step),
720px (landing collapses to single column, hero keeps its overlay), 600px (app
title drops to headline-md, gutters to 16px). The hero overlay composition
must survive 375px: the image stays the dominant visual and the headline
reflows over its lower third. Never solve mobile by stacking "image above,
text below". Verify every screen at 375, 768, 1024 and 1440 with no horizontal
scroll.
