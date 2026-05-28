"use client"

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CircleDot, ArrowRight, Zap, Heart, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes/dist/index.mjs";

export default function MirrorPage() {
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
                  <CircleDot className="h-8 w-8 text-purple-600" />
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4">
                    <a href="/journal" className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700">
                      Journal
                    </a>
                    <a href="/mirror" className="px-3 py-2 rounded-md text-sm font-medium bg-primary text-white hover:bg-primary/90">
                      Mirror
                    </a>
                    <a href="/manifestation" className="px-3 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-700">
                      Teman Manifestasi
                    </a>
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
                Mirror
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Jelajahi pola pikir dan keyakinan Anda dengan bantuan AI untuk tumbuh lebih dalam.
              </p>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {/* Analysis Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Analisis dengan AI
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Dapatkan wawasan pribadi berdasarkan entri jurnal Anda menggunakan teknologi GPT-4.
                  </p>
                  <div className="mt-4">
                    <Link href="/mirror/analyze">
                      <Button className="w-full">
                        Mulai Analisis
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Patterns Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Pola & Keyakinan
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Temukan pola pikir berulang yang membentuk keputusan dan perilaku Anda.
                  </p>
                  <div className="mt-4">
                    <Button className="w-full">
                      Lihat Pola
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Identity Scripts Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Skrip Identitas
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Strengthen your mindset with personalized affirmations and belief‑reset scripts.
                  </p>
                  <div className="mt-4">
                    <Button className="w-full">
                      Dapatkan Skrip
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