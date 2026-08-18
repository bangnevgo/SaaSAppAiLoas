"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Target, ArrowRight, Sparkles, TrendingUp, Calendar, Heart, ArrowLeft, Sun, Moon, Home } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { AppShell } from "@/app/app-shell"

export default function ManifestationIntentions() {
  const router = useRouter()
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
    <AppShell>
      <div className="space-y-8">
        <div className="pb-6 border-b border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
            <Link href="/dashboard" className="hover:text-foreground flex items-center gap-1 transition-colors">
              <Home className="w-3.5 h-3.5" />
              Beranda
            </Link>
            <span>/</span>
            <Link href="/manifestation" className="hover:text-foreground transition-colors">
              Teman Manifestasi
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">Atur Niat</span>
          </div>
          <h2 className="text-3xl font-serif font-medium text-foreground">
            Atur Niat Manifestasi
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Tuliskan niat dan afirmasi harian Anda untuk mengarahkan energi dan fokus Anda.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          {/* Niat */}
          <div>
            <Label htmlFor="intention" className="text-sm font-medium text-foreground">
              Niat Manifestasi (Intention)
            </Label>
            <Input
              id="intention"
              placeholder="Misalnya: Saya ingin menarik kelimpahan finansial, cinta yang sehat, atau kesejahteraan..."
              value={intention}
              onChange={(e) => setIntention(e.target.value)}
              className="w-full mt-1.5"
            />
          </div>

          {/* Afirmasi */}
          <div>
            <Label htmlFor="affirmation" className="text-sm font-medium text-foreground">
              Kalimat Afirmasi (Asumsi/State of Being)
            </Label>
            <textarea
              id="affirmation"
              placeholder="Misalnya: Saya bersyukur dan bahagia atas melimpahnya berkat finansial dalam hidup saya saat ini..."
              value={affirmation}
              onChange={(e) => setAffirmation(e.target.value)}
              className="w-full mt-1.5 min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Tanggal Mulai */}
            <div>
              <Label htmlFor="startDate" className="text-sm font-medium text-foreground">
                Tanggal Mulai
              </Label>
              <Input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full mt-1.5"
              />
            </div>

            {/* Kategori */}
            <div>
              <Label htmlFor="category" className="text-sm font-medium text-foreground">
                Kategori Manifestasi
              </Label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full mt-1.5 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">Pilih kategori...</option>
                <option value="karir">Karir & Finansial</option>
                <option value="hubungan">Hubungan & Cinta</option>
                <option value="kesehatan">Kesehatan & Fisik</option>
                <option value="spiritual">Spiritual & Kedamaian</option>
              </select>
            </div>
          </div>

          {/* Info Neville Goddard */}
          <div className="bg-muted/40 border border-border/80 rounded-xl p-6 space-y-3">
            <h4 className="text-md font-serif font-medium text-primary flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Catatan Law of Assumption (Neville Goddard)
            </h4>
            <div className="text-xs text-muted-foreground space-y-2 leading-relaxed">
              <p>
                * **Rasakan Keadaan Sebagai Kenyataan:** Jangan menulis dengan nada menginginkan, tetapi tulislah seolah-olah niat itu telah menjadi milik Anda sepenuhnya di saat ini ("Saya adalah...", "Saya memiliki...").
              </p>
              <p>
                * **Abaikan Panca Indera:** Keyakinan sejati adalah mempercayai apa yang belum terlihat secara fisik. Jika ada bukti kecil dari pencapaian tersebut (misalnya, ide baru, pertemuan tak terduga, atau dana kecil), catat di sini sebagai bukti manifestasi.
              </p>
            </div>
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
                onClick={() => router.push("/manifestation")}
                variant="ghost"
                className="text-muted-foreground hover:text-foreground w-full sm:w-auto"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Menu Manifestasi
              </Button>
            </div>
            <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
              Simpan Niat
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    </AppShell>
  )
}
