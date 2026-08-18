/**
 * Helper to calculate trial & subscription access status
 */

export interface AccessStatus {
  plan: string
  isPaid: boolean
  isTrialActive: boolean
  hasFullAccess: boolean
  daysLeft: number
  trialEndsAt: Date | null
}

export function getUserAccessStatus(user: {
  plan?: string | null
  trialEndsAt?: Date | string | null
}): AccessStatus {
  const plan = user.plan || "FREE"
  const isPaid = plan !== "FREE"

  let isTrialActive = false
  let daysLeft = 0
  let trialDate: Date | null = null

  if (user.trialEndsAt) {
    trialDate = new Date(user.trialEndsAt)
    const now = new Date()
    const diffMs = trialDate.getTime() - now.getTime()

    if (diffMs > 0) {
      isTrialActive = true
      daysLeft = Math.ceil(diffMs / (1000 * 60 * 60 * 24))
    }
  }

  const hasFullAccess = isPaid || isTrialActive

  return {
    plan,
    isPaid,
    isTrialActive,
    hasFullAccess,
    daysLeft,
    trialEndsAt: trialDate,
  }
}
