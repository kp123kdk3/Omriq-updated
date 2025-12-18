"use client";

import { Container } from "@/components/Container";
import {
  AgentIcon,
  EnterpriseIcon,
  FlowIcon,
  IntegrationsIcon,
  InvestorsIcon,
  PlatformIcon,
} from "@/components/icons";
import { ButtonLink } from "@/components/ui/Button";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const navItems = [
  { label: "Platform", href: "#platform", icon: PlatformIcon },
  { label: "How It Works", href: "#how-it-works", icon: FlowIcon },
  { label: "AI Agents", href: "#ai-agents", icon: AgentIcon },
  { label: "Integrations", href: "#integrations", icon: IntegrationsIcon },
  { label: "Enterprise", href: "#enterprise", icon: EnterpriseIcon },
  { label: "Investors", href: "#investors", icon: InvestorsIcon },
] as const;

export function Navbar() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ease = [0.22, 1, 0.36, 1] as const;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const panelMotion = useMemo(() => {
    if (reduced) return {};
    return {
      initial: { opacity: 0, y: -8 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -6 },
      transition: { duration: 0.22, ease },
    };
  }, [ease, reduced]);

  return (
    <div className="sticky top-0 z-50">
      <div
        className={[
          "border-b",
          scrolled ? "border-border bg-background/85 backdrop-blur" : "border-transparent bg-transparent",
        ].join(" ")}
      >
        <Container className="py-3">
          <div className="flex items-center justify-between gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-md px-2 py-1 text-sm font-semibold tracking-tight hover:bg-surface-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(47,91,255,0.45)]"
              aria-label="Omriq home"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border bg-surface text-[12px] font-semibold text-foreground">
                O
              </span>
              <span>Omriq</span>
            </Link>

            <div className="hidden items-center gap-6 md:flex">
              <nav aria-label="Primary">
                <ul className="flex items-center gap-5 text-sm text-muted">
                  {navItems.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="rounded-md px-2 py-1 transition hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(47,91,255,0.45)]"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <ButtonLink href="#book-demo" variant="primary" size="sm">
                Book Demo
              </ButtonLink>
            </div>

            <button
              type="button"
              className="inline-flex h-10 items-center justify-center rounded-full border border-border bg-surface px-4 text-sm font-medium text-foreground hover:bg-surface-2 md:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
            >
              <span className="sr-only">Toggle navigation</span>
              <span>{open ? "Close" : "Menu"}</span>
            </button>
          </div>
        </Container>
      </div>

      {open ? (
        <motion.div {...panelMotion} id="mobile-nav" className="border-b border-border bg-background md:hidden">
          <Container className="py-4">
            <nav aria-label="Mobile">
              <ul className="flex flex-col gap-2 text-[15px]">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted hover:bg-surface-2 hover:text-foreground"
                      onClick={() => setOpen(false)}
                    >
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl border border-border bg-white text-muted">
                        <item.icon size={18} />
                      </span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-4">
              <ButtonLink href="#book-demo" variant="primary" className="w-full justify-center" size="md">
                Book Demo
              </ButtonLink>
            </div>
          </Container>
        </motion.div>
      ) : null}
    </div>
  );
}


