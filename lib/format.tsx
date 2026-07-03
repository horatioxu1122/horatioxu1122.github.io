import React from "react";

// Minimal inline formatter shared by both views.
// Supports **bold**, *italic*, [text](url), and ![alt](imgSrc) inline images.

type Token = {
  type: "text" | "bold" | "italic" | "link" | "image";
  value: string;
  href?: string;
};

// Image pattern must come first so ![..](..) isn't caught by the link rule.
const PATTERN = /(!\[[^\]]*\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;

function tokenize(input: string): Token[] {
  const tokens: Token[] = [];
  let last = 0;
  for (const match of input.matchAll(PATTERN)) {
    const idx = match.index ?? 0;
    if (idx > last) tokens.push({ type: "text", value: input.slice(last, idx) });
    const tok = match[0];
    if (tok.startsWith("![")) {
      const m = /!\[([^\]]*)\]\(([^)]+)\)/.exec(tok)!;
      tokens.push({ type: "image", value: m[1], href: m[2] });
    } else if (tok.startsWith("**")) {
      tokens.push({ type: "bold", value: tok.slice(2, -2) });
    } else if (tok.startsWith("*")) {
      tokens.push({ type: "italic", value: tok.slice(1, -1) });
    } else {
      const m = /\[([^\]]+)\]\(([^)]+)\)/.exec(tok)!;
      tokens.push({ type: "link", value: m[1], href: m[2] });
    }
    last = idx + tok.length;
  }
  if (last < input.length) tokens.push({ type: "text", value: input.slice(last) });
  return tokens;
}

/** Render inline markdown to React nodes (for the classic view). */
export function renderInline(input: string, linkClass = "underline hover:no-underline"): React.ReactNode {
  return tokenize(input).map((t, i) => {
    switch (t.type) {
      case "bold":
        return <strong key={i}>{t.value}</strong>;
      case "italic":
        return <em key={i}>{t.value}</em>;
      case "link":
        return (
          <a key={i} href={t.href} target="_blank" rel="noreferrer" className={linkClass}>
            {t.value}
          </a>
        );
      case "image":
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={t.href}
            alt={t.value}
            className="mx-1 inline-block h-[1.1em] w-[1.1em] rounded-[3px] object-contain align-[-0.15em]"
          />
        );
      default:
        return <React.Fragment key={i}>{t.value}</React.Fragment>;
    }
  });
}

/** Strip formatting to plain text (for terminal output that prints raw). */
export function stripInline(input: string): string {
  return tokenize(input)
    .map((t) => {
      if (t.type === "link") return `${t.value} (${t.href})`;
      if (t.type === "image") return "";
      return t.value;
    })
    .join("");
}
