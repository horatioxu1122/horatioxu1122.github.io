import type { Metadata } from "next";
import Footer from "@/components/browse/Footer";
import PageHero from "@/components/browse/PageHero";
import SubpageShell from "@/components/browse/SubpageShell";
import TeachingTimeline from "@/components/browse/TeachingTimeline";
import { teachingTimeline } from "@/lib/browse";
import { profile } from "@/lib/content";

export const metadata: Metadata = {
  title: "Teaching",
  description: `Courses taught by ${profile.name}.`,
};

// "Continue Watching" → Teaching: a timeline of terms.
export default function TeachingPage() {
  const { entries, meta } = teachingTimeline();
  return (
    <SubpageShell footer={<Footer />}>
      <PageHero kicker="Teaching" title="Teaching" meta={meta} />
      <TeachingTimeline entries={entries} />
    </SubpageShell>
  );
}
