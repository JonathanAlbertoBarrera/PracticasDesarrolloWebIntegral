import type { LabelHTMLAttributes } from "react";

export function Label({
  className = "",
  children,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <span
      className={`text-sm font-medium text-neutral-700 ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
