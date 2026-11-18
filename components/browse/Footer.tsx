import { profile } from "@/lib/content";

const footerLink = "transition-colors hover:text-[#e5e5e5] hover:underline";

/** Site footer: social links, email and copyright. Used on every /browse page. */
export default function Footer() {
  return (
    <footer className="mx-auto max-w-5xl px-[4%] pb-12 pt-16 text-sm text-[#808080]">
      <ul className="flex flex-wrap gap-x-6 gap-y-2">
        {profile.socials.map((s) => (
          <li key={s.href}>
            <a href={s.href} target="_blank" rel="noreferrer" className={footerLink}>
              {s.label}
            </a>
          </li>
        ))}
        <li>
          <a href={`mailto:${profile.email}`} className={footerLink}>
            {profile.email}
          </a>
        </li>
      </ul>
      <p className="mt-6 text-xs">
        © {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  );
}
