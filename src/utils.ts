import { ONE_HOUR } from './constants'

export const formatRemaining = (expiresAt: number, now: number) => {
  const remaining = Math.max(0, expiresAt - now)
  const hours = Math.floor(remaining / ONE_HOUR)
  const minutes = Math.floor((remaining % ONE_HOUR) / (1000 * 60))
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000)

  const parts = [
    hours > 0 ? `${hours}h` : null,
    minutes > 0 || hours > 0 ? `${minutes}m` : null,
    `${seconds}s`,
  ].filter(Boolean)

  return parts.join(' ')
}

export const createOption = (value: string) => ({
  id: crypto.randomUUID(),
  value,
})

