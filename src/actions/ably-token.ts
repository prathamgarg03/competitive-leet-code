"use server";
import Ably from "ably";

export function generateLobbyCode() {
    return nanoid(8);
}

export async function getAblyToken() {
    const client = new Ably.Rest(process.env.ABLY_API_KEY);
    
    return new Promise((resolve, reject) => {
        client.auth.createTokenRequest({}, (err, tokenRequest) => {
            if (err) {
                reject(err);
            } else {
                resolve(tokenRequest);
            }
        });
    });
}
