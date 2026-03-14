import type { SavedPartner } from "./mock-data"

export interface UserProfile {
  name: string
  avatar: string
  email: string
  program: string
  level: string
  year: number
  courses: string
  preferredTime: string
  habits: string
  bio: string
  defaultLocation: string
}

export interface ActiveSession {
  id: string
  location: string
  time: string
  subject: string
  rules: string
  goals: string
  status: "waiting" | "matched" | "confirmed"
}

export interface ChatMessage {
  text: string
  fromMe: boolean
}

export interface AppStore {
  isLoggedIn: boolean
  user: UserProfile
  defaultLocation: string
  recentLocations: string[]
  shareLiveLocation: boolean
  activeSession: ActiveSession | null
  savedPartners: SavedPartner[]
  chatMessages: Record<string, ChatMessage[]>
}

export const DEFAULT_USER: UserProfile = {
  name: "You",
  avatar: "Y",
  email: "",
  program: "CS Specialist",
  level: "Undergraduate",
  year: 1,
  courses: "CSC343, CSC165",
  preferredTime: "1:30 PM – 4:45 PM",
  habits: "Quiet study, prefer 1.5–2 hr sessions",
  bio: "",
  defaultLocation: "Robarts Library",
}

const STORAGE_KEY = "study-buddy-store"

export function loadStore(): Partial<AppStore> {
  if (typeof window === "undefined") return {}
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Partial<AppStore>
  } catch {
    /* ignore */
  }
  return {}
}

export function saveStore(store: Partial<AppStore>) {
  if (typeof window === "undefined") return
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
  } catch {
    /* ignore */
  }
}
