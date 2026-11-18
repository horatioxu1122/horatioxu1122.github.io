import type { Metadata } from "next";
import Browse from "@/components/browse/Browse";
import Footer from "@/components/browse/Footer";
import { buildBrowse } from "@/lib/browse";
import { profile } from "@/lib/content";

export const metadata: Metadata = {
  title: "Home",
  description: profile.tagline,
};

// The main page of the site: a Netflix-style home built from content/*.ts.
export default function BrowsePage() {
  const { rows, papers, news, continueItems, overview, about, billboard } = buildBrowse();

  return (
    <Browse
      rows={rows}
      papers={papers}
      news={news}
      continueItems={continueItems}
      overview={overview}
      about={about}
      billboard={billboard}
    >
      <Footer />
    </Browse>
  );
}
