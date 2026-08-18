"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { BookOpen, ArrowRight, ArrowLeft, Heart, Smile, Frown, Angry, Zap, Star, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes/dist/index.mjs"
import { AppShell } from "@/app/app-shell"

export default function JournalPage() {
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const [entries, setEntries] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchEntries() {
      try {
        const res = await fetch("/api/journal")
        if (res.ok) {
          const data = await res.json()
          if (data.entries) {
            setEntries(data.entries)
          }
        }
      } catch (error) {
        console.error("Gagal mengambil entri jurnal:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchEntries()
  }, [])

  return (
    <AppShell>
      <div className="space-y-8">
        <div className="pb-6 border-b border-border">
          <h2 className="text-3xl font-serif font-medium text-foreground">
            Jurnal
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Catat pilihan harianmu, lacak suasana hati, dan tumbuh melalui refleksi.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Journal Card */}
          <div className="bg-card border border-border rounded-xl">
            <div className="p-6">
              <h3 className="text-lg font-serif font-medium text-foreground">
                Buat Entri Baru
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Mulai menulis jurnal hari ini dengan prompt yang menginspirasi.
              </p>
              <div className="mt-5">
                <Link href="/journal/new">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Buat Entri
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Mood Tracking Card */}
          <div className="bg-card border border-border rounded-xl opacity-75">
            <div className="p-6">
              <h3 className="text-lg font-serif font-medium text-foreground">
                Lacak Mood
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Lengkapi jurnal harian dengan tag mood untuk melengkapi pola perasaanmu.
              </p>
              <div className="mt-5">
                <Button variant="outline" className="w-full border-border hover:bg-muted" disabled>
                  Fitur Segera Hadir
                </Button>
              </div>
            </div>
          </div>

          {/* Future Letters Card */}
          <div className="bg-card border border-border rounded-xl opacity-75">
            <div className="p-6">
              <h3 className="text-lg font-serif font-medium text-foreground">
                Surat ke Masa Depan
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Kirim surat ke dirimu di masa depan dan lihat betapa tumbuhnya dirimu.
              </p>
              <div className="mt-5">
                <Button variant="outline" className="w-full border-border hover:bg-muted" disabled>
                  Fitur Segera Hadir
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Journal Entries List */}
        <div className="mt-12">
          <h3 className="text-2xl font-serif font-medium text-foreground mb-6">Riwayat Entri Jurnal</h3>
          {isLoading ? (
            <div className="text-sm text-muted-foreground animate-pulse">Memuat entri jurnal...</div>
          ) : entries.length === 0 ? (
            <div className="text-muted-foreground text-sm border border-dashed border-border p-12 rounded-xl text-center">
              Belum ada entri jurnal. Klik "Buat Entri" untuk menulis jurnal pertama Anda.
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {entries.map((entry) => (
                <div key={entry.id} className="bg-card border border-border p-6 rounded-xl hover:border-primary/40 transition-all duration-300">
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs text-muted-foreground">
                      {new Date(entry.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    {entry.mood && (
                      <span className="text-xs px-2.5 py-0.5 rounded-full border border-primary/20 text-primary bg-primary/5 capitalize font-medium tracking-wide">
                        {entry.mood}
                      </span>
                    )}
                  </div>
                  <h4 className="text-lg font-serif font-medium text-foreground mb-2">{entry.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed whitespace-pre-wrap">{entry.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  )
}