"use client"

import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { TopBar } from "@/components/TopBar"
import { SessionSummaryBar } from "@/components/SessionSummaryBar"
import { ChatComposer } from "@/components/ChatComposer"
import { chatPrompts, STUDY_STYLES, recommendedSessions, savedPartners } from "@/lib/mock-data"
import { useAppStore } from "@/context/AppStoreContext"
import { MessageCircle, UserPlus, Check } from "lucide-react"

const TABS = [
  { id: "opening", label: "Opening" },
  { id: "alignment", label: "Alignment" },
  { id: "time-setting", label: "Time-setting" },
  { id: "follow-up", label: "Follow-up" },
  { id: "refusal", label: "Refusal" },
] as const

// Build a unified contacts list from saved partners + recommended sessions
const allContacts = (() => {
  const map = new Map<string, { id: string; name: string; avatar: string; course: string; location: string }>()
  savedPartners.forEach((p) => {
    map.set(p.id, {
      id: p.id,
      name: p.name,
      avatar: p.avatar,
      course: p.sharedCourses[0] ?? "",
      location: p.defaultLocation ?? "Campus",
    })
  })
  recommendedSessions.forEach((s) => {
    if (!map.has(s.student.id)) {
      map.set(s.student.id, {
        id: s.student.id,
        name: s.student.name,
        avatar: s.student.avatar,
        course: s.course,
        location: s.location,
      })
    }
  })
  return Array.from(map.values())
})()

function ContactsList({ onOpen }: { onOpen: (id: string) => void }) {
  const [invited, setInvited] = useState<Set<string>>(new Set())

  const toggleInvite = (id: string) => {
    setInvited((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  return (
    <div className="flex flex-col h-full">
      <TopBar title="Chats" />
      <main className="flex-1 overflow-y-auto px-4 py-4">
        <p className="text-xs text-slate-500 uppercase font-semibold tracking-wide mb-3">
          Study Contacts
        </p>
        <div className="space-y-3">
          {allContacts.map((contact) => {
            const isInvited = invited.has(contact.id)
            return (
              <div
                key={contact.id}
                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200 shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-sm font-bold text-slate-600 flex-shrink-0">
                  {contact.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 text-sm truncate">{contact.name}</p>
                  <p className="text-xs text-slate-500 truncate">
                    {contact.course} · {contact.location}
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => onOpen(contact.id)}
                    className="p-2 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors"
                    aria-label="Message"
                  >
                    <MessageCircle size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleInvite(contact.id)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      isInvited
                        ? "bg-green-100 text-green-700"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {isInvited ? <Check size={12} /> : <UserPlus size={12} />}
                    {isInvited ? "Invited" : "Invite"}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}

function ConversationView({ partnerId }: { partnerId: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabParam = searchParams.get("tab") as string | null
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

  const contact = allContacts.find((c) => c.id === partnerId)

  return (
    <div className="flex flex-col h-full">
      <TopBar title={contact?.name ?? "Study chat"} showBack backHref="/chat" rightIcons="minimal" />

      <SessionSummaryBar
        location={session.location}
        course={course}
        studyStyle={studyStyleLabel}
        goal={session.goal}
      />

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.fromMe ? "justify-end" : "justify-start"}`}>
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

export default function ChatPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const partnerId = searchParams.get("partner")

  if (partnerId) {
    return <ConversationView partnerId={partnerId} />
  }

  return <ContactsList onOpen={(id) => router.push(`/chat?partner=${id}`)} />
}
