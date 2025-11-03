"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MapPin, Navigation, Search, Info } from "lucide-react"

// Campus locations with translations - updated to match the map image
const locations = [
  {
    id: "learning-commons",
    name: "Learning Commons",
    translations: {
      fr: "Communs d'apprentissage",
      sw: "Sehemu ya Kujifunzia",
      ar: "مساحة التعلم المشتركة",
      pt: "Espaço de Aprendizagem",
    },
    category: "Academic",
    coordinates: { x: 25, y: 30 },
    description: "Main learning space with study areas and resources",
    color: "green",
  },
  {
    id: "auditorium",
    name: "Auditorium",
    translations: {
      fr: "Auditorium",
      sw: "Ukumbi Mkuu",
      ar: "القاعة الكبرى",
      pt: "Auditório",
    },
    category: "Academic",
    coordinates: { x: 30, y: 55 },
    description: "Main auditorium for assemblies and performances",
    color: "green",
  },
  {
    id: "dining-hall",
    name: "Dining Hall",
    translations: {
      fr: "Salle à manger",
      sw: "Ukumbi wa Chakula",
      ar: "قاعة الطعام",
      pt: "Refeitório",
    },
    category: "Facilities",
    coordinates: { x: 60, y: 45 },
    description: "Main dining facility serving breakfast, lunch, and dinner",
    color: "green",
  },
  {
    id: "dormitories-north",
    name: "Dormitories",
    translations: {
      fr: "Dortoirs",
      sw: "Majengo ya Kulala",
      ar: "المهاجع",
      pt: "Dormitórios",
    },
    category: "Residential",
    coordinates: { x: 50, y: 60 },
    description: "Student residential dormitories",
    color: "green",
  },
  {
    id: "dormitories-south",
    name: "Dormitories",
    translations: {
      fr: "Dortoirs",
      sw: "Majengo ya Kulala",
      ar: "المهاجع",
      pt: "Dormitórios",
    },
    category: "Residential",
    coordinates: { x: 45, y: 75 },
    description: "Student residential dormitories",
    color: "green",
  },
  {
    id: "quad",
    name: "Quad",
    translations: {
      fr: "Cour",
      sw: "Uwanja wa Kati",
      ar: "الساحة المركزية",
      pt: "Quadra Central",
    },
    category: "Recreation",
    coordinates: { x: 45, y: 50 },
    description: "Central gathering space",
    color: "green",
  },
  {
    id: "staffulty-house",
    name: "Staffulty House",
    translations: {
      fr: "Maison du personnel",
      sw: "Nyumba ya Wafanyakazi",
      ar: "منزل الموظفين",
      pt: "Casa dos Funcionários",
    },
    category: "Residential",
    coordinates: { x: 15, y: 50 },
    description: "Staff and faculty residence",
    color: "maroon",
  },
  {
    id: "container-classrooms",
    name: "Container Classrooms",
    translations: {
      fr: "Salles de classe conteneurs",
      sw: "Madarasa ya Kontena",
      ar: "الفصول الدراسية المتنقلة",
      pt: "Salas de Aula Container",
    },
    category: "Academic",
    coordinates: { x: 18, y: 60 },
    description: "Additional classroom spaces",
    color: "maroon",
  },
  {
    id: "astro-turf",
    name: "Astro Turf Field",
    translations: {
      fr: "Terrain en gazon synthétique",
      sw: "Uwanja wa Majani Bandia",
      ar: "ملعب العشب الصناعي",
      pt: "Campo de Grama Sintética",
    },
    category: "Recreation",
    coordinates: { x: 15, y: 70 },
    description: "Artificial turf sports field",
    color: "maroon",
  },
  {
    id: "tennis-basketball",
    name: "Tennis & Basketball Courts",
    translations: {
      fr: "Courts de tennis et basketball",
      sw: "Viwanja vya Tenisi na Mpira wa Kikapu",
      ar: "ملاعب التنس وكرة السلة",
      pt: "Quadras de Tênis e Basquete",
    },
    category: "Recreation",
    coordinates: { x: 20, y: 75 },
    description: "Outdoor sports courts",
    color: "maroon",
  },
  {
    id: "magenta-room",
    name: "Magenta Room",
    translations: {
      fr: "Salle Magenta",
      sw: "Chumba cha Magenta",
      ar: "غرفة ماجنتا",
      pt: "Sala Magenta",
    },
    category: "Facilities",
    coordinates: { x: 75, y: 45 },
    description: "Multi-purpose room",
    color: "maroon",
  },
  {
    id: "deans-house",
    name: "Deans' House",
    translations: {
      fr: "Maison des doyens",
      sw: "Nyumba ya Wakuu",
      ar: "منزل العمداء",
      pt: "Casa dos Diretores",
    },
    category: "Administrative",
    coordinates: { x: 35, y: 25 },
    description: "Dean's residence and office",
    color: "maroon",
  },
  {
    id: "classroom",
    name: "Classroom",
    translations: {
      fr: "Salle de classe",
      sw: "Darasa",
      ar: "الفصل الدراسي",
      pt: "Sala de Aula",
    },
    category: "Academic",
    coordinates: { x: 40, y: 35 },
    description: "Classroom building",
    color: "maroon",
  },
  {
    id: "lecture-centre",
    name: "Lecture Centre",
    translations: {
      fr: "Centre de conférences",
      sw: "Kituo cha Mihadhara",
      ar: "مركز المحاضرات",
      pt: "Centro de Palestras",
    },
    category: "Academic",
    coordinates: { x: 55, y: 35 },
    description: "Main lecture hall",
    color: "maroon",
  },
  {
    id: "security-office",
    name: "Security Office",
    translations: {
      fr: "Bureau de sécurité",
      sw: "Ofisi ya Usalama",
      ar: "مكتب الأمن",
      pt: "Escritório de Segurança",
    },
    category: "Administrative",
    coordinates: { x: 55, y: 20 },
    description: "Campus security office",
    color: "maroon",
  },
  {
    id: "soccer-field",
    name: "Soccer Field",
    translations: {
      fr: "Terrain de football",
      sw: "Uwanja wa Mpira",
      ar: "ملعب كرة القدم",
      pt: "Campo de Futebol",
    },
    category: "Recreation",
    coordinates: { x: 80, y: 55 },
    description: "Main soccer field and emergency assembly point",
    color: "outline",
  },
  {
    id: "staffulty-thatch",
    name: "Staffulty Thatch House",
    translations: {
      fr: "Maison de chaume du personnel",
      sw: "Nyumba ya Majani ya Wafanyakazi",
      ar: "منزل القش للموظفين",
      pt: "Casa de Palha dos Funcionários",
    },
    category: "Residential",
    coordinates: { x: 20, y: 20 },
    description: "Staff residence",
    color: "maroon",
  },
]

