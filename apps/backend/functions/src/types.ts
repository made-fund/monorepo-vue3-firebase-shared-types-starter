export interface User {
  id: string
  email: string
  name: string
  weightGainFactor: number
  provider: string
  metadata: {
    createdAt: number
    updatedAt: number
    lastActive: number
  }
}

export interface ChatMessage {
  id: string
  text: string
  userId: string
  timestamp: number
}

export const testing = '456'
