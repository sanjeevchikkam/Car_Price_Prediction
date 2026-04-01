import React from "react";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({ label, children, className }: FormFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label className="text-sm font-medium text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}

interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function NumberInput({ className, ...props }: NumberInputProps) {
  return (
    <input
      type="number"
      step="any"
      className={cn(
        "w-full h-10 px-3 rounded-md border border-input bg-surface-elevated text-foreground text-sm",
        "focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary transition-colors",
        className
      )}
      {...props}
    />
  );
}

interface SelectInputProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
}

export function SelectInput({ options, className, ...props }: SelectInputProps) {
  return (
    <select
      className={cn(
        "w-full h-10 px-3 rounded-md border border-input bg-surface-elevated text-foreground text-sm",
        "focus:outline-none focus:ring-2 focus:ring-ring/40 focus:border-primary transition-colors",
        className
      )}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  );
}
