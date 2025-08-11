"use client"

import { useState } from "react"
import { Search, Brain, Settings, LogOut, FileText } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"

type UserSidebarProps = {
  onSelectUser: (userId: string) => void
  selectedUser: string | null
}

export default function UserSidebar({ onSelectUser, selectedUser }: UserSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <Sidebar className="bg-slate-900/80 backdrop-blur-sm border-r border-slate-800">
      <SidebarHeader>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="font-bold text-lg bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                PDF AI
              </h2>
              <p className="text-xs text-slate-400">Intelligent Analysis</p>
            </div>
          </div>
        </div>
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-400" />
            <Input
              placeholder="Search documents..."
              className="pl-10 bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500/50 focus:ring-indigo-500/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="mb-4 p-4 bg-indigo-500/10 rounded-full border border-indigo-400/20">
            <FileText className="h-8 w-8 text-indigo-400" />
          </div>
          <h3 className="font-semibold text-slate-300 mb-2">Ready to Analyze</h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Upload a PDF document to start intelligent analysis and Q&A
          </p>
        </div>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-800">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer">
                <Settings className="h-5 w-5 text-slate-400" />
                <span className="text-slate-300">Settings</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800/50 transition-colors cursor-pointer">
                <LogOut className="h-5 w-5 text-slate-400" />
                <span className="text-slate-300">Logout</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
