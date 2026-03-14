# Study Buddy — High-Fidelity Clickable Prototype

A mobile-first, high-fidelity front-end prototype for **Study Buddy**, a university study-partner matching app. This prototype preserves the paper prototype’s structure and flow while incorporating evaluation-driven usability improvements.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **lucide-react** icons
- Mock data only — no backend, authentication, or database

## How to Run

### One-click run

- **Windows**: Double-click `run.bat`, or run `.\run.bat` in the terminal. Dependencies install on first run.
- **VS Code / Cursor**: `Ctrl+Shift+P` → **Tasks: Run Task** → **Start Study Buddy**

### Manual

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm run dev
   ```

3. **Open in browser**
   - Go to [http://localhost:3000](http://localhost:3000)
   - You will be redirected to `/login`
   - Use the **Continue** button (or sign-in options) to reach the Home screen

## Route Structure

| Route | Description |
|-------|-------------|
| `/login` | Login / sign in with email, password, and optional SSO |
| `/home` | Home with map, recommended sessions, New Session CTA |
| `/home?expanded=1` | Home with one session card pre-expanded |
| `/home?active=1` | Home with “My Session” bar (posted session, waiting for match) |
| `/locations` | Location search, quick choices, recent locations |
| `/new-session` | Create session form (location, time, subject, rules, goals) |
| `/new-session?subject=open` | New session with subject picker open |
| `/new-session?rules=open` | New session with study-style picker open |
| `/matching` | “Finding a Match” loading (auto-redirects to match-found after ~3s) |
| `/match-found` | Match review with compatibility card, Accept / Pass |
| `/chat` | Chat screen with session summary and prompt tabs |
| `/chat?tab=opening` | Chat with Opening tab active |
| `/chat?tab=alignment` | Chat with Alignment tab active |
| `/profile` | My Profile form |
| `/profile?program=open` | Profile with program dropdown open |
| `/profile?year=open` | Profile with year/level dropdown open |
| `/saved-partners` | Saved / previous partners list |
| `/browse` | Browse all sessions |
| `/error` | Error state screen |

## Main Demo Flows

1. **Login → Home → Expand session → Match Found → Accept → Chat**
   - Login → Continue → Home → Click a session card to expand → Match → Accept Match → Chat
   - In chat, switch between Opening / Alignment / Time-setting / Follow-up / Refusal tabs

2. **Create New Session → Match**
   - Home → New Session → Fill form (use Subject / Rules dropdowns) → Confirm → Matching (loading) → Match Found

3. **Location**
   - Home → Click location chip → Locations → Use quick choices or recent → Back to Home

4. **Profile**
   - Home → Profile icon → Edit Program / Year (via dropdowns) → Save Changes

5. **Home with Active Session → Saved Partners → Invite Again**
   - New Session → Confirm → Matching → Back (goes to Home with “My Session” bar)
   - Profile/Friends icon → Saved Partners → Invite Again → Chat

## What Is Mocked

- **Users**: No real auth; “Continue” on login goes to Home
- **Sessions**: Static recommended sessions (e.g. Diego Zhu, Alex Chen, Jordan Lee)
- **Locations**: Static list (Robarts, Kelly, Bahen, etc.)
- **Matching**: Loading screen redirects to a predefined match after ~3 seconds
- **Chat**: Local state only; messages and prompts are not persisted
- **Profile**: Form values are local state; no persistence
- **Saved Partners**: Static list of mock partners

## Components

Reusable components under `src/components/`:

- `AppShell` / `MobileFrame` — Phone-frame layout and app wrapper
- `TopBar` — Location chip, back, profile, friends icons
- `SessionCardCollapsed` / `SessionCardExpanded` — Session cards
- `RecommendationReasonChips` — “Same course”, “Similar study style”, etc.
- `MapPreviewCard` — Simplified campus map placeholder
- `InputField`, `TimeRangeInput`, `DropdownField`
- `BottomSheet` — Subject / rules picker
- `ChatComposer`, `SessionSummaryBar`, `PromptChip`
- `ProfileInfoCard`, `SavedPartnerCard`, `ActiveSessionBar`
- `EmptyStateCard`, `ErrorStateCard`

## Design Notes

- **Academic focus**: Matching by course, goals, study style, and location — not a generic social or dating app
- **Trust cues**: Verified student badges, program, year, shared courses
- **Editable prompts**: Preset communication tabs populate the input but can be edited before sending
- **Privacy**: Optional “Share live location during active session only” with clear copy
