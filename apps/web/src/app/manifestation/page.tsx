"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Target, ArrowRight, Zap, Heart, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes/dist/index.mjs"
import { AppShell } from "@/app/app-shell"

export default function ManifestationPage() {
  const { theme, setTheme } = useTheme();

  return (
    <AppShell>
      <div className="space-y-8">
        <div className="pb-6 border-b border-border">
          <h2 className="text-3xl font-serif font-medium text-foreground">
            Teman Manifestasi (Neville Goddard Companion)
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Wujudkan impian Anda dengan pendekatan terstruktur, bukti, dan tantangan 30 hari berdasarkan Law of Assumption.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Intentions Card */}
          <div className="bg-card border border-border rounded-xl">
            <div className="p-6">
              <h3 className="text-lg font-serif font-medium text-foreground">
                Atur Intensi
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Tuliskan niat dan afirmasi harian Anda untuk mengarahkan energi dan fokus.
              </p>
              <div className="mt-5">
                <Link href="/manifestation/intentions">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Buat Intensi
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Evidence Vault Card */}
          <div className="bg-card border border-border rounded-xl opacity-75">
            <div className="p-6">
              <h3 className="text-lg font-serif font-medium text-foreground">
                Bukti Manifestasi
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Catat setiap tanda kecil yang menunjukkan manifestasi sedang bekerja.
              </p>
              <div className="mt-5">
                <Button variant="outline" className="w-full border-border hover:bg-muted" disabled>
                  Fitur Segera Hadir
                </Button>
              </div>
            </div>
          </div>

          {/* 30-Day Challenge Card */}
          <div className="bg-card border border-border rounded-xl opacity-75">
            <div className="p-6">
              <h3 className="text-lg font-serif font-medium text-foreground">
                Tantangan 30 Hari
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Ikuti rutinitas harian yang dirancang untuk menguatkan kepercayaan dan mengeliminasi keraguan.
              </p>
              <div className="mt-5">
                <Button variant="outline" className="w-full border-border hover:bg-muted" disabled>
                  Fitur Segera Hadir
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  )
}