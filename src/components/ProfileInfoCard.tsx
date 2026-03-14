"use client"

import { BadgeCheck } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProfileInfoCardProps {
  name: string
  avatar: string
  verified?: boolean
  academicSummary?: string
  className?: string
}

export function ProfileInfoCard({
  name,
  avatar,
  verified,
  academicSummary,
  className,
}: ProfileInfoCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200",
        className
      )}
    >
      <div className="flex-shrink-0 w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center text-lg font-semibold text-slate-600">
        {avatar}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="font-semibold text-slate-900">{name}</span>
          {verified && (
            <BadgeCheck className="h-5 w-5 text-sky-500 flex-shrink-0" />
          )}
        </div>
        {academicSummary && (
          <p className="text-sm text-slate-600 mt-0.5">{academicSummary}</p>
        )}
      </div>
    </div>
  )
}
