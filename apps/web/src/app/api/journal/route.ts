import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import { sendTelegramNotification } from "@/lib/telegram"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const entries = await prisma.content.findMany({
      where: {
        authorId: session.user.id,
        type: "JOURNAL",
        isArchived: false,
      },
      include: {
        journalEntry: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({ entries })
  } catch (error: any) {
    console.error("GET journal entries error:", error)
    return NextResponse.json({ error: error.message || "Failed to fetch entries" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, content, mood, location, isPrivate } = await request.json()

    if (!title || !content) {
      return NextResponse.json({ error: "Title and content are required" }, { status: 400 })
    }

    // Create Content with nested JournalEntry
    const newContent = await prisma.content.create({
      data: {
        type: "JOURNAL",
        title,
        content,
        rawContent: content,
        tags: [],
        mood: mood || null,
        location: location || null,
        authorId: session.user.id,
        journalEntry: {
          create: {
            isPrivate: isPrivate !== undefined ? isPrivate : true,
          },
        },
      },
      include: {
        journalEntry: true,
      },
    })

    return NextResponse.json({ entry: newContent })
  } catch (error: any) {
    console.error("POST journal entry error:", error)
    return NextResponse.json({ error: error.message || "Failed to create entry" }, { status: 500 })
  }
}
