export type FormOption = {
  id: string
  value: string
}

export type PollOption = {
  id: string
  label: string
  votes: number
}

export type Poll = {
  id: string
  question: string
  options: PollOption[]
  expiresAt: number
  hideResults: boolean
}

export type Comment = {
  id: string
  text: string
  timestamp: number
}

