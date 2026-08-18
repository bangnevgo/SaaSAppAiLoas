import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import OpenAI from "openai"
import { sendTelegramNotification } from "@/lib/telegram"

const apiKey = process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY || ""
const modelName = process.env.OPENROUTER_MODEL || "nvidia/nemotron-3.5-lightning:free"

const openrouter = new OpenAI({
  apiKey,
  baseURL: process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXTAUTH_URL || "https://app.nevgoinstitute.com",
    "X-Title": "Nevgo Reflect",
  },
})

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { journalContent } = await request.json()

    if (!journalContent || !journalContent.trim()) {
      return NextResponse.json({ error: "Konten jurnal wajib diisi" }, { status: 400 })
    }

    if (!apiKey || apiKey.startsWith("your-")) {
      return NextResponse.json({
        error: "OPENROUTER_API_KEY belum dikonfigurasi di Environment Variables server/Vercel.",
      }, { status: 500 })
    }

    // Prompt Law of Assumption & Self-Concept Audit
    const prompt = `
Anda adalah pakar psikologi transpersonal dan pengajar filosofi Neville Goddard (Law of Assumption). Tugas Anda adalah menganalisis entri jurnal pengguna untuk mengaudit konsep diri (self-concept), mendeteksi keyakinan bawah sadar yang membatasi (limiting beliefs), dan menuliskan skrip identitas baru yang memberdayakan.

Mengingat kategori berikut:
SELF_WORTH (Harga diri)
SAFETY (Keamanan/kecemasan)
AUTHORITY (Otoritas/kendali diri)
LOVE (Percintaan/kasih sayang)
BELONGING (Penerimaan sosial/afiliasi)
IDENTITY (Identitas diri)
CREATIVE (Kreativitas/ekspresi diri)
SERVICE (Pelayanan/tanggung jawab berlebih)
POWER (Kekuatan diri/manifestasi)
UNKNOWN (Tidak diketahui)

Analisis entri jurnal ini:
"${journalContent}"

Berikan hasil analisis Anda dalam format JSON murni dengan struktur berikut:
{
  "category": "SALAH_SATU_KATEGORI_DI_ATAS_CONTOH_SELF_WORTH",
  "hiddenBelief": "Deskripsi singkat tentang keyakinan membatasi bawah sadar yang terdeteksi",
  "conceptAudit": "Analisis mendalam mengenai konsep diri pengguna saat ini berdasarkan tulisannya (1-2 paragraf)",
  "newIdentityScript": "Kalimat afirmasi/skrip identitas baru yang memberdayakan dalam bahasa Indonesia (berupa kalimat tegas masa kini seolah sudah terwujud, misal 'Saya sepenuhnya layak...')",
  "keywords": ["kata_kunci1", "kata_kunci2"],
  "confidence": 0.85
}

PENTING: Jangan menyertakan penjelasan tambahan atau pembungkus markdown seperti \`\`\`json. Kembalikan HANYA string JSON yang valid.
`

    const response = await openrouter.chat.completions.create({
      model: modelName,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    })

    const resultText = response.choices[0]?.message?.content || ""
    
    let analysisData
    try {
      let cleanedText = resultText.trim()
      if (cleanedText.startsWith("```")) {
        cleanedText = cleanedText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "")
      }
      const jsonMatch = cleanedText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        cleanedText = jsonMatch[0]
      }
      analysisData = JSON.parse(cleanedText)
    } catch (parseError) {
      console.error("OpenRouter response parse error:", resultText, parseError)
      // Fallback in case JSON parsing fails
      analysisData = {
        category: "UNKNOWN",
        hiddenBelief: "Terdeteksi adanya hambatan atau keraguan diri.",
        conceptAudit: "Analisis sedang disempurnakan, namun tulisan Anda menunjukkan perlunya memperkuat asumsi keberhasilan dan ketenangan internal.",
        newIdentityScript: "Saya tenang dan meyakini segala impian saya telah terwujud secara sempurna.",
        keywords: ["refleksi", "kesadaran", "asumsi"],
        confidence: 0.75,
      }
    }

    // Save to database
    // 1. Create a Content record of type MIRROR_ANALYSIS
    const contentRecord = await prisma.content.create({
      data: {
        type: "MIRROR_ANALYSIS",
        title: `Mirror Audit: ${analysisData.hiddenBelief.substring(0, 30)}...`,
        content: journalContent,
        rawContent: journalContent,
        tags: analysisData.keywords || [],
        authorId: session.user.id,
        mood: "neutral",
        mirrorAnalysis: {
          create: {
            originalTrigger: journalContent,
            hiddenBelief: analysisData.hiddenBelief,
            conceptAudit: analysisData.conceptAudit,
            newIdentityScript: analysisData.newIdentityScript,
            category: analysisData.category,
            keywords: analysisData.keywords || [],
            confidence: analysisData.confidence || 0.0,
            userId: session.user.id,
          },
        },
      },
      include: {
        mirrorAnalysis: true,
      },
    })

    // Send Telegram alert (non-blocking)
    sendTelegramNotification(
      `🔍 *AI Mirror Audit Selesai!*\n\n` +
      `👤 *User*: ${session.user.name || session.user.email}\n` +
      `📌 *Kategori*: ${analysisData.category}\n` +
      `💡 *Hidden Belief*: "${analysisData.hiddenBelief}"\n` +
      `✨ *New Identity*: "${analysisData.newIdentityScript}"\n` +
      `⏰ *Waktu*: ${new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}`
    ).catch((err) => console.error("Mirror telegram alert error:", err))

    return NextResponse.json({ analysis: contentRecord.mirrorAnalysis })
  } catch (error: any) {
    console.error("POST mirror analyze error:", error)
    return NextResponse.json({ error: error.message || "Gagal memproses analisis AI OpenRouter" }, { status: 500 })
  }
}
