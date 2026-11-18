import { SOCIAL_ICONS, socialItems, type SocialKey } from "@/lib/social";

// Hover colors: each icon turns its brand color (GitHub stays white on the dark banner).
const HOVER: Record<SocialKey, string> = {
  mail: "hover:text-white focus-visible:text-white",
  scholar: "hover:text-[#4285F4] focus-visible:text-[#4285F4]",
  github: "hover:text-white focus-visible:text-white",
  twitter: "hover:text-[#1DA1F2] focus-visible:text-[#1DA1F2]",
  linkedin: "hover:text-[#4a9be8] focus-visible:text-[#4a9be8]",
  substack: "hover:text-[#FF6719] focus-visible:text-[#FF6719]",
  cv: "hover:text-white focus-visible:text-white",
  link: "hover:text-white focus-visible:text-white",
};

/**
 * A row of plain white social icons under the tagline in the /browse banner
 * (like the icon row on vicflix.dev): email + the links in content/profile.ts.
 * Hover or keyboard focus shows the name below the icon.
 */
export default function BannerSocials() {
  return (
    <ul className="mt-5 flex flex-wrap items-center gap-5" aria-label="Links">
      {socialItems().map((it) => {
        const icon = SOCIAL_ICONS[it.key];
        return (
          <li key={it.href}>
            <a
              href={it.href}
              target={it.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              aria-label={it.label}
              className={`group relative inline-flex text-white/85 transition-colors focus:outline-none ${HOVER[it.key]}`}
            >
              <svg
                width="22"
                height="22"
                viewBox={icon.viewBox}
                fill="currentColor"
                aria-hidden="true"
                className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] transition-transform duration-150 group-hover:-translate-y-0.5 group-focus-visible:-translate-y-0.5"
              >
                <path d={icon.path} />
              </svg>
              <span className="pointer-events-none absolute left-1/2 top-8 z-20 -translate-x-1/2 whitespace-nowrap rounded bg-black/85 px-2 py-1 text-xs text-white opacity-0 shadow transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100">
                {it.label}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
