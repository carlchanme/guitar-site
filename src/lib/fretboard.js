// Core fretboard SVG renderer. Shared by lesson-shape diagrams and the
// full-neck reference page. Low E is string index 0, high e is index 5 —
// matches how a player reads the neck (thick string closest to them).
// The board is drawn as an instrument, not a grid: a nut at fret 0, strings
// that taper toward it, gauge from 1.2 to 3.4 with a winding line on the two
// wound strings, inlays with a lit top edge, and a 3% paper grain over the
// wood. DESIGN.md → Components → Fretboard diagrams.

export const NOTES = ["C", "C#", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
export const STANDARD_TUNING = [4, 9, 2, 7, 11, 4]; // low E, A, D, G, B, high e
export const STRING_NAMES = ["E", "A", "D", "G", "B", "e"];

function escapeAttr(str) {
  return String(str).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

// two decimals is plenty for a viewBox unit; keeps the markup readable
const n = (v) => Math.round(v * 100) / 100;

// one grain filter per SVG; the id must be unique on a page with several boards
let grainSeq = 0;

// dots: [{ string: 0-5 (0=low E), fret, root?: bool, label: string, dim?: bool }]
// marks: [{ string, fret?, kind: "x" }] — an × on a string, at a fret or at the nut
//   side when fret is omitted. Used to show which strings must stay silent.
// zones: [{ fretFrom, fretTo, label }] — a translucent band across all strings,
//   e.g. where the palm heel rests.
// playOrder: wrap every dot with a numeric label in <g data-order="N"> (N is
//   its position in the sequence) and mark the <svg> data-player, so the page's
//   DiagramPlayer can step through it. Off by default: output is unchanged.
// playBeats: beats each dot holds when played (the four-note line holds two).
export function fretboardSVG({
  fretStart = 0,
  fretEnd = 12,
  tuning = STANDARD_TUNING,
  stringNames = STRING_NAMES,
  dots = [],
  marks = [],
  zones = [],
  fretMarkers = true,
  playOrder = false,
  playBeats = 1,
  ariaLabel = "fretboard diagram",
}) {
  const nFrets = fretEnd - fretStart + 1;
  const left = 56, right = 20, top = 22, bottom = 30;
  const fw = 64, sh = 42;
  const W = left + right + fw * nFrets;
  const H = top + bottom + sh * 5;
  const nut = fretStart === 0;
  const xL = left, xR = W - right;
  // taper: string spacing 6% narrower at the left edge than the right, so the
  // strings converge toward the nut. Everything on a string reads its y here.
  const cy = top + sh * 2.5;
  const sp = (x) => sh * (0.97 + 0.06 * ((x - xL) / (xR - xL)));
  const sy = (st, x) => n(cy + (2.5 - st) * sp(x));
  const grain = `grain-${++grainSeq}`;
  const player = playOrder ? ` data-player${playBeats !== 1 ? ` data-beats="${playBeats}"` : ""}` : "";

  let s = `<svg class="board" viewBox="0 0 ${W} ${H}" role="img" aria-label="${escapeAttr(ariaLabel)}"${player}>`;
  s += `<defs><filter id="${grain}" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="1" stitchTiles="stitch"/></filter></defs>`;
  s += `<rect x="${left}" y="${top - 10}" width="${W - left - right}" height="${H - top - bottom + 20}" fill="var(--board)" rx="4"/>`;
  // paper grain over the wood, 3% and no more (the one noise exception in DESIGN.md)
  s += `<rect x="${left}" y="${top - 10}" width="${W - left - right}" height="${H - top - bottom + 20}" fill="var(--board)" rx="4" filter="url(#${grain})" opacity="0.03"/>`;

  // fret wires; at fret 0 the first wire is the nut
  for (let i = nut ? 1 : 0; i <= nFrets; i++) {
    const x = left + i * fw;
    s += `<line x1="${x}" y1="${top - 10}" x2="${x}" y2="${H - bottom + 10}" stroke="var(--fret)" stroke-width="3"/>`;
  }

  // fret markers + numbers, one per column. Markers are hump-block inlays:
  // a small ivory rounded rectangle with a lit top edge, not a dot.
  if (fretMarkers) {
    const hb = (cx, cy) => `<rect x="${cx - 9}" y="${cy - 5}" width="18" height="10" rx="3" fill="var(--tone)" opacity="0.55"/>` +
      `<rect x="${cx - 6}" y="${cy - 5}" width="12" height="1" fill="var(--string)" opacity="0.7"/>`;
    for (let i = 0; i < nFrets; i++) {
      const f = fretStart + i;
      const cx = left + i * fw + fw / 2;
      if ([3, 5, 7, 9].includes(f)) {
        s += hb(cx, sy(2.5, cx));
      }
      if (f === 12) {
        s += hb(cx, sy(3.5, cx)) + hb(cx, sy(1.5, cx));
      }
      s += `<text x="${cx}" y="${H - 8}" font-size="13" fill="var(--ink-faint)" text-anchor="middle">${f}</text>`;
    }
  }

  // zones, under the strings
  for (const z of zones) {
    const x = left + (z.fretFrom - fretStart) * fw;
    const w = (z.fretTo - z.fretFrom + 1) * fw;
    s += `<rect x="${x}" y="${top - 10}" width="${w}" height="${H - top - bottom + 20}" fill="var(--root)" opacity="0.22"/>`;
    if (z.label) s += `<text x="${x + w / 2}" y="${top + 2}" font-size="12" fill="var(--string)" text-anchor="middle">${escapeAttr(z.label)}</text>`;
  }

  // strings, low E at bottom, thickest: 3.4 down to 1.2 on the high e. The
  // two wound strings carry a thinner darker line on top to suggest winding.
  for (let st = 0; st < 6; st++) {
    const width = n(1.2 + (5 - st) * 0.44);
    const y1 = sy(st, left - 6), y2 = sy(st, xR);
    s += `<line x1="${left - 6}" y1="${y1}" x2="${xR}" y2="${y2}" stroke="var(--string)" stroke-width="${width}"/>`;
    if (st < 2) s += `<line x1="${left - 6}" y1="${y1}" x2="${xR}" y2="${y2}" stroke="var(--board)" stroke-width="${n(width * 0.35)}" opacity="0.4"/>`;
    s += `<text x="${nut ? left - 18 : left - 14}" y="${sy(st, left) + 5}" font-size="14" fill="var(--ink-faint)" text-anchor="end">${stringNames[st]}</text>`;
  }

  // the nut: a 6-unit ivory bar over the strings where the first wire would be
  if (nut) s += `<rect x="${left - 3}" y="${top - 10}" width="6" height="${H - top - bottom + 20}" fill="var(--tone)"/>`;

  // dots
  let order = 0;
  for (const d of dots) {
    const cx = left + (d.fret - fretStart) * fw + fw / 2;
    const cy = sy(d.string, cx);
    const fill = d.root ? "var(--root)" : "var(--tone)";
    const textFill = "var(--accent-ink)";
    const op = d.dim ? ' opacity="0.45"' : "";
    const seq = playOrder && /^\d+$/.test(String(d.label ?? "")) ? ++order : 0;
    if (seq) s += `<g data-order="${seq}">`;
    s += `<circle cx="${cx}" cy="${cy}" r="15" fill="${fill}" stroke="var(--accent-ink)" stroke-width="1"${op}/>`;
    s += `<text x="${cx}" y="${cy + 5}" font-size="14" font-weight="700" text-anchor="middle" fill="${textFill}"${op}>${d.label ?? ""}</text>`;
    if (seq) s += `</g>`;
  }

  // mute marks
  for (const m of marks) {
    const cx = m.fret == null ? left + 12 : left + (m.fret - fretStart) * fw + fw / 2;
    const cy = sy(m.string, cx);
    s += `<text x="${cx}" y="${cy + 6}" font-size="18" font-weight="700" text-anchor="middle" fill="var(--string)" stroke="var(--board)" stroke-width="3" paint-order="stroke">×</text>`;
  }

  s += `</svg>`;
  return s;
}
// Full-neck scale dots (note-letter labels) for the reference page.
export function scaleDots(rootPc, intervals, tuning = STANDARD_TUNING, fretStart = 0, fretEnd = 12) {
  const set = new Set(intervals.map((i) => (rootPc + i) % 12));
  const dots = [];
  for (let st = 0; st < 6; st++) {
    for (let f = fretStart; f <= fretEnd; f++) {
      const pc = (tuning[st] + f) % 12;
      if (set.has(pc)) {
        dots.push({ string: st, fret: f, root: pc === rootPc, label: NOTES[pc] });
      }
    }
  }
  return dots;
}

// Vertical chord box, the shape every chord chart uses. Strings left→right
// low E → high e, frets top→bottom. fingers: 6 entries, one per string:
//   "x" = don't play, 0 = open, {fret, finger, root?} = press.
export function chordBoxSVG({ name, fingers, baseFret = 1, ariaLabel }) {
  const nFrets = 4;
  const sw = 34, fh = 40, left = 24, top = 44, right = 24, bottom = 14;
  const W = left + right + sw * 5;
  const H = top + bottom + fh * nFrets;
  const label = ariaLabel || `${name} chord`;
  let s = `<svg class="chord" viewBox="0 0 ${W} ${H}" role="img" aria-label="${escapeAttr(label)}">`;
  s += `<text x="${W / 2}" y="16" font-size="16" font-weight="600" text-anchor="middle" fill="var(--ink)">${escapeAttr(name)}</text>`;
  // nut or base-fret label
  if (baseFret === 1) {
    s += `<rect x="${left - 1}" y="${top - 4}" width="${sw * 5 + 2}" height="5" fill="var(--ink)"/>`;
  } else {
    s += `<text x="${left - 8}" y="${top + fh / 2 + 5}" font-size="13" text-anchor="end" fill="var(--ink-faint)">${baseFret}fr</text>`;
  }
  for (let i = 0; i <= nFrets; i++) {
    const y = top + i * fh;
    s += `<line x1="${left}" y1="${y}" x2="${left + sw * 5}" y2="${y}" stroke="var(--ink)" stroke-width="1.2"/>`;
  }
  for (let st = 0; st < 6; st++) {
    const x = left + st * sw;
    s += `<line x1="${x}" y1="${top}" x2="${x}" y2="${top + fh * nFrets}" stroke="var(--ink)" stroke-width="${1.6 - st * 0.15}"/>`;
    const f = fingers[st];
    if (f === "x") {
      s += `<text x="${x}" y="${top - 10}" font-size="15" text-anchor="middle" fill="var(--ink-faint)">×</text>`;
    } else if (f === 0) {
      s += `<circle cx="${x}" cy="${top - 14}" r="5" fill="none" stroke="var(--ink)" stroke-width="1.5"/>`;
    } else if (f && typeof f === "object") {
      const cy = top + (f.fret - baseFret) * fh + fh / 2;
      const fill = f.root ? "var(--root)" : "var(--ink)";
      s += `<circle cx="${x}" cy="${cy}" r="12" fill="${fill}"/>`;
      if (f.finger != null) s += `<text x="${x}" y="${cy + 5}" font-size="13" font-weight="700" text-anchor="middle" fill="${f.root ? "var(--accent-ink)" : "var(--bg)"}">${f.finger}</text>`;
    }
  }
  s += `</svg>`;
  return s;
}
