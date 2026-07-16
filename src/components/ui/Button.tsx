import type { ButtonHTMLAttributes, ReactNode } from "react";
import Icon, { type IconName } from "./Icon";

type Variant = "primary" | "secondary" | "ghost" | "danger" | "subtle";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
  iconRight?: IconName;
  children?: ReactNode;
}

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-beat-500 text-white hover:bg-beat-600 shadow-[0_6px_20px_-6px_rgba(59,130,246,0.5)]",
  secondary: "bg-ink-800 text-ink-50 hover:bg-ink-700 border border-ink-100/20",
  ghost: "text-ink-300 hover:bg-ink-100/5 hover:text-ink-100",
  danger: "bg-rose-500/90 text-white hover:bg-rose-500",
  subtle: "bg-ink-100/5 text-ink-100 hover:bg-ink-100/10 border border-ink-100/20",
};

const SIZES: Record<Size, string> = {
  sm: "text-xs px-3 py-1.5 gap-1.5 rounded-lg",
  md: "text-sm px-4 py-2.5 gap-2 rounded-xl",
  lg: "text-base px-5 py-3 gap-2 rounded-xl",
};

const ICON_SIZE: Record<Size, string> = {
  sm: "h-3.5 w-3.5",
  md: "h-4 w-4",
  lg: "h-5 w-5",
};

export default function Button({
  variant = "primary",
  size = "md",
  icon,
  iconRight,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center font-medium transition-all disabled:cursor-not-allowed disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-beat-500/40 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...rest}
    >
      {icon && <Icon name={icon} className={ICON_SIZE[size]} />}
      {children}
      {iconRight && <Icon name={iconRight} className={ICON_SIZE[size]} />}
    </button>
  );
}
