# Guitar tutorial site — handoff brief

Source: chat with Claude, 4–11 Sept 2026. Transfer this file into the project root as `BRIEF.md` before any build.

## Status: hobby project, not a work stream

- Not part of the RM 100k/month aim. Fails CENTS on Need and Time (free content, saturated market).
- Cap: weekend project. Does not displace Tapduty, Tomcare, or stream C.
- No PRD sign-off yet. Do not build beyond a single-page prototype until Carl approves scope.

## Owner context

- Carl: worship guitarist at a church, plays electric (Gretsch hollow-body, PRS). Knows chords, plays songs. Did **not** know scale theory until Sept 2026 — this site is written from a "just learned it" perspective, which is the differentiator: explain like the reader is 12, one shape at a time, no jargon walls.
- Public-compliance rule (non-negotiable): the site must never name Carl's employer, its products, colleagues, WrenchIt, paying clients, or freelance platforms. No bio that links back to fintech work. "I play guitar at my church" is fine.

## What the site teaches (only what has been verified so far)

### Lesson 1 — What a scale is
A song in G uses chords G, C, D, Em. Take the notes inside those chords and line them up low to high: G A B C D E. That list is a scale — the alphabet of allowed notes for melodies and riffs over that song. Notes in the list sound right; notes outside sound off.

### Lesson 2 — Hexatonic = six notes
That's all the word means. The full G major scale has seven (adds F#). Over the C chord, F# sounds sour. Leave it out and you can't hit a wrong note. This is the **major hexatonic**: 1 2 3 4 5 6. Equivalent: major pentatonic + the 4th, or major scale minus the 7th.

### Lesson 3 — One shape (G, frets 2–5)
Play one dot at a time, in order, low string to high. Roots (G) are the "home" notes.

| Order | String | Fret | Note |
|---|---|---|---|
| 1 | low E | 3 | G (home) |
| 2 | low E | 5 | A |
| 3 | A | 2 | B |
| 4 | A | 3 | C |
| 5 | A | 5 | D |
| 6 | D | 2 | E |
| 7 | D | 5 | G (home, octave) |
| 8 | G | 2 | A |
| 9 | G | 4 | B |
| 10 | G | 5 | C |
| 11 | B | 3 | D |
| 12 | B | 5 | E |
| 13 | high e | 3 | G |

Practice: play 1–7 ten times, then over a G–C–D–Em loop in any order.

### Lesson 4 (not yet learned by Carl — hold until he confirms)
- Minor hexatonic: 1 2 b3 4 5 b7 (minor pentatonic + 2nd; natural minor minus b6). Same six notes as G major hexatonic when rooted on E.
- Blues (1 b3 4 b5 5 b7) and major blues (1 2 b3 3 5 6): pentatonic + one passing note.
- Whole tone, augmented: exist, skip.

Rule for content: Carl writes/approves a lesson only after he can play it. No lesson goes live from theory alone.

## Existing artifacts (reuse, don't rewrite)

- `hexatonic-scales.html` — full-neck diagrams, all six hexatonic scales, key selector, standard tuning, frets 0–12. Fretboard rendered by JS from pitch-class sets. Good as the "reference" view, bad as a first lesson (too many dots).
- `g-hexatonic-one-shape.html` — single 4-fret shape with numbered play order. This is the model for every lesson diagram: one shape, numbered dots, roots coloured, play order listed as text under the diagram.

Design tokens already in use: background #dcd8cc, ink #22201c, fretboard #3a2418, fret #b8ad98, string #e9e3d3, root #c8781c, tone #f3ecd8. Serif body (Georgia / Palatino stack). Keep it; matches Carl's Japandi taste.

## Proposed structure (for Carl to approve, not to build yet)

