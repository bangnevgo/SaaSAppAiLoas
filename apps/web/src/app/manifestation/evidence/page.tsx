"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  FolderOpen,
  Plus,
  Calendar,
  Sparkles,
  ArrowLeft,
  Home,
  CheckCircle2,
  BookmarkCheck,
  Target,
} from "lucide-react"
import { AppShell } from "@/app/app-shell"

interface EvidenceItem {
  id: string
  title: string
  note: string
  date: string
  createdAt: string
  manifestationTitle?: string
  manifestationId?: string
}

export default function EvidenceVaultPage() {
  const [manifestations, setManifestations] = useState<any[]>([])
  const [allEvidences, setAllEvidences] = useState<EvidenceItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedManiId, setSelectedManiId] = useState("")
  const [evidenceTitle, setEvidenceTitle] = useState("")
  const [evidenceNote, setEvidenceNote] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMsg, setSuccessMsg] = useState("")

  const loadData = async () => {
    try {
      const res = await fetch("/api/manifestation")
      if (res.ok) {
        const data = await res.json()
        const items = data.manifestations || []
        setManifestations(items)

        // Flatten all evidences from all manifestations
        const collected: EvidenceItem[] = []
        items.forEach((m: any) => {
          const mani = m.manifestation || {}
          if (mani.evidenceVault) {
            try {
              const parsed = JSON.parse(mani.evidenceVault)
              if (Array.isArray(parsed)) {
                parsed.forEach((ev: any) => {
                  collected.push({
                    ...ev,
                    manifestationTitle: m.title,
                    manifestationId: mani.id,
                  })
                })
              }
            } catch (e) {
              console.error(e)
            }
          }
        })

        // Sort descending by date
        collected.sort(
          (a, b) =>
            new Date(b.createdAt || b.date).getTime() -
            new Date(a.createdAt || a.date).getTime()
        )
        setAllEvidences(collected)

        if (items.length > 0 && !selectedManiId) {
          setSelectedManiId(items[0].manifestation?.id || items[0].id)
        }
      }
    } catch (err) {
      console.error("Gagal memuat brankas bukti:", err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const handleAddEvidence = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedManiId || !evidenceTitle.trim()) return

    setIsSubmitting(true)
    setSuccessMsg("")

    try {
      const res = await fetch("/api/manifestation/evidence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          manifestationId: selectedManiId,
          title: evidenceTitle,
          note: evidenceNote,
        }),
      })

      if (res.ok) {
        setSuccessMsg("Bukti sinkronisitas berhasil disimpan ke Brankas!")
        setEvidenceTitle("")
        setEvidenceNote("")
        loadData()
        setTimeout(() => {
          setIsModalOpen(false)
          setSuccessMsg("")
        }, 1500)
      }
    } catch (err) {
      console.error("Error saving evidence:", err)
    } finally {
      setIsSubmitting(false)
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
            <Link href="/manifestation" className="hover:text-foreground transition-colors">
              Teman Manifestasi
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">Brankas Bukti</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-serif font-medium text-foreground flex items-center gap-3">
                <FolderOpen className="w-7 h-7 text-amber-400" />
                Brankas Bukti (Evidence Vault)
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
                Dokumentasikan setiap tanda, kebetulan bermakna (*Bridge of Incidents*), dan bukti kecil bahwa asumsi Anda sedang mewujud dalam realitas 3D.
              </p>
            </div>
            <Button
              onClick={() => {
                if (manifestations.length > 0) {
                  setIsModalOpen(true)
                } else {
                  alert("Buat niat manifestasi pertama Anda terlebih dahulu.")
                }
              }}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="mr-2 h-4 w-4" />
              Catat Bukti Baru
            </Button>
          </div>
        </div>

        {/* Neville Principle Banner */}
        <div className="p-4 rounded-xl border border-amber-500/25 bg-amber-500/5 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <p className="font-semibold text-foreground">
              Prinsip Neville Goddard: <span className="italic font-normal">"Signs follow, they do not precede."</span>
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Tanda-tanda tidak pernah mendahului keyakinan; tanda selalu mengikuti asumsi yang sudah Anda yakini sebagai kenyataan. Mencatat bukti ini memperkuat keyakinan bawah sadar Anda.
            </p>
          </div>
        </div>

        {/* Evidence Timeline */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-serif font-medium text-foreground">
              Kronologi Bukti & Sinkronisitas ({allEvidences.length})
            </h3>
          </div>

          {isLoading ? (
            <div className="p-12 text-center text-sm text-muted-foreground bg-card border border-border rounded-xl">
              Memuat data brankas bukti...
            </div>
          ) : allEvidences.length === 0 ? (
            <div className="p-12 text-center bg-card border border-border rounded-xl space-y-4">
              <div className="p-3 w-fit mx-auto rounded-full bg-amber-500/10 text-amber-400">
                <BookmarkCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-medium text-foreground">Brankas Bukti Masih Kosong</h4>
                <p className="text-xs text-muted-foreground mt-1 max-w-md mx-auto">
                  Belum ada tanda yang dicatat. Perhatikan momen kebetulan bermakna atau ide tak terduga hari ini dan simpan di sini.
                </p>
              </div>
              <Button
                size="sm"
                onClick={() => {
                  if (manifestations.length > 0) {
                    setIsModalOpen(true)
                  } else {
                    alert("Buat niat manifestasi pertama Anda terlebih dahulu.")
                  }
                }}
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="w-4 h-4 mr-1" />
                Catat Bukti Pertama
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {allEvidences.map((item) => (
                <div
                  key={item.id}
                  className="p-5 rounded-xl border border-border bg-card hover:border-amber-500/30 transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4"
                >
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1">
                        <Target className="w-3 h-3" />
                        {item.manifestationTitle || "Manifestasi"}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(item.createdAt || item.date).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <h4 className="text-base font-semibold text-foreground">
                      {item.title}
                    </h4>
                    {item.note && (
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {item.note}
                      </p>
                    )}
                  </div>
                  <div className="shrink-0">
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Tercatat di 3D
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Catat Bukti */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-card border border-border rounded-xl p-6 max-w-lg w-full space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-border pb-3">
                <div className="flex items-center gap-2">
                  <FolderOpen className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-serif font-medium text-foreground">
                    Catat Bukti Manifestasi Baru
                  </h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  ✕
                </Button>
              </div>

              {successMsg && (
                <div className="p-3 text-xs rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                  {successMsg}
                </div>
              )}

              <form onSubmit={handleAddEvidence} className="space-y-4">
                <div>
                  <Label htmlFor="manifestationSelect" className="text-xs font-medium text-foreground">
                    Pilih Niat Manifestasi Terkait
                  </Label>
                  <select
                    id="manifestationSelect"
                    value={selectedManiId}
                    onChange={(e) => setSelectedManiId(e.target.value)}
                    className="w-full mt-1 p-2 text-sm rounded-md border border-input bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    required
                  >
                    {manifestations.map((m) => (
                      <option key={m.id} value={m.manifestation?.id || m.id}>
                        {m.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label htmlFor="evidenceTitle" className="text-xs font-medium text-foreground">
                    Tanda / Bukti yang Ditemukan (*Bridge of Incidents*)
                  </Label>
                  <Input
                    id="evidenceTitle"
                    placeholder="Contoh: Bertemu orang kunci, mendapat diskon tak terduga, atau feeling tenang..."
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
                    onClick={() => setIsModalOpen(false)}
                  >
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    disabled={isSubmitting}
                    className="bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {isSubmitting ? "Menyimpan..." : "Simpan ke Brankas"}
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
