"use client"

import { cn } from "@/lib/utils"

interface EmptyStateCardProps {
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export function EmptyStateCard({
  title,
  description,
  action,
  className,
}: EmptyStateCardProps) {
  return (
    <div
      className={cn(
        "p-6 rounded-xl bg-slate-50 border border-slate-200 text-center",
        className
      )}
    >
      <p className="font-medium text-slate-700">{title}</p>
      {description && (
        <p className="text-sm text-slate-500 mt-1">{description}</p>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
