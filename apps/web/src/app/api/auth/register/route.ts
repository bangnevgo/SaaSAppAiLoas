import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"
import { syncUserToGoogleSheet } from "@/lib/google-sheets"
import { notifyNewRegistration } from "@/lib/telegram"

export async function POST(request: Request) {
  try {
    const { name, email, password, plan } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email dan password wajib diisi" },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password minimal 6 karakter" },
        { status: 400 }
      )
    }

    // Cek apakah email sudah terdaftar
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "Email sudah terdaftar. Silakan login." },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Hitung tanggal akhir trial 14 hari
    const trialEndDate = new Date()
    trialEndDate.setDate(trialEndDate.getDate() + 14)

    // Tentukan tipe plan
    const selectedPlan = plan === "bundle" ? "BUNDLE" : "FREE"

    // Buat User di database
    const newUser = await prisma.user.create({
      data: {
        name: name?.trim() || "Member Nevgo",
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        plan: selectedPlan,
        trialEndsAt: trialEndDate,
      },
    })

    // Sinkronkan ke Google Sheet & Telegram di background (non-blocking)
    syncUserToGoogleSheet({
      name: newUser.name || "-",
      email: newUser.email,
      plan: newUser.plan,
      trialDays: 14,
      status: "TRIAL_ACTIVE",
    }).catch((err) => console.error("Background sheet sync error:", err))

    notifyNewRegistration({
      name: newUser.name || "Member Nevgo",
      email: newUser.email,
      plan: newUser.plan,
      trialDays: 14,
    }).catch((err: any) => console.error("Background telegram alert error:", err))

    return NextResponse.json(
      {
        message: "Akun berhasil dibuat",
        user: {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          plan: newUser.plan,
          trialEndsAt: newUser.trialEndsAt,
        },
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error("Registration error:", error)
    return NextResponse.json(
      { error: error.message || "Gagal memproses pendaftaran akun" },
      { status: 500 }
    )
  }
}
