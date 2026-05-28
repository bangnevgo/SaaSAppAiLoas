"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight, Zap, Heart, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes/dist/index.mjs";

export default function JournalPage() {
  const { theme, setTheme } = useTheme();

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
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <Link href="/journal" className="px-3 py-2 rounded-md text-sm font-medium bg-primary text-white hover:bg-primary/90">
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
                Journal
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Catat pilihan harianmu, lacak suasana hati, dan tumbuh melalui refleksi.
              </p>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Journal Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Buat Entri Baru
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Mulai menulis jurnal hari ini dengan prompt yang menginspirasi.
                  </p>
                  <div className="mt-4">
                    <Link href="/journal/new">
                      <Button className="w-full">
                        Buat Entri
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Mood Tracking Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Lacak Mood
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Lengkapi jurnal harian dengan tag mood untuk melengkapi pola perasaanmu.
                  </p>
                  <div className="mt-4">
                    <Button className="w-full">
                      Lihat Grafik Mood
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Future Letters Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Surat ke Masa Depan
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Kirim surat ke dirimu di masa depan dan lihat betapa tumbuhnya kierimu.
                  </p>
                  <div className="mt-4">
                    <Button className="w-full">
                      Bikin Surat
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
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
  );
}