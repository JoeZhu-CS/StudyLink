// NOTE: Passwords stored in plaintext — for prototype/demo use only.
import { NextRequest, NextResponse } from "next/server"
import fs from "fs"
import path from "path"

const CSV_PATH = path.join(process.cwd(), "data", "users.csv")

interface User {
  email: string
  password: string
  name: string
}

function readUsers(): User[] {
  if (!fs.existsSync(CSV_PATH)) {
    fs.mkdirSync(path.dirname(CSV_PATH), { recursive: true })
    fs.writeFileSync(CSV_PATH, "email,password,name\n")
    return []
  }
  const lines = fs.readFileSync(CSV_PATH, "utf-8").trim().split("\n")
  if (lines.length <= 1) return []
  return lines.slice(1).map((line) => {
    const [email, password, ...rest] = line.split(",")
    return { email: email.trim(), password: password.trim(), name: rest.join(",").trim() }
  })
}

function writeUsers(users: User[]) {
  const header = "email,password,name"
  const rows = users.map((u) => `${u.email},${u.password},${u.name}`)
  fs.writeFileSync(CSV_PATH, [header, ...rows].join("\n") + "\n")
}

export async function POST(request: NextRequest) {
  const { action, email, password, name } = await request.json()

  if (!email || !password) {
    return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 })
  }

  const users = readUsers()

  if (action === "login") {
    const user = users.find((u) => u.email === email && u.password === password)
    if (!user) {
      return NextResponse.json({ success: false, error: "Invalid email or password" }, { status: 401 })
    }
    return NextResponse.json({ success: true, user: { email: user.email, name: user.name } })
  }

  if (action === "signup") {
    if (users.some((u) => u.email === email)) {
      return NextResponse.json({ success: false, error: "An account with this email already exists" }, { status: 400 })
    }
    const newName = name?.trim() || email.split("@")[0]
    users.push({ email, password, name: newName })
    writeUsers(users)
    return NextResponse.json({ success: true, user: { email, name: newName } })
  }

  return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 })
}
