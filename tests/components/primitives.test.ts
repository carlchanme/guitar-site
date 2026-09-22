// Layer 2: render each primitive with the Astro Container API and assert the
// states DESIGN.md allows exist and the ones it forbids do not.
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it, beforeAll } from "vitest";
import { readdirSync } from "node:fs";
import { ROOT, read, styleOf } from "../helpers/files";

import Card from "../../src/components/Card.astro";
import Field from "../../src/components/Field.astro";
import Action from "../../src/components/Action.astro";
import Row from "../../src/components/Row.astro";
import SpecTable from "../../src/components/SpecTable.astro";
import StatusIcon from "../../src/components/StatusIcon.astro";

let c: AstroContainer;
beforeAll(async () => { c = await AstroContainer.create(); });
const render = (C: any, props: any = {}, slots: any = {}) => c.renderToString(C, { props, slots });

const componentFiles = () => readdirSync(`${ROOT}src/components`).filter((f) => f.endsWith(".astro")).map((f) => `src/components/${f}`);

describe("Card", () => {
  const css = () => styleOf("src/components/Card.astro");
  // 2026-09-22: surfaces are borderless; hairlines separate, never enclose; radius stays 2px.
  // The panel sits on --surface. The old assertion required a 1px --line border and --card.
  it("renders slot content in a borderless surface with one radius and one padding", async () => {
    const html = await render(Card, {}, { default: "<p>hi</p>" });
    expect(html).toContain("<p>hi</p>");
    expect(html).toMatch(/class="card[^"]*"/);
    expect(css()).toMatch(/border-radius:\s*var\(--radius\)/);
    expect((css().match(/border-radius/g) ?? []).length).toBe(1);
    expect((css().match(/padding\s*:/g) ?? []).length).toBe(1);
    expect(css(), "a surface has no border; hairlines separate, never enclose").not.toMatch(/border(-top|-right|-bottom|-left)?\s*:/);
    expect(css()).toMatch(/background:\s*var\(--surface\)/);
  });
  it("refuses props that would override radius, padding or add a shadow", async () => {
    const html = await render(Card, { style: "box-shadow:0 4px 12px oklch(0 0 0/.5);border-radius:12px;padding:40px", class: "shadow-lg rounded-xl" }, { default: "x" });
    expect(html).not.toMatch(/box-shadow|border-radius:12px|padding:40px|shadow-lg|rounded-xl/);
  });
  it("has no shadow, no elevated variant in source", () => {
    expect(css()).not.toMatch(/box-shadow|backdrop-filter|elevat|raised|subtle/);
    expect(read("src/components/Card.astro")).not.toMatch(/variant|elevation/);
  });
});

describe("Field", () => {
  const css = () => styleOf("src/components/Field.astro");
  it("renders a label as a sibling above the input, linked by for/id, never as placeholder", async () => {
    const html = await render(Field, { id: "key", label: "Key", name: "key" });
    const label = html.indexOf("<label"), input = html.search(/<(input|select)/);
    expect(label).toBeGreaterThan(-1);
    expect(input).toBeGreaterThan(label);
    expect(html).toMatch(/<label[^>]*for="key"/);
    expect(html).toMatch(/<(input|select)[^>]*id="key"/);
    expect(html).not.toMatch(/placeholder=/);
  });
  it("is at least 44px tall with a 1px --line border, 2px --ink on focus, never accent", () => {
    expect(css()).toMatch(/min-height:\s*44px/);
    expect(css()).toMatch(/border:\s*1px solid var\(--line\)/);
    const focus = /:focus(-visible)?\s*\{([^}]*)\}/.exec(css());
    expect(focus, "a :focus rule").not.toBeNull();
    expect(focus![2]).toMatch(/border-color:\s*var\(--ink\)/);
    expect(focus![2]).not.toMatch(/--accent/);
    expect(css()).not.toMatch(/--accent/);
  });
  it("renders a select when options are given", async () => {
    const html = await render(Field, { id: "k", label: "Key", name: "k", options: [["0", "C"], ["1", "C#"]] });
    expect(html).toMatch(/<select[^>]*id="k"/);
    expect((html.match(/<option/g) ?? []).length).toBe(2);
  });
});

