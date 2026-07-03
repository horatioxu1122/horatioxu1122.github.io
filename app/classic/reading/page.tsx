import type { Metadata } from "next";
import { profile, readingByCategory } from "@/lib/content";
import { renderInline } from "@/lib/format";

export const metadata: Metadata = {
  title: "Reading list",
  description: `Books and papers ${profile.name} is reading.`,
};

const link =
  "text-[color:var(--accent)] underline-offset-2 hover:text-[color:var(--accent-hover)] hover:underline";

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-amber-500" aria-label={`${rating} out of 5`}>
      {"★".repeat(rating)}
      <span className="text-zinc-300 dark:text-zinc-700">{"★".repeat(5 - rating)}</span>
    </span>
  );
}

export default function ReadingPage() {
  const groups = readingByCategory();

  return (
    <div className="flex flex-col gap-10">
      <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
        Books, papers, and articles I&apos;ve enjoyed or keep coming back to.
      </p>

      {groups.map(([category, items]) => (
        <section key={category} className="flex flex-col gap-4">
          <h2 className="section-label">{category}</h2>
          <ul className="flex flex-col gap-5">
            {items.map((item, i) => (
              <li key={i} className="flex flex-col gap-1">
                <span className="font-medium leading-snug">
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noreferrer" className={link}>
                      {item.title}
                    </a>
                  ) : (
                    item.title
                  )}
                  {item.author ? (
                    <span className="font-normal text-zinc-500"> · {item.author}</span>
                  ) : null}
                </span>
                {typeof item.rating === "number" ? <Stars rating={item.rating} /> : null}
                {item.note ? (
                  <span className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {renderInline(item.note, link)}
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
