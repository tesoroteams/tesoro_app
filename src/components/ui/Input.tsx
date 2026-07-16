import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface FieldProps {
  label?: string;
  hint?: string;
  error?: string;
}

export function Input({
  label,
  hint,
  error,
  className = "",
  id,
  ...rest
}: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1.5 block text-sm font-medium text-ink-200">
          {label}
        </span>
      )}
      <input
        id={id}
        className={`input-base ${error ? "border-rose-500/60 focus:ring-rose-500/20" : ""} ${className}`}
        {...rest}
      />
      {error ? (
        <span className="mt-1 block text-xs text-rose-300">{error}</span>
      ) : hint ? (
        <span className="mt-1 block text-xs text-ink-400">{hint}</span>
      ) : null}
    </label>
  );
}

export function Textarea({
  label,
  hint,
  error,
  className = "",
  ...rest
}: FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1.5 block text-sm font-medium text-ink-200">
          {label}
        </span>
      )}
      <textarea
        className={`input-base min-h-[110px] resize-y ${error ? "border-rose-500/60" : ""} ${className}`}
        {...rest}
      />
      {error ? (
        <span className="mt-1 block text-xs text-rose-300">{error}</span>
      ) : hint ? (
        <span className="mt-1 block text-xs text-ink-400">{hint}</span>
      ) : null}
    </label>
  );
}
