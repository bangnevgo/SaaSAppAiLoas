"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CircleDot, Zap, ArrowRight, TrendingUp, Heart, ArrowLeft, Sun, Moon, Home } from "lucide-react"
import { useTheme } from "next-themes/dist/index.mjs"
import { cn } from "@/lib/utils"
import { AppShell } from "@/app/app-shell"

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
    setAnalysis("")

    try {
      const response = await fetch("/api/mirror/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          journalContent,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Gagal memproses analisis AI")
      }

      const { category, hiddenBelief, conceptAudit, newIdentityScript } = data.analysis
      
      const formattedAnalysis = `
🔍 **Analisis AI Cermin Diri Selesai**

**Kategori Konsep Diri:** ${category}

**Pola/Keyakinan Bawah Sadar Terdeteksi:**
* "${hiddenBelief}"

**Audit Konsep Diri (Neville Goddard Perspective):**
${conceptAudit}

**Skrip Identitas Baru (Afirmasi Pemberdayaan):**
* "*${newIdentityScript}*"
      `.trim()

      setAnalysis(formattedAnalysis)
    } catch (err: any) {
      alert(err.message || "Terjadi kesalahan saat memproses analisis")
    } finally {
      setIsAnalyzing(false)
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
            <Link href="/mirror" className="hover:text-foreground transition-colors">
              Mirror
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">Audit AI</span>
          </div>
          <h2 className="text-3xl font-serif font-medium text-foreground">
            Audit Konsep Diri (Mirror Mind)
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Tulis entri jurnal Anda di bawah ini dan biarkan AI menganalisis keyakinan bawah sadar Anda berdasarkan prinsip Neville Goddard.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Form input */}
          <div className="space-y-6">
            <div>
              <Label htmlFor="journal" className="text-sm font-medium text-foreground">
                Tulis Refleksi/Jurnal Anda
              </Label>
              <textarea
                id="journal"
                placeholder="Tulis apa saja yang sedang Anda rasakan atau khawatirkan hari ini..."
                value={journalContent}
                onChange={(e) => setJournalContent(e.target.value)}
                className="w-full mt-1.5 min-h-[300px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <Button
              onClick={handleAnalyze}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isAnalyzing}
            >
              {isAnalyzing ? "Menganalisis Pola..." : "Audit Cermin Diri"}
              <Zap className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Hasil analisis */}
          {analysis && (
            <div>
              <Card className="border border-border bg-card">
                <CardHeader>
                  <CardTitle className="font-serif">Hasil Audit Konsep Diri</CardTitle>
                  <CardDescription>Pola bawah sadar yang terdeteksi</CardDescription>
                </CardHeader>
                <CardContent className="prose dark:prose-invert max-w-none text-sm leading-relaxed whitespace-pre-wrap">
                  {analysis}
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" className="w-full border-border hover:bg-muted" onClick={() => router.push("/dashboard")}>
                    <Home className="mr-2 w-4 h-4" />
                    Kembali ke Beranda
                  </Button>
                  <Button variant="ghost" className="w-full text-muted-foreground hover:text-foreground" onClick={() => router.push("/mirror")}>
                    Kembali ke Menu Mirror
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>

        <div className="mt-8 pt-4 border-t border-border flex items-center gap-3">
          <Button
            type="button"
            onClick={() => router.push("/dashboard")}
            variant="outline"
            className="border-border hover:bg-muted"
          >
            <Home className="mr-2 w-4 h-4" />
            Kembali ke Beranda
          </Button>
          <Button
            type="button"
            onClick={() => router.push("/mirror")}
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Menu Mirror
          </Button>
        </div>
      </div>
    </AppShell>
  )
}