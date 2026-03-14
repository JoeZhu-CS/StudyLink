"use client"

import { cn } from "@/lib/utils"

interface AppShellProps {
  children: React.ReactNode
  className?: string
}

export function AppShell({ children, className }: AppShellProps) {
  return (
    <div className={cn("min-h-screen bg-[#f5f7fa]", className)}>
      <div className="mx-auto w-full max-w-[420px] min-h-screen shadow-2xl shadow-slate-300/50 border-x border-slate-200/80 bg-white">
        {children}
      </div>
    </div>
  )
}
