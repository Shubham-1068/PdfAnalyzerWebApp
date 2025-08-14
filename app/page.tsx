"use client"

import { useState } from "react"
import LandingPage from "@/components/landing-page"


export default function Home() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  return (
    <main className="flex min-h-screen w-full overflow-hidden bg-slate-950">
      <LandingPage />
    </main>
  )
}
