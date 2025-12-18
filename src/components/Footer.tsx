import { Container } from "@/components/Container";
import { ArrowUpRightIcon } from "@/components/icons";
import Link from "next/link";

const columns = [
  {
    title: "Company",
    links: [
      { label: "About", href: "#platform" },
      { label: "Contact", href: "#book-demo" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "How It Works", href: "#how-it-works" },
      { label: "AI Agents", href: "#ai-agents" },
      { label: "Integrations", href: "#integrations" },
    ],
  },
  {
    title: "Security",
    links: [
      { label: "Data Isolation", href: "#enterprise" },
      { label: "Reliability", href: "#enterprise" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "#" },
      { label: "Terms", href: "#" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="mt-24 border-t border-[rgba(255,255,255,0.08)] bg-surface-inverse text-white">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/10 text-sm font-semibold">
                O
              </span>
              <span className="text-sm font-semibold tracking-tight">Omriq</span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/70">
              AI voice agents trained for your hotel. Answering calls with professional warmth and integrated into
              hotel operations.
            </p>
            <p className="mt-6 text-xs text-white/50">© {new Date().getFullYear()} Omriq. All rights reserved.</p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <div className="text-xs font-semibold uppercase tracking-wider text-white/60">{col.title}</div>
              <ul className="mt-3 space-y-2 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="group inline-flex items-center gap-2 text-white/70 hover:text-white">
                      <span>{l.label}</span>
                      <ArrowUpRightIcon size={14} className="text-white/40 opacity-0 transition group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </footer>
  );
}