1. Static site, no backend. Astro or plain HTML. Deploy to Vercel (connector available).
2. Reusable fretboard component: input = tuning, root, interval set, fret range, optional play order; output = SVG. Both existing HTMLs already do this in ad-hoc JS — extract it.
3. Lesson template: title → one-sentence "why" → one diagram → play order → one practice instruction. Nothing else on the page.
4. Chord pages (Carl's request) — not yet specced. Carl should list the 8–12 chords he actually uses on Sundays first.
5. "Tips and tricks" — Carl has none written down yet. Placeholder; do not invent.

## Open questions for Carl

- Is this public, or a private notebook for himself? Changes the compliance load and whether it's worth deploying at all.
- Which 8–12 chords go on the chord pages?
- Domain / name? (Cannot be under wrenchit.io.)
- Weekend cap: how many hours before it's parked?

## Build status (2026-09-11)

Scope gate cleared: Carl chose **public site**, **full proposed structure** (overriding the single-page-prototype cap above), chord pages **skipped for now**, no domain yet (Vercel default).

Built: Astro static site, 5 pages (home, lesson-1, lesson-2, lesson-3, reference), reusable `src/lib/fretboard.js` SVG renderer shared by lesson shapes and the full-neck reference. Design tokens and lesson-3 dot table ported exactly from the two source HTMLs. Build passes, all pages verified in-browser (screenshots matched this brief's table). Lesson 4 and chord pages intentionally not built — gated on Carl learning/listing them, per the rules above.

**Not deployed.** Vercel MCP connector returned 403 "You don't have permission to create a project" on `deploy_to_vercel` — account/connector-level block, not a code issue. No git repo initialized yet either (deploy path used was direct-file, not git-based). Site only exists locally at `~/Documents/code/guitar-site/` — run with `npm run dev`.

Next session, to deploy: either fix the Vercel connector permission (vercel.com account/team role), or `git init` + push to GitHub and use Vercel's git-connected deploy instead.

## Build status (2026-09-21) — learning loop

Scope re-set after interview (see vault `connections/projects/guitar-site/roadmap.md`): the site is the practice tool on the phone, then a course for others. Built tonight:

- `src/components/Metronome.astro` — Web Audio lookahead scheduler, ±1/±5, 1–4 notes per click, tap, accent on 1, screen wake lock, BPM remembered per instance. One engine per page (`window.gm`), many instances, one runs at a time.
- `src/components/Session.astro` + `Block.astro` — sticky session runner: per-block countdown, auto-advance with three beeps, pushes the block's BPM/subdivision into that block's metronome, highlights and scrolls to the block.
- `src/lib/fretboard.js` — added `marks` (× on silent strings), `zones`, `dim`, and `chordBoxSVG` (vertical chord box with finger numbers, x/o, base fret).
- `src/data/roadmap.json` — 20 nodes with baseline/now/goal + gates, 5 phases. SOURCE OF TRUTH for ratings. Rendered at `/progress/`; phase and days-left computed at build in Asia/Kuala_Lumpur.
- `src/content/log/` — content collection, one md per session. `/log/` renders newest first.
- Pages: `/drills/`, `/drills/week-01/`, `/metronome/`, `/log/`, `/progress/`; home rewritten; nav in Layout.
- Verified with headless Chromium at 390×844: no horizontal scroll on any page, no console errors, metronome ticks on the audio clock, session runner walks all four blocks and stops the click on the song block.

Rules unchanged: lesson goes live only when Carl can play it; public site never names employer, clients, WrenchIt, freelance platforms.

Content loop: Carl reports a session in one line → a log entry is written → ratings bump when a gate passes → commit + push → Vercel rebuilds. Weekly: a new `src/pages/drills/week-NN.astro` and a row in `src/pages/drills/index.astro`.

## Build status (2026-09-21, second pass) — course app shell

Carl's reference: a pickupmusic-style course UI (sidebar of days with status, exercise stepper, media area). Rebuilt the site as that app; the light Japandi layout is gone.

- `src/data/course.json` — the mock database. pathway → phases (5) → days → exercises. Statuses `done | current | todo | locked`. Only Phase 1 week 1 (days 1–5) has content; phases 2–5 are locked with `plannedDays` and `days: []`, written after each gate. **This file is the SOURCE OF TRUTH for day/exercise status**; `roadmap.json` stays the source for the 20 skill ratings.
- `src/lib/course.js` — read helpers (progress %, current day, neighbours, hrefs).
- `src/layouts/App.astro` — dark shell: icon rail · sidebar · main. Under 900px: rail hidden, top bar with "☰ Days" opens the sidebar as a drawer.
- `src/components/Sidebar.astro` (phases as `<details>`, days with status icon or progress ring), `Stepper.astro` (Lesson › Exercise 1 › …, auto-scrolls to the active tab), `StatusIcon.astro`, `ExerciseTimer.astro` (countdown, starts the page's metronome, three beeps, lights "Next").
- `src/exercises/*.astro` — one component per exercise type (`w1-lesson`, `crawl`, `mute`, `pick` with a `string` prop, `song`, `record`, `gate`). course.json names the component per exercise.
- Routes: `/` pathway overview · `/day/` → current day · `/day/N/` lesson tab · `/day/N/<ex>/` exercise · `/progress/` · `/log/` · `/metronome/` · `/library/` (lessons 1–3 + hexatonic reference). `/drills/*` redirect to the pathway.
- Fretboard dot labels are now always dark ink (`#1a120c`) so they read on both themes.
- Verified headless at 1440×900 and 390×844: no horizontal scroll, no console errors, drawer opens and navigates, timer + metronome start together on an exercise page, song page timer beeps without a metronome, redirect works.

Not built: per-exercise "mark done" on the phone. Status changes only through course.json, written from Carl's log line, so the log and the status never disagree.
