"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BookOpen, MapPin, Heart, Smile, Frown, Angry, Zap, Clock, ArrowLeft, ArrowRight, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes/dist/index.mjs"
import { cn } from "@/lib/utils"

export default function NewJournalEntry() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [mood, setMood] = useState("")
  const [location, setLocation] = useState("")
  const [isPrivate, setIsPrivate] = useState(true)
  const { theme, setTheme } = useTheme()

  const moodOptions = [
    { value: "happy", label: "Bahagia", icon: Smile },
    { value: "neutral", label: "Netral", icon: Zap },
    { value: "sad", label: "Sedih", icon: Frown },
    { value: "angry", label: "Marah", icon: Angry },
    { value: "excited", label: "Bersemangat", icon: Heart },
    { value: "calm", label: "Tenang", icon: Smile },
    { value: "anxious", label: "Cemas", icon: Zap },
    { value: "grateful", label: "Bersyukur", icon: Heart },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save to database
    console.log("Saving journal entry:", { title, content, mood, location, isPrivate })
    alert("Entri jurnal berhasil disimpan!")
    // Reset form
    setTitle("")
    setContent("")
    setMood("")
    setLocation("")
    setIsPrivate(true)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Theme toggle */}
      <div className="fixed top-4 right-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-muted-foreground hover:text-foreground"
        >
          {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>
      </div>

      <div className="flex min-h-screen flex-col">
        {/* Header */}
        <header className="bg-white dark:bg-gray-800 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <a href="/journal" className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700">
                      Journal
                    </a>
                    <a href="/mirror" className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700">
                      Mirror
                    </a>
                    <a href="/manifestation" className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700">
                      Teman Manifestasi
                    </a>
                  </div>
                </div>
                <div className="hidden md:block ml-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <div className="-mr-2 flex md:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main */}
        <main className="flex-1">
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 pt-5 sm:px-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Buat Entri Jurnal Baru
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Catat pilihan harianmu, lacak suasana hati, dan tumbuh melalui refleksi.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 max-w-2xl mx-auto px-4 pt-5 sm:px-6">
              <div className="space-y-6">
                {/* Judul */}
                <div>
                  <Label htmlFor="title" className="text-sm font-medium text-gray-900 dark:text-white">
                    Judul Entri
                  </Label>
                  <Input
                    id="title"
                    placeholder="Misalnya: Hari ini saya merasa bahagia karena..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Konten */}
                <div>
                  <Label htmlFor="content" className="text-sm font-medium text-gray-900 dark:text-white">
                    Yang terjadi hari ini
                  </Label>
                  <textarea
                    id="content"
                    placeholder="Tuliskan apa yang terjadi hari ini, perasaanmu, dan apa yang ingin kamu ingat..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full min-h-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                {/* Mood & Location */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Mood */}
                  <div>
                    <Label htmlFor="mood" className="text-sm font-medium text-gray-900 dark:text-white">
                      Mood saat ini
                    </Label>
                    <select
                      id="mood"
                      value={mood}
                      onChange={(e) => setMood(e.target.value)}
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Pilih mood...</option>
                      {moodOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <option.icon className="w-4 h-4" />
                            <span>{option.label}</span>
                          </div>
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Lokasi */}
                  <div>
                    <Label htmlFor="location" className="text-sm font-medium text-gray-900 dark:text-white">
                      Lokasi
                    </Label>
                    <Input
                      id="location"
                      placeholder="Di rumah, kantor, kafe, taman, dll."
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Privacy & Tags */}
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isPrivate"
                      checked={isPrivate}
                      onChange={(e) => setIsPrivate(e.target.checked)}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <Label htmlFor="isPrivate" className="text-sm font-medium text-gray-900 dark:text-white">
                      Entri pribadi (tidak bisa dibagikan)
                    </Label>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <Button
                  type="button"
                  onClick={() => {
                    setTitle("")
                    setContent("")
                    setMood("")
                    setLocation("")
                    setIsPrivate(true)
                  }}
                  variant="outline"
                >
                  Batal
                </Button>
                <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Simpan Entri
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span className="flex items-center">
                &copy; 2025 NexusReflect. All rights reserved.
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}