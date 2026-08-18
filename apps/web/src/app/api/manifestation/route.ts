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

    const items = await prisma.content.findMany({
      where: {
        authorId: session.user.id,
        type: "MANIFESTATION",
        isArchived: false,
      },
      include: {
        manifestation: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json({ manifestations: items })
  } catch (error: any) {
    console.error("GET manifestations error:", error)
    return NextResponse.json(
      { error: error.message || "Gagal mengambil daftar manifestasi" },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { intention, affirmation, category, startDate, doubtProtocol } = await request.json()

    if (!intention || !affirmation) {
      return NextResponse.json(
        { error: "Niat manifestasi dan kalimat afirmasi wajib diisi" },
        { status: 400 }
      )
    }

    // Buat Content dengan relasi nested Manifestation
    const newContent = await prisma.content.create({
      data: {
        type: "MANIFESTATION",
        title: intention.substring(0, 60),
        content: affirmation,
        rawContent: JSON.stringify({ intention, affirmation, category, startDate }),
        tags: category ? [category] : [],
        mood: "aligned",
        authorId: session.user.id,
        manifestation: {
          create: {
            intention,
            affirmation,
            doubtProtocol: doubtProtocol || "Abaikan bukti indrawi 3D, pertahankan asumsi state of wish fulfilled.",
            evidenceVault: JSON.stringify([]),
            status: "ACTIVE",
            stage: 1,
            userId: session.user.id,
          },
        },
      },
      include: {
        manifestation: true,
      },
    })

    return NextResponse.json(
      {
        message: "Niat manifestasi berhasil disimpan",
        manifestation: newContent,
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("POST manifestation error:", error)
    return NextResponse.json(
      { error: error.message || "Gagal menyimpan niat manifestasi" },
      { status: 500 }
    )
  }
}
