import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  tone?: "sky" | "dark" | "light" | "outline";
  className?: string;
}

const toneClasses = {
  sky: "border border-sky-400/30 bg-sky-400/10 text-sky-200",
  dark: "bg-slate-950/90 text-white",
  light: "bg-white text-slate-900 shadow-sm shadow-slate-900/10",
  outline: "border border-slate-200 bg-white text-slate-700",
};

export function Badge({ children, tone = "sky", className = "" }: Props) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${toneClasses[tone]} ${className}`}
    >
      {children}
    </span>
  );
}