import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
})

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { journalContent } = await request.json()

    if (!journalContent || !journalContent.trim()) {
      return NextResponse.json({ error: "Journal content is required" }, { status: 400 })
    }

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY.startsWith("your-")) {
      return NextResponse.json({
        error: "OpenAI API Key belum dikonfigurasi di server. Mohon hubungi admin.",
      }, { status: 500 })
    }

    // Call OpenAI GPT-4
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

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    })

    const resultText = response.choices[0]?.message?.content || ""
    
    let analysisData
    try {
      analysisData = JSON.parse(resultText.trim())
    } catch (parseError) {
      console.error("OpenAI response parse error:", resultText, parseError)
      // Fallback in case JSON parsing fails
      analysisData = {
        category: "UNKNOWN",
        hiddenBelief: "Terdeteksi adanya hambatan atau keraguan diri.",
        conceptAudit: "Analisis gagal diformat secara otomatis, namun tulisan Anda menunjukkan perlunya refleksi lebih lanjut pada ketenangan diri.",
        newIdentityScript: "Saya tenang dan menyerahkan semua hasil kepada kesadaran saya.",
        keywords: ["refleksi", "kesadaran"],
        confidence: 0.5,
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

    return NextResponse.json({ analysis: contentRecord.mirrorAnalysis })
  } catch (error: any) {
    console.error("POST mirror analyze error:", error)
    return NextResponse.json({ error: error.message || "Failed to process AI analysis" }, { status: 500 })
  }
}
