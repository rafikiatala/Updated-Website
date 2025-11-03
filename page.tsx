"use client"

import type React from "react"

import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, Send, Loader2, Languages } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "@/lib/language-context"

export default function ChatPage() {
  const [inputValue, setInputValue] = useState("")
  const t = useTranslation()

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim() && status !== "in_progress") {
      sendMessage({ text: inputValue })
      setInputValue("")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">{t("chatTitle")}</h1>
          </div>
          <p className="text-muted-foreground">{t("chatSubtitle")}</p>
        </div>

        {/* Chat Container */}
        <Card className="mb-4 flex min-h-[500px] flex-col">
          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto p-6">
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center gap-6 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Languages className="h-10 w-10" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{t("welcomeTitle")}</h3>
                  <p className="text-sm text-muted-foreground">{t("chatSubtitle")}</p>
                </div>
                <div className="grid gap-2 sm:grid-cols-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setInputValue(t("translateWord") + " English")
                    }}
                  >
                    {t("translateWord")}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setInputValue(t("findDining"))
                    }}
                  >
                    {t("findDining")}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setInputValue(t("tellAboutTAALU"))
                    }}
                  >
                    {t("tellAboutTAALU")}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setInputValue(t("explainUMUZI"))
                    }}
                  >
                    {t("explainUMUZI")}
                  </Button>
                </div>
              </div>
            ) : (
              messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-3 ${
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                    }`}
                  >
                    {message.parts.map((part, index) => {
                      if (part.type === "text") {
                        return (
                          <p key={index} className="whitespace-pre-wrap leading-relaxed">
                            {part.text}
                          </p>
                        )
                      }
                      return null
                    })}
                  </div>
                </div>
              ))
            )}
            {status === "in_progress" && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-lg bg-muted px-4 py-3 text-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">{t("loading")}</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <div className="border-t p-4">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t("typeMessage")}
                disabled={status === "in_progress"}
                className="flex-1"
              />
              <Button type="submit" disabled={status === "in_progress" || !inputValue.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  )
}
