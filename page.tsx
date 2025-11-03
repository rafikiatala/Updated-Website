"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, ChevronRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"

// Sample events data
const events = [
  {
    id: "taalu-1",
    title: "TAALU Leadership Workshop",
    translations: {
      fr: "Atelier de leadership TAALU",
      sw: "Warsha ya Uongozi wa TAALU",
      ar: "ورشة عمل القيادة TAALU",
      pt: "Workshop de Liderança TAALU",
    },
    description: "Interactive leadership development session focusing on entrepreneurship and social impact",
    date: "2025-10-05",
    time: "14:00",
    location: "Theater",
    category: "TAALU",
    attendees: 45,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-10-01%20at%2011.39.01%20AM-pQscs1oB3eUIj2dTbHWnPkdzvo0DLC.jpeg",
  },
  {
    id: "umuzi-1",
    title: "UMUZI House Meeting",
    translations: {
      fr: "Réunion de la maison UMUZI",
      sw: "Mkutano wa Nyumba ya UMUZI",
      ar: "اجتماع منزل أوموزي",
      pt: "Reunião da Casa UMUZI",
    },
    description: "Monthly house gathering for community building and announcements",
    date: "2025-10-08",
    time: "18:30",
    location: "UMUZI House 1",
    category: "UMUZI",
    attendees: 30,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-10-01%20at%2011.39.02%20AM-Qv8ViOzV5M6Qz0i9WTbvXIiApsioGg.jpeg",
  },
  {
    id: "cultural-1",
    title: "African Cultural Day",
    translations: {
      fr: "Journée culturelle africaine",
      sw: "Siku ya Utamaduni wa Kiafrika",
      ar: "يوم الثقافة الأفريقية",
      pt: "Dia Cultural Africano",
    },
    description: "Celebrate African diversity through music, dance, and traditional cuisine",
    date: "2025-10-12",
    time: "19:00",
    location: "Dining Hall",
    category: "Cultural",
    attendees: 120,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-10-01%20at%2011.39.03%20AM-i4e8RyFFHMh6ax4LXlUvxfArue3y2V.jpeg",
  },
  {
    id: "sports-1",
    title: "Inter-House Sports Day",
    translations: {
      fr: "Journée sportive inter-maisons",
      sw: "Siku ya Michezo ya Nyumba",
      ar: "يوم الرياضة بين المنازل",
      pt: "Dia Esportivo Inter-Casas",
    },
    description: "Friendly competition between UMUZI houses in various sports",
    date: "2025-10-15",
    time: "09:00",
    location: "Sports Center",
    category: "Sports",
    attendees: 80,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-10-01%20at%2011.39.01%20AM-3-P5LRlR6itpzUZNQOeVwrRZK8rUlGwy.jpeg",
  },
  {
    id: "academic-1",
    title: "NASA Hackathon",
    translations: {
      fr: "Hackathon NASA",
      sw: "Hackathon ya NASA",
      ar: "هاكاثون ناسا",
      pt: "Hackathon da NASA",
    },
    description: "Student projects showcasing innovation and scientific research",
    date: "2025-10-20",
    time: "10:00",
    location: "Foyer",
    category: "Academic",
    attendees: 30,
    image: "/science-fair-student-projects.jpg",
  },
  {
    id: "taalu-2",
    title: "Investment Council Pitch",
    translations: {
      fr: "Présentation au Conseil d'Investissement",
      sw: "Maonyesho ya Baraza la Uwekezaji",
      ar: "عرض مجلس الاستثمار",
      pt: "Apresentação ao Conselho de Investimento",
    },
    description: "Students present their business ideas to a panel of judges",
    date: "2024-10-01",
    time: "15:00",
    location: "Theater",
    category: "TAALU",
    attendees: 50,
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-10-01%20at%2011.38.59%20AM-x6M2MxNJi7VsmETa6mktPLBgTCmROf.jpeg",
    status: "completed",
    nextEventDate: "2026-10-01",
  },
]

