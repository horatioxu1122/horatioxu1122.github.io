import type { AwardEntry, ServiceCredit } from "@/lib/browse";

/**
 * /browse/service: two organized lists, Awards and Service. Every row has the
 * same shape — years on the left, the name in bold with details below, and
 * the role as a small label — so the page reads like a table.
 */
export default function ServiceAwards({
  awards,
  credits,
}: {
  awards: AwardEntry[];
  credits: ServiceCredit[];
}) {
  return (
    <div className="flex flex-col gap-[clamp(1.62rem,2.88vw,2.7rem)]">
      {awards.length ? (
        <ListSection id="awards" title="Awards" count={awards.length}>
          {awards.map((a) => (
            <Row key={a.id} years={String(a.year)} name={a.title} detail={a.org} label="Award" highlight />
          ))}
        </ListSection>
      ) : null}

      {credits.length ? (
        <ListSection id="service" title="Service" count={credits.length}>
          {credits.map((c) => (
            <Row key={c.id} years={c.years} name={c.name} detail={c.detail} label={c.role} />
          ))}
        </ListSection>
      ) : null}
    </div>
  );
}

function ListSection({
  id,
  title,
  count,
  children,
}: {
  id: string;
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={`${id}-title`} className="px-[4%]">
      <div className="flex max-w-4xl items-baseline justify-between gap-4">
        <h2 id={`${id}-title`} className="text-[clamp(1.05rem,1.4vw,1.45rem)] font-bold text-[#e5e5e5]">
          {title}
        </h2>
        <span className="text-sm text-[#808080]">{count}</span>
      </div>
      <ol className="mt-2 flex max-w-4xl flex-col divide-y divide-white/10 border-t border-white/10">
        {children}
      </ol>
    </section>
  );
}

function Row({
  years,
  name,
  detail,
  label,
  highlight = false,
}: {
  years: string;
  name: string;
  detail?: string;
  label: string;
  highlight?: boolean;
}) {
  return (
    <li className="grid grid-cols-[6.5rem_minmax(0,1fr)] gap-x-4 py-4 sm:grid-cols-[8rem_minmax(0,1fr)_auto] sm:items-start">
      <span className="pt-0.5 text-sm tabular-nums text-[#808080]">{years}</span>
      <div className="min-w-0">
        <h3 className="font-semibold leading-snug text-white">{name}</h3>
        {detail ? <p className="mt-0.5 text-sm leading-relaxed text-[#bcbcbc]">{detail}</p> : null}
        {/* phones: the label sits under the text */}
        <RoleLabel label={label} highlight={highlight} className="mt-2 sm:hidden" />
      </div>
      <RoleLabel label={label} highlight={highlight} className="hidden sm:inline-block" />
    </li>
  );
}

function RoleLabel({
  label,
  highlight,
  className,
}: {
  label: string;
  highlight: boolean;
  className: string;
}) {
  return (
    <span
      className={`${className} w-fit whitespace-nowrap rounded-sm px-1.5 py-0.5 text-xs ${
        highlight ? "bg-[#e50914] font-bold text-white" : "border border-white/30 text-[#e5e5e5]"
      }`}
    >
      {label}
    </span>
  );
}
