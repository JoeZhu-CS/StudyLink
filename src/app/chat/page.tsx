"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { TopBar } from "@/components/TopBar"
import { SessionSummaryBar } from "@/components/SessionSummaryBar"
import { ChatComposer } from "@/components/ChatComposer"
import { chatPrompts, STUDY_STYLES } from "@/lib/mock-data"
import { useAppStore } from "@/context/AppStoreContext"
import { recommendedSessions } from "@/lib/mock-data"

const TABS = [
  { id: "opening", label: "Opening" },
  { id: "alignment", label: "Alignment" },
  { id: "time-setting", label: "Time-setting" },
  { id: "follow-up", label: "Follow-up" },
  { id: "refusal", label: "Refusal" },
] as const

const DEFAULT_CHAT_PARTNER = "1"

export default function ChatPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab") as string | null
  const partnerId = searchParams.get("partner") ?? DEFAULT_CHAT_PARTNER
  const activeTab = tabParam && TABS.some((t) => t.id === tabParam) ? tabParam : "opening"
  const [activeTabId, setActiveTabId] = useState(activeTab)

  const { store, getChatMessages, addChatMessage } = useAppStore()
  const [messages, setMessages] = useState<{ text: string; fromMe: boolean }[]>([])

  useEffect(() => {
    setMessages(getChatMessages(partnerId))
  }, [partnerId, getChatMessages])

  useEffect(() => {
    setActiveTabId(activeTab)
  }, [activeTab])

  const session = recommendedSessions[0]
  const course = store.activeSession?.subject ?? session.course
  const studyStyleLabel =
    STUDY_STYLES.find((s) => s.id === session.studyStyle)?.label ?? "Quiet study"

  const rawPrompts =
    chatPrompts[activeTabId as keyof typeof chatPrompts] ?? chatPrompts.opening
  const prompts = rawPrompts.map((p) => p.replace("[COURSE]", course))

  const handleSend = (message: string) => {
    const newMsg = { text: message, fromMe: true }
    addChatMessage(partnerId, newMsg)
    setMessages((prev) => [...prev, newMsg])
  }

  return (
    <div className="flex flex-col h-[780px]">
      <TopBar title="Study chat" showBack backHref="/home" rightIcons="minimal" />

      <SessionSummaryBar
        location={session.location}
        course={course}
        studyStyle={studyStyleLabel}
        goal={session.goal}
      />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.fromMe ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2 rounded-2xl ${
                m.fromMe
                  ? "bg-sky-600 text-white rounded-br-md"
                  : "bg-slate-100 text-slate-800 rounded-bl-md"
              }`}
            >
              <p className="text-sm">{m.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-200 bg-white">
        <div className="flex gap-1 px-2 pt-2 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTabId(tab.id)
                router.push(`/chat?tab=${tab.id}&partner=${partnerId}`)
              }}
              className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTabId === tab.id
                  ? "bg-sky-100 text-sky-800"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <ChatComposer
          onSend={handleSend}
          promptChips={prompts}
          placeholder="Type a message (prompts are editable)..."
        />
      </div>
    </div>
  )
}
