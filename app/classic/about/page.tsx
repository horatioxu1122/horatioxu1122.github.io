import type { Metadata } from "next";
import { about, profile } from "@/lib/content";
import { renderInline } from "@/lib/format";

export const metadata: Metadata = {
  title: "About",
  description: `About ${profile.name}`,
};

const link =
  "text-[color:var(--accent)] underline-offset-2 hover:text-[color:var(--accent-hover)] hover:underline";

// Turn a YouTube watch/share URL into an embeddable URL.
function youtubeEmbed(url: string): string {
  try {
    const u = new URL(url);
    const id = u.hostname.includes("youtu.be")
      ? u.pathname.slice(1)
      : u.searchParams.get("v") ?? "";
    return id ? `https://www.youtube.com/embed/${id}` : url;
  } catch {
    return url;
  }
}

export default function AboutPage() {
  return (
    <article className="flex flex-col gap-10">
      {about.blocks.map((block, i) => {
        if (block.type === "text") {
          return (
            <div key={i} className="flex flex-col gap-3 leading-relaxed">
              {block.body.filter(Boolean).map((p, j) => (
                <p key={j}>{renderInline(p, link)}</p>
              ))}
            </div>
          );
        }

        if (block.type === "videos") {
          return (
            <div key={i} className="grid gap-4 sm:grid-cols-2">
              {block.urls.map((v, j) => (
                <div
                  key={j}
                  className="aspect-video overflow-hidden rounded-lg ring-1 ring-zinc-200 dark:ring-zinc-800"
                >
                  <iframe
                    src={youtubeEmbed(v)}
                    title={`Video ${j + 1}`}
                    className="h-full w-full"
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              ))}
            </div>
          );
        }

        // section
        return (
          <section key={i} className="flex flex-col gap-3">
            <h2 className="section-label">{block.title}</h2>
            {block.list ? (
              <ul className="ml-5 flex list-disc flex-col gap-1 leading-relaxed">
                {block.body.map((item, j) => (
                  <li key={j}>{renderInline(item, link)}</li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col gap-3 leading-relaxed">
                {block.body.map((p, j) => (
                  <p key={j}>{renderInline(p, link)}</p>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </article>
  );
}
