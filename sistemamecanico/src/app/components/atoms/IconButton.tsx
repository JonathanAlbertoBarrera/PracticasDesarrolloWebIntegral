import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "default" | "danger";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: Variant;
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  default:
    "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700",
  danger:
    "text-neutral-400 hover:bg-red-50 hover:text-red-600",
};

export function IconButton({
  label,
  variant = "default",
  className = "",
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`flex h-8 w-8 items-center justify-center rounded-lg transition ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
