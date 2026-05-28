"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useTheme } from "next-themes/dist/index.mjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Check, Moon, Sun, BookOpen, CircleDot, Target, Sparkles } from "lucide-react"

const plans = [
  {
    id: "free" as const,
    name: "Free",
    price: "Rp0",
    period: "selamanya",
    description: "Basic access ke semua app",
    features: ["3 journal entries/bulan", "1 AI Mirror analysis", "1 Teman Manifestasi goal", "Basic mood tracking"]
  },
  {
    id: "bundle" as const,
    name: "Bundle Pro",
    price: "Rp199K",
    period: "/bulan",
    description: "Full access + 2 bulan gratis",
    features: ["Unlimited journal entries", "Unlimited AI analysis", "Unlimited Teman Manifestasi", "Future & love letters", "Priority support", "Export data"]
  }
]

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    plan: "free" as "free" | "bundle"
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { theme, setTheme } = useTheme()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        setError("Registrasi gagal. Silakan coba lagi.")
      } else {
        if (formData.plan === "bundle") {
          router.push("/billing")
        } else {
          router.push("/dashboard")
        }
      }
    } catch {
      setError("Terjadi kesalahan. Silakan coba lagi.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
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

      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-cyan-500 flex items-center justify-center">
              <span className="text-lg font-bold text-white">N</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Buat Akun Baru</CardTitle>
          <CardDescription>
            Mulai perjalanan pertumbuhan dirimu
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="kamu@contoh.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Minimal 8 karakter"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>

            {/* Plan Selection */}
            <div className="space-y-3">
              <Label>Pilih Paket</Label>
              <RadioGroup
                value={formData.plan}
                onValueChange={(value) => setFormData({...formData, plan: value as "free" | "bundle"})}
                className="grid gap-3"
              >
                {plans.map((plan) => (
                  <label
                    key={plan.id}
                    htmlFor={plan.id}
                    className={`flex cursor-pointer rounded-xl border p-4 transition-all ${
                      formData.plan === plan.id
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "border-border hover:border-muted-foreground/30"
                    }`}
                  >
                    <RadioGroupItem value={plan.id} id={plan.id} className="mt-0.5" />
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-semibold">{plan.name}</span>
                          {plan.id === "bundle" && (
                            <span className="ml-2 inline-flex items-center gap-1 text-xs text-primary">
                              <Sparkles className="w-3 h-3" /> Populer
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          <span className="font-semibold">{plan.price}</span>
                          <span className="text-xs text-muted-foreground"> {plan.period}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{plan.description}</p>
                      <ul className="mt-2 space-y-1">
                        {plan.features.slice(0, plan.id === "free" ? 3 : 4).map((feature, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Check className="w-3 h-3 text-primary" />
                            {feature}
                          </li>
                        ))}
                        {plan.id === "bundle" && plan.features.length > 4 && (
                          <li className="text-xs text-muted-foreground">+{plan.features.length - 4} fitur lainnya</li>
                        )}
                      </ul>
                    </div>
                  </label>
                ))}
              </RadioGroup>
            </div>

            {/* App icons */}
            <div className="flex items-center justify-center gap-6 py-2">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <BookOpen className="w-3.5 h-3.5 text-blue-500" /> Journal
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CircleDot className="w-3.5 h-3.5 text-purple-500" /> Mirror
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Target className="w-3.5 h-3.5 text-amber-500" /> Teman Manifestasi
              </div>
            </div>

            {error && (
              <div className="text-sm text-destructive text-center">{error}</div>
            )}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Membuat akun..." : "Buat Akun Gratis"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <span className="text-muted-foreground">
              Sudah punya akun?{" "}
            </span>
            <Link href="/auth/signin" className="text-primary hover:underline font-medium">
              Masuk
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
