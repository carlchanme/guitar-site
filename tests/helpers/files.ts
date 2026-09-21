// Shared file walker for the design-drift tests. Source only; never dist.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

export const ROOT = new URL("../../", import.meta.url).pathname;
const SRC = join(ROOT, "src");
const EXT = /\.(astro|css|js|ts)$/;

export function sourceFiles(): string[] {
  const out: string[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const p = join(dir, name);
      if (statSync(p).isDirectory()) walk(p);
      else if (EXT.test(name)) out.push(p);
    }
  };
  walk(SRC);
  return out.sort();
}

export type Hit = { file: string; line: number; text: string };

// Every line in every source file that matches `re`, with file:line for the message.
export function grep(re: RegExp, files = sourceFiles(), opts: { skipLine?: (l: string, file: string) => boolean } = {}): Hit[] {
  const hits: Hit[] = [];
  for (const f of files) {
    const rel = relative(ROOT, f);
    readFileSync(f, "utf8").split("\n").forEach((text, i) => {
      if (opts.skipLine?.(text, rel)) return;
      if (re.test(text)) hits.push({ file: rel, line: i + 1, text: text.trim() });
    });
  }
  return hits;
}

export function fmt(hits: Hit[]): string {
  return hits.map((h) => `  ${h.file}:${h.line}  ${h.text.slice(0, 110)}`).join("\n");
}

// The <style> blocks of an .astro file (or the whole file for .css), as one string.
export function styleOf(file: string): string {
  const s = readFileSync(join(ROOT, file), "utf8");
  if (file.endsWith(".css")) return s;
  return [...s.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join("\n");
}

export function read(file: string): string {
  return readFileSync(join(ROOT, file), "utf8");
}
