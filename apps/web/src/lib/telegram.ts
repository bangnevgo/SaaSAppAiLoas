/**
 * Helper to send Telegram notifications for new leads / activities
 */
export async function sendTelegramNotification(message: string) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN || "8294932959:AAHhZods2iZIsuMaAGC1kkzLTB5VVA_F0kA"
  const chatId = process.env.TELEGRAM_CHAT_ID

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
