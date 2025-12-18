"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";

type DiagramConfig = {
  vb: { w: number; h: number };
  stroke: { base: string; soft: string; accent: string };
  sw: { thin: number; thick: number };
  x: { inStart: number; inEnd: number; core: number; outStart: number; outNode: number };
  y: { a: number; b: number; c: number; mid: number };
};

const desktop: DiagramConfig = {
  vb: { w: 720, h: 240 },
  stroke: {
    base: "rgba(15,23,42,0.14)",
    soft: "rgba(15,23,42,0.08)",
    accent: "rgba(47,91,255,0.42)",
  },
  sw: { thin: 1.75, thick: 1.75 },
  x: { inStart: 72, inEnd: 292, core: 360, outStart: 428, outNode: 600 },
  y: { a: 84, b: 120, c: 156, mid: 120 },
};

const mobile: DiagramConfig = {
  vb: { w: 360, h: 240 },
  stroke: {
    base: "rgba(15,23,42,0.14)",
    soft: "rgba(15,23,42,0.08)",
    accent: "rgba(47,91,255,0.42)",
  },
  sw: { thin: 1.75, thick: 1.75 },
  x: { inStart: 28, inEnd: 138, core: 180, outStart: 222, outNode: 314 },
  y: { a: 90, b: 120, c: 150, mid: 120 },
};

function curve(x1: number, y1: number, x2: number, y2: number) {
  const dx = (x2 - x1) * 0.62;
  return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
}

function useDashDraw(reduced: boolean) {
  return useMemo(() => {
    if (reduced) return {};
    return {
      initial: { pathLength: 0, opacity: 0.85 },
      animate: { pathLength: 1, opacity: 1 },
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
    };
  }, [reduced]);
}

export function HeroFlowDiagram({
  variant = "desktop",
  className = "",
}: {
  variant?: "desktop" | "mobile";
  className?: string;
}) {
  const reduced = useReducedMotion();
  const cfg = variant === "mobile" ? mobile : desktop;
  const draw = useDashDraw(!!reduced);

  const inPaths = [
    curve(cfg.x.inStart, cfg.y.a, cfg.x.inEnd, cfg.y.a),
    curve(cfg.x.inStart, cfg.y.b, cfg.x.inEnd, cfg.y.b),
    curve(cfg.x.inStart, cfg.y.c, cfg.x.inEnd, cfg.y.c),
  ];

  const toCore = [
    curve(cfg.x.inEnd, cfg.y.a, cfg.x.core - 42, cfg.y.mid - 10),
    curve(cfg.x.inEnd, cfg.y.b, cfg.x.core - 42, cfg.y.mid),
    curve(cfg.x.inEnd, cfg.y.c, cfg.x.core - 42, cfg.y.mid + 10),
  ];

  const toOut = [
    curve(cfg.x.core + 42, cfg.y.mid - 10, cfg.x.outNode - 18, cfg.y.a),
    curve(cfg.x.core + 42, cfg.y.mid, cfg.x.outNode - 18, cfg.y.b),
    curve(cfg.x.core + 42, cfg.y.mid + 10, cfg.x.outNode - 18, cfg.y.c),
  ];

  return (
    <svg
      viewBox={`0 0 ${cfg.vb.w} ${cfg.vb.h}`}
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`flowFade-${variant}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={cfg.stroke.base} />
          <stop offset="0.55" stopColor={cfg.stroke.accent} />
          <stop offset="1" stopColor={cfg.stroke.base} />
        </linearGradient>
        <filter id={`coreGlow-${variant}`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0.12  0 1 0 0 0.36  0 0 1 0 1  0 0 0 0.55 0"
          />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* optional faint grid */}
      <g opacity="0.16">
        {[...Array(9)].map((_, i) => (
          <path
            key={`v-${i}`}
            d={`M ${i * (cfg.vb.w / 8)} 0 V ${cfg.vb.h}`}
            stroke={cfg.stroke.soft}
            strokeWidth="1"
          />
        ))}
        {[...Array(5)].map((_, i) => (
          <path
            key={`h-${i}`}
            d={`M 0 ${i * (cfg.vb.h / 4)} H ${cfg.vb.w}`}
            stroke={cfg.stroke.soft}
            strokeWidth="1"
          />
        ))}
      </g>

      {/* input streams */}
      {inPaths.map((d, i) => (
        <motion.path
          key={`in-${i}`}
          d={d}
          stroke={cfg.stroke.base}
          strokeWidth={cfg.sw.thin}
          fill="none"
          {...draw}
          transition={reduced ? undefined : { ...(draw as any).transition, delay: 0.05 * i }}
        />
      ))}

      {/* converge into core */}
      {toCore.map((d, i) => (
        <motion.path
          key={`toCore-${i}`}
          d={d}
          stroke={`url(#flowFade-${variant})`}
          strokeWidth={cfg.sw.thick}
          fill="none"
          {...draw}
          transition={reduced ? undefined : { ...(draw as any).transition, delay: 0.18 + 0.05 * i }}
        />
      ))}

      {/* core node */}
      <g>
        <circle
          cx={cfg.x.core}
          cy={cfg.y.mid}
          r={variant === "mobile" ? 28 : 34}
          fill="white"
          stroke="rgba(15,23,42,0.18)"
          strokeWidth="1.75"
        />
        <circle
          cx={cfg.x.core}
          cy={cfg.y.mid}
          r={variant === "mobile" ? 20 : 26}
          fill="rgba(47,91,255,0.03)"
          stroke="rgba(47,91,255,0.55)"
          strokeWidth="1.75"
        />
        {!reduced ? (
          <motion.circle
            cx={cfg.x.core}
            cy={cfg.y.mid}
            r={variant === "mobile" ? 24 : 30}
            fill="none"
            stroke="rgba(47,91,255,0.18)"
            strokeWidth="2"
            filter={`url(#coreGlow-${variant})`}
            animate={{ opacity: [0.35, 0.65, 0.35] }}
            transition={{ duration: 8, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
          />
        ) : null}
      </g>

      {/* out to outcomes */}
      {toOut.map((d, i) => (
        <motion.path
          key={`toOut-${i}`}
          d={d}
          stroke={`url(#flowFade-${variant})`}
          strokeWidth={cfg.sw.thick}
          fill="none"
          {...draw}
          transition={reduced ? undefined : { ...(draw as any).transition, delay: 0.36 + 0.05 * i }}
        />
      ))}

      {/* outcome nodes */}
      {[cfg.y.a, cfg.y.b, cfg.y.c].map((y, i) => (
        <g key={`out-${i}`}>
          <circle
            cx={cfg.x.outNode}
            cy={y}
            r={variant === "mobile" ? 16 : 18}
            fill="white"
            stroke="rgba(15,23,42,0.18)"
            strokeWidth="1.75"
          />
          <circle cx={cfg.x.outNode} cy={y} r={6} fill="rgba(47,91,255,0.14)" />
        </g>
      ))}

      {/* single signal dot */}
      {!reduced ? (
        <motion.circle
          r="3"
          fill="rgba(47,91,255,0.30)"
          initial={false}
          animate={{
            cx: [cfg.x.inStart + 10, cfg.x.inEnd, cfg.x.core, cfg.x.outNode],
            cy: [cfg.y.b, cfg.y.b, cfg.y.mid, cfg.y.b],
            opacity: [0, 1, 1, 0],
          }}
          transition={{ duration: 9.5, repeat: Infinity, ease: "linear" }}
        />
      ) : null}
    </svg>
  );
}


