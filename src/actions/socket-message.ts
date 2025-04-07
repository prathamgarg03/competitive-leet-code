'use server'

import { pullMessages } from '@/lib/userMessages'

export async function pollMessages(userId: string) {
    return pullMessages(userId)
}