"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(47,91,255,0.45)] focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "border-transparent bg-accent text-white hover:bg-[color:var(--omriq-blue-ink)]",
  secondary:
    "border-border bg-surface text-foreground hover:bg-surface-2 hover:border-[rgba(15,23,42,0.14)]",
  ghost:
    "border-transparent bg-transparent text-foreground hover:bg-surface-2 hover:border-border",
};

const sizes: Record<Size, string> = {
  sm: "h-9",
  md: "h-11 px-5 text-[15px]",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  return (
    <Link href={href} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  type = "button",
  onClick,
  disabled,
  variant = "primary",
  size = "md",
  className = "",
}: {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}


