"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, MapPin, Heart, Smile, Frown, Angry, Zap, Clock, ArrowLeft, ArrowRight, Sun, Moon, Home } from "lucide-react"
import { useTheme } from "next-themes/dist/index.mjs"
import { cn } from "@/lib/utils"
import { AppShell } from "@/app/app-shell"

export default function NewJournalEntry() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [mood, setMood] = useState("")
  const [location, setLocation] = useState("")
  const [isPrivate, setIsPrivate] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
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
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await fetch("/api/journal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          mood,
          location,
          isPrivate,
        }),
      })

      if (!response.ok) {
        throw new Error("Gagal menyimpan entri jurnal")
      }

      alert("Entri jurnal berhasil disimpan!")
      router.push("/journal")
      router.refresh()
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan saat menyimpan")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AppShell>
      <div className="space-y-8">
        <div className="pb-6 border-b border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
            <Link href="/dashboard" className="hover:text-foreground flex items-center gap-1 transition-colors">
              <Home className="w-3.5 h-3.5" />
              Beranda
            </Link>
            <span>/</span>
            <Link href="/journal" className="hover:text-foreground transition-colors">
              Jurnal
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">Buat Entri</span>
          </div>
          <h2 className="text-3xl font-serif font-medium text-foreground">
            Buat Entri Jurnal Baru
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Catat pilihan harianmu, lacak suasana hati, dan tumbuh melalui refleksi.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          {/* Judul */}
          <div>
            <Label htmlFor="title" className="text-sm font-medium text-foreground">
              Judul Entri
            </Label>
            <Input
              id="title"
              placeholder="Misalnya: Hari ini saya merasa bahagia karena..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1.5"
            />
          </div>

          {/* Konten */}
          <div>
            <Label htmlFor="content" className="text-sm font-medium text-foreground">
              Yang terjadi hari ini
            </Label>
            <textarea
              id="content"
              placeholder="Tuliskan apa yang terjadi hari ini, perasaanmu, dan apa yang ingin kamu ingat..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full mt-1.5 min-h-[150px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          {/* Mood & Location */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Mood */}
            <div>
              <Label htmlFor="mood" className="text-sm font-medium text-foreground">
                Mood saat ini
              </Label>
              <select
                id="mood"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="w-full mt-1.5 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Pilih mood...</option>
                {moodOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Lokasi */}
            <div>
              <Label htmlFor="location" className="text-sm font-medium text-foreground">
                Lokasi
              </Label>
              <Input
                id="location"
                placeholder="Di rumah, kantor, kafe, taman, dll."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full mt-1.5"
              />
            </div>
          </div>

          {/* Privacy */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isPrivate"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <Label htmlFor="isPrivate" className="text-sm font-medium text-foreground cursor-pointer">
              Entri pribadi (tidak bisa dibagikan)
            </Label>
          </div>

          {/* Buttons */}
          <div className="mt-8 pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                type="button"
                onClick={() => router.push("/dashboard")}
                variant="outline"
                className="border-border hover:bg-muted w-full sm:w-auto"
              >
                <Home className="mr-2 w-4 h-4" />
                Kembali ke Beranda
              </Button>
              <Button
                type="button"
                onClick={() => router.push("/journal")}
                variant="ghost"
                className="text-muted-foreground hover:text-foreground w-full sm:w-auto"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Menu Jurnal
              </Button>
            </div>
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto" disabled={isLoading}>
              {isLoading ? "Menyimpan..." : "Simpan Entri"}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    </AppShell>
  )
}