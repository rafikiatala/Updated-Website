"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Search, ChevronRight, FileText, ExternalLink } from "lucide-react"

// Handbook sections with linked terms
const handbookSections = [
  {
    id: "welcome",
    title: "Welcome to ALA",
    translations: {
      fr: "Bienvenue à ALA",
      sw: "Karibu ALA",
      ar: "مرحبا بكم في ALA",
      pt: "Bem-vindo à ALA",
    },
    content:
      "African Leadership Academy is a transformative institution dedicated to developing the next generation of African leaders.",
    linkedTerms: ["Leadership", "Academy", "Africa"],
  },
  {
    id: "academic-policies",
    title: "Academic Policies",
    translations: {
      fr: "Politiques académiques",
      sw: "Sera za Elimu",
      ar: "السياسات الأكاديمية",
      pt: "Políticas Acadêmicas",
    },
    content:
      "Students are expected to maintain high academic standards and attend all classes. Assignments must be submitted on time.",
    linkedTerms: ["Classes", "Assignments", "Standards", "Attendance"],
  },
  {
    id: "residential-life",
    title: "Residential Life & UMUZI",
    translations: {
      fr: "Vie résidentielle et UMUZI",
      sw: "Maisha ya Makazi na UMUZI",
      ar: "الحياة السكنية وأوموزي",
      pt: "Vida Residencial e UMUZI",
    },
    content:
      "Students live in UMUZI houses, which are residential communities that foster belonging and leadership development.",
    linkedTerms: ["UMUZI", "Residential", "Community", "Houses"],
  },
  {
    id: "taalu-program",
    title: "TAALU Program",
    translations: {
      fr: "Programme TAALU",
      sw: "Programu ya TAALU",
      ar: "برنامج TAALU",
      pt: "Programa TAALU",
    },
    content:
      "The African Leadership Academy Leadership University (TAALU) provides experiential learning in entrepreneurship and leadership.",
    linkedTerms: ["TAALU", "Leadership", "Entrepreneurship", "Learning"],
  },
  {
    id: "dining-services",
    title: "Dining Services",
    translations: {
      fr: "Services de restauration",
      sw: "Huduma za Chakula",
      ar: "خدمات الطعام",
      pt: "Serviços de Alimentação",
    },
    content:
      "The dining hall serves three meals daily. Special dietary requirements can be accommodated with advance notice.",
    linkedTerms: ["Dining Hall", "Meals", "Food", "Breakfast", "Lunch", "Dinner"],
  },
  {
    id: "health-safety",
    title: "Health & Safety",
    translations: {
      fr: "Santé et sécurité",
      sw: "Afya na Usalama",
      ar: "الصحة والسلامة",
      pt: "Saúde e Segurança",
    },
    content:
      "The health center is open 24/7 for medical emergencies. Students should report any safety concerns immediately.",
    linkedTerms: ["Health Center", "Emergency", "Medical", "Safety"],
  },
  {
    id: "library-resources",
    title: "Library & Learning Resources",
    translations: {
      fr: "Bibliothèque et ressources d'apprentissage",
      sw: "Maktaba na Rasilimali za Kujifunza",
      ar: "المكتبة وموارد التعلم",
      pt: "Biblioteca e Recursos de Aprendizagem",
    },
    content:
      "The library provides study spaces, computers, and extensive book collections. Open from 7 AM to 10 PM daily.",
    linkedTerms: ["Library", "Study", "Books", "Computers"],
  },
  {
    id: "code-of-conduct",
    title: "Code of Conduct",
    translations: {
      fr: "Code de conduite",
      sw: "Kanuni za Tabia",
      ar: "قواعد السلوك",
      pt: "Código de Conduta",
    },
    content:
      "All students must respect others, maintain academic integrity, and follow school rules. Violations may result in disciplinary action.",
    linkedTerms: ["Respect", "Integrity", "Rules", "Discipline"],
  },
]

// Dictionary of terms with translations
const termDictionary: Record<
  string,
  {
    translations: Record<string, string>
    definition: string
  }
> = {
  TAALU: {
    translations: {
      fr: "TAALU (Université de Leadership de l'Académie de Leadership Africain)",
      sw: "TAALU (Chuo Kikuu cha Uongozi cha Akademia ya Uongozi wa Kiafrika)",
      ar: "TAALU (جامعة القيادة في أكاديمية القيادة الأفريقية)",
      pt: "TAALU (Universidade de Liderança da Academia de Liderança Africana)",
    },
    definition: "The African Leadership Academy Leadership University - experiential learning program",
  },
  UMUZI: {
    translations: {
      fr: "UMUZI (Maison résidentielle)",
      sw: "UMUZI (Nyumba ya makazi)",
      ar: "UMUZI (منزل سكني)",
      pt: "UMUZI (Casa residencial)",
    },
    definition: "Residential houses where students live and build community",
  },
  "Dining Hall": {
    translations: {
      fr: "Salle à manger",
      sw: "Ukumbi wa Chakula",
      ar: "قاعة الطعام",
      pt: "Refeitório",
    },
    definition: "Main facility for meals - breakfast, lunch, and dinner",
  },
  Library: {
    translations: {
      fr: "Bibliothèque",
      sw: "Maktaba",
      ar: "مكتبة",
      pt: "Biblioteca",
    },
    definition: "Study space with books, computers, and learning resources",
  },
}

