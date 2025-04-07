// src/actions/poll-messages.ts
'use server'

import { pullMessages } from '@/lib/userMessages'

export async function pollMessages(userId: string) {
    return await pullMessages(userId)
  }