describe("Action", () => {
  const css = () => styleOf("src/components/Action.astro");
  it("primary and secondary variants render; primary is the only accent background", async () => {
    const p = await render(Action, { variant: "primary" }, { default: "Start" });
    const s = await render(Action, {}, { default: "Back" });
    expect(p).toMatch(/<button[^>]*class="action primary"/);
    expect(s).toMatch(/<button[^>]*class="action"/);
    expect(css()).toMatch(/\.primary\{[^}]*background:\s*var\(--accent\)/);
    expect((css().match(/var\(--accent\)/g) ?? []).length, "accent appears once per property set").toBeLessThanOrEqual(3);
  });
  it("renders a link when href is given", async () => {
    const a = await render(Action, { href: "/day/1/", variant: "primary" }, { default: "Start day 1" });
    expect(a).toMatch(/<a[^>]*href="\/day\/1\/"[^>]*class="action primary"/);
    expect(a).not.toMatch(/<button/);
  });
  it("disabled state exists, is documented, and is not a colour change to accent", async () => {
    const d = await render(Action, { variant: "primary", disabled: true }, { default: "Start" });
    expect(d).toMatch(/<button[^>]*disabled/);
    expect(d).toMatch(/aria-disabled="true"/);
    expect(css()).toMatch(/\[disabled\]|:disabled/);
    expect(read("DESIGN.md")).toMatch(/[Dd]isabled/);
  });
  it("exactly one component defines the primary variant", () => {
    const defs = componentFiles().filter((f) => /\.primary\s*\{/.test(styleOf(f)));
    expect(defs, "primary variant defined in").toEqual(["src/components/Action.astro"]);
    const dupes = componentFiles().filter((f) => /(Primary|Button|Btn|CTA|Cta)[A-Za-z]*\.astro$/.test(f));
    expect(dupes, "near-duplicate action components").toEqual([]);
    expect(read("src/styles/global.css")).not.toMatch(/\.primary/);
  });
  it("only one primary is rendered per screen: primary never appears twice in a component's markup", () => {
    for (const f of componentFiles()) {
      const markup = read(f).replace(/<style[\s\S]*?<\/style>/g, "").replace(/<script[\s\S]*?<\/script>/g, "");
      expect((markup.match(/variant="primary"|class="[^"]*\bprimary\b/g) ?? []).length, f).toBeLessThanOrEqual(1);
    }
  });
  it("hover is an opacity shift; never scale, translate or shadow", () => {
    const hover = [...css().matchAll(/:hover[^{]*\{([^}]*)\}/g)].map((m) => m[1]).join(";");
    expect(hover).toMatch(/opacity/);
    expect(hover).not.toMatch(/transform|box-shadow|translate|scale/);
    expect(css()).toMatch(/transition:\s*opacity 150ms/);
  });
});

describe("Action (link)", () => {
  const css = () => styleOf("src/components/Action.astro");
  it("text link: no underline at rest, underline on hover and focus-visible only", async () => {
    const a = await render(Action, { href: "/log/", variant: "link" }, { default: "Log" });
    expect(a).toMatch(/<a[^>]*class="action link"/);
    const rest = /\.link\{([^}]*)\}/.exec(css())?.[1] ?? "";
    expect(rest).toMatch(/text-decoration:\s*none/);
    const reveal = /\.link:hover,\s*\.link:focus-visible\{([^}]*)\}/.exec(css())?.[1] ?? "";
    expect(reveal).toMatch(/text-decoration:\s*underline/);
    expect(reveal).not.toMatch(/transform|box-shadow|--accent/);
  });
});

describe("Row", () => {
  const css = () => styleOf("src/components/Row.astro");
  it("renders title, mono metadata on the right, one hairline", async () => {
    const html = await render(Row, { href: "/day/1/crawl/", meta: "5 min · 60 BPM" }, { default: "Exercise 1 · Chromatic crawl", leading: "" });
    expect(html).toMatch(/<a[^>]*href="\/day\/1\/crawl\/"/);
    expect(html).toMatch(/class="meta mono"/);
    expect(html).toContain("5 min · 60 BPM");
    expect(css()).toMatch(/\.meta\{[^}]*font-family:\s*var\(--mono\)/);
    expect(css()).toMatch(/border-(top|bottom):\s*1px solid var\(--line\)/);
    expect((css().match(/border-(top|bottom)\s*:/g) ?? []).length, "one hairline").toBe(1);
  });
  it("dense vertical padding, no striped variant, no card background", () => {
    const pad = /\.row\{[^}]*padding:\s*(\d+)px/.exec(css());
    expect(pad, "row padding").not.toBeNull();
    expect(Number(pad![1])).toBeLessThanOrEqual(16);
    expect(css()).not.toMatch(/nth-child|striped|zebra|background:\s*var\(--card\)/);
    expect(css()).not.toMatch(/box-shadow|border-radius/);
  });
});

describe("SpecTable", () => {
  it("two-column dl, hairline dividers, mono, no icons", async () => {
    const html = await render(SpecTable, { rows: [["Phases", "5"], ["Days", "70"]] });
    expect(html).toMatch(/<dl class="spec mono"/);
    expect((html.match(/<dt[\s>]/g) ?? []).length).toBe(2);
    expect((html.match(/<dd[\s>]/g) ?? []).length).toBe(2);
    expect(html).not.toMatch(/<svg|<img/);
    const css = styleOf("src/components/SpecTable.astro");
    expect(css).toMatch(/grid-template-columns:\s*1fr [\d.]+fr/);
    expect(css).toMatch(/border-top:\s*1px solid var\(--line\)/);
    expect(css).toMatch(/font-family:\s*var\(--mono\)/);
  });
});

describe("StatusIcon", () => {
  it("done and current use the accent; todo uses --line; locked uses --ink-faint; all round", async () => {
    const done = await render(StatusIcon, { status: "done" });
    const cur = await render(StatusIcon, { status: "current" });
    const todo = await render(StatusIcon, { status: "todo" });
    const locked = await render(StatusIcon, { status: "locked" });
    expect(done).toMatch(/fill="var\(--accent\)"/);
    expect(done).toMatch(/stroke="var\(--accent-ink\)"/);
    expect(cur).toMatch(/stroke="var\(--accent\)"/);
    expect(todo).toMatch(/stroke="var\(--line\)"/);
    expect(todo).not.toMatch(/--accent/);
    expect(locked).toMatch(/var\(--ink-faint\)/);
    expect(locked).not.toMatch(/--accent/);
    for (const h of [done, cur, todo]) expect(h).toMatch(/<circle/);
  });
});
