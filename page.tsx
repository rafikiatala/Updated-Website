"use client"

import type React from "react"
import { useLanguage, useTranslation } from "@/lib/language-context"
import { useAuth } from "@/lib/auth-context"
import { LoginScreen } from "@/components/login-screen"
import { LanguageSelectionScreen } from "@/components/language-selection-screen"
import { LanguageSelector } from "@/components/language-selector"
import { SearchBar } from "@/components/search-bar"
import { QuickLinks } from "@/components/quick-links"
import { FeaturedResources } from "@/components/featured-resources"
import { Languages, BookOpen, Map, Calendar, MessageCircle } from "lucide-react"

export default function Home() {
  const { isAuthenticated } = useAuth()
  const { hasSelectedLanguage } = useLanguage()
  const t = useTranslation()

  if (!isAuthenticated) {
    return <LoginScreen />
  }

  if (!hasSelectedLanguage) {
    return <LanguageSelectionScreen />
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-secondary/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(120,119,198,0.1),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(74,222,128,0.1),transparent_50%)]" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              <span className="block text-balance">RAFIKI</span>
              <span className="mt-2 block text-3xl text-muted-foreground sm:text-4xl lg:text-5xl">
                {t("heroTitle")}
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl text-balance">
              {t("heroSubtitle")}
            </p>

            {/* Language Selector */}
            <div className="mt-10">
              <LanguageSelector />
            </div>

            {/* Search Bar */}
            <div className="mt-8">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <QuickAccessCard
            icon={<MessageCircle className="h-8 w-8" />}
            title={t("chatAssistant")}
            description={t("chatAssistantDesc")}
            href="/chat"
          />
          <QuickAccessCard
            icon={<Languages className="h-8 w-8" />}
            title={t("translate")}
            description={t("commonPhrasesDesc")}
            href="/translate"
          />
          <QuickAccessCard
            icon={<BookOpen className="h-8 w-8" />}
            title={t("studentHandbook")}
            description={t("studentHandbookDesc")}
            href="/handbook"
          />
          <QuickAccessCard
            icon={<Map className="h-8 w-8" />}
            title={t("campusMap")}
            description={t("campusMapDesc")}
            href="/map"
          />
          <QuickAccessCard
            icon={<Calendar className="h-8 w-8" />}
            title={t("upcomingEvents")}
            description={t("upcomingEventsDesc")}
            href="/events"
          />
        </div>
      </section>

      {/* Quick Links */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <QuickLinks />
      </section>

      {/* Featured Resources */}
      <section className="bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FeaturedResources />
        </div>
      </section>
    </div>
  )
}

function QuickAccessCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode
  title: string
  description: string
  href: string
}) {
  return (
    <a
      href={href}
      className="group relative overflow-hidden rounded-xl border bg-card p-6 transition-all hover:shadow-lg hover:border-primary/50"
    >
      <div className="flex flex-col gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-lg text-card-foreground">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>
      </div>
    </a>
  )
}
