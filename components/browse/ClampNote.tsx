"use client";

import { useState } from "react";
import { renderInline } from "@/lib/format";

const link = "text-nf-fg underline decoration-current/40 underline-offset-2 hover:decoration-current";

/** A note cut to three lines, with a "More" / "Less" button when it is long. */
export default function ClampNote({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  const long = text.length > 140;

  return (
    <div className="mt-1.5 text-sm leading-relaxed text-nf-muted">
      <p className={long && !open ? "line-clamp-3" : undefined}>{renderInline(text, link)}</p>
      {long ? (
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          className="mt-1 text-xs font-semibold text-nf-fg hover:underline"
        >
          {open ? "Less" : "More"}
        </button>
      ) : null}
    </div>
  );
}
