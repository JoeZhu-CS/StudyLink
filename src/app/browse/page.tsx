"use client"

import { TopBar } from "@/components/TopBar"
import { SessionCardCollapsed } from "@/components/SessionCardCollapsed"
import { recommendedSessions } from "@/lib/mock-data"

export default function BrowsePage() {
  return (
    <div className="flex flex-col min-h-[780px]">
      <TopBar title="Browse sessions" showBack backHref="/home" />

      <main className="flex-1 overflow-y-auto px-4 pb-8">
        <p className="text-sm text-slate-600 mt-4 mb-6">
          Browse all available study sessions
        </p>
        <div className="space-y-3">
          {recommendedSessions.map((session) => (
            <SessionCardCollapsed key={session.id} session={session} />
          ))}
        </div>
      </main>
    </div>
  )
}
