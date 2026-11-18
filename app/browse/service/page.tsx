import type { Metadata } from "next";
import Footer from "@/components/browse/Footer";
import PageHero from "@/components/browse/PageHero";
import ServiceAwards from "@/components/browse/ServiceAwards";
import SubpageShell from "@/components/browse/SubpageShell";
import { creditsData } from "@/lib/browse";
import { profile } from "@/lib/content";

export const metadata: Metadata = {
  title: "Service & Awards",
  description: `Service and awards of ${profile.name}.`,
};

// "Continue Watching" → Service & Awards: numbered tile rows, newest first.
export default function ServicePage() {
  const { awards, credits, meta } = creditsData();
  return (
    <SubpageShell footer={<Footer />}>
      <PageHero kicker="Credits" title="Service & Awards" meta={meta} />
      <ServiceAwards awards={awards} credits={credits} />
    </SubpageShell>
  );
}
