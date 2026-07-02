import type { ReactNode } from "react";
import { Label } from "../atoms/Label";

interface FormFieldProps {
  label: string;
  children: ReactNode;
  className?: string;
}

export function FormField({ label, children, className = "" }: FormFieldProps) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <Label>{label}</Label>
      {children}
    </label>
  );
}
