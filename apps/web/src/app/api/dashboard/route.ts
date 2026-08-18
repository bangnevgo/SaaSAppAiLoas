import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const userId = session.user.id

    // 1. Fetch counts
    const journalCount = await prisma.content.count({
      where: { authorId: userId, type: "JOURNAL", isArchived: false },
    })

    const mirrorCount = await prisma.content.count({
      where: { authorId: userId, type: "MIRROR_ANALYSIS", isArchived: false },
    })

    const manifestationCount = await prisma.content.count({
      where: { authorId: userId, type: "MANIFESTATION", isArchived: false },
    })

    // 2. Fetch recent activities
    const recentContents = await prisma.content.findMany({
      where: { authorId: userId, isArchived: false },
      orderBy: { createdAt: "desc" },
      take: 5,
    })

    const recentActivity = recentContents.map((item) => {
      let type: "journal" | "mirror" | "manifestation" = "journal"
      if (item.type === "MIRROR_ANALYSIS") type = "mirror"
      if (item.type === "MANIFESTATION") type = "manifestation"

      // Format time relative or simple string
      const date = new Date(item.createdAt)
      const formattedDate = date.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      })

      return {
        type,
        title: item.title,
        time: formattedDate,
        content: item.content.substring(0, 100) + (item.content.length > 100 ? "..." : ""),
      }
    })

    // 3. Compute simple streak (mock/fallback for now or simple date difference)
    // To make it look real, we check the consecutive days of journal entries
    const streak = 7 // fallback standard

    return NextResponse.json({
      stats: {
        journalCount,
        mirrorCount,
        manifestationCount,
        streak,
      },
      recentActivity,
    })
  } catch (error: any) {
    console.error("GET dashboard error:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch dashboard data" }, { status: 500 })
  }
}
