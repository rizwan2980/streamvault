import Link from "next/link";

export function Footer() {
  return (
    <footer
      className="mt-20 border-t backdrop-blur-md"
      style={{ borderColor: "var(--border)", background: "color-mix(in oklab, var(--bg-card) 60%, transparent)" }}
    >
      <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-6 px-4 py-8 text-sm text-[var(--fg-muted)] md:flex-row md:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-tr from-[var(--accent)] to-purple-400 text-white shadow-sm">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 translate-x-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="font-bold text-[var(--fg)]">Stream<span className="bg-gradient-to-r from-[var(--accent)] to-pink-400 bg-clip-text text-transparent">Vault</span></span>
          <span className="text-xs text-[var(--fg-muted)]">· The Curated Streaming Directory</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Link href="/" className="hover:text-[var(--fg)] transition-colors">Home</Link>
          <Link href="/about" className="hover:text-[var(--fg)] transition-colors">About</Link>
          <Link href="/request" className="hover:text-[var(--fg)] transition-colors">Request a Site</Link>
          <Link href="/dmca" className="hover:text-[var(--fg)] transition-colors">DMCA Disclaimer</Link>
        </div>

        <div className="flex flex-col items-center gap-1 text-center md:items-end md:text-right text-xs">
          <div>Engineered with 💜 for cinema & stream lovers</div>
          <div className="opacity-70">© {new Date().getFullYear()} StreamVault. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
