import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'

function fixBase64Padding(str: string): string {
    const remainder = str.length % 4;
    if (remainder !== 0) {
        return str + '='.repeat(4 - remainder);
    }
    return str;
}

export async function POST(req: Request) {
    const SIGNING_SECRET = process.env.SIGNING_SECRET;

    if (!SIGNING_SECRET) {
        throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local');
    }

    // Optionally fix the signing secret if it's expected to be Base64-encoded
    const fixedSigningSecret = fixBase64Padding(SIGNING_SECRET);

    // Create new Svix instance with secret
    const wh = new Webhook(fixedSigningSecret);

    // Get headers
    const headerPayload = headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    let svix_signature = headerPayload.get('svix-signature');

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error: Missing Svix headers', { status: 400 });
    }

    // Trim and fix padding for the signature
    svix_signature = fixBase64Padding(svix_signature.trim());

    // Get raw body
    const body = await req.text();

    // (Optional) Log header values to debug issues
    console.log('svix-id:', svix_id);
    console.log('svix-timestamp:', svix_timestamp);
    console.log('svix-signature:', svix_signature);

    let evt: WebhookEvent;

    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error('Error: Could not verify webhook:', err);
        return new Response('Error: Verification error', { status: 400 });
    }

    // Process the webhook payload
    const { id } = evt.data;
    const eventType = evt.type;
    console.log(`Received webhook with ID ${id} and event type of ${eventType}`);
    console.log('Webhook payload:', body);

    return new Response('Webhook received', { status: 200 });
}