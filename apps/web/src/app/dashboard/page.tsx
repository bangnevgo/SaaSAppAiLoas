"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { AppShell } from "@/app/app-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  BookOpen,
  Circle,
  Target,
  TrendingUp,
  Calendar,
  Heart,
  Sparkles,
  Plus,
  ArrowRight
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
  const { data: session } = useSession()
  const [statsData, setStatsData] = useState({
    journalCount: 0,
    mirrorCount: 0,
    manifestationCount: 0,
    streak: 7,
  })
  const [accessStatus, setAccessStatus] = useState({
    plan: "FREE",
    isPaid: false,
    isTrialActive: true,
    hasFullAccess: true,
    daysLeft: 14,
  })
  const [recentActivity, setRecentActivity] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const [dashRes, subRes] = await Promise.all([
          fetch("/api/dashboard"),
          fetch("/api/user/subscription"),
        ])

        if (dashRes.ok) {
          const data = await dashRes.json()
          if (data.stats) setStatsData(data.stats)
          if (data.recentActivity) setRecentActivity(data.recentActivity)
        }

        if (subRes.ok) {
          const subData = await subRes.json()
          if (subData.status) setAccessStatus(subData.status)
        }
      } catch (err) {
        console.error("Gagal memuat data dashboard:", err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchDashboard()
  }, [])

  const stats = [
    {
      title: "Journal Entries",
      value: statsData.journalCount.toString(),
      change: "Dari database riil",
      icon: BookOpen,
      color: "text-primary",
    },
    {
      title: "Mirror Insights",
      value: statsData.mirrorCount.toString(),
      change: "Dari database riil",
      icon: Circle,
      color: "text-primary",
    },
    {
      title: "Teman Manifestasi",
      value: statsData.manifestationCount.toString(),
      change: "Dari database riil",
      icon: Target,
      color: "text-primary",
    },
    {
      title: "Current Streak",
      value: `${statsData.streak} hari`,
      change: "Pertahankan!",
      icon: TrendingUp,
      color: "text-primary",
    },
  ]

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {session?.user?.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Continue your journey of self-discovery and growth.
          </p>
        </div>

        {/* Trial Status Banner */}
        {!accessStatus.isPaid && (
          <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  {accessStatus.isTrialActive ? "Masa Trial Pro Aktif" : "Masa Trial Telah Berakhir"}
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/20 font-medium">
                    {accessStatus.isTrialActive ? `${accessStatus.daysLeft} Hari Tersisa` : "Trial Habis"}
                  </span>
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {accessStatus.isTrialActive
                    ? "Anda memiliki akses penuh ke seluruh fitur AI Cermin Diri, Jurnal, dan Manifestasi."
                    : "Upgrade ke Bundle Pro untuk melanjutkan akses penuh ke seluruh fitur AI tanpa batas."}
                </p>
              </div>
            </div>
            <Button size="sm" asChild className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0">
              <Link href="/auth/signup">
                {accessStatus.isTrialActive ? "Upgrade ke Bundle Pro" : "Aktifkan Paket Pro"}
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Link>
            </Button>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Journal
              </CardTitle>
              <CardDescription>
                Capture your thoughts and reflections
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" asChild>
                <Link href="/journal">
                  New Entry
                  <Plus className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/journal">
                  View All Entries
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Circle className="h-5 w-5" />
                Mirror
              </CardTitle>
              <CardDescription>
                Analyze your patterns and beliefs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" asChild>
                <Link href="/mirror/analyze">
                  Analyze Entry
                  <Plus className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/mirror">
                  View Mirror
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Manifestation
              </CardTitle>
              <CardDescription>
                Work towards your goals
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full" asChild>
                <Link href="/manifestation/intentions">
                  Set Intention
                  <Plus className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/manifestation">
                  View Manifestation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest entries and insights</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-sm text-muted-foreground animate-pulse">Memuat aktivitas...</div>
            ) : recentActivity.length === 0 ? (
              <div className="text-sm text-muted-foreground py-6 text-center border border-dashed rounded-lg border-border">
                Belum ada aktivitas terbaru. Mulailah dengan menulis jurnal atau melakukan audit cermin diri!
              </div>
            ) : (
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className={cn(
                      "p-2 rounded-lg",
                      activity.type === "journal" && "bg-primary/10 text-primary",
                      activity.type === "mirror" && "bg-primary/10 text-primary",
                      activity.type === "manifestation" && "bg-primary/10 text-primary"
                    )}>
                      {activity.type === "journal" && <BookOpen className="h-4 w-4" />}
                      {activity.type === "mirror" && <Circle className="h-4 w-4" />}
                      {activity.type === "manifestation" && <Target className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif font-medium">{activity.title}</h4>
                        <span className="text-xs text-muted-foreground">{activity.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {activity.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}