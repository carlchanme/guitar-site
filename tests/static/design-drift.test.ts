// Layer 1: static analysis against DESIGN.md. Fast, runs on every commit.
// Each test names the DESIGN.md rule it enforces. Subjective rules are not here.
import { describe, expect, it } from "vitest";
import { fmt, grep, read, sourceFiles, styleOf } from "../helpers/files";

const isComment = (l: string) => /^\s*(\/\/|\/\*|\*)/.test(l);

describe("DESIGN.md → Colors: OKLCH only", () => {
  it("no hex colour literals in source", () => {
    const hits = grep(/#[0-9a-fA-F]{3,8}\b/, sourceFiles(), {
      // ids and anchors (#main, #side) are not colours; sharps in note names (F#, C#) are not colours
      skipLine: (l) => /(href|id|querySelector|getElementById)\s*[=(]/.test(l) && !/[:=]\s*["']?#[0-9a-f]{3,8}\b/i.test(l),
    });
    expect(hits, `hex colours found (DESIGN.md → Colors: OKLCH only)\n${fmt(hits)}`).toEqual([]);
  });
  it("no rgb()/rgba()/hsl()/hsla() in source", () => {
    const hits = grep(/\b(rgba?|hsla?)\(/);
    expect(hits, `non-OKLCH colour functions (DESIGN.md → Colors)\n${fmt(hits)}`).toEqual([]);
  });
  it("theme-color meta is OKLCH and matches --bg", () => {
    const head = read("src/components/Head.astro");
    const bg = /--bg:\s*(oklch\([^)]*\))/.exec(read("src/styles/global.css"))?.[1];
    expect(head).toContain(`<meta name="theme-color" content="${bg}" />`);
  });
  it("every :root token in global.css is declared in DESIGN.md front matter", () => {
    const css = read("src/styles/global.css");
    const root = /:root\{([\s\S]*?)\n\}/.exec(css)![1];
    const tokens = [...root.matchAll(/--([a-z0-9-]+)\s*:/g)].map((m) => m[1]);
    const design = read("DESIGN.md");
    const fm = design.slice(0, design.indexOf("\n---", 3));
    const colourish = tokens.filter((t) => !/^(t|lh|track)-/.test(t) && !["display", "text", "mono", "radius"].includes(t));
    const missing = colourish.filter((t) => !new RegExp(`^\\s{2}${t}:`, "m").test(fm));
    expect(missing, "tokens in :root but not in DESIGN.md colors (add them to DESIGN.md first)").toEqual([]);
    expect(design).toMatch(/rounded:\n\s+base: 2px/);
  });
});

describe("DESIGN.md → Colors: the accent budget", () => {
  // Files allowed to reference the accent: status marks, the one primary action, fretboard root dot.
  const allowed = new Set([
    "src/styles/global.css",            // --accent token + --root alias
    "src/components/Action.astro",      // the one primary variant
    "src/components/StatusIcon.astro",  // status marks
    "src/components/Stepper.astro",     // done mark
    "src/components/Sidebar.astro",     // progress ring on the current day
    "src/pages/progress.astro",         // "now" fill is a status mark
    "src/lib/fretboard.js",             // root dot via --root
    "src/pages/reference/index.astro",  // legend for the root dot
  ]);
  it("only status marks and the one primary action reference --accent", () => {
    const hits = grep(/var\(--(accent|root)\)/).filter((h) => !allowed.has(h.file));
    expect(hits, `accent used outside the budget (DESIGN.md → Colors: accent)\n${fmt(hits)}`).toEqual([]);
  });
  it("global.css defines the primary look at most once and it is the only accent background there", () => {
    const css = read("src/styles/global.css");
    const accentBg = css.match(/background:\s*var\(--accent\)/g) ?? [];
    expect(accentBg.length, "accent background in global.css").toBeLessThanOrEqual(1);
  });
  it("no accent on hover", () => {
    const hits = grep(/:hover[^{]*\{[^}]*--accent/);
    expect(hits, fmt(hits)).toEqual([]);
  });
});

describe("DESIGN.md → Typography", () => {
  const banned = ["Inter", "Geist", "Poppins", "Montserrat", "Roboto", "DM Sans", "Plus Jakarta", "Open Sans", "Nunito", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI"];
  it("no banned font names anywhere in source", () => {
    const re = new RegExp(`(?<![A-Za-z])(${banned.join("|")})(?![A-Za-z])`);
    const hits = grep(re);
    expect(hits, `banned fonts (DESIGN.md → Typography)\n${fmt(hits)}`).toEqual([]);
  });
  it("font-family outside global.css only references the face tokens", () => {
    const hits = grep(/font-family\s*:/, sourceFiles().filter((f) => !f.endsWith("global.css"))).filter((h) => !/var\(--(display|text|mono)\)/.test(h.text));
    expect(hits, `raw font-family (use var(--display|--text|--mono))\n${fmt(hits)}`).toEqual([]);
  });
  it("the three faces are loaded with display=swap and a preconnect", () => {
    const head = read("src/components/Head.astro");
    expect(head).toContain('rel="preconnect" href="https://fonts.gstatic.com"');
    expect(head).toMatch(/family=Fraunces:[^"]*SOFT,WONK@[^"]*display=swap/);
    expect(head).toMatch(/family=Schibsted\+Grotesk/);
    expect(head).toMatch(/family=JetBrains\+Mono/);
  });
  it("Fraunces always carries SOFT 50, WONK 0", () => {
    const hits = grep(/font-family:\s*var\(--display\)/).filter((h) => !/"SOFT" 50,\s*"WONK" 0/.test(h.text));
    expect(hits, `display face without font-variation-settings\n${fmt(hits)}`).toEqual([]);
  });
  it("no italic emphasis, no justified or centered body copy", () => {
    const italic = grep(/font-style\s*:\s*italic/);
    expect(italic, fmt(italic)).toEqual([]);
    const justify = grep(/text-align\s*:\s*justify/);
    expect(justify, fmt(justify)).toEqual([]);
    const centeredText = grep(/^\s*(p|\.[a-z-]+\s+p|body)\s*\{[^}]*text-align\s*:\s*center/);
    expect(centeredText, `centered paragraphs\n${fmt(centeredText)}`).toEqual([]);
  });
  it("pixel type sizes come from the scale, never adjacent steps ad hoc", () => {
    // Inline px sizes are allowed only for the two tiny labels (11px) and the SVG renderer's internal text.
    const hits = grep(/font-size\s*:\s*(\d+)px/, sourceFiles().filter((f) => !/global\.css|fretboard\.js/.test(f)))
      .filter((h) => !/font-size\s*:\s*11px/.test(h.text));
    expect(hits, `raw px font-size (use --t-* tokens)\n${fmt(hits)}`).toEqual([]);
  });
});

describe("DESIGN.md → Shapes: one radius", () => {
  it("border-radius is var(--radius), 50% (status marks, beat dots) or 0", () => {
    const hits = grep(/border-radius\s*:/).filter((h) => !/border-radius\s*:\s*(var\(--radius\)|50%|0)\s*[;}]/.test(h.text));
    expect(hits, `radius outside the one token (DESIGN.md → Shapes)\n${fmt(hits)}`).toEqual([]);
  });
  it("--radius is 2px and there is no radius ladder", () => {
    expect(read("src/styles/global.css")).toMatch(/--radius:\s*2px;/);
    const ladder = grep(/--radius-(sm|md|lg|xl)/);
    expect(ladder, fmt(ladder)).toEqual([]);
  });
});

describe("DESIGN.md → Elevation & Depth: flat", () => {
  it("no box-shadow anywhere (the scrim is its own element)", () => {
    const hits = grep(/box-shadow\s*:/);
    expect(hits, fmt(hits)).toEqual([]);
  });
  it("no glassmorphism (backdrop-filter)", () => {
    const hits = grep(/backdrop-filter/);
    expect(hits, fmt(hits)).toEqual([]);
  });
  it("gradients only as the hero legibility mask", () => {
    const hits = grep(/(linear|radial|conic)-gradient\(/).filter((h) => !(h.file === "src/pages/index.astro" && /\.hero h1::before/.test(h.text)));
    expect(hits, `gradients outside the hero mask (DESIGN.md → Do's and Don'ts)\n${fmt(hits)}`).toEqual([]);
  });
  it("the hero mask is the page colour at partial opacity, no hard edge", () => {
    const mask = grep(/\.hero h1::before\{/)[0]?.text ?? "";
    expect(mask).toMatch(/oklch\(0\.17 0\.006 60 \/ 0\.\d+\)/);
    expect(mask).toMatch(/oklch\(0\.17 0\.006 60 \/ 0\)/);
  });
});

describe("DESIGN.md → Motion", () => {
  it("no scale transforms on hover, no hover lift", () => {
    const scale = grep(/transform\s*:[^;]*\bscale\(/);
    expect(scale, `transform: scale( (DESIGN.md → Motion)\n${fmt(scale)}`).toEqual([]);
    const hoverLift = grep(/:hover[^{]*\{[^}]*(transform|box-shadow|filter)\s*:/);
    expect(hoverLift, fmt(hoverLift)).toEqual([]);
  });
  it("never transition: all", () => {
    const hits = grep(/transition\s*:\s*all\b/);
    expect(hits, fmt(hits)).toEqual([]);
  });
  it("honours prefers-reduced-motion", () => {
    expect(read("src/styles/global.css")).toMatch(/@media \(prefers-reduced-motion:\s*reduce\)/);
  });
});

describe("DESIGN.md → Do's and Don'ts: labels and behaviour", () => {
  it("no symbols or emoji as UI labels", () => {
    const hits = grep(/[☰⏱♩♪♫]|[\u{1F300}-\u{1FAFF}]|[\u{2600}-\u{26FF}]/u);
    expect(hits, `symbol/emoji in source\n${fmt(hits)}`).toEqual([]);
  });
  it("no chat bubble, cookie banner, or first-load modal", () => {
    const hits = grep(/cookie|chat-?bubble|intercom|crisp|<dialog|showModal\(/i, sourceFiles(), { skipLine: isComment });
    expect(hits, fmt(hits)).toEqual([]);
  });
  it("no stats row of tiles on /path/", () => {
    const path = read("src/pages/path/index.astro");
    expect(path).not.toMatch(/class="stat"/);
    expect(path).not.toMatch(/grid-template-columns:\s*repeat\(3/);
    expect(path).toMatch(/class="progress mono"/);
  });
  it("landing hero: one CTA, no stats row, no trusted-by, no testimonial from anyone else", () => {
    const home = read("src/pages/index.astro");
    const hero = /<section class="hero[\s\S]*?<\/section>/.exec(home)![0];
    expect((hero.match(/class="cta"/g) ?? []).length, "exactly one CTA in the hero").toBe(1);
    expect(hero).not.toMatch(/Learn more/i);
    expect(home).not.toMatch(/trusted by|★|star rating|\breviews?\b|\bstudents?\b|\bsubscribers?\b/i);
  });
  it("no employer, product, client, or platform names (compliance)", () => {
    const hits = grep(/wrenchit|upwork|fiverr|linkedin|fintech/i);
    expect(hits, fmt(hits)).toEqual([]);
  });
  it("wordmark is type, not an image or gradient", () => {
    const app = read("src/layouts/App.astro");
    expect(app).toMatch(/class="mark"[^>]*>Back seat to lead</);
    expect(styleOf("src/layouts/App.astro")).toMatch(/\.rail \.mark\{[^}]*font-family:var\(--display\)/);
  });
  it("the product stays dark", () => {
    expect(read("src/styles/global.css")).toMatch(/color-scheme:\s*dark/);
    const light = grep(/prefers-color-scheme:\s*light/);
    expect(light, fmt(light)).toEqual([]);
  });
});
