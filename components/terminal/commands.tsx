import React from "react";
import {
  profile,
  news,
  awards,
  service,
  teaching,
  publications,
  publicationsByYear,
} from "@/lib/content";
import { renderInline } from "@/lib/format";

// ─────────────────────────────────────────────────────────────
// Command registry. Each command returns a React node to print,
// or void if it only performs a side effect (clear, navigate…).
// ─────────────────────────────────────────────────────────────

export interface CommandContext {
  args: string[];
  cwd: string;
  setCwd: (dir: string) => void;
  clear: () => void;
  navigate: (path: string) => void;
  setTheme: (name: string) => void;
  themes: string[];
  run: (name: string, args?: string[]) => React.ReactNode | void;
}

export interface Command {
  name: string;
  aliases?: string[];
  description: string;
  usage?: string;
  hidden?: boolean;
  run: (ctx: CommandContext) => React.ReactNode | void;
}

// ── small presentational helpers ──────────────────────────────
const A = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    target={href.startsWith("http") ? "_blank" : undefined}
    rel="noreferrer"
    className="text-[color:var(--term-link)] underline underline-offset-2 hover:no-underline"
  >
    {children}
  </a>
);
const Accent = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[color:var(--term-accent)]">{children}</span>
);
const Muted = ({ children }: { children: React.ReactNode }) => (
  <span className="text-[color:var(--term-muted)] whitespace-pre-wrap">{children}</span>
);
const Heading = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-1 mb-1 font-bold text-[color:var(--term-accent)]">{children}</div>
);

// ── sections that behave like directories (cd / ls / cat) ─────
export const SECTIONS = ["about", "news", "publications", "awards", "service", "teaching", "contact"];

function runByName(name: string): React.ReactNode {
  const cmd = commands.find((c) => c.name === name);
  return cmd ? (cmd.run(stubCtx as CommandContext) as React.ReactNode) : null;
}

function listItems(section: string): React.ReactNode {
  switch (section) {
    case "publications":
      return (
        <div className="flex flex-col gap-0.5">
          {publications.map((p) => (
            <div key={p.id}>
              <Accent>{p.id}</Accent>
              <Muted>{`  — ${p.title} (${p.venue} ${p.year})`}</Muted>
            </div>
          ))}
          <Muted>{`\nTip: run \`cat pub <id>\` for details.`}</Muted>
        </div>
      );
    case "news":
    case "awards":
    case "service":
    case "teaching":
    case "about":
    case "contact":
      return runByName(section);
    default:
      return <Muted>{`Nothing to list in ${section}.`}</Muted>;
  }
}

// stub ctx for internal cross-calls that don't need real side effects
const stubCtx: Partial<CommandContext> = {
  args: [],
  cwd: "~",
  setCwd: () => {},
  clear: () => {},
  navigate: () => {},
  setTheme: () => {},
  themes: [],
  run: () => null,
};

