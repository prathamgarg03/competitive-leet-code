import { pushMessage } from '@/lib/userMessages'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const body = await req.json()
    const { userId, type, message } = body

    if (!userId || !type || !message) {
        return NextResponse.json({ error: 'Invalid body' }, { status: 400 })
    }

    console.log('📬 Webhook received for user', userId, type)

    pushMessage(userId, type, message)

    return NextResponse.json({ status: 'ok' })
}