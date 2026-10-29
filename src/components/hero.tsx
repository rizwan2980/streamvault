import Image from "next/image";
import { LatestCommitPill } from "./latest-commit-pill";
import { LiveUsers } from "./live-users";
import { FlagIcon } from "./flag-icon";
import { WavyBackground } from "./wavy-background";

interface Stat {
  label: string;
  value: number | string;
}

interface Props {
  regionCode?: string;
  regionFlag?: string;
  regionName?: string;
  stats?: Stat[];
}

export function Hero({ regionCode, regionFlag, regionName, stats }: Props) {
  return (
    <section
      className="relative mb-6 overflow-hidden rounded-2xl border md:mb-8 md:rounded-3xl"
      style={{
        background:
          "linear-gradient(135deg, color-mix(in oklab, var(--accent) 16%, transparent), transparent 55%), linear-gradient(var(--bg-card), var(--bg-card)), var(--bg)",
        borderColor: "var(--border)",
      }}
    >
      {/* wavy animated backdrop */}
      <WavyBackground
        containerClassName="absolute inset-0"
        waveOpacity={0.35}
        blur={12}
        speed="slow"
        waveWidth={40}
      />

      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 rounded-full opacity-40 blur-3xl"
        style={{ background: "var(--accent)" }}
      />

      <div className="relative grid items-center gap-6 px-5 py-8 md:px-10 md:py-12 lg:grid-cols-[1.4fr_1fr]">
        {/* LEFT: title + tagline */}
        <div className="min-w-0">
          <div className="flex items-center gap-3.5">
            <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-tr from-[var(--accent)] to-purple-400 p-2 text-white shadow-lg shadow-[var(--accent)]/30 ring-1 ring-white/20">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 translate-x-0.5">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                Curated Premium Gateway
              </div>
              <h1 className="mt-1 text-2xl font-extrabold leading-tight tracking-tight md:text-4xl">
                The Ultimate{" "}
                <span className="bg-gradient-to-r from-[var(--accent)] via-pink-400 to-purple-300 bg-clip-text text-transparent">
                  StreamVault
                </span>
              </h1>
            </div>
          </div>
          <p className="mt-3.5 max-w-xl text-sm leading-relaxed text-[var(--fg-muted)] md:text-base">
            Handpicked & verified streaming directories, instant fuzzy search, and multi-region HD catalogs with zero popups from us.
            {regionName && (
              <>
                {" "}Browsing{" "}
                <span className="inline-flex items-center gap-1.5 font-semibold text-[var(--fg)]">
                  {regionFlag && <FlagIcon code={regionFlag} size={16} />}
                  {regionName}
                </span>
                .
              </>
            )}
          </p>

          {/* Mobile-only: stats + pills stay on left so they don't get hidden */}
          <div className="lg:hidden">
            {stats && stats.length > 0 && (
              <div className="mt-5 grid grid-cols-3 gap-2">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-xl border px-3 py-2 text-center"
                    style={{ background: "var(--bg-elev)", borderColor: "var(--border)" }}
                  >
                    <div className="text-lg font-extrabold">{s.value}</div>
                    <div className="text-[10px] uppercase tracking-wider text-[var(--fg-muted)]">{s.label}</div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <LatestCommitPill />
              <LiveUsers region={regionCode} shortLabel={regionFlag} />
            </div>
          </div>
        </div>

        {/* RIGHT: stats + live data */}
        <aside className="hidden flex-col gap-3 lg:flex">
          {stats && stats.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border px-3 py-2.5 text-center"
                  style={{ background: "var(--bg-elev)", borderColor: "var(--border)" }}
                >
                  <div className="text-2xl font-extrabold tabular-nums">{s.value}</div>
                  <div className="mt-0.5 text-[10px] uppercase tracking-wider text-[var(--fg-muted)]">{s.label}</div>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <LatestCommitPill />
            <LiveUsers region={regionCode} />
          </div>
        </aside>
      </div>
    </section>
  );
}
