import type { Metadata } from "next";
import Bookshelf from "@/components/browse/Bookshelf";
import Footer from "@/components/browse/Footer";
import PageHero from "@/components/browse/PageHero";
import SubpageShell from "@/components/browse/SubpageShell";
import { readingShelf } from "@/lib/browse";
import { profile } from "@/lib/content";

export const metadata: Metadata = {
  title: "Reading List",
  description: `Books and papers ${profile.name} recommends.`,
};

// "Continue Watching" → Reading List: a bookshelf of poster tiles.
export default function ReadingPage() {
  const { groups, meta } = readingShelf();
  return (
    <SubpageShell footer={<Footer />}>
      <PageHero kicker="Reading List" title="On the Nightstand" meta={meta} />
      <Bookshelf groups={groups} />
    </SubpageShell>
  );
}
