"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X, Search } from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";
import { CountrySelect } from "./country-select";
import { cn } from "@/lib/utils";
import { useCommandPalette } from "./command-palette";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/request", label: "Request" },
  { href: "/dmca", label: "DMCA" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { open: openPalette } = useCommandPalette();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <nav
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-xl transition-all",
        scrolled && "shadow-[0_4px_24px_rgba(0,0,0,0.25)]",
      )}
      style={{
        background: "color-mix(in oklab, var(--bg) 96%, transparent)",
        borderColor: scrolled ? "var(--border-strong)" : "var(--border)",
      }}
    >
      <div className="mx-auto flex max-w-[1600px] items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-4 md:px-6 md:py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 font-bold tracking-tight group">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-[var(--accent)] to-purple-400 p-1 text-white shadow-md shadow-[var(--accent)]/25 transition-transform duration-200 group-hover:scale-105">
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 translate-x-0.5">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-base font-black tracking-tight text-[var(--fg)]">Stream<span className="bg-gradient-to-r from-[var(--accent)] to-pink-400 bg-clip-text text-transparent">Vault</span></span>
            <span className="rounded-md bg-[var(--accent)]/15 px-1.5 py-0.5 text-[9px] font-bold tracking-widest text-[var(--accent)] uppercase border border-[var(--accent)]/30">PRO</span>
          </div>
        </Link>

        <ul className="ml-2 hidden items-center gap-1 md:flex">
          {NAV.map((n) => {
            const active = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
            return (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm transition-colors",
                    active
                      ? "bg-[color-mix(in_oklab,var(--accent)_20%,var(--bg-elev))] text-[var(--fg)] ring-1 ring-[var(--border-strong)]"
                      : "text-[var(--fg-muted)] hover:text-[var(--fg)]",
                  )}
                >
                  {n.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
          {/* Desktop pill search */}
          <button
            type="button"
            onClick={openPalette}
            aria-label="Search"
            className="tbcpl-pill hidden h-9 items-center gap-2 px-3 text-sm lg:inline-flex"
          >
            <Search size={14} />
            <span className="text-[var(--fg-muted)]">Search sites…</span>
            <kbd
              className="ml-2 rounded border px-1.5 py-0.5 text-[10px] font-mono"
              style={{ borderColor: "var(--border)" }}
            >
              ⌘K
            </kbd>
          </button>
          {/* Compact search icon (small + medium screens) */}
          <button
            type="button"
            onClick={openPalette}
            aria-label="Search"
            className="tbcpl-pill inline-flex h-9 w-9 items-center justify-center lg:hidden"
          >
            <Search size={16} />
          </button>

          {/* Country select: hidden on phones (lives below the hero on mobile), shown md+ in navbar */}
          <div className="hidden md:block">
            <CountrySelect />
          </div>


          {/* VIP Fast Stream Direct Link Button */}
          <a
            href="https://directyp.org/4/75b2c11d483fabc1ab1cc68718afe1e5"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-3 py-1 text-xs font-bold text-amber-300 border border-amber-500/30 hover:border-amber-400 hover:from-amber-500/30 hover:to-orange-500/30 transition-all shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span>VIP Stream</span>
          </a>

          <ThemeSwitcher />

          {/* Mobile menu toggle */}
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            className="tbcpl-pill inline-flex h-9 w-9 items-center justify-center md:hidden"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="border-t md:hidden"
          style={{ borderColor: "var(--border)", background: "var(--bg-elev)" }}
        >
          <div className="mx-auto flex max-w-[1600px] flex-col gap-3 px-4 py-3">
            <ul className="flex flex-col gap-1">
              {NAV.map((n) => {
                const active = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
                return (
                  <li key={n.href}>
                    <Link
                      href={n.href}
                      className={cn(
                        "block rounded-lg px-3 py-2.5 text-sm transition-colors",
                        active
                          ? "bg-[color-mix(in_oklab,var(--accent)_20%,var(--bg-elev))] text-[var(--fg)] ring-1 ring-[var(--border-strong)]"
                          : "text-[var(--fg-muted)] hover:bg-[var(--bg-card-hover)] hover:text-[var(--fg)]",
                      )}
                    >
                      {n.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <a
                  href="https://directyp.org/4/75b2c11d483fabc1ab1cc68718afe1e5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-lg bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 px-3 py-2.5 text-sm font-bold text-amber-300 mt-2 shadow-sm"
                >
                  <span className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    VIP 4K Fast Stream
                  </span>
                  <span className="text-xs opacity-75">→</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
