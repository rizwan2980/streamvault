import type { Metadata } from "next";
import { Sparkles, Globe2, ShieldCheck, Zap } from "lucide-react";

export const metadata: Metadata = { title: "About" };

const FEATURES = [
  {
    icon: Globe2,
    title: "Global & Regional Indexing",
    desc: "Curated directory spanning USA, India, Europe, Asia and more, ensuring you always find active local & global content.",
  },
  {
    icon: Zap,
    title: "Instant Fuzzy Search",
    desc: "Lightning fast command palette and search bar to instantly jump directly to any platform, category, or tool.",
  },
  {
    icon: ShieldCheck,
    title: "Verified & Quality Filtered",
    desc: "Regularly checked and updated to filter out dead links, spam, and malicious redirects.",
  },
  {
    icon: Sparkles,
    title: "Clean & Ad-Free Interface",
    desc: "Designed with a modern, glassmorphic aesthetic so you can browse resources without clutter.",
  },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 md:px-6">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">About The Directory</h1>
        <p className="mt-2 text-[var(--fg-muted)]">Your ultimate curated portal for entertainment & digital resources 💜</p>
      </header>

      <section className="tbcpl-card mb-10 p-8">
        <h2 className="mb-3 text-xl font-bold">Our Mission</h2>
        <p className="mb-3 text-[var(--fg-muted)]">
          Welcome to your curated guide to online streaming, media, and digital resources. We organize the most comprehensive collection of verified platforms across movies, TV shows, anime, manga, and live broadcasts.
        </p>
        <p className="text-[var(--fg-muted)]">
          The goal is simple: eliminate endless searching and help you discover high-quality platforms in one unified, sleek dashboard.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-bold">Platform Highlights</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="tbcpl-card flex flex-col p-6">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--accent)]/15 text-[var(--accent)]">
                  <Icon size={20} />
                </div>
                <h3 className="text-base font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-[var(--fg-muted)] leading-relaxed">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
