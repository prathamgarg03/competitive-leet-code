import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { CreateUser } from "@/actions/create-user"
import { UserJSON } from "@clerk/clerk-sdk-node"

export async function POST(req: Request) {
    const SIGNING_SECRET = process.env.SIGNING_SECRET

    if (!SIGNING_SECRET) {
        throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
    }

    const wh = new Webhook(SIGNING_SECRET)

    const headerPayload = await headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error: Missing Svix headers', {
            status: 400,
        })
    }

    const payload = await req.json()
    const body = JSON.stringify(payload)

    let evt: WebhookEvent

    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error: Could not verify webhook:', err)
        return new Response('Error: Verification error', {
            status: 400,
        })
    }

    const eventType = evt.type
    if (eventType === 'user.created') {
        const data = evt.data as UserJSON

        try {
            const clerkId = data.id
            const username = data.username ?? `${data.first_name ?? ''}.${data.last_name ?? ''}`
            const email = data.email_addresses?.[0]?.email_address ?? ""


            await CreateUser({ clerkId, username, email })
            return new Response('User created successfully', { status: 200 })
        } catch (error) {
            console.error('Error processing user data:', error)
            return new Response('Error processing user data', { status: 500 })
        }
    }
    return new Response('Webhook received', { status: 200 })
}