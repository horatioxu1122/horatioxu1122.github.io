import Link from "next/link";
import ClassicNav from "@/components/classic/ClassicNav";
import SocialLinks from "@/components/classic/SocialLinks";
import { profile } from "@/lib/content";

const link =
  "text-[color:var(--accent)] underline-offset-2 hover:text-[color:var(--accent-hover)] hover:underline";

// Shared chrome for the classic site: minimal masthead + nav + footer.
export default function ClassicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="classic min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <ClassicNav />

      {/* ── masthead banner ── */}
      <header className="mx-auto flex max-w-[860px] flex-col gap-5 px-6 pb-6 pt-10 sm:flex-row sm:items-center">
        {profile.photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={profile.photo}
            alt={profile.name}
            className="h-28 w-28 shrink-0 rounded-full object-cover ring-1 ring-zinc-200 dark:ring-zinc-800"
          />
        ) : null}
        <div>
          <h1 className="text-[1.75rem] font-bold leading-tight">
            <span className="group relative inline-flex items-center gap-1.5">
              <span>
                {profile.name}
                {profile.nickname ? (
                  <span className="font-normal text-zinc-400"> ({profile.nickname})</span>
                ) : null}
              </span>
              {profile.nameNote ? (
                <>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="shrink-0 cursor-help text-zinc-400 transition-colors group-hover:text-[color:var(--nav)]"
                  >
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3a4.5 4.5 0 0 0-2.5-4.03v8.06A4.5 4.5 0 0 0 16.5 12z" />
                  </svg>
                  <span className="pointer-events-none absolute left-0 top-full z-20 mt-2 w-72 max-w-[80vw] rounded-md bg-zinc-900 px-3 py-2 text-sm font-normal leading-snug text-white opacity-0 shadow-md transition-opacity duration-150 group-hover:opacity-100 dark:bg-zinc-100 dark:text-zinc-900">
                    {profile.nameNote}
                  </span>
                </>
              ) : null}
            </span>
          </h1>
          {profile.pronunciation ? (
            <p className="mt-1 text-sm text-zinc-500">/{profile.pronunciation}/</p>
          ) : null}
          <p className="mt-1 text-zinc-600 dark:text-zinc-400">
            {profile.title} · {profile.affiliation}
            {profile.affiliationLogo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.affiliationLogo}
                alt={profile.affiliation}
                className="ml-1.5 inline-block h-[1.1em] w-[1.1em] rounded-[3px] object-contain align-[-0.15em]"
              />
            ) : null}
          </p>
          {profile.email ? (
            <p className="mt-1 text-sm text-zinc-500">{profile.email}</p>
          ) : null}
          {profile.location ? (
            <p className="text-sm text-zinc-500">{profile.location}</p>
          ) : null}
          <SocialLinks />
        </div>
      </header>

      <main className="mx-auto max-w-[860px] px-6 py-12">{children}</main>

      <footer className="mx-auto max-w-[860px] border-t border-zinc-200 px-6 py-6 text-sm text-zinc-500 dark:border-zinc-800">
        <p>
          © {new Date().getFullYear()} {profile.name}. Prefer the command line?{" "}
          <Link href="/terminal" className={link}>
            Open the terminal
          </Link>
          .
        </p>
      </footer>
    </div>
  );
}
