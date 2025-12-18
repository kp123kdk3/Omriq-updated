import type { ReactNode, SVGProps } from "react";

export type IconTone = "muted" | "default" | "accent" | "danger";

export type IconProps = Omit<SVGProps<SVGSVGElement>, "children"> & {
  title?: string;
  size?: number;
  tone?: IconTone;
  children?: ReactNode;
};

export function IconBase({
  title,
  size = 24,
  tone = "default",
  className = "",
  ...props
}: IconProps) {
  // Geometry rules:
  // - 24x24 viewBox
  // - consistent stroke width
  // - round caps/joins
  // - no fills by default
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={[
        tone === "muted"
          ? "text-[color:var(--omriq-muted)]"
          : tone === "accent"
            ? "text-[color:var(--omriq-blue)]"
            : tone === "danger"
              ? "text-red-600"
              : "text-foreground",
        className,
      ].join(" ")}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {props.children}
    </svg>
  );
}


