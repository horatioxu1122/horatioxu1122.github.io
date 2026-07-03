import { profile } from "@/lib/content";

// Brand-colored social icons with a hover tooltip. Pure CSS tooltip (group-hover),
// so this stays a server component.

type Icon = { viewBox: string; path: string };

const ICONS: Record<string, Icon> = {
  mail: {
    viewBox: "0 0 16 16",
    path: "M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.026A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z",
  },
  scholar: {
    viewBox: "0 0 24 24",
    path: "M5.242 13.769L0 9.5 12 0l12 9.5-5.242 4.269C17.548 11.249 14.978 9.5 12 9.5c-2.977 0-5.548 1.748-6.758 4.269zM12 10a7 7 0 1 0 0 14 7 7 0 0 0 0-14z",
  },
  github: {
    viewBox: "0 0 24 24",
    path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
  twitter: {
    viewBox: "0 0 24 24",
    path: "M21.543 7.104c.015.211.015.423.015.636 0 6.507-4.954 14.01-14.01 14.01v-.003A13.94 13.94 0 0 1 0 19.539a9.88 9.88 0 0 0 7.287-2.041 4.93 4.93 0 0 1-4.6-3.42 4.916 4.916 0 0 0 2.223-.084A4.926 4.926 0 0 1 .96 9.167v-.062a4.887 4.887 0 0 0 2.235.616A4.928 4.928 0 0 1 1.67 3.148 13.98 13.98 0 0 0 11.82 8.292a4.929 4.929 0 0 1 8.39-4.49 9.868 9.868 0 0 0 3.128-1.196 4.941 4.941 0 0 1-2.165 2.724A9.828 9.828 0 0 0 24 4.555a10.019 10.019 0 0 1-2.457 2.549z",
  },
  linkedin: {
    viewBox: "0 0 24 24",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  substack: {
    viewBox: "0 0 24 24",
    path: "M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z",
  },
  cv: {
    viewBox: "0 0 24 24",
    path: "M6 2a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6H6zm7 1.5L18.5 9H13V3.5z",
  },
  link: {
    viewBox: "0 0 24 24",
    path: "M14 3v2h3.59l-9.3 9.29 1.42 1.42L19 6.41V10h2V3h-7zM5 5h5V3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5h-2v5H5V5z",
  },
};

const COLOR: Record<string, string> = {
  mail: "text-zinc-500 dark:text-zinc-400",
  scholar: "text-[#4285F4]",
  github: "text-[#181717] dark:text-zinc-100",
  twitter: "text-[#1DA1F2]",
  linkedin: "text-[#0A66C2] dark:text-[#4a9be8]",
  substack: "text-[#FF6719]",
  cv: "text-zinc-500 dark:text-zinc-400",
  link: "text-zinc-500 dark:text-zinc-400",
};

function keyFor(label: string): keyof typeof ICONS {
  const l = label.toLowerCase();
  if (l.includes("scholar")) return "scholar";
  if (l.includes("github")) return "github";
  if (l.includes("twitter") || l === "x") return "twitter";
  if (l.includes("linkedin")) return "linkedin";
  if (l.includes("substack")) return "substack";
  return "link";
}

interface Item {
  key: keyof typeof ICONS;
  label: string;
  href: string;
}

export default function SocialLinks() {
  const items: Item[] = [
    { key: "mail", label: "Email", href: `mailto:${profile.email}` },
    ...profile.socials.map((s) => ({ key: keyFor(s.label), label: s.label, href: s.href })),
  ];

  return (
    <div className="mt-3 flex flex-wrap items-center gap-4">
      {items.map((it, i) => {
        const icon = ICONS[it.key] ?? ICONS.link;
        return (
          <a
            key={i}
            href={it.href}
            target={it.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            aria-label={it.label}
            className={`group relative inline-flex ${COLOR[it.key] ?? COLOR.link}`}
          >
            <svg
              width="20"
              height="20"
              viewBox={icon.viewBox}
              fill="currentColor"
              aria-hidden="true"
              className="transition-transform duration-150 group-hover:-translate-y-0.5"
            >
              <path d={icon.path} />
            </svg>
            <span className="pointer-events-none absolute left-1/2 top-7 z-20 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-xs font-normal text-white opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100 dark:bg-zinc-100 dark:text-zinc-900">
              {it.label}
            </span>
          </a>
        );
      })}
    </div>
  );
}
