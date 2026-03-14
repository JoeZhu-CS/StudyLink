"use client"

import { cn } from "@/lib/utils"

interface PromptChipProps {
  text: string
  onClick?: () => void
  selected?: boolean
  className?: string
}

export function PromptChip({
  text,
  onClick,
  selected,
  className,
}: PromptChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "px-3 py-2 rounded-lg text-left text-sm transition-colors",
        selected
          ? "bg-sky-100 text-sky-800 border border-sky-200"
          : "bg-slate-50 text-slate-700 border border-slate-200 hover:bg-slate-100",
        className
      )}
    >
      {text}
    </button>
  )
}
