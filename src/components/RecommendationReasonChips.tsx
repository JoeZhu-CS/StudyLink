"use client"

import { RecommendationReason, RECOMMENDATION_LABELS } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

interface RecommendationReasonChipsProps {
  reasons: RecommendationReason[]
  className?: string
}

export function RecommendationReasonChips({
  reasons,
  className,
}: RecommendationReasonChipsProps) {
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {reasons.map((reason) => (
        <span
          key={reason}
          className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-sky-50 text-sky-700 border border-sky-100"
        >
          {RECOMMENDATION_LABELS[reason]}
        </span>
      ))}
    </div>
  )
}
