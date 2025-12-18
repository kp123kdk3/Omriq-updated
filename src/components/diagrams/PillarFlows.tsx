"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  kind: "voice" | "intelligence" | "integrations";
  className?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function PillarFlow({ kind, className = "" }: Props) {
  const reduced = useReducedMotion();

  if (kind === "voice") {
    // Call → Agent → Resolution
    return (
      <div className={className} aria-hidden="true">
        <svg viewBox="0 0 420 110" className="h-auto w-full">
          <path d="M110 55H170" stroke="rgba(15,23,42,0.14)" strokeWidth="2" strokeLinecap="round" />
          <path d="M250 55H310" stroke="rgba(15,23,42,0.14)" strokeWidth="2" strokeLinecap="round" />

          <g>
            <circle cx="70" cy="55" r="22" fill="white" stroke="rgba(15,23,42,0.18)" strokeWidth="1.5" />
            <path
              d="M62 58c8-10 8 10 16 0"
              stroke="rgba(47,91,255,0.55)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
          <g>
            <circle cx="210" cy="55" r="22" fill="white" stroke="rgba(47,91,255,0.55)" strokeWidth="1.75" />
            <circle cx="210" cy="55" r="6" fill="rgba(47,91,255,0.14)" />
          </g>
          <g>
            <circle cx="350" cy="55" r="22" fill="white" stroke="rgba(15,23,42,0.18)" strokeWidth="1.5" />
            <path d="M343 55l4 4 10-10" stroke="rgba(15,23,42,0.62)" strokeWidth="1.5" />
          </g>

          {!reduced ? (
            <motion.circle
              cx="110"
              cy="55"
              r="3"
              fill="rgba(47,91,255,0.28)"
              animate={{ cx: [110, 210, 310] }}
              transition={{ duration: 2.6, ease: "linear", repeat: Infinity }}
            />
          ) : null}
        </svg>
      </div>
    );
  }

  if (kind === "intelligence") {
    // Layers feeding into a core
    return (
      <div className={className} aria-hidden="true">
        <svg viewBox="0 0 420 110" className="h-auto w-full">
          <g opacity="0.95">
            <rect x="46" y="18" width="86" height="22" rx="11" fill="white" stroke="rgba(15,23,42,0.16)" />
            <rect x="46" y="44" width="86" height="22" rx="11" fill="white" stroke="rgba(15,23,42,0.16)" />
            <rect x="46" y="70" width="86" height="22" rx="11" fill="white" stroke="rgba(15,23,42,0.16)" />
          </g>

          <motion.path
            d="M135 29 H185"
            stroke="rgba(47,91,255,0.24)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={false}
            animate={reduced ? {} : { opacity: [0.45, 1, 0.45] }}
            transition={reduced ? {} : { duration: 3.2, ease, repeat: Infinity }}
          />
          <motion.path
            d="M135 55 H185"
            stroke="rgba(47,91,255,0.20)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={false}
            animate={reduced ? {} : { opacity: [0.4, 0.9, 0.4] }}
            transition={reduced ? {} : { duration: 3.6, ease, repeat: Infinity, delay: 0.2 }}
          />
          <motion.path
            d="M135 81 H185"
            stroke="rgba(47,91,255,0.16)"
            strokeWidth="2"
            strokeLinecap="round"
            initial={false}
            animate={reduced ? {} : { opacity: [0.35, 0.85, 0.35] }}
            transition={reduced ? {} : { duration: 4.0, ease, repeat: Infinity, delay: 0.4 }}
          />

          <g>
            <circle cx="240" cy="55" r="24" fill="white" stroke="rgba(47,91,255,0.55)" strokeWidth="1.75" />
            <circle cx="240" cy="55" r="10" fill="rgba(47,91,255,0.12)" />
            <circle cx="240" cy="55" r="16" fill="none" stroke="rgba(15,23,42,0.14)" strokeWidth="1.2" />
          </g>

          <path d="M264 55H360" stroke="rgba(15,23,42,0.14)" strokeWidth="2" strokeLinecap="round" />
          <g>
            <circle cx="385" cy="55" r="20" fill="white" stroke="rgba(15,23,42,0.18)" strokeWidth="1.5" />
            <path
              d="M377 55l4 4 10-10"
              stroke="rgba(15,23,42,0.62)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </div>
    );
  }

  // integrations: systems connect into Omriq (not through)
  return (
    <div className={className} aria-hidden="true">
      <svg viewBox="0 0 420 110" className="h-auto w-full">
        <g>
          {[
            { x: 80, y: 30 },
            { x: 80, y: 80 },
            { x: 160, y: 55 },
          ].map((n, i) => (
            <g key={i}>
              <circle cx={n.x} cy={n.y} r="16" fill="white" stroke="rgba(15,23,42,0.18)" strokeWidth="1.5" />
              <circle cx={n.x} cy={n.y} r="5" fill="rgba(15,23,42,0.10)" />
            </g>
          ))}
        </g>

        <path d="M96 30H210" stroke="rgba(47,91,255,0.20)" strokeWidth="2" strokeLinecap="round" />
        <path d="M96 80H210" stroke="rgba(47,91,255,0.20)" strokeWidth="2" strokeLinecap="round" />
        <path d="M176 55H210" stroke="rgba(47,91,255,0.20)" strokeWidth="2" strokeLinecap="round" />

        <g>
          <circle cx="240" cy="55" r="22" fill="white" stroke="rgba(47,91,255,0.55)" strokeWidth="1.75" />
          <circle cx="240" cy="55" r="7" fill="rgba(47,91,255,0.12)" />
        </g>

        <path d="M262 55H360" stroke="rgba(15,23,42,0.14)" strokeWidth="2" strokeLinecap="round" />
        <g>
          <rect x="365" y="39" width="40" height="32" rx="12" fill="white" stroke="rgba(15,23,42,0.18)" strokeWidth="1.5" />
          <path d="M375 55h20" stroke="rgba(15,23,42,0.22)" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}


