// Read helpers over course.json, the file that stands in for a database.
// Statuses: done | current | todo | locked. Nothing here writes.
import course from "../data/course.json";

export const pathway = course.pathway;
export const phases = course.phases;

export const allDays = phases.flatMap((p) => p.days.map((d) => ({ ...d, phase: p })));

export function getDay(n) {
  return allDays.find((d) => d.day === Number(n));
}

export function dayHref(d) { return `/day/${d.day}/`; }
export function exHref(d, ex) { return ex.id === "lesson" ? dayHref(d) : `/day/${d.day}/${ex.id}/`; }

export function neighbours(d, ex) {
  const list = d.exercises;
  const i = list.findIndex((e) => e.id === ex.id);
  return { prev: list[i - 1] ?? null, next: list[i + 1] ?? null, index: i, count: list.length };
}

export function dayProgress(d) {
  const ex = d.exercises.filter((e) => e.kind !== "lesson");
  const done = ex.filter((e) => e.status === "done").length;
  return { done, total: ex.length, pct: ex.length ? Math.round((done / ex.length) * 100) : 0 };
}

export function phaseProgress(p) {
  const done = p.days.filter((d) => d.status === "done").length;
  const total = p.plannedDays || p.days.length;
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

export function pathwayProgress() {
  const total = phases.reduce((a, p) => a + (p.plannedDays || p.days.length), 0);
  const done = allDays.filter((d) => d.status === "done").length;
  return { done, total, pct: total ? Math.round((done / total) * 100) : 0 };
}

export function currentDay() {
  return allDays.find((d) => d.status === "current") ?? allDays.find((d) => d.status === "todo") ?? allDays[0];
}

export function todayKL() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kuala_Lumpur" });
}
