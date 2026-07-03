// Single import surface for all site content.
// Both the terminal and the classic view import from here.

export { profile } from "@/content/profile";
export { news } from "@/content/news";
export { publications } from "@/content/publications";
export { awards } from "@/content/awards";
export { service } from "@/content/service";
export { teaching } from "@/content/teaching";
export { about } from "@/content/about";
export { reading } from "@/content/reading";

export type {
  Profile,
  NewsItem,
  Publication,
  PublicationLink,
  Award,
  ServiceItem,
  TeachingItem,
  SocialLink,
  ResearchInterest,
  AboutContent,
  AboutBlock,
  ReadingItem,
} from "@/content/types";

import { publications } from "@/content/publications";
import { reading } from "@/content/reading";

/** Publications grouped by year, newest year first. */
export function publicationsByYear() {
  const groups = new Map<number, typeof publications>();
  for (const p of publications) {
    const arr = groups.get(p.year) ?? [];
    arr.push(p);
    groups.set(p.year, arr);
  }
  return [...groups.entries()].sort((a, b) => b[0] - a[0]);
}

/** Reading items grouped by category, in first-seen order. */
export function readingByCategory() {
  const groups = new Map<string, typeof reading>();
  for (const item of reading) {
    const key = item.category ?? "Other";
    const arr = groups.get(key) ?? [];
    arr.push(item);
    groups.set(key, arr);
  }
  return [...groups.entries()];
}
