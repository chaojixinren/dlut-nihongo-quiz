import { getSetting, setSetting } from '../db/database'

const KEY = 'activeSession'

export interface ActiveSession {
  sessionId: string
  mode: string
  questionIds: string[]
  totalQuestions: number
  currentIndex: number
  submitted: boolean
  correctCount: number
  wrongList: string[]
  startedAt: string
}

export async function saveActiveSession(s: ActiveSession): Promise<void> {
  await setSetting(KEY, s)
}

export async function loadActiveSession(): Promise<ActiveSession | null> {
  return await getSetting<ActiveSession | null>(KEY, null)
}

export async function clearActiveSession(): Promise<void> {
  await setSetting(KEY, null)
}

export function isSessionInProgress(s: ActiveSession | null): s is ActiveSession {
  if (!s) return false
  if (!s.questionIds || s.questionIds.length === 0) return false
  const nextIndex = s.submitted ? s.currentIndex + 1 : s.currentIndex
  return nextIndex < s.totalQuestions
}
