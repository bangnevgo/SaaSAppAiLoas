"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Target, ArrowRight, Sparkles, TrendingUp, Calendar, Heart, ArrowLeft, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

export default function ManifestationIntentions() {
  const [intention, setIntention] = useState("")
  const [affirmation, setAffirmation] = useState("")
  const [startDate, setStartDate] = useState("")
  const [category, setCategory] = useState("")
  const [evidenceCount, setEvidenceCount] = useState(0)
  const { theme, setTheme } = useTheme()

  const categories = [
    { value: "career", label: "Karir & Bisnis" },
    { value: "health", label: "Kesehatan & Wellness" },
    { value: "relationship", label: "Hubungan & Cinta" },
    { value: "wealth", label: "Kekayaan & Abundance" },
    { value: "personal-growth", label: "Personal Growth" },
    { value: "spirituality", label: "Spiritualitas" },
    { value: "creativity", label: "Kreativitas" },
    { value: "family", label: "Keluarga" },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!intention.trim() || !affirmation.trim() || !startDate || !category) {
      alert("Silakan lengkapi semua field")
      return
    }

    // Here you would save to database
    console.log("Saving manifestation intention:", {
      intention,
      affirmation,
      startDate,
      category,
    })
    alert("Intention berhasil disimpan! Mulai perjalanan manifestasimu.")

    // Reset form
    setIntention("")
    setAffirmation("")
    setStartDate("")
    setCategory("")
    setEvidenceCount(0)
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
                  <Target className="h-8 w-8 text-amber-600" />
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
                Atur Niat Manifestasi
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Tuliskan niat dan afirmasi harian Anda untuk mengarahkan energi dan fokus.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 max-w-2xl mx-auto px-4 pt-5 sm:px-6">
              <div className="space-y-6">
                {/* Niat */}
                <div>
                  <Label htmlFor="intention" className="text-sm font-medium text-gray-900 dark:text-white">
                    Niat Manifestasi (Intention)
                  </Label>
                  <Input
                    id="intention"
                    placeholder="Misalnya: Saya ingin menarik keserakahan finansial, cinta yang sehat, atau kesejahteraan..."
                    value={intention}
                    onChange={(e) => setIntention(e.target.value)}
                    className="w-full"
                  />
                </div>

                {/* Afirmasi */}
                <div>
                  <Label htmlFor="affirmation" className="text-sm font-medium text-gray-900 dark:text-white">
                    Afirmasi Harian
                  </Label>
                  <textarea
                    id="affirmation"
                    placeholder="Tuliskan afirmasi yang menguatkan niat Anda, contoh: 'Saya layak menerima abundansi dalam semua bentuknya'..."
                    value={affirmation}
                    onChange={(e) => setAffirmation(e.target.value)}
                    className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                {/* Tanggal Mulai & Kategori */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {/* Tanggal Mulai */}
                  <div>
                    <Label htmlFor="startDate" className="text-sm font-medium text-gray-900 dark:text-white">
                      Tanggal Mulai
                    </Label>
                    <input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>

                  {/* Kategori */}
                  <div>
                    <Label htmlFor="category" className="text-sm font-medium text-gray-900 dark:text-white">
                      Kategori Niat
                    </Label>
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Pilih kategori...</option>
                      {categories.map((cat) => (
                        <option key={cat.value} value={cat.value}>
                          {cat.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Bukti Manifestasi (preview) */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      Bukti Manifestasi (Evidence Vault)
                    </h3>
                    <span className="text-sm text-muted-foreground">
                      {evidenceCount} bukti tercatat
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Setiap kali Anda melihat tanda kecil bahwa niat Anda mulai bekerja,
                    catat di sini sebagai bukti manifestasi.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <Button
                  type="button"
                  onClick={() => {
                    setIntention("")
                    setAffirmation("")
                    setStartDate("")
                    setCategory("")
                    setEvidenceCount(0)
                  }}
                  variant="outline"
                >
                  Batal
                </Button>
                <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Simpan Niat
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
