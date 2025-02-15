import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const webhookSecret = process.env.WEBHOOK_SECRET || process.env.SIGNING_SECRET

export async function POST(req: Request) {
    if (!webhookSecret) {
        return NextResponse.json(
            { error: 'Webhook secret not found' },
            { status: 500 }
        )
    }

    // Get the headers
    const headersList = await headers()
    const svix_id = headersList.get('svix-id')
    const svix_timestamp = headersList.get('svix-timestamp')
    const svix_signature = headersList.get('svix-signature')

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return NextResponse.json(
            { error: 'Missing required headers' },
            { status: 400 }
        )
    }

    try {
        const payload = await req.json()
        const body = JSON.stringify(payload)

        // Create a new Svix instance with the secret
        const wh = new Webhook(webhookSecret)

        // Verify the payload with the headers
        const evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent

        const { id } = evt.data
        const eventType = evt.type

        console.log(`Webhook received: ${eventType}`)
        console.log('Webhook data:', JSON.stringify(evt.data, null, 2))

        return NextResponse.json(
            { message: 'Webhook processed successfully' },
            { status: 200 }
        )

    } catch (error) {
        console.error('Error processing webhook:', error)
        return NextResponse.json(
            { error: 'Error processing webhook' },
            { status: 400 }
        )
    }
}