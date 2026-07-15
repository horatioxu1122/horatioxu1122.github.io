import type { Metadata } from "next";
import { profile } from "@/lib/content";

export const metadata: Metadata = {
  title: "Projects",
  description: `Projects by ${profile.name}.`,
};

export default function ProjectsPage() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="section-label">Projects</h2>
      <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">
        Coming soon.
      </p>
    </div>
  );
}
