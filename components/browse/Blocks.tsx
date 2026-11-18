import type { AboutBlock } from "@/lib/content";
import { renderInline, youtubeEmbed } from "@/lib/format";

const link = "text-white underline decoration-white/40 underline-offset-2 hover:decoration-white";

/** Text, video and section blocks inside the details window. */
export default function Blocks({ blocks }: { blocks: AboutBlock[] }) {
  return (
    <div className="flex flex-col gap-5 text-[0.95rem] leading-relaxed text-[#d2d2d2]">
      {blocks.map((block, i) => {
        if (block.type === "text") {
          return (
            <div key={i} className="flex flex-col gap-3">
              {block.body.filter(Boolean).map((p, j) => (
                <p key={j}>{renderInline(p, link)}</p>
              ))}
            </div>
          );
        }

        if (block.type === "videos") {
          return (
            <div key={i} className="grid gap-3 sm:grid-cols-2">
              {block.urls.map((v, j) => (
                <div key={j} className="aspect-video overflow-hidden rounded">
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

        return (
          <section key={i} className="flex flex-col gap-2">
            <h3 className="text-base font-semibold text-white">{block.title}</h3>
            {block.list ? (
              <ul className="ml-5 flex list-disc flex-col gap-1.5 marker:text-[#e50914]">
                {block.body.map((item, j) => (
                  <li key={j}>{renderInline(item, link)}</li>
                ))}
              </ul>
            ) : (
              block.body.map((p, j) => <p key={j}>{renderInline(p, link)}</p>)
            )}
          </section>
        );
      })}
    </div>
  );
}