export const commands: Command[] = [
  {
    name: "help",
    aliases: ["?", "commands"],
    description: "list available commands",
    run: () => (
      <div className="flex flex-col">
        <Muted>Available commands — type one and press Enter:</Muted>
        <div className="mt-1 grid grid-cols-[8rem_1fr] gap-x-2">
          {commands
            .filter((c) => !c.hidden)
            .map((c) => (
              <React.Fragment key={c.name}>
                <span className="text-[color:var(--term-accent)]">{c.usage ?? c.name}</span>
                <span>{c.description}</span>
              </React.Fragment>
            ))}
        </div>
        <Muted>{"\nShortcuts: ↑/↓ history · Tab complete · Ctrl+L clear"}</Muted>
      </div>
    ),
  },
  {
    name: "about",
    aliases: ["whoami", "bio"],
    description: "who I am",
    run: () => (
      <div className="flex flex-col gap-2">
        <div>
          <span className="font-bold">{profile.name}</span>
          {profile.nickname ? <Muted>{` (${profile.nickname})`}</Muted> : null}
          <div>
            <Accent>{profile.title}</Accent>
            <Muted>{` · ${profile.affiliation}`}</Muted>
          </div>
          {profile.location ? <Muted>{profile.location}</Muted> : null}
        </div>
        {profile.bio.map((para, i) => (
          <p key={i}>{renderInline(para, "text-[color:var(--term-link)] underline")}</p>
        ))}
        <Muted>{"Run `research` for my interests, `publications` for papers."}</Muted>
      </div>
    ),
  },
  {
    name: "research",
    aliases: ["interests"],
    description: "what I work on",
    run: () => (
      <div className="flex flex-col gap-2">
        {profile.researchInterests.map((r, i) => (
          <div key={i}>
            <Accent>{`• ${r.title}`}</Accent>
            <div className="pl-2">{r.description}</div>
          </div>
        ))}
      </div>
    ),
  },
  {
    name: "news",
    description: "recent updates",
    run: () => (
      <div className="flex flex-col gap-1">
        {news.map((n, i) => (
          <div key={i} className="grid grid-cols-[7rem_1fr] gap-x-2">
            <Muted>{n.date}</Muted>
            <span>{renderInline(n.text, "text-[color:var(--term-link)] underline")}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    name: "publications",
    aliases: ["pubs", "papers"],
    description: "list publications (try `cat pub <id>`)",
    run: () => (
      <div className="flex flex-col gap-3">
        {publicationsByYear().map(([year, items]) => (
          <div key={year}>
            <Heading>{year}</Heading>
            {items.map((p) => (
              <div key={p.id} className="mb-2">
                <div className="font-medium">{p.title}</div>
                <div>{renderInline(p.authors)}</div>
                <div>
                  <Accent>{p.venue}</Accent> {p.year}
                  {p.award ? <Muted>{`  ★ ${p.award}`}</Muted> : null}
                </div>
                <div className="flex flex-wrap gap-x-3">
                  {p.links?.map((l) => (
                    <A key={l.label} href={l.href}>
                      [{l.label}]
                    </A>
                  ))}
                  <Muted>{`id: ${p.id}`}</Muted>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    ),
  },
  {
    name: "cat",
    description: "read a file, e.g. `cat pub <id>` or `cat about`",
    usage: "cat <target>",
    run: ({ args }) => {
      const [a, b] = args;
      if ((a === "pub" || a === "paper") && b) {
        const p = publications.find((x) => x.id === b);
        if (!p) return <Muted>{`No publication with id "${b}". Try \`ls publications\`.`}</Muted>;
        return (
          <div className="flex flex-col gap-1">
            <div className="font-bold">{p.title}</div>
            <div>{renderInline(p.authors)}</div>
            <div>
              <Accent>{p.venue}</Accent> {p.year}
              {p.award ? <Muted>{`  ★ ${p.award}`}</Muted> : null}
            </div>
            {p.abstract ? <p className="mt-1">{p.abstract}</p> : <Muted>No abstract.</Muted>}
            <div className="flex flex-wrap gap-x-3 mt-1">
              {p.links?.map((l) => (
                <A key={l.label} href={l.href}>
                  [{l.label}]
                </A>
              ))}
            </div>
          </div>
        );
      }
      if (a && SECTIONS.includes(a)) return listItems(a);
      return <Muted>{"Usage: `cat pub <id>` or `cat <section>`. Try `ls`."}</Muted>;
    },
  },
  {
    name: "awards",
    aliases: ["honors"],
    description: "awards & honors",
    run: () => (
      <div className="flex flex-col gap-0.5">
        {awards.map((a, i) => (
          <div key={i} className="grid grid-cols-[4rem_1fr] gap-x-2">
            <Muted>{a.year}</Muted>
            <span>
              {a.title}
              {a.org ? <Muted>{` — ${a.org}`}</Muted> : null}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    name: "service",
    description: "academic service",
    run: () => (
      <div className="flex flex-col gap-0.5">
        {service.map((s, i) => (
          <div key={i} className="grid grid-cols-[6rem_1fr] gap-x-2">
            <Muted>{s.year}</Muted>
            <span>
              <Accent>{s.role}</Accent>
              {` — ${s.venue}`}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    name: "teaching",
    description: "courses I've taught",
    run: () => (
      <div className="flex flex-col gap-0.5">
        {teaching.map((t, i) => (
          <div key={i} className="grid grid-cols-[7rem_1fr] gap-x-2">
            <Muted>{t.term}</Muted>
            <span>
              {t.course}
              <Muted>{` — ${t.role}`}</Muted>
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    name: "contact",
    aliases: ["socials"],
    description: "how to reach me",
    run: () => (
      <div className="flex flex-col gap-0.5">
        <div>
          <Accent>email</Accent>
          {"  "}
          <A href={`mailto:${profile.email}`}>{profile.email}</A>
        </div>
        {profile.socials.map((s) => (
          <div key={s.label}>
            <Accent>{s.label.toLowerCase().replace(/[^a-z]/g, "")}</Accent>
            {"  "}
            <A href={s.href}>{s.handle ?? s.href}</A>
          </div>
        ))}
      </div>
    ),
  },
  {
    name: "email",
    hidden: true,
    description: "open email client",
    run: ({ navigate }) => {
      navigate(`mailto:${profile.email}`);
      return <Muted>{`Opening mail to ${profile.email}…`}</Muted>;
    },
  },
  {
    name: "cv",
    aliases: ["resume"],
    description: "open my CV (PDF)",
    run: ({ navigate }) => {
      if (!profile.cv) return <Muted>CV not available yet.</Muted>;
      navigate(profile.cv);
      return <Muted>{`Opening ${profile.cv}…`}</Muted>;
    },
  },
  {
    name: "ls",
    description: "list sections, or items in one",
    usage: "ls [section]",
    run: ({ args, cwd }) => {
      const target = args[0] ?? (cwd === "~" ? "" : cwd.replace("~/", ""));
      if (target && SECTIONS.includes(target)) return listItems(target);
      return (
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {SECTIONS.map((s) => (
            <span key={s} className="text-[color:var(--term-accent)]">
              {s}/
            </span>
          ))}
        </div>
      );
    },
  },
  {
    name: "cd",
    description: "change section",
    usage: "cd <section>",
    run: ({ args, setCwd }) => {
      const target = args[0];
      if (!target || target === "~" || target === "/" || target === "..") {
        setCwd("~");
        return;
      }
      const clean = target.replace(/\/$/, "");
      if (SECTIONS.includes(clean)) {
        setCwd(`~/${clean}`);
        return;
      }
      return <Muted>{`cd: no such section: ${target}`}</Muted>;
    },
  },
  {
    name: "theme",
    description: "switch color theme",
    usage: "theme [name]",
    run: ({ args, setTheme, themes }) => {
      const name = args[0];
      if (!name) {
        return (
          <div>
            <Muted>Available themes: </Muted>
            {themes.join(", ")}
            <Muted>{"\nUsage: theme <name>"}</Muted>
          </div>
        );
      }
      if (!themes.includes(name)) return <Muted>{`Unknown theme: ${name}`}</Muted>;
      setTheme(name);
      return <Muted>{`Theme set to ${name}.`}</Muted>;
    },
  },
  {
    name: "gui",
    aliases: ["website", "classic", "exit"],
    description: "switch to the classic website view",
    run: ({ navigate }) => {
      navigate("/classic");
      return <Muted>Loading classic view…</Muted>;
    },
  },
  {
    name: "clear",
    aliases: ["cls"],
    description: "clear the screen",
    run: ({ clear }) => {
      clear();
    },
  },
  {
    name: "banner",
    hidden: true,
    description: "show the welcome banner",
    run: () => <Banner />,
  },
  {
    name: "sudo",
    hidden: true,
    description: "",
    run: () => <Muted>Nice try. This incident will be reported. 🙂</Muted>,
  },
];

export function Banner() {
  return (
    <div className="flex flex-col gap-1">
      <pre className="text-[color:var(--term-accent)] leading-tight text-[10px] sm:text-xs overflow-x-auto">
        {[
          "  _   _                 _   _        __  __",
          " | | | | ___  _ __ __ _| |_(_) ___   \\ \\/ /   _",
          " | |_| |/ _ \\| '__/ _` | __| |/ _ \\   \\  / | | |",
          " |  _  | (_) | | | (_| | |_| | (_) |  /  \\ |_| |",
          " |_| |_|\\___/|_|  \\__,_|\\__|_|\\___/  /_/\\_\\__,_|",
        ].join("\n")}
      </pre>
      <div>
        Hi, I&apos;m <span className="font-bold">{profile.name}</span> —{" "}
        <span className="text-[color:var(--term-accent)]">{profile.title}</span>.
      </div>
      <Muted>{profile.tagline}</Muted>
      <div className="mt-1">
        Type <Accent>help</Accent> to see what you can do, or <Accent>gui</Accent> for the
        classic website.
      </div>
    </div>
  );
}

// Resolve a command (incl. aliases) by name.
export function resolveCommand(name: string): Command | undefined {
  return commands.find((c) => c.name === name || c.aliases?.includes(name));
}

// Names + aliases for tab completion.
export function allCommandNames(): string[] {
  return commands.flatMap((c) => [c.name, ...(c.aliases ?? [])]).filter(Boolean);
}
