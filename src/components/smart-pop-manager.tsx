"use client";

import { useEffect } from "react";
import { ADSTERRA_SMARTLINK } from "./adsterra-slot";

const POP_STORAGE_KEY = "sv_last_pop_time";
const POP_COUNT_KEY = "sv_pop_session_count";
const COOLDOWN_MS = 30 * 60 * 1000; // 30 minutes cooldown between pops
const MAX_POPS_PER_SESSION = 1; // Exactly 1 pop-up per user session (Premium Balance)

/**
 * Smart Frequency-Capped Popunder Manager
 * Ensures earning on the 1st deliberate click while keeping the rest
 * of the user session completely ad-popup free, smooth & premium.
 */
export function SmartPopManager() {
  useEffect(() => {
    function handleGlobalClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Ignore search, inputs, theme switchers, close buttons, modal dialogues
      if (
        target.closest("input") ||
        target.closest("textarea") ||
        target.closest("button") ||
        target.closest('[role="dialog"]') ||
        target.closest("nav")
      ) {
        return;
      }

      try {
        const lastPop = parseInt(localStorage.getItem(POP_STORAGE_KEY) || "0", 10);
        const sessionCount = parseInt(sessionStorage.getItem(POP_COUNT_KEY) || "0", 10);
        const now = Date.now();

        // 1. If already triggered in this session, do not show again
        if (sessionCount >= MAX_POPS_PER_SESSION) {
          return;
        }

        // 2. If triggered recently across tabs within cooldown window, skip
        if (now - lastPop < COOLDOWN_MS) {
          return;
        }

        // 3. Trigger sponsored partner link in a background new tab
        const popWindow = window.open(ADSTERRA_SMARTLINK, "_blank");
        if (popWindow) {
          popWindow.blur();
          window.focus();
        }

        // 4. Update timestamps so user is NEVER spammed again
        localStorage.setItem(POP_STORAGE_KEY, now.toString());
        sessionStorage.setItem(POP_COUNT_KEY, (sessionCount + 1).toString());
      } catch {
        // Safe fail
      }
    }

    document.addEventListener("click", handleGlobalClick, { passive: true });
    return () => {
      document.removeEventListener("click", handleGlobalClick);
    };
  }, []);

  return null;
}

