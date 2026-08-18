import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { manifestationId, title, note, date } = await request.json()

    if (!manifestationId || !title) {
      return NextResponse.json(
        { error: "ID Manifestasi dan Catatan Bukti wajib diisi" },
        { status: 400 }
      )
    }

    // Cari manifestasi milik user
    const item = await prisma.manifestation.findFirst({
      where: {
        id: manifestationId,
        userId: session.user.id,
      },
    })

    if (!item) {
      return NextResponse.json(
        { error: "Manifestasi tidak ditemukan" },
        { status: 404 }
      )
    }

    // Parse evidence vault lama
    let currentVault: any[] = []
    try {
      if (item.evidenceVault) {
        currentVault = JSON.parse(item.evidenceVault)
        if (!Array.isArray(currentVault)) currentVault = []
      }
    } catch {
      currentVault = []
    }

    const newEvidence = {
      id: Date.now().toString(),
      title,
      note: note || "",
      date: date || new Date().toISOString(),
      createdAt: new Date().toISOString(),
    }

    currentVault.unshift(newEvidence)

    const updated = await prisma.manifestation.update({
      where: { id: item.id },
      data: {
        evidenceVault: JSON.stringify(currentVault),
      },
    })

    return NextResponse.json({
      message: "Bukti sinkronisitas berhasil ditambahkan ke Brankas",
      evidence: newEvidence,
      evidenceVault: currentVault,
    })
  } catch (error: any) {
    console.error("POST manifestation evidence error:", error)
    return NextResponse.json(
      { error: error.message || "Gagal mencatat bukti manifestasi" },
      { status: 500 }
    )
  }
}
