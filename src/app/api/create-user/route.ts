import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'

export async function POST(req: Request) {
    console.log('Webhook endpoint hit');

    const SIGNING_SECRET = process.env.SIGNING_SECRET

    if (!SIGNING_SECRET) {
        console.error('Missing SIGNING_SECRET environment variable');
        return new Response('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local', {
            status: 500
        })
    }

    console.log('SIGNING_SECRET found');

    // Create new Svix instance with secret
    const wh = new Webhook(SIGNING_SECRET)

    // Get headers
    const headerPayload = await headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    console.log('Headers received:', {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature?.substring(0, 10) + '...' // Log partial signature for security
    });

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        console.error('Missing required Svix headers');
        return new Response('Error: Missing Svix headers', {
            status: 400
        })
    }

    // Get body
    const payload = await req.json()
    const body = JSON.stringify(payload)

    console.log('Webhook payload received:', payload);

    let evt: WebhookEvent

    // Verify payload with headers
    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent

        console.log('Webhook verified successfully');
        console.log('Event type:', evt.type);
        console.log('Event data:', evt.data);

        // Do something with the verified event
        const { id } = evt.data
        const eventType = evt.type

        return new Response('Success: Webhook received and verified', {
            status: 200
        })
    } catch (err: any) {
        console.error('Verification failed:', err);
        return new Response(`Error: Webhook verification failed - ${err.message}`, {
            status: 400
        })
    }
}