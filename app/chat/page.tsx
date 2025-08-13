"use client"
import { useState } from "react"
import ChatInterface from "@/components/chat-interface"
import UserSidebar from "@/components/user-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

const Chat = () => {
    const [selectedUser, setSelectedUser] = useState<string | null>(null)

  return (
    <SidebarProvider>
        <UserSidebar onSelectUser={setSelectedUser} selectedUser={selectedUser} />
        <div className="flex-1 flex">
          <ChatInterface selectedUser={selectedUser} />
        </div>
    </SidebarProvider>
  )
}

export default Chat