const categories = ["All", "TAALU", "UMUZI", "Cultural", "Sports", "Academic"]

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedEvent, setSelectedEvent] = useState<(typeof events)[0] | null>(null)

  const filteredEvents = events.filter((event) => selectedCategory === "All" || event.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Calendar className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Events Calendar</h1>
              <p className="text-sm text-muted-foreground">Stay updated on TAALU, UMUZI, and campus activities</p>
            </div>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredEvents.map((event) => (
            <Card
              key={event.id}
              className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg"
              onClick={() => setSelectedEvent(event)}
            >
              {/* Event Image */}
              <div className="relative aspect-video overflow-hidden bg-muted">
                <img
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                />
                {event.status === "completed" ? (
                  <Badge className="absolute right-3 top-3 bg-green-600">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Completed
                  </Badge>
                ) : (
                  <Badge className="absolute right-3 top-3">{event.category}</Badge>
                )}
              </div>

              {/* Event Details */}
              <div className="p-6">
                <h3 className="mb-2 text-xl font-semibold text-foreground">{event.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">{event.description}</p>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>

                <Button variant="ghost" className="mt-4 w-full justify-between">
                  View Details
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Event Detail Modal */}
        {selectedEvent && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
            onClick={() => setSelectedEvent(null)}
          >
            <Card className="max-h-[90vh] w-full max-w-2xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              {/* Event Image */}
              <div className="relative aspect-video overflow-hidden bg-muted">
                <img
                  src={selectedEvent.image || "/placeholder.svg"}
                  alt={selectedEvent.title}
                  className="h-full w-full object-cover"
                />
                {selectedEvent.status === "completed" ? (
                  <Badge className="absolute right-4 top-4 bg-green-600">
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Completed
                  </Badge>
                ) : (
                  <Badge className="absolute right-4 top-4">{selectedEvent.category}</Badge>
                )}
              </div>

              <div className="p-6">
                <div className="mb-6">
                  <h2 className="mb-2 text-2xl font-bold text-foreground">{selectedEvent.title}</h2>
                  <p className="leading-relaxed text-muted-foreground">{selectedEvent.description}</p>
                </div>

                {selectedEvent.status === "completed" && (
                  <div className="mb-6 rounded-lg bg-green-50 p-4 dark:bg-green-950/20">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                      <CheckCircle2 className="h-5 w-5" />
                      <p className="font-semibold">This event has been completed</p>
                    </div>
                    {selectedEvent.nextEventDate && (
                      <p className="mt-2 text-sm text-green-600 dark:text-green-500">
                        Next event:{" "}
                        {new Date(selectedEvent.nextEventDate).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    )}
                  </div>
                )}

                {/* Event Info */}
                <div className="mb-6 space-y-3">
                  <div className="flex items-center gap-3 text-foreground">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>
                      {new Date(selectedEvent.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <Clock className="h-5 w-5 text-primary" />
                    <span>{selectedEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <MapPin className="h-5 w-5 text-primary" />
                    <span>{selectedEvent.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground">
                    <Users className="h-5 w-5 text-primary" />
                    <span>{selectedEvent.attendees} people attending</span>
                  </div>
                </div>

                {/* Translations */}
                <div className="mb-6">
                  <h3 className="mb-3 font-semibold text-foreground">Translations</h3>
                  <div className="space-y-2">
                    {Object.entries(selectedEvent.translations).map(([lang, translation]) => (
                      <div key={lang} className="flex items-start gap-3 text-sm">
                        <Badge variant="outline" className="uppercase">
                          {lang}
                        </Badge>
                        <span className="flex-1 text-foreground">{translation}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <Link href={`/events/register?eventId=${selectedEvent.id}`} className="flex-1">
                    <Button className="w-full">
                      {selectedEvent.status === "completed" ? "Register for Next Year" : "Register for Event"}
                    </Button>
                  </Link>
                  <Button variant="outline" onClick={() => setSelectedEvent(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
