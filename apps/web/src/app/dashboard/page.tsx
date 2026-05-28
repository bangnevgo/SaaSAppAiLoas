"use client"

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

  const stats = [
    {
      title: "Journal Entries",
      value: "24",
      change: "+3 this week",
      icon: BookOpen,
      color: "text-blue-500",
    },
    {
      title: "Mirror Insights",
      value: "12",
      change: "+2 this week",
      icon: Circle,
      color: "text-purple-500",
    },
    {
      title: "Teman Manifestasi",
      value: "8",
      change: "+1 this week",
      icon: Target,
      color: "text-amber-500",
    },
    {
      title: "Current Streak",
      value: "7 days",
      change: "Keep it up!",
      icon: TrendingUp,
      color: "text-green-500",
    },
  ]

  const recentActivity = [
    {
      type: "journal",
      title: "Morning reflections",
      time: "2 hours ago",
      content: "Grateful for the peaceful morning meditation...",
    },
    {
      type: "mirror",
      title: "Work relationship analysis",
      time: "Yesterday",
      content: "Discovered pattern in colleague interactions...",
    },
    {
      type: "manifestation",
      title: "New intention set",
      time: "2 days ago",
      content: "Committed to daily manifestation practice...",
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
                <Link href="/mirror/patterns">
                  View Patterns
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
                <Link href="/manifestation/challenge">
                  30-Day Challenge
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
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className={cn(
                    "p-2 rounded-lg",
                    activity.type === "journal" && "bg-blue-100 dark:bg-blue-900",
                    activity.type === "mirror" && "bg-purple-100 dark:bg-purple-900",
                    activity.type === "manifestation" && "bg-amber-100 dark:bg-amber-900"
                  )}>
                    {activity.type === "journal" && <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-300" />}
                    {activity.type === "mirror" && <Circle className="h-4 w-4 text-purple-600 dark:text-purple-300" />}
                    {activity.type === "manifestation" && <Target className="h-4 w-4 text-amber-600 dark:text-amber-300" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{activity.title}</h4>
                      <span className="text-sm text-gray-500">{activity.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {activity.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  )
}