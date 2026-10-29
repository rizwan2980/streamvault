"use client";

// Ultra-lightweight CSS-only gradient background.
// Replaced the heavy WebGL shader loop to eliminate high GPU/RAM memory consumption
// and prevent "Not enough memory to open this page" browser crashes.

export function SiteShaderBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Soft atmospheric gradient orbs using GPU-accelerated CSS */}
      <div
        className="absolute -top-[20%] left-1/2 h-[600px] w-[800px] -translate-x-1/2 rounded-full opacity-20 blur-[120px]"
        style={{
          background: "radial-gradient(circle, var(--accent, #7c3aed) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-[40%] -left-[10%] h-[500px] w-[600px] rounded-full opacity-15 blur-[140px]"
        style={{
          background: "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute top-[60%] -right-[10%] h-[500px] w-[600px] rounded-full opacity-15 blur-[140px]"
        style={{
          background: "radial-gradient(circle, var(--accent, #7c3aed) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