const categories = ["All", "Academic", "Residential", "Facilities", "Recreation", "Administrative"]

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState<(typeof locations)[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredLocations = locations.filter((location) => {
    const matchesSearch =
      location.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      Object.values(location.translations).some((translation) =>
        translation.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    const matchesCategory = selectedCategory === "All" || location.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <MapPin className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Campus Map</h1>
              <p className="text-sm text-muted-foreground">Find your way around ALA</p>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="mt-4 flex flex-wrap gap-2">
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

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Map Visualization */}
          <Card className="lg:col-span-2 p-6">
            <div
              className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border-2 border-border"
              style={{ backgroundColor: "#f5f1e8" }}
            >
              <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
                {/* Roads */}
                <path d="M 0 15 L 100 15" stroke="#9ca3af" strokeWidth="4" fill="none" />
                <text x="85" y="12" className="fill-gray-700 text-[2.5px] font-medium" textAnchor="middle">
                  Printech Rd
                </text>

                <path d="M 85 100 L 100 85" stroke="#9ca3af" strokeWidth="4" fill="none" />
                <text x="88" y="95" className="fill-gray-700 text-[2.5px] font-medium" textAnchor="middle">
                  Zeiss Rd
                </text>

                {/* Campus boundary path */}
                <path
                  d="M 10 20 Q 10 15 15 15 L 50 15 Q 55 15 55 20 L 90 20 Q 95 20 95 25 L 95 80 Q 95 85 90 85 L 15 85 Q 10 85 10 80 Z"
                  fill="none"
                  stroke="#c4a69d"
                  strokeWidth="1.5"
                />

                {/* Trees - scattered green circles */}
                {[
                  [12, 25],
                  [15, 30],
                  [18, 28],
                  [22, 32],
                  [25, 27],
                  [28, 35],
                  [32, 30],
                  [35, 38],
                  [38, 33],
                  [42, 28],
                  [48, 25],
                  [52, 30],
                  [58, 28],
                  [62, 32],
                  [68, 30],
                  [72, 35],
                  [75, 32],
                  [78, 38],
                  [82, 35],
                  [85, 40],
                  [88, 45],
                  [15, 45],
                  [18, 50],
                  [22, 48],
                  [25, 55],
                  [28, 52],
                  [32, 58],
                  [35, 62],
                  [38, 68],
                  [42, 72],
                  [48, 78],
                  [52, 75],
                  [58, 80],
                  [62, 77],
                  [68, 82],
                  [72, 78],
                  [75, 72],
                  [78, 68],
                  [82, 65],
                  [85, 62],
                  [88, 58],
                ].map(([cx, cy], i) => (
                  <circle key={`tree-${i}`} cx={cx} cy={cy} r="1.5" fill="#7a9b7e" opacity="0.6" />
                ))}

                {/* Central Quad - large green circle */}
                <circle cx="45" cy="50" r="10" fill="#4a7c4e" opacity="0.7" />
                <text x="45" y="51" className="fill-white text-[3px] font-semibold" textAnchor="middle">
                  Quad
                </text>

                {/* Buildings - Academic (Green) */}
                <g>
                  {/* Learning Commons */}
                  <rect
                    x="18"
                    y="28"
                    width="18"
                    height="10"
                    fill="#4a7c4e"
                    stroke="#3d6640"
                    strokeWidth="0.5"
                    rx="1"
                    transform="rotate(-5 27 33)"
                  />
                  <text x="27" y="34" className="fill-white text-[2px] font-medium" textAnchor="middle">
                    Learning
                  </text>
                  <text x="27" y="36.5" className="fill-white text-[2px] font-medium" textAnchor="middle">
                    Commons
                  </text>

                  {/* Auditorium */}
                  <rect
                    x="25"
                    y="52"
                    width="12"
                    height="8"
                    fill="#4a7c4e"
                    stroke="#3d6640"
                    strokeWidth="0.5"
                    rx="1"
                    transform="rotate(-8 31 56)"
                  />
                  <text x="31" y="57" className="fill-white text-[2px] font-medium" textAnchor="middle">
                    Auditorium
                  </text>

                  {/* Dining Hall */}
                  <rect x="55" y="42" width="15" height="9" fill="#4a7c4e" stroke="#3d6640" strokeWidth="0.5" rx="1" />
                  <text x="62.5" y="47.5" className="fill-white text-[2px] font-medium" textAnchor="middle">
                    Dining Hall
                  </text>

                  {/* Dormitories North */}
                  <rect x="43" y="57" width="14" height="8" fill="#4a7c4e" stroke="#3d6640" strokeWidth="0.5" rx="1" />
                  <text x="50" y="62" className="fill-white text-[2px] font-medium" textAnchor="middle">
                    Dormitories
                  </text>

                  {/* Dormitories South */}
                  <rect
                    x="40"
                    y="72"
                    width="16"
                    height="9"
                    fill="#4a7c4e"
                    stroke="#3d6640"
                    strokeWidth="0.5"
                    rx="1"
                    transform="rotate(2 48 76.5)"
                  />
                  <text x="48" y="77.5" className="fill-white text-[2px] font-medium" textAnchor="middle">
                    Dormitories
                  </text>
                </g>

                {/* Buildings - Residential/Support (Maroon) */}
                <g>
                  {/* Staffulty House */}
                  <rect x="10" y="48" width="10" height="7" fill="#7d2e3d" stroke="#5a1f2d" strokeWidth="0.5" rx="1" />
                  <text x="15" y="52.5" className="fill-white text-[1.8px] font-medium" textAnchor="middle">
                    Staffulty
                  </text>
                  <text x="15" y="54.5" className="fill-white text-[1.8px] font-medium" textAnchor="middle">
                    House
                  </text>

                  {/* Container Classrooms */}
                  <rect x="13" y="58" width="10" height="7" fill="#7d2e3d" stroke="#5a1f2d" strokeWidth="0.5" rx="1" />
                  <text x="18" y="62.5" className="fill-white text-[1.8px] font-medium" textAnchor="middle">
                    Container
                  </text>
                  <text x="18" y="64.5" className="fill-white text-[1.8px] font-medium" textAnchor="middle">
                    Classrooms
                  </text>

                  {/* Astro Turf */}
                  <rect x="10" y="68" width="9" height="6" fill="#7d2e3d" stroke="#5a1f2d" strokeWidth="0.5" rx="1" />
                  <text x="14.5" y="71.5" className="fill-white text-[1.6px] font-medium" textAnchor="middle">
                    Astro Turf
                  </text>
                  <text x="14.5" y="73.5" className="fill-white text-[1.6px] font-medium" textAnchor="middle">
                    field
                  </text>

                  {/* Tennis & Basketball Courts */}
                  <rect
                    x="15"
                    y="75"
                    width="11"
                    height="7"
                    fill="#7d2e3d"
                    stroke="#5a1f2d"
                    strokeWidth="0.5"
                    rx="1"
                    transform="rotate(-10 20.5 78.5)"
                  />
                  <text x="20.5" y="78.5" className="fill-white text-[1.6px] font-medium" textAnchor="middle">
                    Tennis &
                  </text>
                  <text x="20.5" y="80.5" className="fill-white text-[1.6px] font-medium" textAnchor="middle">
                    Basketball
                  </text>

                  {/* Magenta Room */}
                  <rect x="72" y="42" width="9" height="7" fill="#7d2e3d" stroke="#5a1f2d" strokeWidth="0.5" rx="1" />
                  <text x="76.5" y="46.5" className="fill-white text-[1.8px] font-medium" textAnchor="middle">
                    Magenta
                  </text>
                  <text x="76.5" y="48.5" className="fill-white text-[1.8px] font-medium" textAnchor="middle">
                    Room
                  </text>

                  {/* Deans' House */}
                  <rect x="32" y="23" width="9" height="6" fill="#7d2e3d" stroke="#5a1f2d" strokeWidth="0.5" rx="1" />
                  <text x="36.5" y="26.5" className="fill-white text-[1.8px] font-medium" textAnchor="middle">
                    Deans'
                  </text>
                  <text x="36.5" y="28.5" className="fill-white text-[1.8px] font-medium" textAnchor="middle">
                    House
                  </text>

                  {/* Classroom */}
                  <rect
                    x="38"
                    y="33"
                    width="8"
                    height="6"
                    fill="#7d2e3d"
                    stroke="#5a1f2d"
                    strokeWidth="0.5"
                    rx="1"
                    transform="rotate(5 42 36)"
                  />
                  <text x="42" y="37" className="fill-white text-[1.8px] font-medium" textAnchor="middle">
                    Classroom
                  </text>

                  {/* Lecture Centre */}
                  <rect x="52" y="32" width="10" height="7" fill="#7d2e3d" stroke="#5a1f2d" strokeWidth="0.5" rx="1" />
                  <text x="57" y="36" className="fill-white text-[1.8px] font-medium" textAnchor="middle">
                    Lecture
                  </text>
                  <text x="57" y="38" className="fill-white text-[1.8px] font-medium" textAnchor="middle">
                    Centre
                  </text>

                  {/* Security Office */}
                  <rect x="52" y="18" width="9" height="6" fill="#7d2e3d" stroke="#5a1f2d" strokeWidth="0.5" rx="1" />
                  <text x="56.5" y="21.5" className="fill-white text-[1.8px] font-medium" textAnchor="middle">
                    Security
                  </text>
                  <text x="56.5" y="23.5" className="fill-white text-[1.8px] font-medium" textAnchor="middle">
                    Office
                  </text>

                  {/* Staffulty Thatch House */}
                  <rect x="16" y="18" width="9" height="6" fill="#7d2e3d" stroke="#5a1f2d" strokeWidth="0.5" rx="1" />
                  <text x="20.5" y="21.5" className="fill-white text-[1.6px] font-medium" textAnchor="middle">
                    Staffulty
                  </text>
                  <text x="20.5" y="23.5" className="fill-white text-[1.6px] font-medium" textAnchor="middle">
                    Thatch House
                  </text>
                </g>

                {/* Soccer Field with Emergency Assembly Point */}
                <rect
                  x="75"
                  y="52"
                  width="15"
                  height="12"
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="0.8"
                  rx="1"
                  strokeDasharray="1,1"
                />
                <text x="82.5" y="57" className="fill-gray-700 text-[2px] font-medium" textAnchor="middle">
                  Soccer Field
                </text>
                <text x="82.5" y="60" className="fill-red-600 text-[1.8px] font-semibold" textAnchor="middle">
                  Emergency
                </text>
                <text x="82.5" y="62" className="fill-red-600 text-[1.8px] font-semibold" textAnchor="middle">
                  Assembly Point
                </text>

                {/* Labels for entrances */}
                <text x="28" y="13" className="fill-gray-700 text-[2.5px] font-medium" textAnchor="middle">
                  Staffulty
                </text>
                <text x="28" y="15.5" className="fill-gray-700 text-[2.5px] font-medium" textAnchor="middle">
                  Entrance
                </text>

                {/* Interactive markers on top of buildings */}
                {filteredLocations.map((location) => (
                  <g key={location.id}>
                    <circle
                      cx={location.coordinates.x}
                      cy={location.coordinates.y}
                      r="2"
                      className={`cursor-pointer transition-all ${
                        selectedLocation?.id === location.id
                          ? "fill-yellow-400 stroke-yellow-600"
                          : "fill-blue-500/80 stroke-blue-700 hover:fill-blue-400 hover:stroke-blue-600"
                      }`}
                      strokeWidth="0.5"
                      onClick={() => setSelectedLocation(location)}
                    />
                  </g>
                ))}

                {/* Route line if location is selected */}
                {selectedLocation && (
                  <line
                    x1="45"
                    y1="50"
                    x2={selectedLocation.coordinates.x}
                    y2={selectedLocation.coordinates.y}
                    stroke="#3b82f6"
                    strokeWidth="0.8"
                    strokeDasharray="2,1"
                  />
                )}
              </svg>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 rounded-lg bg-background/95 p-3 shadow-lg backdrop-blur-sm">
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded bg-[#4a7c4e]" />
                    <span className="text-muted-foreground">Academic Buildings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded bg-[#7d2e3d]" />
                    <span className="text-muted-foreground">Residential/Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-blue-500" />
                    <span className="text-muted-foreground">Click to explore</span>
                  </div>
                </div>
              </div>
            </div>

            {selectedLocation && (
              <div className="mt-4 flex items-start gap-3 rounded-lg border bg-card p-4">
                <Info className="h-5 w-5 text-primary" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">
                    Click on any blue marker to see details and get directions
                  </p>
                </div>
              </div>
            )}
          </Card>

          {/* Location Details */}
          <div className="space-y-4">
            {selectedLocation ? (
              <Card className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">{selectedLocation.name}</h3>
                    <Badge variant="secondary" className="mt-2">
                      {selectedLocation.category}
                    </Badge>
                  </div>
                  <Button size="icon" variant="ghost" onClick={() => setSelectedLocation(null)}>
                    ×
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-muted-foreground">Translations</h4>
                    <div className="space-y-2">
                      {Object.entries(selectedLocation.translations).map(([lang, translation]) => (
                        <div key={lang} className="flex items-center justify-between text-sm">
                          <span className="font-medium uppercase text-muted-foreground">{lang}:</span>
                          <span className="text-foreground">{translation}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="mb-2 text-sm font-medium text-muted-foreground">Description</h4>
                    <p className="text-sm leading-relaxed text-foreground">{selectedLocation.description}</p>
                  </div>

                  <Button className="w-full gap-2">
                    <Navigation className="h-4 w-4" />
                    Get Directions
                  </Button>
                </div>
              </Card>
            ) : (
              <Card className="p-6">
                <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <MapPin className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold text-foreground">Select a Location</h3>
                    <p className="text-sm text-muted-foreground">
                      Click on any blue marker on the map to see details and translations
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {/* Quick Locations List */}
            <Card className="p-6">
              <h3 className="mb-4 font-semibold text-foreground">Quick Access</h3>
              <div className="space-y-2">
                {filteredLocations.slice(0, 5).map((location) => (
                  <button
                    key={location.id}
                    onClick={() => setSelectedLocation(location)}
                    className="flex w-full items-center justify-between rounded-lg border p-3 text-left transition-colors hover:bg-accent"
                  >
                    <span className="text-sm font-medium text-foreground">{location.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {location.category}
                    </Badge>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
