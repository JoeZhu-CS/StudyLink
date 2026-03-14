import type { Metadata } from "next"
import "./globals.css"
import { MobileFrame } from "@/components/MobileFrame"
import { AppStoreProvider } from "@/context/AppStoreContext"

export const metadata: Metadata = {
  title: "Study Buddy — Find compatible study partners",
  description:
    "Find compatible study partners by course, goals, and study style.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AppStoreProvider>
          <MobileFrame>{children}</MobileFrame>
        </AppStoreProvider>
      </body>
    </html>
  )
}
