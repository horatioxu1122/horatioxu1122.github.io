"use client";

import { useState } from "react";
import { renderInline } from "@/lib/format";

const link = "text-white underline decoration-white/40 underline-offset-2 hover:decoration-white";

/** A note cut to three lines, with a "More" / "Less" button when it is long. */
export default function ClampNote({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const long = text.length > 140;

  return (
    <div className="mt-1.5 text-sm leading-relaxed text-[#bcbcbc]">
      <p className={long && !open ? "line-clamp-3" : undefined}>{renderInline(text, link)}</p>
      {long ? (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-1 text-xs font-semibold text-white hover:underline"
        >
          {open ? "Less" : "More"}
        </button>
      ) : null}
    </div>
  );
}
