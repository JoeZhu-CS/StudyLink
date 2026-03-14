"use client"

import Link from "next/link"
import { SavedPartner } from "@/lib/mock-data"
import { BadgeCheck } from "lucide-react"
import { cn } from "@/lib/utils"

interface SavedPartnerCardProps {
  partner: SavedPartner
  onRemove?: (id: string) => void
  className?: string
}

export function SavedPartnerCard({ partner, onRemove, className }: SavedPartnerCardProps) {
  return (
    <div
      className={cn(
        "p-4 rounded-xl bg-white border border-slate-200 shadow-sm",
        className
      )}
    >
      <div className="flex gap-3">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-sm font-semibold text-slate-600">
          {partner.avatar}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="font-medium text-slate-900">{partner.name}</span>
            {partner.verified && (
              <BadgeCheck className="h-4 w-4 text-sky-500 flex-shrink-0" />
            )}
          </div>
          <p className="text-sm text-slate-600">
            {partner.sharedCourses.join(", ")}
          </p>
          <p className="text-xs text-slate-500 mt-1">{partner.fitSummary}</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-100">
        <Link
          href={`/chat?partner=${partner.id}`}
          className="flex-1 min-w-[100px] py-2 rounded-lg bg-sky-600 text-white text-sm font-medium text-center hover:bg-sky-700 transition-colors"
        >
          Invite Again
        </Link>
        <Link
          href={`/chat?partner=${partner.id}`}
          className="flex-1 min-w-[80px] py-2 rounded-lg border border-slate-200 text-sm font-medium text-center hover:bg-slate-50 transition-colors"
        >
          Message
        </Link>
        {onRemove && (
          <button
            type="button"
            onClick={() => onRemove(partner.id)}
            className="py-2 px-3 rounded-lg border border-slate-200 text-sm font-medium text-slate-500 hover:bg-slate-50 transition-colors"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  )
}
