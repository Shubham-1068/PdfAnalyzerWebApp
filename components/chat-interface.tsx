"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, FileText, Brain, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { motion } from "framer-motion"

type Message = {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
  type?: "text" | "pdf-upload" | "pdf-question"
}

type ChatInterfaceProps = {
  selectedUser?: string | null
}

export default function ChatInterface({ selectedUser }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Welcome to PDF Analyzer! Upload any PDF document and I'll help you extract insights, answer questions, and analyze the content with advanced AI.",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [uploadedPdf, setUploadedPdf] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (file.type !== "application/pdf") {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file.",
        variant: "destructive",
      })
      return
    }

    const uploadMessage: Message = {
      id: Date.now().toString(),
      content: `📄 Uploading: ${file.name}`,
      sender: "user",
      timestamp: new Date(),
      type: "pdf-upload",
    }
    setMessages((prev) => [...prev, uploadMessage])

    setIsProcessing(true)
    setIsTyping(true)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/process-pdf", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (response.ok) {
        setUploadedPdf(file.name)
        const successMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: `Perfect! I've successfully processed "${file.name}". The document has been analyzed and indexed. You can now ask me anything about its content!`,
          sender: "assistant",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, successMessage])

        toast({
          title: "PDF processed successfully",
          description: "Ready to answer your questions!",
        })
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        content: "I encountered an issue processing your PDF. Please try uploading it again.",
        sender: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])

      toast({
        title: "Upload failed",
        description: "Failed to process PDF. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
      setIsTyping(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
      type: uploadedPdf ? "pdf-question" : "text",
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = inputValue
    setInputValue("")
    setIsTyping(true)

    try {
      if (uploadedPdf) {
        const response = await fetch("/api/ask", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question: currentInput }),
        })

        const result = await response.json()

        if (response.ok) {
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: result.answer,
            sender: "assistant",
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, assistantMessage])
        } else {
          throw new Error(result.error)
        }
      } else {
        setTimeout(() => {
          const assistantMessage: Message = {
            id: (Date.now() + 1).toString(),
            content: `I'd love to help you with that! However, I need a PDF document to analyze first. Please upload a PDF using the 📄 button, and then I can answer questions about its content.`,
            sender: "assistant",
            timestamp: new Date(),
          }
          setMessages((prev) => [...prev, assistantMessage])
          setIsTyping(false)
        }, 1000)
        return
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        content: "I apologize, but I encountered an error while processing your question. Please try asking again.",
        sender: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col h-full w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Header */}
      <div className="flex items-center justify-between p-4 md:p-6 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm">
        <div className="flex items-center gap-3 md:gap-4">
          <Avatar className="h-10 w-10 md:h-12 md:w-12 bg-gradient-to-br from-indigo-500 to-purple-600 border border-indigo-400/30">
            <div className="text-white rounded-full h-full w-full flex items-center justify-center">
              <Brain className="h-5 w-5 md:h-6 md:w-6" />
            </div>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-lg md:text-xl bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent truncate">
              PDF Analyzer AI
            </h2>
            <p className="text-xs md:text-sm text-slate-400 truncate">
              {uploadedPdf ? (
                <span className="flex items-center gap-2">
                  <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-indigo-400 flex-shrink-0" />
                  <span className="truncate">Analyzing: {uploadedPdf}</span>
                </span>
              ) : (
                "Ready to analyze your documents"
              )}
            </p>
          </div>
        </div>
        {uploadedPdf && (
          <div className="hidden sm:flex px-3 py-1 bg-indigo-500/10 rounded-full border border-indigo-400/20">
            <span className="text-xs text-indigo-300 font-medium">PDF Ready</span>
          </div>
        )}
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4 md:p-6">
        <div className="space-y-4 md:space-y-6 max-w-4xl mx-auto">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] sm:max-w-[75%] md:max-w-[70%] rounded-2xl px-4 py-3 md:px-6 md:py-4 ${
                  message.sender === "user"
                    ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-br-md shadow-lg"
                    : "bg-slate-800/60 text-slate-100 rounded-bl-md border border-slate-700/50 backdrop-blur-sm"
                }`}
              >
                <p className="leading-relaxed text-sm md:text-base">{message.content}</p>
                <div className={`text-xs mt-2 ${message.sender === "user" ? "text-indigo-200" : "text-slate-400"}`}>
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-800/60 rounded-2xl rounded-bl-md px-4 py-3 md:px-6 md:py-4 backdrop-blur-sm border border-slate-700/50">
                <div className="flex space-x-2 items-center">
                  <div className="flex space-x-1">
                    {[0, 1, 2].map((i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-indigo-400"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 ml-2">AI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 md:p-6 border-t border-slate-800 bg-slate-900/80 backdrop-blur-sm">
        <div className="flex items-center gap-2 md:gap-3 max-w-4xl mx-auto">
          <input ref={fileInputRef} type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />
          <Button
            variant="outline"
            size="icon"
            className="rounded-xl bg-slate-800/50 border-slate-700 hover:bg-indigo-500/20 hover:border-indigo-400/50 transition-colors flex-shrink-0"
            onClick={() => fileInputRef.current?.click()}
            title="Upload PDF"
            disabled={isProcessing}
          >
            <FileText className="h-4 w-4 md:h-5 md:w-5 text-indigo-400" />
          </Button>

          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={uploadedPdf ? "Ask anything about your PDF..." : "Upload a PDF first to get started..."}
              className="rounded-xl bg-slate-800/50 border-slate-700 text-slate-100 placeholder:text-slate-500 focus:border-indigo-500/50 focus:ring-indigo-500/20 transition-colors text-sm md:text-base"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage()
                }
              }}
            />
          </div>

          <Button
            onClick={handleSendMessage}
            size="icon"
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg transition-colors flex-shrink-0"
            disabled={inputValue.trim() === "" || isTyping}
          >
            <Send className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
