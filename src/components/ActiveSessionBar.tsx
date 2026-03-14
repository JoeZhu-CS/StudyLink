"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface ActiveSessionBarProps {
  location: string
  time: string
  status?: "waiting" | "matched" | "confirmed"
  onCancel?: () => void
  className?: string
}

const statusLabels = {
  waiting: "Waiting for match",
  matched: "Match found",
  confirmed: "Confirmed",
}

export function ActiveSessionBar({
  location,
  time,
  status = "waiting",
  onCancel,
  className,
}: ActiveSessionBarProps) {
  return (
    <div
      className={cn(
        "mx-4 my-2 p-3 rounded-xl bg-sky-50 border border-sky-100",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div>
          <p className="text-xs font-medium text-sky-700 uppercase tracking-wide">
            My Session
          </p>
          <p className="text-sm font-medium text-slate-800">
            {location} · {time}
          </p>
        </div>
        <span className="flex-shrink-0 px-2 py-1 rounded-md text-xs font-medium bg-sky-100 text-sky-800">
          {statusLabels[status]}
        </span>
      </div>
      <div className="flex gap-2 mt-2">
        <Link
          href="/new-session"
          className="flex-1 py-2 rounded-lg border border-sky-200 text-sm font-medium text-center hover:bg-sky-100/50 transition-colors"
        >
          Edit
        </Link>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-2 rounded-lg border border-slate-200 text-sm font-medium hover:bg-slate-100 transition-colors"
        >
          Cancel session
        </button>
      </div>
    </div>
  )
}
