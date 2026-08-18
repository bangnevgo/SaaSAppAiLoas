"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTheme } from "next-themes/dist/index.mjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, CircleDot, Target, ArrowRight, Star, Zap, Heart, Moon, Sun, Menu, X } from "lucide-react"

export default function Home() {
  const [activeFeature, setActiveFeature] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const features = [
    {
      icon: BookOpen,
      title: "Journal",
      shortDesc: "Tulis refleksi harian & lacak dinamika emosi",
      headline: "Tulis jurnal harian dengan prompts terarah",
      subheadline: "Lacak suasana hati, bangun kesadaran diri, dan simpan pesan untuk masa depan.",
      description: "Tulis jurnal harian dengan prompts yang menginspirasi. Lacak mood dan emosi kamu setiap hari.",
      color: "text-blue-500 dark:text-blue-400",
      bgColor: "bg-blue-500/10",
      benefits: ["Daily prompts", "Mood tracking", "Future letters", "Love letters"]
    },
    {
      icon: CircleDot,
      title: "Mirror",
      shortDesc: "Audit konsep diri & pola pikir bawah sadar via AI",
      headline: "Kenali diri lebih dalam dengan AI Cermin Diri",
      subheadline: "Deteksi keyakinan membatasi dan buat skrip identitas baru yang memberdayakan.",
      description: "Kenali diri lebih dalam dengan AI. Analisa pola pikir dan keyakinan yang membatasi kamu.",
      color: "text-purple-500 dark:text-purple-400",
      bgColor: "bg-purple-500/10",
      benefits: ["AI analysis", "Pattern recognition", "Identity scripts", "Shadow work"]
    },
    {
      icon: Target,
      title: "Teman Manifestasi",
      shortDesc: "Kunci asumsi impian & catat brankas bukti 3D",
      headline: "Wujudkan impian dengan Law of Assumption",
      subheadline: "Kunci state of wish fulfilled dan kumpulkan bukti sinkronisitas harian.",
      description: "Wujudkan impian dengan pendekatan terstruktur. Bangun bukti dan lacak progress.",
      color: "text-amber-500 dark:text-amber-400",
      bgColor: "bg-amber-500/10",
      benefits: ["30-day challenges", "Evidence vault", "Affirmations", "Doubt reset"]
    }
  ]

  const f = features[activeFeature]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 dark:from-purple-900/20 dark:via-transparent dark:to-cyan-900/20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 dark:bg-cyan-500/20 rounded-full blur-[128px]" />

        <div className="relative container mx-auto px-4 py-6 lg:py-8">
          {/* Nav */}
          <nav className="flex items-center justify-between mb-16 lg:mb-20">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 font-serif text-2xl font-semibold text-primary border-r border-border pr-3">
                N
              </div>
              <div className="flex flex-col leading-none tracking-wider">
                <span className="font-semibold font-serif text-sm text-foreground">NEVGO</span>
                <span className="text-[9px] text-muted-foreground tracking-[0.25em] font-medium mt-0.5">REFLECT</span>
              </div>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-3">
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
              )}
              <Button variant="ghost" asChild className="text-muted-foreground hover:text-foreground">
                <Link href="/auth/signin">Masuk</Link>
              </Button>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link href="/auth/signup">Daftar Gratis</Link>
              </Button>
            </div>

            {/* Mobile hamburger */}
            <div className="flex md:hidden items-center gap-2">
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="text-muted-foreground"
                >
                  {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-muted-foreground"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </nav>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mb-8 p-4 rounded-xl bg-card border border-border">
              <div className="flex flex-col gap-3">
                <Button variant="ghost" asChild className="justify-start text-muted-foreground">
                  <Link href="/auth/signin">Masuk</Link>
                </Button>
                <Button asChild className="bg-primary text-primary-foreground">
                  <Link href="/auth/signup">Daftar Gratis</Link>
                </Button>
              </div>
            </div>
          )}

          {/* Hero Content */}
          <div className="text-center max-w-4xl mx-auto mb-16 lg:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted border border-border mb-8">
              <Star className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs text-muted-foreground tracking-wide font-medium">Platform pertumbuhan diri #1 di Indonesia</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-serif font-medium mb-6 leading-[1.08] tracking-tight">
              Wujudkan Versi Terbaik
              <em className="text-primary font-serif font-normal italic"> Dirimu</em>
            </h1>
            <p className="text-base lg:text-lg text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
              Gabungkan journaling, refleksi diri, dan manifestation dalam satu platform terintegrasi. Mulai perjalanan transformasimu hari ini.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 text-base font-medium">
                <Link href="/auth/signup">
                  Mulai Gratis
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="h-12 px-8 text-base border-border hover:bg-muted font-medium">
                <Link href="/auth/signin">
                  Sudah punya akun
                </Link>
              </Button>
            </div>
          </div>

          {/* Preview Card */}
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-2xl bg-card border border-border p-6 lg:p-8 shadow-lg">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Feature Tabs */}
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Tiga Aplikasi dalam Satu</h3>
                  <div className="space-y-3">
                    {features.map((feature, i) => {
                      const href = feature.title === "Journal" ? "/journal" : feature.title === "Mirror" ? "/mirror" : "/manifestation"
                      return (
                        <Link
                          key={i}
                          href={href}
                          onClick={() => setActiveFeature(i)}
                          className={`block w-full text-left p-4 rounded-xl transition-all border ${
                            activeFeature === i
                              ? "bg-muted border-border"
                              : "hover:bg-muted/50 border-transparent"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`p-2 rounded-lg ${feature.bgColor}`}>
                              <feature.icon className={`w-5 h-5 ${feature.color}`} />
                            </div>
                            <div>
                              <div className="font-medium text-foreground">{feature.title}</div>
                              <div className="text-xs text-muted-foreground mt-0.5 leading-snug">{feature.shortDesc}</div>
                            </div>
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </div>

                {/* Feature Preview */}
                <div className="rounded-xl p-6 bg-muted/50 border border-border">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${f.bgColor} mb-4`}>
                    <f.icon className={`w-4 h-4 ${f.color}`} />
                    <span className={`text-sm font-medium ${f.color}`}>{f.title}</span>
                  </div>
                  <h4 className="text-xl font-semibold mb-2 text-foreground leading-snug">{f.headline}</h4>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{f.subheadline}</p>
                  <div className="grid grid-cols-2 gap-3">
                    {f.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {benefit}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">Fitur yang Membantu Growth-mu</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Semua yang kamu butuhkan untuk berkembang, dalam satu platform yang mudah digunakan.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, i) => (
              <Card key={i} className="bg-card border-border hover:border-primary/30 transition-colors">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Star className="w-3 h-3 text-amber-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      {/* Stats Section */}
      <div className="py-16 lg:py-20 bg-background border-t border-border/40">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: "450+", label: "Pengguna Aktif", icon: Heart },
              { value: "1,200+", label: "Journal Entries", icon: BookOpen },
              { value: "850+", label: "AI Analysis", icon: CircleDot },
              { value: "98%", label: "User Satisfaction", icon: Star }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl lg:text-4xl font-serif font-semibold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-muted-foreground text-sm tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 lg:py-24 bg-muted/30 border-t border-border/40">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-serif font-medium mb-4">Siap Memulai Perjalananmu?</h2>
            <p className="text-muted-foreground mb-8">Bergabung dengan 450+ member yang sudah merasakan manfaat dari Nevgo Reflect.</p>
            <Button size="lg" asChild className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-10 text-lg font-medium">
              <Link href="/auth/signup">
                Mulai Journey Gratis
                <Zap className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 border-t border-border bg-background">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 font-serif text-2xl font-semibold text-primary border-r border-border pr-3">
              N
            </div>
            <div className="flex flex-col leading-none tracking-wider text-left">
              <span className="font-semibold font-serif text-sm text-foreground">NEVGO</span>
              <span className="text-[9px] text-muted-foreground tracking-[0.25em] font-medium mt-0.5">REFLECT</span>
            </div>
          </div>
          <div className="text-muted-foreground text-sm">
            &copy; 2026 Nevgo Reflect. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
