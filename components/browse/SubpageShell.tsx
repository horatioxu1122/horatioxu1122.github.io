"use client";

import BrowseNav from "./BrowseNav";
import { useViewer } from "./useViewer";

/** Top-bar links on the sub-pages point back to the sections of the home page. */
const LINKS = [
  { href: "/browse", label: "Home" },
  { href: "/browse#research", label: "Research" },
  { href: "/browse#publications", label: "Publications" },
  { href: "/browse#news", label: "News" },
];

/**
 * Frame for the "Continue Watching" pages (/browse/teaching, /browse/service,
 * /browse/reading): the same top bar and profile menu as the home page,
 * then the page content and the footer.
 */
export default function SubpageShell({
  children,
  footer,
}: {
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const { viewer, switchViewer } = useViewer();

  return (
    <div className="nf-page min-h-screen w-full bg-nf-bg text-nf-fg">
      <BrowseNav
        links={LINKS}
        viewer={viewer}
        onSwitch={switchViewer}
        aboutHref="/browse#about"
        logoHref="/browse"
        highlight={false}
      />
      <main>{children}</main>
      {footer}
    </div>
  );
}
