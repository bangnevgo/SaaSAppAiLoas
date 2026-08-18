"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CircleDot, ArrowRight, Zap, Heart, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes/dist/index.mjs"
import { AppShell } from "@/app/app-shell"

export default function MirrorPage() {
  const { theme, setTheme } = useTheme();

  return (
    <AppShell>
      <div className="space-y-8">
        <div className="pb-6 border-b border-border">
          <h2 className="text-3xl font-serif font-medium text-foreground">
            Mirror Mind (Cermin Diri)
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Jelajahi pola pikir dan keyakinan Anda dengan bantuan AI untuk tumbuh lebih dalam.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Analysis Card */}
          <div className="bg-card border border-border rounded-xl">
            <div className="p-6">
              <h3 className="text-lg font-serif font-medium text-foreground">
                Analisis dengan AI
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Dapatkan wawasan pribadi berdasarkan entri jurnal Anda menggunakan teknologi GPT-4.
              </p>
              <div className="mt-5">
                <Link href="/mirror/analyze">
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    Mulai Analisis
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Patterns Card */}
          <div className="bg-card border border-border rounded-xl opacity-75">
            <div className="p-6">
              <h3 className="text-lg font-serif font-medium text-foreground">
                Pola & Keyakinan
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Temukan pola pikir berulang yang membentuk keputusan dan perilaku Anda.
              </p>
              <div className="mt-5">
                <Button variant="outline" className="w-full border-border hover:bg-muted" disabled>
                  Fitur Segera Hadir
                </Button>
              </div>
            </div>
          </div>

          {/* Identity Scripts Card */}
          <div className="bg-card border border-border rounded-xl opacity-75">
            <div className="p-6">
              <h3 className="text-lg font-serif font-medium text-foreground">
                Skrip Identitas
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Strengthen your mindset with personalized affirmations and belief-reset scripts.
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