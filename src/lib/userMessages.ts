// lib/messageStore.ts
import { redis } from './redis'

type Message = {
  type: string
  message: any
}

export async function pushMessage(userId: string, type: string, message: any) {
  const payload = JSON.stringify({ type, message })
  await redis.lPush(`messages:${userId}`, payload)
}

export async function pullMessages(userId: string): Promise<Message[]> {
  const rawMessages = await redis.lRange(`messages:${userId}`, 0, -1)
  await redis.del(`messages:${userId}`) // One-time delivery
  return rawMessages.map((msg) => JSON.parse(msg as string))
}