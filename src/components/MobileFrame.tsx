"use client"

import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BottomNav } from "./BottomNav"

interface MobileFrameProps {
  children: React.ReactNode
  className?: string
}

const NAV_PATHS = ["/home", "/chat", "/profile", "/browse", "/saved-partners"]

export function MobileFrame({ children, className }: MobileFrameProps) {
  const pathname = usePathname()
  const showNav = NAV_PATHS.some((p) => pathname.startsWith(p))

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center p-4 md:p-8">
      <div
        className={cn(
          "w-full max-w-[420px] h-[780px] max-h-[90vh] rounded-[2.5rem] overflow-hidden shadow-xl border-4 border-slate-300 bg-white flex flex-col",
          className
        )}
      >
        <div className="flex-1 overflow-y-auto overflow-x-hidden">{children}</div>
        {showNav && <BottomNav />}
      </div>
    </div>
  )
}
