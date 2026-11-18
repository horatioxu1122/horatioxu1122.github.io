import type { Metadata } from "next";
import CreditsRoll from "@/components/browse/CreditsRoll";
import Footer from "@/components/browse/Footer";
import PageHero from "@/components/browse/PageHero";
import SubpageShell from "@/components/browse/SubpageShell";
import { creditsData } from "@/lib/browse";
import { profile } from "@/lib/content";

export const metadata: Metadata = {
  title: "Service & Awards",
  description: `Service and awards of ${profile.name}.`,
};

// "Continue Watching" → Service & Awards: trophy cards, then end credits.
export default function ServicePage() {
  const { awards, credits, meta } = creditsData();
  return (
    <SubpageShell footer={<Footer />}>
      <PageHero kicker="Credits" title="Service & Awards" meta={meta} />
      <CreditsRoll awards={awards} credits={credits} />
    </SubpageShell>
  );
}
