export async function syncUserToGoogleSheet(data: {
  name: string
  email: string
  plan: string
  trialDays?: number
  status?: string
}) {
  const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL

  if (!webhookUrl) {
    console.log("GOOGLE_SHEET_WEBHOOK_URL is not set. Skipping sheet sync.")
    return
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        createdAt: new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" }),
        name: data.name,
        email: data.email,
        plan: data.plan,
        trialDays: data.trialDays || 14,
        status: data.status || "TRIAL_ACTIVE",
      }),
    })

    if (!response.ok) {
      console.error("Failed to sync to Google Sheets:", await response.text())
    } else {
      console.log("Successfully synced user to Google Sheets:", data.email)
    }
  } catch (error) {
    console.error("Google Sheets sync error:", error)
  }
}
