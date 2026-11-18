import type { Metadata } from "next";
import BrowseEpisodes from "@/components/browse/BrowseEpisodes";
import Footer from "@/components/browse/Footer";
import PageHero from "@/components/browse/PageHero";
import SubpageShell from "@/components/browse/SubpageShell";
import { initialsOf, paperEntries } from "@/lib/browse";
import { landing, profile } from "@/lib/content";

export const metadata: Metadata = {
  title: "Publications",
  description: `Publications of ${profile.name}.`,
};

// Every paper. The home page shows the newest 10 and links here ("See all")
// once there are more than 10.
export default function PublicationsPage() {
  return (
    <SubpageShell footer={<Footer />}>
      <PageHero kicker="Publications" title="Publications" meta={[]} />
      <BrowseEpisodes items={paperEntries()} initials={initialsOf(landing.wordmark)} heading={false} />
    </SubpageShell>
  );
}
