import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// One file per practice session. Filename = date. Written after each session
// from a one-line report; the site is the reader.
const log = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/log" }),
  schema: z.object({
    date: z.coerce.date(),
    week: z.number(),
    day: z.number().optional(),
    title: z.string(),
    nodes: z.array(z.number()).default([]),
    bpm: z.number().optional(),
    minutes: z.number().optional(),
    recorded: z.boolean().default(false),
    ratings: z.record(z.string(), z.number()).optional(),
  }),
});

export const collections = { log };
