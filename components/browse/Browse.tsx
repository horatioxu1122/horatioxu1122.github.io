"use client";

import { useEffect, useState } from "react";
import type {
  BillboardData,
  BrowseItem,
  BrowseRow,
  ContinueItem,
  NewsEntry,
  PaperEntry,
} from "@/lib/browse";
import { HOME_PAPERS } from "@/lib/browse";
import { landing } from "@/lib/content";
import Billboard from "./Billboard";
import BrowseEpisodes from "./BrowseEpisodes";
import BrowseNav from "./BrowseNav";
import BrowseNews from "./BrowseNews";
import ContinueWatching from "./ContinueWatching";
import DetailsModal from "./DetailsModal";
import Row from "./Row";
import { useViewer } from "./useViewer";

/**
 * The Netflix-style home page: top bar, banner, research cards, publications,
 * news, "Continue Watching" (links to the sub-pages) and a details window.
 */
export default function Browse({
  rows,
  papers,
  news,
  continueItems,
  overview,
  about,
  billboard,
  children,
}: {
  rows: BrowseRow[];
  papers: PaperEntry[];
  news: NewsEntry[];
  continueItems: ContinueItem[];
  overview: BrowseItem;
  about: BrowseItem;
  billboard: BillboardData;
  /** footer, rendered on the server */
  children?: React.ReactNode;
}) {
  const [selected, setSelected] = useState<BrowseItem | null>(null);
  const { viewer, switchViewer } = useViewer();
  const current = landing.profiles[viewer] ?? landing.profiles[0];

  // Links like /browse#about (top bar on the sub-pages) or #research-0 (search)
  // open that window here — on arrival, or later when the hash changes.
  useEffect(() => {
    const fromHash = () => {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      const item =
        hash === "about" ? about : rows.flatMap((r) => r.items).find((it) => it.id === hash);
      if (item) {
        setSelected(item);
        history.replaceState(null, "", window.location.pathname);
      }
    };
    const id = requestAnimationFrame(fromHash);
    window.addEventListener("hashchange", fromHash);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("hashchange", fromHash);
    };
  }, [about, rows]);

  return (
    <div className="nf-page min-h-screen w-full bg-nf-bg text-nf-fg">
      <BrowseNav
        overDark
        viewer={viewer}
        onSwitch={switchViewer}
        links={[
          { href: "#top", label: "Home" },
          ...rows.map((r) => ({ href: `#${r.id}`, label: r.nav })),
          ...(papers.length ? [{ href: "#publications", label: "Publications" }] : []),
          ...(news.length ? [{ href: "#news", label: "News" }] : []),
        ]}
        onAbout={() => setSelected(about)}
      />
      <main>
        <Billboard data={billboard} banner={current?.banner} onMore={() => setSelected(overview)} />
        {/* A clear gap under the banner (no overlap), then roomy gaps between sections. */}
        <div className="relative z-10 mt-[clamp(1.5rem,3.57vw,3rem)] flex flex-col gap-[clamp(1.62rem,2.88vw,2.7rem)]">
          {rows.map((row) => (
            <Row key={row.id} row={row} initials={billboard.initials} onOpen={setSelected} />
          ))}
          <BrowseEpisodes
            items={papers}
            initials={billboard.initials}
            limit={HOME_PAPERS}
            seeAllHref="/browse/publications"
          />
          <BrowseNews items={news} />
          <ContinueWatching items={continueItems} viewerName={current?.name ?? ""} />
        </div>
      </main>
      {children}
      {selected ? (
        <DetailsModal
          key={selected.id}
          item={selected}
          initials={billboard.initials}
          onClose={() => setSelected(null)}
        />
      ) : null}
    </div>
  );
}
