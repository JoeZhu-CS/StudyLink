<div align="center">

# StudyLynx

**Find compatible study partners by course, goals, and study style.**

A mobile-first, high-fidelity front-end prototype for a university study-partner matching app,
built for the University of Toronto community.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

</div>

---

## Table of Contents

- [Introduction](#introduction)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Route Map & API](#route-map--api)
- [Environment Variables](#environment-variables)
- [Demo Accounts](#demo-accounts)
- [Architecture Overview](#architecture-overview)
- [Contributing](#contributing)
- [Support & Contact](#support--contact)

---

## Introduction

StudyLynx is a clickable prototype that demonstrates how university students can find and connect with compatible study partners. Unlike generic social apps, StudyLynx matches students based on **academic criteria** — shared courses, study goals, preferred study styles, and campus locations.

The prototype preserves the paper prototype's structure and flow while incorporating evaluation-driven usability improvements. It runs entirely in the browser with mock data and `localStorage` persistence — no backend server or database required.

### Why StudyLynx?

- **Academic-focused matching** — not a social or dating app
- **Trust through verification** — verified student badges, program info, shared courses
- **Privacy-first** — optional live location sharing with clear consent
- **Smart scheduling** — weekly availability editor with Google Calendar integration
- **Guided communication** — preset conversation starters that users can customize before sending

---

## Key Features

### Session Management
- **Create study sessions** with specific dates, time ranges, locations, courses, and goals
- **Multi-session tracking** with status lifecycle: `Upcoming` → `Matched` → `Confirmed` → `Completed` / `Cancelled`
- **Unified sessions dashboard** grouped by status with contextual actions per card
- **Cancel confirmation** inline dialog to prevent accidental cancellation

### Smart Matching
- **Course-based matching** — prioritizes students in the same course
- **Multi-criteria scoring** — study style, location proximity, goals, and availability
- **Top-3 candidates** — browse multiple potential matches before deciding
- **Recommendation reasons** — visible chips explaining why a match was suggested

### Weekly Availability
- **7-day availability editor** — toggle days on/off with start and end times
- **Auto-fill on session creation** — selecting a date pre-populates the time range from your schedule
- **Profile-level scheduling** — set once, reuse across sessions

### Campus Map
- **Interactive OpenStreetMap** via Leaflet.js with UofT campus markers
- **Quick location picker** with recent and favorite locations
- **Session pins** displayed on the map from the home screen

### Communication
- **In-app chat** with conversation tab categories: Opening, Alignment, Time-setting, Follow-up, Refusal
- **Editable prompt chips** — suggested messages populate the input field for customization
- **Per-partner chat history** persisted across sessions

### Google Integration
- **Google Sign-In** via OAuth 2.0 (optional — falls back to demo mode if unconfigured)
- **Google Calendar sync** — one-click export of confirmed sessions with accurate dates and times

### Profile & Partners
- **Custom avatar upload** with client-side image compression (128x128 JPEG)
- **Save study partners** for future sessions
- **View partner profiles** with courses, study habits, and availability

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS 3.4](https://tailwindcss.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Maps | [Leaflet.js](https://leafletjs.com/) + [OpenStreetMap](https://www.openstreetmap.org/) |
| Auth (Optional) | [@react-oauth/google](https://www.npmjs.com/package/@react-oauth/google) |
| State | React Context API + `localStorage` |
| Data | CSV-based mock users, in-memory mock sessions |

---

## Installation

### Prerequisites

- **Node.js** 18+ and **npm** 9+
- A modern browser (Chrome, Firefox, Edge, Safari)

### One-Click Run (Windows)

Double-click `run.bat`, or from a terminal:

```bash
.\run.bat
```

This automatically installs dependencies on first run, kills any stale dev server on port 3000, and opens the browser.

### VS Code / Cursor

`Ctrl+Shift+P` → **Tasks: Run Task** → **Start Study Buddy**

### Manual Setup

```bash
# Clone the repository
git clone https://github.com/JoeZhu-CS/StudyLink.git
cd StudyLink

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — you will be redirected to the login page.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint checks |
| `npm run clean` | Remove `.next` cache directory |

---

## Usage

### Demo Flows

**1. Login → Home → Match → Chat**

Login with a demo account → Land on the home screen → Tap a recommended session card → View match details → Accept → Start chatting with your study partner.

**2. Create a New Session**

Home → Tap the raised "New Session" button → Pick a date (auto-fills from your availability) → Choose a location, course, and study style → Confirm → Automatic matching begins → Review match → Accept or Pass.

**3. Manage Sessions**

Bottom nav "Sessions" tab → View all sessions grouped by status → "Find match" for upcoming, "View match" for matched, "Chat" for confirmed → "Sync to Calendar" to export → Cancel with confirmation dialog.

**4. Set Weekly Availability**

Profile → Scroll to Weekly Availability → Toggle days on/off → Set start and end times per day → Save. This schedule is used when creating new sessions.

**5. Explore & Save Partners**

Home → Browse recommended sessions → Tap to expand → View student profile → "Save Partner" → Access saved partners from the Partners tab anytime.

---

## Project Structure

```
StudyLink/
├── public/
│   └── users.csv                  # Demo account credentials (email, password, name)
├── src/
│   ├── app/                       # Next.js App Router pages
│   │   ├── layout.tsx             # Root layout with providers (OAuth, Store, RouteGuard)
│   │   ├── globals.css            # Tailwind layers, CSS variables, custom styles
│   │   ├── page.tsx               # Root redirect → /login
│   │   ├── login/page.tsx         # Authentication (email/password, Google, demo)
│   │   ├── home/page.tsx          # Dashboard with map, sessions summary, recommendations
│   │   ├── new-session/page.tsx   # Session creation form with date picker
│   │   ├── matching/page.tsx      # Matching animation + algorithm execution
│   │   ├── match-found/page.tsx   # Match review with accept/pass/save actions
│   │   ├── sessions/page.tsx      # Session management dashboard (grouped by status)
│   │   ├── chat/page.tsx          # In-app messaging with prompt tabs
│   │   ├── profile/page.tsx       # User profile editor with availability & avatar
│   │   ├── profile/[userId]/      # Other user's profile view
│   │   ├── saved-partners/page.tsx# Saved study partners list
│   │   ├── locations/page.tsx     # Location search and selection
│   │   ├── browse/page.tsx        # Browse all available sessions
│   │   └── error/page.tsx         # Error state display
│   ├── components/                # Reusable UI components
│   │   ├── MobileFrame.tsx        # Phone-frame viewport wrapper
│   │   ├── TopBar.tsx             # Navigation bar (back arrow + title/location)
│   │   ├── BottomNav.tsx          # 5-tab bottom navigation with conditional labels
│   │   ├── Avatar.tsx             # Unified avatar (initials / image / URL)
│   │   ├── RouteGuard.tsx         # Auth + profile completion enforcement
│   │   ├── GoogleOAuthWrapper.tsx # SSR-safe Google OAuth provider
│   │   ├── WeeklyAvailabilityEditor.tsx  # 7-day schedule editor
│   │   ├── MapPreviewCard.tsx     # Dynamic Leaflet map loader
│   │   ├── CampusMap.tsx          # Interactive campus map with markers
│   │   ├── SessionCardCollapsed.tsx / SessionCardExpanded.tsx
│   │   ├── ProfileInfoCard.tsx    # Avatar + name + verification badge
│   │   ├── SavedPartnerCard.tsx   # Partner card with chat/profile actions
│   │   ├── ChatComposer.tsx       # Message input with prompt chips
│   │   ├── BottomSheet.tsx        # Slide-up picker sheet
│   │   └── InputField.tsx / DropdownField.tsx / SearchableDropdown.tsx / ...
│   ├── context/
│   │   └── AppStoreContext.tsx     # Global state (React Context + localStorage)
│   └── lib/
│       ├── store-types.ts         # Type definitions, store load/save, versioning
│       ├── mock-data.ts           # 11 students, 11 sessions, matching algorithms
│       ├── auth.ts                # CSV-based authentication
│       ├── calendar.ts            # Google Calendar URL builder
│       ├── image-utils.ts         # Client-side image compression
│       └── utils.ts               # Tailwind class merge utility (cn)
├── tailwind.config.ts             # Theme tokens, HSL color system
├── tsconfig.json                  # TypeScript strict mode, path aliases
├── next.config.js                 # Next.js configuration
├── package.json                   # Dependencies and scripts
└── run.bat                        # Windows one-click launcher
```

---

## Route Map & API

### Pages

| Route | Description | Key Params |
|-------|-------------|------------|
| `/login` | Authentication screen | — |
| `/home` | Dashboard with map and recommendations | `?no-match=1` (toast) |
| `/new-session` | Create a new study session | — |
| `/matching` | Match-finding animation | `?sessionId=<id>` or `?from=recommended` |
| `/match-found` | Review matched partner(s) | `?sessionId=<id>` |
| `/sessions` | Session management dashboard | — |
| `/chat` | In-app messaging | `?partner=<studentId>&tab=<tabId>` |
| `/profile` | Edit own profile | `?new=1` (first-time setup) |
| `/profile/[userId]` | View another user's profile | — |
| `/saved-partners` | Saved study partners | — |
| `/locations` | Location search and picker | — |
| `/browse` | Browse all available sessions | — |
| `/error` | Error state | — |

### State Management API

The `useAppStore()` hook exposes:

| Method | Description |
|--------|-------------|
| `login(profile)` | Authenticate and set user data |
| `logout()` | Clear session, reset to defaults |
| `updateProfile(partial)` | Update user profile fields |
| `addSession(session)` | Create a new `UserSession`, returns ID |
| `updateSessionStatus(id, status, matchedWith?)` | Transition session lifecycle |
| `removeSession(id)` | Delete a session |
| `getSessionById(id)` | Look up a session |
| `setMatchedPartner(partner)` | Store current match result |
| `setMatchedPartners(partners)` | Store top-N match candidates |
| `addSavedPartner(partner)` | Save a study partner |
| `removeSavedPartner(id)` | Remove a saved partner |
| `getChatMessages(partnerId)` | Retrieve chat history |
| `addChatMessage(partnerId, msg)` | Append a chat message |
| `resetStore()` | Factory reset all data |

### Data Models

<details>
<summary><strong>UserSession</strong></summary>

```typescript
interface UserSession {
  id: string
  date: string          // "YYYY-MM-DD"
  startTime: string     // "HH:MM" (24h)
  endTime: string       // "HH:MM" (24h)
  location: string
  subject: string
  studyStyle: string
  goals: string
  status: "upcoming" | "matched" | "confirmed" | "completed" | "cancelled"
  matchedWith?: {
    studentId: string
    sessionId: string
  } | null
}
```

</details>

<details>
<summary><strong>UserProfile</strong></summary>

```typescript
interface UserProfile {
  name: string
  avatar: string
  email: string
  subject: string
  programType: string
  level: string
  year: number
  courses: string
  preferredTime: string
  weeklyAvailability?: WeeklyAvailability
  habits: string
  bio: string
  defaultLocation: string
  studentId?: string
}
```

</details>

<details>
<summary><strong>WeeklyAvailability</strong></summary>

```typescript
type DayKey = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"

interface DayAvailability {
  enabled: boolean
  start: string   // "HH:MM"
  end: string     // "HH:MM"
}

type WeeklyAvailability = Record<DayKey, DayAvailability>
```

</details>

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | No | Google OAuth Client ID for Sign-In and Calendar. If not set, the app falls back to demo mode with full functionality. |

To configure Google OAuth:

1. Create a project in [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the **Google Identity Services** API
3. Create an OAuth 2.0 Client ID (Web application type)
4. Add `http://localhost:3000` to Authorized JavaScript origins
5. Create `.env.local` at the project root:

```env
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
```

> **Note:** The app works fully without this variable. Google Sign-In and Calendar sync will use demo/URL-based fallbacks.

---

## Demo Accounts

Authentication uses a CSV file (`public/users.csv`). Any of these accounts work:

| Email | Password | Name |
|-------|----------|------|
| `demo@utoronto.ca` | `demo123` | Demo User |
| `alex@mail.utoronto.ca` | `alex123` | Alex Chen |
| `diego@mail.utoronto.ca` | `diego123` | Diego Zhu |
| `jordan@mail.utoronto.ca` | `jordan123` | Jordan Lee |
| `sam@mail.utoronto.ca` | `sam123` | Sam Patel |
| `maya@mail.utoronto.ca` | `maya123` | Maya Kim |

You can also click **"Try Demo"** on the login screen to skip credentials entirely.

New accounts can be registered with any email — they will be guided through profile setup before accessing the app.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────┐
│                   Browser                       │
├─────────────────────────────────────────────────┤
│  GoogleOAuthWrapper                             │
│  └─ AppStoreProvider (React Context)            │
│     └─ MobileFrame (phone viewport)             │
│        └─ RouteGuard (auth + profile check)     │
│           └─ Page Routes (App Router)           │
│              └─ TopBar + Content + BottomNav    │
├─────────────────────────────────────────────────┤
│  localStorage (study-buddy-store, version: 2)   │
│  ├─ User profile & preferences                 │
│  ├─ Sessions (UserSession[])                    │
│  ├─ Matched partners                            │
│  ├─ Saved partners                              │
│  └─ Chat messages (per-partner)                 │
├─────────────────────────────────────────────────┤
│  Mock Data Layer                                │
│  ├─ 11 students with weekly availability        │
│  ├─ 11 sessions with dynamic future dates       │
│  ├─ CSV-based authentication                    │
│  └─ Matching algorithms (course, style, goal)   │
└─────────────────────────────────────────────────┘
```

### State Persistence

- All user data is stored in `localStorage` under the key `study-buddy-store`
- Store versioning (`v2`) ensures automatic migration from older formats
- Corrupted or outdated data is silently cleared on load
- `resetStore()` performs a factory reset of all persisted data

### Route Protection

The `RouteGuard` component enforces:
1. **Unauthenticated users** → redirected to `/login`
2. **Logged in but incomplete profile** → redirected to `/profile?new=1`
3. **Public routes** (`/login`, `/`) bypass all checks

---

## Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** — follow the existing code style:
   - TypeScript strict mode
   - Tailwind CSS for all styling
   - Functional components with hooks
   - `"use client"` directive for client components
4. **Test locally**
   ```bash
   npm run build   # Ensure no build errors
   npm run lint     # Ensure no lint errors
   ```
5. **Commit with a descriptive message**
   ```bash
   git commit -m "feat: add your feature description"
   ```
6. **Push and create a Pull Request**
   ```bash
   git push origin feature/your-feature-name
   ```

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

| Prefix | Usage |
|--------|-------|
| `feat:` | New feature |
| `fix:` | Bug fix |
| `refactor:` | Code restructuring (no behavior change) |
| `docs:` | Documentation only |
| `style:` | Formatting, whitespace |
| `chore:` | Build tools, dependencies |

---

## Support & Contact

- **Issues**: [GitHub Issues](https://github.com/JoeZhu-CS/StudyLink/issues)
- **Repository**: [github.com/JoeZhu-CS/StudyLink](https://github.com/JoeZhu-CS/StudyLink)

---

<div align="center">

Built with Next.js, TypeScript, and Tailwind CSS for the University of Toronto.

</div>
