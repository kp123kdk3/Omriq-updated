"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

type Size = "sm" | "md";
type Variant = "muted" | "accent";

const BAR_COUNT = 12;

function heightsFor(index: number) {
  // Deterministic, non-random pattern to avoid flicker.
  // Returns values in [0..1] representing relative bar height.
  const patterns: number[][] = [
    [0.25, 0.55, 0.35, 0.7, 0.4, 0.6, 0.3],
    [0.2, 0.45, 0.3, 0.6, 0.35, 0.5, 0.25],
    [0.3, 0.6, 0.38, 0.75, 0.42, 0.62, 0.32],
    [0.18, 0.42, 0.26, 0.58, 0.32, 0.48, 0.22],
  ];
  return patterns[index % patterns.length];
}

export function VoiceBars({
  active = false,
  size = "md",
  variant = "muted",
  className = "",
}: {
  active?: boolean;
  size?: Size;
  variant?: Variant;
  className?: string;
}) {
  const reduced = useReducedMotion();

  const dims = useMemo(() => {
    if (size === "sm") {
      return { h: 14, w: 2, gap: 2 };
    }
    return { h: 18, w: 2, gap: 2 };
  }, [size]);

  const baseColor = variant === "accent" ? "bg-[rgba(47,91,255,0.28)]" : "bg-[rgba(15,23,42,0.18)]";
  const activeColor = variant === "accent" ? "bg-[rgba(47,91,255,0.55)]" : "bg-[rgba(47,91,255,0.45)]";

  // Only a few bars get accent when active, to stay restrained.
  const hotIdx = new Set([4, 5, 6]);

  return (
    <div className={`flex items-end ${className}`} style={{ gap: dims.gap }}>
      {Array.from({ length: BAR_COUNT }, (_, i) => {
        const isHot = hotIdx.has(i);
        const maxPx = dims.h;
        const minPx = Math.max(4, Math.round(maxPx * 0.28));

        const idle = minPx + ((i % 5) / 5) * (maxPx - minPx) * 0.6;
        const seq = heightsFor(i).map((t) => minPx + t * (maxPx - minPx) * (active ? 1 : 0.65));

        return (
          <motion.div
            key={i}
            className={[
              "rounded-full",
              active && isHot ? activeColor : baseColor,
              "transition-colors",
            ].join(" ")}
            style={{ width: dims.w, height: reduced ? idle : idle }}
            initial={false}
            animate={
              reduced
                ? { height: idle }
                : active
                  ? { height: seq }
                  : { height: [idle, idle + 2, idle] }
            }
            transition={
              reduced
                ? { duration: 0 }
                : active
                  ? { duration: 2.4, ease: "easeInOut", repeat: Infinity, delay: i * 0.03 }
                  : { duration: 3.2, ease: "easeInOut", repeat: Infinity, delay: i * 0.02 }
            }
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}


