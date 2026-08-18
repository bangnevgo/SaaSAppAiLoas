"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Target,
  ArrowRight,
  Sparkles,
  Plus,
  Lock,
  CheckCircle2,
  Calendar,
  Layers,
  FolderOpen,
  Home,
} from "lucide-react"
import { AppShell } from "@/app/app-shell"

export default function ManifestationPage() {
  const [manifestations, setManifestations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedManifestation, setSelectedManifestation] = useState<any | null>(null)
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false)
  const [evidenceTitle, setEvidenceTitle] = useState("")
  const [evidenceNote, setEvidenceNote] = useState("")
  const [isSubmittingEvidence, setIsSubmittingEvidence] = useState(false)
  const [evidenceSuccess, setEvidenceSuccess] = useState("")

  const fetchManifestations = async () => {
    try {
      const res = await fetch("/api/manifestation")
      if (res.ok) {
        const data = await res.json()
        setManifestations(data.manifestations || [])
      }
    } catch (err) {
      console.error("Gagal memuat manifestasi:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchManifestations()
  }, [])

  const handleAddEvidence = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedManifestation || !evidenceTitle.trim()) return

    setIsSubmittingEvidence(true)
    setEvidenceSuccess("")

    try {
      const res = await fetch("/api/manifestation/evidence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          manifestationId: selectedManifestation.manifestation?.id || selectedManifestation.id,
          title: evidenceTitle,
          note: evidenceNote,
        }),
      })

      if (res.ok) {
        setEvidenceSuccess("Bukti sinkronisitas berhasil disimpan ke Brankas!")
        setEvidenceTitle("")
        setEvidenceNote("")
        fetchManifestations()
        setTimeout(() => {
          setIsEvidenceModalOpen(false)
          setEvidenceSuccess("")
        }, 1500)
      }
    } catch (err) {
      console.error("Error adding evidence:", err)
    } finally {
      setIsSubmittingEvidence(false)
    }
  }

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="pb-6 border-b border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
            <Link href="/dashboard" className="hover:text-foreground flex items-center gap-1 transition-colors">
              <Home className="w-3.5 h-3.5" />
              Beranda
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">Teman Manifestasi</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-serif font-medium text-foreground">
                Teman Manifestasi (Law of Assumption)
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Kunci realitas impian Anda dengan asumsi state of wish fulfilled dan catat bukti gerak 3D.
              </p>
            </div>
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/manifestation/intentions">
                <Plus className="mr-2 h-4 w-4" />
                Atur Niat Baru
              </Link>
            </Button>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: Intentions */}
          <div className="bg-card border border-border rounded-xl p-6 flex flex-col justify-between hover:border-primary/40 transition-all">
            <div>
              <div className="p-2.5 w-fit rounded-lg bg-primary/10 text-primary mb-4">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-medium text-foreground">
                Atur Niat & Asumsi
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Tetapkan niat spesifik dan rumuskan afirmasi identitas yang sudah memiliki hal tersebut.
              </p>
            </div>
            <div className="mt-6">
              <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/manifestation/intentions">
                  Mulai Niat Baru
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Card 2: Evidence Vault */}
          <div className="bg-card border border-border rounded-xl p-6 flex flex-col justify-between hover:border-primary/40 transition-all">
            <div>
              <div className="p-2.5 w-fit rounded-lg bg-amber-500/10 text-amber-500 mb-4">
                <FolderOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-medium text-foreground">
                Brankas Bukti (Evidence Vault)
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Kumpulkan bukti sinkronisitas, kebetulan bermakna, dan tanda bahwa asumsi Anda sedang terwujud.
              </p>
            </div>
            <div className="mt-6">
              <Button
                variant="outline"
                className="w-full border-border hover:bg-muted"
                onClick={() => {
                  if (manifestations.length > 0) {
                    setSelectedManifestation(manifestations[0])
                    setIsEvidenceModalOpen(true)
                  } else {
                    alert("Silakan buat niat manifestasi pertama Anda terlebih dahulu.")
                  }
                }}
              >
                Catat Bukti Baru
                <Plus className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Card 3: 30-Day Assumption Protocol */}
          <div className="bg-card border border-border rounded-xl p-6 flex flex-col justify-between">
            <div>
              <div className="p-2.5 w-fit rounded-lg bg-primary/10 text-primary mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-medium text-foreground">
                Protokol 30 Hari Neville
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Metode SATS (State Akin to Sleep) dan Living in the End untuk mengunci asumsi bawah sadar.
              </p>
            </div>
            <div className="mt-6">
              <div className="p-2.5 text-xs rounded-lg border border-primary/20 bg-primary/5 text-primary text-center font-medium">
                ⚡ Otomatis aktif pada setiap niat Anda
              </div>
            </div>
          </div>
        </div>

        {/* Active Manifestations Section */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-serif font-medium text-foreground flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              Niat & Manifestasi Aktif ({manifestations.length})
            </h3>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-sm text-muted-foreground bg-card border border-border rounded-xl">
              Memuat data manifestasi...
            </div>
          ) : manifestations.length === 0 ? (
            <div className="p-12 text-center bg-card border border-border rounded-xl space-y-4">
              <div className="p-3 w-fit mx-auto rounded-full bg-muted text-muted-foreground">
                <Target className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-medium text-foreground">Belum ada niat manifestasi</h4>
                <p className="text-xs text-muted-foreground mt-1 max-w-md mx-auto">
                  Mulailah merumuskan niat pertama Anda dengan kalimat asumsi yang memberdayakan.
                </p>
              </div>
              <Button asChild size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/manifestation/intentions">
                  <Plus className="w-4 h-4 mr-1" />
                  Buat Niat Pertama
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {manifestations.map((item) => {
                const mani = item.manifestation || {}
                let vault: any[] = []
                try {
                  if (mani.evidenceVault) vault = JSON.parse(mani.evidenceVault)
                } catch {
                  vault = []
                }

                return (
                  <div
                    key={item.id}
                    className="p-5 bg-card border border-border hover:border-primary/40 transition-all rounded-xl space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                          {item.tags?.[0] || "General"}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(item.createdAt).toLocaleDateString("id-ID", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <h4 className="text-base font-semibold text-foreground leading-snug">
                        {item.title}
                      </h4>
                      <div className="p-3 rounded-lg bg-muted/40 border border-border/50 text-xs italic text-muted-foreground">
                        "{mani.affirmation || item.content}"
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        📁 Brankas Bukti: <span className="font-semibold text-foreground">{vault.length} catatan</span>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-xs text-primary hover:text-primary hover:bg-primary/10"
                        onClick={() => {
                          setSelectedManifestation(item)
                          setIsEvidenceModalOpen(true)
                        }}
                      >
                        + Tambah Bukti
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Modal Catat Bukti Manifestasi (Evidence Vault) */}
        {isEvidenceModalOpen && selectedManifestation && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-card border border-border rounded-xl p-6 max-w-lg w-full space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-primary" />
                  <h3 className="text-lg font-serif font-medium text-foreground">
                    Catat Bukti Sinkronisitas
                  </h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEvidenceModalOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </Button>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  Niat: <span className="font-medium text-foreground">{selectedManifestation.title}</span>
                </p>
              </div>

              {evidenceSuccess && (
                <div className="p-3 text-xs rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                  {evidenceSuccess}
                </div>
              )}

              <form onSubmit={handleAddEvidence} className="space-y-4">
                <div>
                  <Label htmlFor="evidenceTitle" className="text-xs font-medium text-foreground">
                    Tanda / Bukti yang Ditemukan
                  </Label>
                  <Input
                    id="evidenceTitle"
                    placeholder="Contoh: Menerima email tawaran proyek tak terduga..."
                    value={evidenceTitle}
                    onChange={(e) => setEvidenceTitle(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="evidenceNote" className="text-xs font-medium text-foreground">
                    Catatan Refleksi & Rasa Syukur
                  </Label>
                  <textarea
                    id="evidenceNote"
                    rows={3}
                    placeholder="Tuliskan bagaimana perasaan Anda saat melihat tanda ini..."
                    value={evidenceNote}
                    onChange={(e) => setEvidenceNote(e.target.value)}
                    className="w-full mt-1 p-2 text-sm rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="pt-3 border-t border-border flex items-center justify-end gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEvidenceModalOpen(false)}
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    disabled={isSubmittingEvidence}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isSubmittingEvidence ? "Menyimpan..." : "Simpan ke Brankas"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  )
}