export default function HandbookPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSection, setSelectedSection] = useState<(typeof handbookSections)[0] | null>(null)
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null)

  const filteredSections = handbookSections.filter(
    (section) =>
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      Object.values(section.translations).some((translation) =>
        translation.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <BookOpen className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Student Handbook</h1>
              <p className="text-sm text-muted-foreground">Essential information with translations and linked terms</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search handbook sections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Sections List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredSections.map((section) => (
              <Card
                key={section.id}
                className="cursor-pointer p-6 transition-all hover:shadow-lg"
                onClick={() => setSelectedSection(section)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg font-semibold text-foreground">{section.title}</h3>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">{section.content}</p>

                    {/* Linked Terms */}
                    <div className="flex flex-wrap gap-2">
                      {section.linkedTerms.slice(0, 3).map((term) => (
                        <Badge
                          key={term}
                          variant="outline"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedTerm(term)
                          }}
                        >
                          {term}
                        </Badge>
                      ))}
                      {section.linkedTerms.length > 3 && (
                        <Badge variant="outline">+{section.linkedTerms.length - 3} more</Badge>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
              </Card>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Quick Terms */}
            <Card className="p-6">
              <h3 className="mb-4 font-semibold text-foreground">Quick Terms</h3>
              <div className="space-y-2">
                {Object.keys(termDictionary).map((term) => (
                  <button
                    key={term}
                    onClick={() => setSelectedTerm(term)}
                    className="flex w-full items-center justify-between rounded-lg border p-3 text-left transition-colors hover:bg-accent"
                  >
                    <span className="text-sm font-medium text-foreground">{term}</span>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </Card>

            {/* Resources */}
            <Card className="p-6">
              <h3 className="mb-4 font-semibold text-foreground">Additional Resources</h3>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-between bg-transparent" asChild>
                  <a href="/events">
                    Events Calendar
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-between bg-transparent" asChild>
                  <a href="/map">
                    Campus Map
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" className="w-full justify-between bg-transparent" asChild>
                  <a href="/chat">
                    Ask RAFIKI
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Section Detail Modal */}
        {selectedSection && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
            onClick={() => setSelectedSection(null)}
          >
            <Card className="max-h-[90vh] w-full max-w-2xl overflow-y-auto p-6" onClick={(e) => e.stopPropagation()}>
              <div className="mb-6">
                <h2 className="mb-2 text-2xl font-bold text-foreground">{selectedSection.title}</h2>
                <p className="leading-relaxed text-foreground">{selectedSection.content}</p>
              </div>

              {/* Translations */}
              <div className="mb-6">
                <h3 className="mb-3 font-semibold text-foreground">Translations</h3>
                <div className="space-y-2">
                  {Object.entries(selectedSection.translations).map(([lang, translation]) => (
                    <div key={lang} className="flex items-start gap-3 text-sm">
                      <Badge variant="outline" className="uppercase">
                        {lang}
                      </Badge>
                      <span className="flex-1 text-foreground">{translation}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Linked Terms */}
              <div className="mb-6">
                <h3 className="mb-3 font-semibold text-foreground">Related Terms</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedSection.linkedTerms.map((term) => (
                    <Badge
                      key={term}
                      variant="outline"
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                      onClick={() => {
                        setSelectedTerm(term)
                        setSelectedSection(null)
                      }}
                    >
                      {term}
                    </Badge>
                  ))}
                </div>
              </div>

              <Button variant="outline" onClick={() => setSelectedSection(null)} className="w-full">
                Close
              </Button>
            </Card>
          </div>
        )}

        {/* Term Definition Modal */}
        {selectedTerm && termDictionary[selectedTerm] && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
            onClick={() => setSelectedTerm(null)}
          >
            <Card className="w-full max-w-lg p-6" onClick={(e) => e.stopPropagation()}>
              <div className="mb-4">
                <h2 className="mb-2 text-2xl font-bold text-foreground">{selectedTerm}</h2>
                <p className="leading-relaxed text-muted-foreground">{termDictionary[selectedTerm].definition}</p>
              </div>

              {/* Translations */}
              <div className="mb-6">
                <h3 className="mb-3 font-semibold text-foreground">Translations</h3>
                <div className="space-y-2">
                  {Object.entries(termDictionary[selectedTerm].translations).map(([lang, translation]) => (
                    <div key={lang} className="flex items-start gap-3 text-sm">
                      <Badge variant="outline" className="uppercase">
                        {lang}
                      </Badge>
                      <span className="flex-1 text-foreground">{translation}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button variant="outline" onClick={() => setSelectedTerm(null)} className="w-full">
                Close
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
