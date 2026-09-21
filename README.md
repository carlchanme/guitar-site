# Back seat to lead

A rhythm guitarist's 14-week practice course, learned in public. Public landing page at `/`, the course app under `/path/`, `/day/N/`, `/progress/`, `/log/`.

- Content: `src/data/course.json` (pathway, days, exercises, statuses), `src/data/roadmap.json` (20 skills rated 0–4), `src/content/log/` (one markdown file per session), `src/exercises/*.astro` (exercise bodies).
- Visual system: `DESIGN.md` is the source of truth. `AGENTS.md` has the working principles.
- Diagrams: `src/lib/fretboard.js` renders every fretboard and chord box as SVG from data.

```sh
npm run dev          # local
npm run build        # static build to dist/
npm test             # design drift: static + component (Vitest)
npm run test:visual  # Playwright baselines at 1440 and 390
```

Rules: a lesson goes live only after the author can play it. No testimonials or counts that aren't real.
