"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { TopBar } from "@/components/TopBar"
import { ProfileInfoCard } from "@/components/ProfileInfoCard"
import { InputField } from "@/components/InputField"
import { DropdownField } from "@/components/DropdownField"
import { BottomSheet } from "@/components/BottomSheet"
import { PROGRAMS, ACADEMIC_LEVELS, YEARS } from "@/lib/mock-data"
import { useAppStore } from "@/context/AppStoreContext"

export default function ProfilePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isSetup = searchParams.get("setup") === "true"
  const { store, updateProfile, logout } = useAppStore()
  const [program, setProgram] = useState(store.user.program)
  const [level, setLevel] = useState(store.user.level)
  const [year, setYear] = useState(store.user.year)
  const [courses, setCourses] = useState(store.user.courses)
  const [preferredTime, setPreferredTime] = useState(store.user.preferredTime)
  const [habits, setHabits] = useState(store.user.habits)
  const [bio, setBio] = useState(store.user.bio)
  const [defaultLocation, setDefaultLocation] = useState(store.user.defaultLocation)
  const [showProgramSheet, setShowProgramSheet] = useState(false)
  const [showYearSheet, setShowYearSheet] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setProgram(store.user.program)
    setLevel(store.user.level)
    setYear(store.user.year)
    setCourses(store.user.courses)
    setPreferredTime(store.user.preferredTime)
    setHabits(store.user.habits)
    setBio(store.user.bio)
    setDefaultLocation(store.user.defaultLocation)
  }, [store.user])

  const handleSave = () => {
    updateProfile({
      program,
      level,
      year,
      courses,
      preferredTime,
      habits,
      bio,
      defaultLocation,
    })
    if (isSetup) {
      router.push("/home")
      return
    }
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const academicSummary = `Verified undergraduate · ${program} · Year ${year}`

  return (
    <div className="flex flex-col min-h-[780px]">
      <TopBar title={isSetup ? "Set Up Your Profile" : "My Profile"} showBack={!isSetup} backHref="/home" />

      <main className="flex-1 overflow-y-auto px-4 pb-32">
        {isSetup && (
          <div className="mt-4 px-4 py-3 bg-sky-50 border border-sky-200 rounded-xl">
            <p className="text-sm font-semibold text-sky-800">Welcome! Complete your profile</p>
            <p className="text-xs text-sky-600 mt-0.5">Help us match you with the right study partners.</p>
          </div>
        )}

        <ProfileInfoCard
          name={store.user.name}
          avatar={store.user.avatar}
          verified
          academicSummary={academicSummary}
          className="mt-4"
        />

        {saved && (
          <p className="mt-3 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
            Saved
          </p>
        )}

        <div className="space-y-5 mt-6">
          <div onClick={() => setShowProgramSheet(true)}>
            <DropdownField
              label="Program"
              value={program}
              placeholder="Select program"
              onClick={() => setShowProgramSheet(true)}
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1" onClick={() => setShowYearSheet(true)}>
              <DropdownField
                label="Level"
                value={level}
                placeholder="Select"
                onClick={() => setShowYearSheet(true)}
              />
            </div>
            <div className="flex-1" onClick={() => setShowYearSheet(true)}>
              <DropdownField
                label="Year"
                value={String(year)}
                placeholder="Select"
                onClick={() => setShowYearSheet(true)}
              />
            </div>
          </div>

          <InputField
            label="Courses"
            helperText="Courses you're currently taking"
            value={courses}
            onChange={setCourses}
            placeholder="CSC343, CSC165"
          />

          <InputField
            label="Preferred time"
            helperText="When you usually prefer to study"
            value={preferredTime}
            onChange={setPreferredTime}
          />

          <InputField
            label="Study habits / preferences"
            value={habits}
            onChange={setHabits}
            placeholder="e.g. Quiet study, 1.5 hr sessions"
          />

          <InputField
            label="Bio / goals"
            value={bio}
            onChange={setBio}
            placeholder="Optional"
          />

          <InputField
            label="Default location"
            helperText="Your usual study spot for recommendations"
            value={defaultLocation}
            onChange={setDefaultLocation}
          />
        </div>

        <div className="flex gap-3 mt-8">
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 py-3 rounded-lg bg-sky-600 text-white font-semibold hover:bg-sky-700"
          >
            {isSetup ? "Get Started" : saved ? "Saved" : "Save Changes"}
          </button>
          {!isSetup && (
            <Link
              href="/home"
              className="flex-1 py-3 rounded-lg border border-slate-200 font-medium text-center hover:bg-slate-50"
            >
              Cancel
            </Link>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            logout()
            router.push("/login")
          }}
          className="mt-4 w-full py-2 text-sm text-slate-500 hover:text-slate-700"
        >
          Sign out
        </button>
      </main>

      <BottomSheet
        isOpen={showProgramSheet}
        onClose={() => setShowProgramSheet(false)}
        title="Program"
      >
        <ul className="p-4 space-y-1">
          {PROGRAMS.map((p) => (
            <li key={p}>
              <button
                type="button"
                onClick={() => {
                  setProgram(p)
                  setShowProgramSheet(false)
                }}
                className="w-full text-left px-4 py-3 rounded-lg hover:bg-slate-50"
              >
                {p}
              </button>
            </li>
          ))}
        </ul>
      </BottomSheet>

      <BottomSheet
        isOpen={showYearSheet}
        onClose={() => setShowYearSheet(false)}
        title="Academic level & year"
      >
        <div className="p-4">
          <p className="text-sm font-medium text-slate-700 mb-2">Level</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {ACADEMIC_LEVELS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLevel(l)}
                className={`px-3 py-2 rounded-lg ${
                  level === l ? "bg-sky-100 text-sky-800" : "bg-slate-100"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <p className="text-sm font-medium text-slate-700 mb-2">Year</p>
          <div className="flex flex-wrap gap-2">
            {YEARS.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => {
                  setYear(y)
                  setShowYearSheet(false)
                }}
                className={`px-3 py-2 rounded-lg ${
                  year === y ? "bg-sky-100 text-sky-800" : "bg-slate-100"
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
      </BottomSheet>
    </div>
  )
}
