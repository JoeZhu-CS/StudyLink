// Mock data for Study Buddy prototype - no backend, presentation only

export type StudyStyle =
  | "quiet-study"
  | "active-discussion"
  | "collaborative-problem-solving"
  | "peer-teaching"
  | "focused-review"
  | "catch-up-session"

export type RecommendationReason =
  | "same-course"
  | "similar-study-style"
  | "near-default-location"
  | "same-goal"

export interface Student {
  id: string
  name: string
  avatar: string
  verified: boolean
  program: string
  year: number
  courses: string[]
  preferredTime?: string
  defaultLocation?: string
}

export interface Session {
  id: string
  student: Student
  location: string
  course: string
  goal: string
  studyStyle: StudyStyle
  duration: string
  time: string
  recommendationReasons: RecommendationReason[]
}

export interface SavedPartner extends Student {
  sharedCourses: string[]
  fitSummary: string
}

export const COURSES = [
  "CSC343",
  "CSC165",
  "MAT137",
  "CSC318",
  "CSC311",
  "CSC309",
] as const

export const LOCATIONS = [
  "Robarts Library",
  "Kelly Library",
  "Bahen Centre for Information Technology",
  "University College Library",
  "Near Bloor",
  "Claude T. Bissell",
] as const

/** Haversine distance in km between two [lat, lng] coordinates */
export function haversineKm(
  [lat1, lon1]: [number, number],
  [lat2, lon2]: [number, number]
): number {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

/** Coordinates for U of T St. George campus area (lat, lng) */
export const LOCATION_COORDS: Record<string, [number, number]> = {
  "Robarts Library": [43.6681, -79.3955],
  "Kelly Library": [43.6622, -79.3895],
  "Bahen Centre for Information Technology": [43.6609, -79.3956],
  "University College Library": [43.6628, -79.3945],
  "Near Bloor": [43.6678, -79.399],
  "Claude T. Bissell": [43.667, -79.396],
}

export const STUDY_STYLES: { id: StudyStyle; label: string }[] = [
  { id: "quiet-study", label: "Quiet study" },
  { id: "active-discussion", label: "Active discussion" },
  { id: "collaborative-problem-solving", label: "Collaborative problem solving" },
  { id: "peer-teaching", label: "Peer teaching" },
  { id: "focused-review", label: "Focused review" },
  { id: "catch-up-session", label: "Catch-up session" },
]

export const GOALS = [
  "Prepare for midterm",
  "Review logic proof structure",
  "Ask each other questions",
  "Catch up on missed material",
  "Polish details before an assignment",
  "Work through problem sets together",
] as const

export const PROGRAMS = ["Specialist", "Major", "Minor"] as const

export const ACADEMIC_LEVELS = ["Undergraduate", "Graduate", "Postgraduate"] as const

export const YEARS = [1, 2, 3, 4, 5] as const

export const RECOMMENDATION_LABELS: Record<RecommendationReason, string> = {
  "same-course": "Same course",
  "similar-study-style": "Similar study style",
  "near-default-location": "Near your default location",
  "same-goal": "Same goal",
}

export const diagoZhu: Student = {
  id: "1",
  name: "Diego Zhu",
  avatar: "DZ",
  verified: true,
  program: "CS Specialist",
  year: 1,
  courses: ["CSC343", "CSC165"],
  preferredTime: "1:30 PM – 4:45 PM",
  defaultLocation: "Robarts Library",
}

export const recommendedSessions: Session[] = [
  {
    id: "s1",
    student: diagoZhu,
    location: "Robarts Library",
    course: "CSC343",
    goal: "Looking for someone to prepare for the midterm together and ask each other questions.",
    studyStyle: "quiet-study",
    duration: "1.5–2 hr",
    time: "1:30 PM – 4:45 PM",
    recommendationReasons: ["same-course", "similar-study-style", "near-default-location"],
  },
  {
    id: "s2",
    student: {
      id: "2",
      name: "Alex Chen",
      avatar: "AC",
      verified: true,
      program: "CS Major",
      year: 2,
      courses: ["CSC165", "MAT137"],
    },
    location: "Kelly Library",
    course: "CSC165",
    goal: "Review logic proof structure together.",
    studyStyle: "active-discussion",
    duration: "2 hr",
    time: "2:00 PM – 4:00 PM",
    recommendationReasons: ["same-course", "similar-study-style"],
  },
  {
    id: "s3",
    student: {
      id: "3",
      name: "Jordan Lee",
      avatar: "JL",
      verified: false,
      program: "Math Major",
      year: 1,
      courses: ["MAT137"],
    },
    location: "Near Bloor",
    course: "MAT137",
    goal: "Catch up on missed material and work through problem sets.",
    studyStyle: "collaborative-problem-solving",
    duration: "1.5 hr",
    time: "3:00 PM – 4:30 PM",
    recommendationReasons: ["near-default-location", "same-goal"],
  },
]

export const savedPartners: SavedPartner[] = [
  {
    ...diagoZhu,
    sharedCourses: ["CSC343", "CSC165"],
    fitSummary: "Great quiet study partner, same midterm goals",
  },
  {
    id: "2",
    name: "Alex Chen",
    avatar: "AC",
    verified: true,
    program: "CS Major",
    year: 2,
    courses: ["CSC165", "MAT137"],
    sharedCourses: ["CSC165"],
    fitSummary: "Good for logic review sessions",
  },
]

export const chatPrompts = {
  opening: [
    "Hi — want to study together for [COURSE]?",
    "No pressure — open to one trial session?",
    "Let's do a focused session this week.",
  ],
  alignment: [
    "I prefer short sessions — does that work?",
    "I'm open to one trial session first.",
    "I'm behind and need a catch-up session.",
    "I'm mostly on track — want to polish details together?",
  ],
  "time-setting": [
    "Does 2 hours work for you?",
    "Would tomorrow afternoon work?",
    "Let's aim for 1.5 hours.",
  ],
  followup: [
    "Same time next week?",
    "Want to schedule another session?",
    "That was helpful — thanks!",
  ],
  refusal: [
    "Sorry, I can't make that time.",
    "Maybe another day?",
    "I'll pass for now.",
  ],
}

export const currentUser = {
  name: "You",
  avatar: "Y",
  program: "CS Specialist",
  year: 1,
  defaultLocation: "Robarts Library",
  preferredTime: "1:30 PM – 4:45 PM",
}
