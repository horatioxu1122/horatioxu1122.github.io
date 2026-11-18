// Single import surface for all site content.
// Every page (the landing at "/" and the /browse pages) imports from here.

export { profile } from "@/content/profile";
export { news } from "@/content/news";
export { publications } from "@/content/publications";
export { awards } from "@/content/awards";
export { service } from "@/content/service";
export { teaching } from "@/content/teaching";
export { about } from "@/content/about";
export { reading } from "@/content/reading";
export { landing } from "@/content/landing";
export { browse } from "@/content/browse";

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
  ViewerProfile,
  LandingContent,
  BrowseContent,
} from "@/content/types";

import { reading } from "@/content/reading";

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
