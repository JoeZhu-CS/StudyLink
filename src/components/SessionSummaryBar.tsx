"use client"

import { cn } from "@/lib/utils"

interface SessionSummaryBarProps {
  location: string
  course: string
  studyStyle: string
  goal: string
  className?: string
}

export function SessionSummaryBar({
  location,
  course,
  studyStyle,
  goal,
  className,
}: SessionSummaryBarProps) {
  return (
    <div
      className={cn(
        "px-4 py-3 bg-slate-50 border-b border-slate-200 space-y-1",
        className
      )}
    >
      <p className="text-sm font-medium text-slate-800">
        {location} · {course}
      </p>
      <p className="text-xs text-slate-600">
        {studyStyle} · {goal}
      </p>
    </div>
  )
}
