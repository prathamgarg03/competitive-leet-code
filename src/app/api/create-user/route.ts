import { WebhookEvent } from '@clerk/nextjs/server'
import { headers } from 'next/headers'
import { Webhook } from 'svix'

export async function POST(req: Request) {
    const headersList = await headers()
    const svix_id = headersList.get("svix-id")
    const svix_timestamp = headersList.get("svix-timestamp")
    const svix_signature = headersList.get("svix-signature")

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Missing svix headers', {
            status: 400
        })
    }

    const payload = await req.json()
    const webhookSecret = process.env.WEBHOOK_SECRET

    if (!webhookSecret) {
        return new Response('Missing webhook secret', {
            status: 400
        })
    }

    const wh = new Webhook(webhookSecret)

    let evt: WebhookEvent

    try {
        evt = wh.verify(JSON.stringify(payload), {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err)
        return new Response('Error verifying webhook', {
            status: 400
        })
    }

    try {
        if (evt.type === "user.created") {
            console.log("User created:", evt.data)
            // Add your user creation logic here
        }

        return new Response('Webhook processed successfully', {
            status: 200
        })
    } catch (error) {
        console.error('Error processing webhook:', error)
        return new Response('Error processing webhook', {
            status: 400
        })
    }
}