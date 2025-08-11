"use client"

import { useState } from "react"
import ChatInterface from "@/components/chat-interface"
import UserSidebar from "@/components/user-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function Home() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null)

  return (
    <main className="flex h-screen w-full overflow-hidden bg-slate-950">
      <SidebarProvider>
        <UserSidebar onSelectUser={setSelectedUser} selectedUser={selectedUser} />
        <div className="flex-1 flex">
          <ChatInterface selectedUser={selectedUser} />
        </div>
      </SidebarProvider>
    </main>
  )
}
