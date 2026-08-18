/**
 * Helper to send Telegram notifications
 */
export async function sendTelegramNotification(message: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN || "8294932959:AAHhZods2iZIsuMaAGC1kkzLTB5VVA_F0kA"
  const chatId = process.env.TELEGRAM_CHAT_ID || "5729835979"

  if (!botToken || !chatId) {
    console.log("Telegram notification skipped: TELEGRAM_CHAT_ID is not set.")
    return
  }

  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    })

    if (!response.ok) {
      console.error("Failed to send Telegram notification:", await response.text())
    } else {
      console.log("Successfully sent Telegram alert")
    }
  } catch (error) {
    console.error("Telegram notification error:", error)
  }
}

/**
 * Notifikasi Pendaftaran Member Baru (Trial 14 Hari)
 */
export async function notifyNewRegistration(data: {
  name: string
  email: string
  plan?: string
  trialDays?: number
}) {
  const message =
    `🎉 *Pendaftaran Member Baru!*\n` +
    `👤 *Nama*: ${data.name}\n` +
    `📧 *Email*: ${data.email}\n` +
    `📦 *Paket*: ${data.plan || "FREE"}\n` +
    `⏳ *Masa Trial*: ${data.trialDays || 14} Hari\n` +
    `⏰ *Waktu*: ${new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}`

  return sendTelegramNotification(message)
}

/**
 * Notifikasi Subscriber / Upgrade Langganan Berbayar
 */
export async function notifyNewSubscriber(data: {
  name: string
  email: string
  plan: string
  amount?: string
  paymentMethod?: string
}) {
  const message =
    `💎 *Subscriber / Pembayaran Baru!*\n` +
    `👤 *Nama*: ${data.name}\n` +
    `📧 *Email*: ${data.email}\n` +
    `📦 *Paket*: ${data.plan}\n` +
    (data.amount ? `💰 *Nominal*: ${data.amount}\n` : "") +
    (data.paymentMethod ? `💳 *Metode*: ${data.paymentMethod}\n` : "") +
    `✅ *Status*: AKTIF\n` +
    `⏰ *Waktu*: ${new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}`

  return sendTelegramNotification(message)
}

