"use server";

import Ably from "ably";

// Server Action: Generate an Ably TokenRequest
export async function getAblyTokenRequest(): Promise<Ably.Types.TokenRequest> {
    if (!process.env.ABLY_API_KEY) {
        throw new Error("ABLY_API_KEY is missing in environment variables.");
    }

    const client = new Ably.Rest(process.env.ABLY_API_KEY);

    return new Promise((resolve, reject) => {
        client.auth.createTokenRequest({}, (err: Error | null, tokenRequest?: Ably.Types.TokenRequest) => {
            if (err) {
                reject(err);
            } else if (tokenRequest) {
                resolve(tokenRequest);
            }
        });
    });
}
