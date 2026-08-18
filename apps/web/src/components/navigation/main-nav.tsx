"use client"

import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Home,
  BookOpen,
  Circle,
  Target,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  Sparkles,
  ArrowRight,
  Zap,
} from "lucide-react"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
  },
  {
    name: "Journal",
    href: "/journal",
    icon: BookOpen,
    children: [
      { name: "All Entries", href: "/journal" },
      { name: "Future Letters", href: "/journal/future" },
      { name: "Love Letters", href: "/journal/love" },
    ],
  },
  {
    name: "Mirror",
    href: "/mirror",
    icon: Circle,
    children: [
      { name: "Analysis", href: "/mirror/analyze" },
      { name: "Patterns", href: "/mirror/patterns" },
      { name: "Scripts", href: "/mirror/scripts" },
    ],
  },
  {
    name: "Teman Manifestasi",
    href: "/manifestation",
    icon: Target,
    children: [
      { name: "Intentions", href: "/manifestation/intentions" },
      { name: "Evidence Vault", href: "/manifestation/evidence" },
      { name: "Challenge", href: "/manifestation/challenge" },
    ],
  },
  {
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
]


export function MainNav() {
  const session = useSession()
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [accessStatus, setAccessStatus] = useState({
    plan: "FREE",
    isPaid: false,
    isTrialActive: true,
    hasFullAccess: true,
    daysLeft: 14,
  })

  useEffect(() => {
    if (session.status === "authenticated") {
      fetch("/api/user/subscription")
        .then((res) => res.json())
        .then((data) => {
          if (data.status) setAccessStatus(data.status)
        })
        .catch((err) => console.error("Subscription fetch error:", err))
    }
  }, [session.status])

  const renderTrialCard = () => (
    <div className="p-3 m-3 rounded-xl border border-primary/25 bg-card/80 backdrop-blur-sm shadow-sm space-y-2.5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          {accessStatus.isPaid ? accessStatus.plan : "Trial Pro (14 Hari)"}
        </div>
        <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
          {accessStatus.isPaid
            ? "Aktif"
            : accessStatus.isTrialActive
            ? `${accessStatus.daysLeft} hari lagi`
            : "Trial Habis"}
        </span>
      </div>
      {!accessStatus.isPaid && (
        <>
          <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-primary h-full rounded-full transition-all"
              style={{
                width: `${Math.min(100, Math.max(5, (accessStatus.daysLeft / 14) * 100))}%`,
              }}
            />
          </div>
          <p className="text-[11px] text-muted-foreground leading-tight">
            {accessStatus.isTrialActive
              ? "Akses penuh fitur AI & jurnal aktif selama masa trial."
              : "Masa trial berakhir. Upgrade untuk akses tanpa batas."}
          </p>
          <Button
            size="sm"
            className="w-full h-8 text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90"
            asChild
          >
            <Link href="/auth/signup">
              {accessStatus.isTrialActive ? "Upgrade ke Pro" : "Aktifkan Pro"}
              <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </Button>
        </>
      )}
    </div>
  )

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 md:border-r">
        <div className="flex flex-col flex-grow pt-5 bg-card overflow-y-auto justify-between">
          <div>
            <div className="flex items-center flex-shrink-0 px-5 mb-4">
              <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="flex items-center justify-center w-8 h-8 font-serif text-2xl font-semibold text-primary border-r border-border pr-3">
                  N
                </div>
                <div className="flex flex-col leading-none tracking-wider">
                  <span className="font-semibold font-serif text-sm text-foreground">NEVGO</span>
                  <span className="text-[9px] text-muted-foreground tracking-[0.25em] font-medium mt-0.5">REFLECT</span>
                </div>
              </Link>
            </div>
            <div className="mt-5 flex-grow flex flex-col">
              <nav className="flex-1 px-3 pb-4 space-y-1.5">
                {navigation.map((item) => (
                  <div key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all",
                        pathname === item.href
                          ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      <item.icon className="mr-3 h-4 w-4 flex-shrink-0" />
                      {item.name}
                    </Link>
                    {item.children && (
                      <div className="ml-8 mt-1 space-y-1 border-l pl-2 border-border/60">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className={cn(
                              "block px-3 py-1.5 text-xs rounded-md transition-all",
                              pathname === child.href
                                ? "text-primary font-semibold"
                                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            )}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </div>
          </div>

          {/* Trial / Subscription Card at bottom of sidebar */}
          <div className="pb-4">
            {renderTrialCard()}
          </div>
        </div>
      </div>

      {/* Mobile navigation overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-card overflow-y-auto flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between p-4 border-b">
              <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="flex items-center justify-center w-8 h-8 font-serif text-2xl font-semibold text-primary border-r border-border pr-3">
                  N
                </div>
                <div className="flex flex-col leading-none tracking-wider">
                  <span className="font-semibold font-serif text-sm text-foreground">NEVGO</span>
                  <span className="text-[9px] text-muted-foreground tracking-[0.25em] font-medium mt-0.5">REFLECT</span>
                </div>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1.5">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all",
                      pathname === item.href
                        ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <item.icon className="mr-3 h-4 w-4 flex-shrink-0" />
                    {item.name}
                  </Link>
                  {item.children && (
                    <div className="ml-8 mt-1 space-y-1 border-l pl-2 border-border/60">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={cn(
                            "block px-3 py-1.5 text-xs rounded-md transition-all",
                            pathname === child.href
                              ? "text-primary font-semibold"
                              : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                          )}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          <div className="p-4 border-t">
            {renderTrialCard()}
          </div>
        </div>
      )}

      {/* User menu */}
      <div className="hidden md:flex md:items-center md:justify-end md:ml-6 md:space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={session.data?.user?.image || ""} alt={session.data?.user?.name || ""} />
                <AvatarFallback>
                  {session.data?.user?.name?.charAt(0) || <User className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <div className="flex items-center justify-start gap-2 p-2">
              <div className="flex flex-col space-y-1 leading-none">
                {session.data?.user?.name && (
                  <p className="font-medium">{session.data.user.name}</p>
                )}
                {session.data?.user?.email && (
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    {session.data.user.email}
                  </p>
                )}
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}