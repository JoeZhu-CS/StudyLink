"use client"

import Link from "next/link"
import { AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface ErrorStateCardProps {
  title?: string
  message?: string
  onRetry?: () => void
  className?: string
}

export function ErrorStateCard({
  title = "Sorry! Something went wrong!",
  message,
  onRetry,
  className,
}: ErrorStateCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-[200px] p-6 text-center",
        className
      )}
    >
      <AlertCircle className="h-12 w-12 text-slate-300 mb-4" />
      <h2 className="text-lg font-semibold text-slate-800">{title}</h2>
      {message && (
        <p className="text-sm text-slate-500 mt-2 max-w-xs">{message}</p>
      )}
      <div className="mt-4">
        {onRetry ? (
          <button
            onClick={onRetry}
            className="px-6 py-2.5 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700"
          >
            Try Again
          </button>
        ) : (
          <Link
            href="/home"
            className="inline-block px-6 py-2.5 rounded-lg bg-sky-600 text-white font-medium hover:bg-sky-700"
          >
            Try Again
          </Link>
        )}
      </div>
    </div>
  )
}
