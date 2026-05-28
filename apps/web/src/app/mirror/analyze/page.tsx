"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CircleDot, Zap, ArrowRight, TrendingUp, Heart, ArrowLeft, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes/dist/index.mjs"
import { cn } from "@/lib/utils"

export default function MirrorAnalyze() {
  const router = useRouter()
  const [journalContent, setJournalContent] = useState("")
  const [analysis, setAnalysis] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const { theme, setTheme } = useTheme()

  const handleAnalyze = async () => {
    if (!journalContent.trim()) {
      alert("Silakan tulisi konten jurnal terlebih dahulu")
      return
    }

    setIsAnalyzing(true)
    // Simulate AI analysis delay
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Mock AI analysis result
    const mockAnalysis = `
🔍 **Analisis AI Selesai**

Berdasarkan entri jurnal Anda, berikut adalah wawasan yang ditemukan:

**Pola Utama yang Terdeteksi:**
- Anda cenderung merasa produktif pada pagi hari
- Ada pola emosi yang berfluktuasi ketika menghadapi deadline kerja
- Hubungan dengan keluarga terasa lebih hangat saat akhir pekan

**Keyakinan yang Mungkin Membatasi:**
- "Saya harus sempurna sebelum sharing ide"
- "Kebutuhan orang lain lebih penting daripada kebutuhan saya"
- "Jika saya istirahat, berarti saya malas"

**Saran untuk Pertumbuhan:**
1. Practik self-compassion sebelum memulai pekerjaan
2. Tetapkan batas jelas antara waktu kerja dan pribadi
3. Catat satu hal positif tentang diri Anda setiap malam
4. Pertimbangkan untuk berbagi ide dalam setting kecil dulu

**Skrip Identitas yang Direkomendasikan:**
- "Saya layak untuk fell heard dan dihargai"
- "Kebutuhan saya sama pentingnya dengan kebutuhan orang lain"
- "Istirahat adalah bagian dari produktivitas, bukan lawannya"

Catat wawasan ini dan perhatikan bagaimana pola pola ini muncul dalam minggu depan.
    `.trim()

    setAnalysis(mockAnalysis)
    setIsAnalyzing(false)
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
                  <CircleDot className="h-8 w-8 text-purple-600" />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <Link href="/journal" className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700">
                      Journal
                    </Link>
                    <Link href="/mirror" className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700">
                      Mirror
                    </Link>
                    <Link href="/manifestation" className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700">
                      Teman Manifestasi
                    </Link>
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
                Analisis dengan AI
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Dapatkan wawasan pribadi berdasarkan entri jurnal Anda menggunakan teknologi GPT-4.
              </p>
            </div>

            <div className="mt-8 space-y-6">
              {/* Input Section */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Masukkan Entri Jurnal untuk Analisis
                  </h3>

                  <div className="space-y-4">
                    <Label htmlFor="journalContent" className="text-sm font-medium text-gray-900 dark:text-white">
                      Tuliskan entri jurnal Anda
                    </Label>
                    <textarea
                      id="journalContent"
                      placeholder="Contoh: Hari ini saya merasa cemas karena presentasi besok. Tapi setelah berlatih, saya merasa lebih yakin..."
                      value={journalContent}
                      onChange={(e) => setJournalContent(e.target.value)}
                      className="w-full min-h-[120px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing || !journalContent.trim()}
                    className={`w-full ${isAnalyzing ? "opacity-50 cursor-not-allowed" : "bg-primary text-primary-foreground hover:bg-primary/90"}`}
                  >
                    {isAnalyzing ? "Menganalisis..." : "Mulai Analisis"}
                    {!isAnalyzing && <ArrowRight className="ml-2 w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Results Section */}
              {analysis && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                  <Card className="p-6">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CircleDot className="h-5 w-5 text-purple-500" />
                        Hasil Analisis AI
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="mt-4 space-y-4">
                      <div className="whitespace-pre-wrap text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                        {analysis}
                      </div>
                    </CardContent>
                    <CardFooter className="mt-4 flex justify-end">
                      <Button variant="outline" onClick={() => setAnalysis("")}>
                        Baru Lagi
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              )}
            </div>
            <div className="mt-6">
              <Button
                type="button"
                onClick={() => router.back()}
                variant="outline"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Kembali
              </Button>
            </div>
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