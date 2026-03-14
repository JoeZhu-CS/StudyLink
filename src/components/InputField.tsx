"use client"

import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface InputFieldProps {
  label?: string
  helperText?: string
  placeholder?: string
  icon?: LucideIcon
  value?: string
  onChange?: (value: string) => void
  disabled?: boolean
  type?: "text" | "email" | "password"
  className?: string
  id?: string
}

export function InputField({
  label,
  helperText,
  placeholder,
  icon: Icon,
  value,
  onChange,
  disabled,
  type = "text",
  className,
  id,
}: InputFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      {helperText && (
        <p className="text-xs text-slate-500">{helperText}</p>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            <Icon className="h-4 w-4" />
          </div>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/25 focus:border-sky-400 transition-shadow disabled:opacity-50 disabled:cursor-not-allowed",
            Icon && "pl-10"
          )}
        />
      </div>
    </div>
  )
}
