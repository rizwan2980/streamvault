"use client";

import { useEffect } from "react";
import { Sparkles, Zap, ExternalLink } from "lucide-react";

export const ADSTERRA_SMARTLINK = "https://directyp.org/4/75b2c11d483fabc1ab1cc68718afe1e5";

/**
 * Adsterra Native Banner Component (ID: 31985208)
 */
export function AdsterraNativeBanner({ className = "" }: { className?: string }) {
  useEffect(() => {
    if (document.getElementById("adsterra-native-script")) return;
    const script = document.createElement("script");
    script.id = "adsterra-native-script";
    script.src = "https://bancadeltempoidea.org/21/1204657d1332f2fad98e28b092073587";
    script.async = true;
    script.setAttribute("data-cfasync", "false");
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className={`my-4 sm:my-6 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]/80 p-3 sm:p-4 backdrop-blur-md shadow-lg transition-all hover:border-[var(--border-strong)] ${className}`}
    >
      <div className="mb-2 flex w-full items-center justify-between px-1 text-[10px] font-bold uppercase tracking-wider text-[var(--fg-muted)]">
        <span className="flex items-center gap-1.5 text-[var(--accent)]">
          <Sparkles size={13} /> Sponsored Spotlight
        </span>
        <span className="text-[9px] opacity-60">Verified Partner</span>
      </div>

      <div className="w-full max-w-full overflow-x-hidden flex justify-center items-center min-h-[90px]">
        <div id="container-1204657d1332f2fad98e28b092073587" className="w-full flex justify-center"></div>
      </div>
    </div>
  );
}

/**
 * High-CTR Smartlink VIP Feature Card (Mobile Optimized)
 */
export function AdsterraSmartBanner({ className = "" }: { className?: string }) {
  return (
    <a
      href={ADSTERRA_SMARTLINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative my-3 sm:my-4 flex items-center justify-between gap-2.5 sm:gap-4 overflow-hidden rounded-xl border border-[var(--accent)]/30 bg-gradient-to-r from-[var(--accent)]/15 via-[var(--bg-card)] to-[var(--accent)]/10 p-2.5 sm:p-3.5 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[var(--accent)]/20 ${className}`}
    >
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
        <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)] text-white shadow-sm transition-transform duration-200 group-hover:scale-105">
          <Zap size={18} className="animate-pulse" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-xs sm:text-sm font-extrabold text-[var(--fg)] truncate">VIP 4K Ultra Fast Servers</span>
            <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.5 text-[8px] sm:text-[9px] font-bold text-emerald-400 border border-emerald-500/30 uppercase tracking-wider">
              ONLINE
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-[var(--fg-muted)] truncate">
            Zero-buffering ultra-speed cloud streaming mirror.
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1 sm:gap-1.5 rounded-lg bg-[var(--accent)] px-2.5 py-1 sm:px-3 sm:py-1.5 text-[11px] sm:text-xs font-bold text-white shadow transition-transform group-hover:scale-105">
        <span>VIP</span>
        <ExternalLink size={12} />
      </div>
    </a>
  );
}
