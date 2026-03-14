"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { TopBar } from "@/components/TopBar"
import { Loader2 } from "lucide-react"

export default function MatchingPage() {
  const router = useRouter()

  useEffect(() => {
    const t = setTimeout(() => router.push("/match-found"), 3000)
    return () => clearTimeout(t)
  }, [router])
  return (
    <div className="flex flex-col min-h-[780px]">
      <TopBar showBack backHref="/home" rightIcons="none" />

      <main className="flex-1 flex flex-col items-center justify-center px-6">
        <Loader2 className="h-12 w-12 text-sky-500 animate-spin mb-6" />
        <h2 className="text-xl font-semibold text-slate-800">Finding a Match</h2>
        <p className="text-slate-600 text-center mt-2 max-w-xs">
          Looking for study partners who match your course, goals, and study style...
        </p>
      </main>
    </div>
  )
}
