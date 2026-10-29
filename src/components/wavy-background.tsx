"use client";

import { cn } from "@/lib/utils";

interface Props {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
}

// Lightweight CSS-accelerated backdrop with zero memory leaks and zero CPU overhead
export function WavyBackground({
  children,
  className,
  containerClassName,
}: Props) {
  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse at 80% 20%, var(--accent, #7c3aed) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, #3b82f6 0%, transparent 50%)",
        }}
      />
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
}
