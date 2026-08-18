import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { getUserAccessStatus } from "@/lib/subscription"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        plan: true,
        trialEndsAt: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const status = getUserAccessStatus(user)

    return NextResponse.json({ status })
  } catch (error: any) {
    console.error("GET user subscription error:", error)
    return NextResponse.json(
      { error: error.message || "Failed to fetch subscription status" },
      { status: 500 }
    )
  }
}
