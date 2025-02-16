"use server"

import { db } from "@/lib/db";

export async function SendFriendRequest(senderClerkId: string, receiverEmail: string) {
    try {
        const sender = await db.user.findUnique({
            where: {
                clerkId: senderClerkId,
            }
        })

        if (!sender) {
            console.log("No user found for clerkId:", senderClerkId); // Debugging
            // throw new Error(`User with clerkId ${senderClerkId} not found`);
        }

        const senderId = sender?.id || "";

        const receiver = await db.user.findUnique({
            where: {
                email: receiverEmail,
            },
        });

        if (!receiver) {
            console.log("No user found for email:", receiverEmail); // Debugging
            // throw new Error(`User with email ${receiverEmail} not found`);
        }

        const receiverId = receiver?.id || "";

        const friendRequest = await db.friendRequest.create({
            data: {
                senderId,
                receiverId,
            },
        });

        console.log("Friend request created:", friendRequest); // Debugging
        return friendRequest;
    } catch (error) {
        console.error("Error sending friend request:", error);
        throw error;
    }
}

export async function AcceptFriendRequest(senderClerkId: string, receiverClerkId: string) {
    try {
        const sender = await db.user.findUnique({
            where: {
                clerkId: senderClerkId,
            },
        })

        const receiver = await db.user.findUnique({
            where: {
                clerkId: receiverClerkId,
            },
        });

        if (!sender) {
            console.log("No sender found for clerkId:", senderClerkId);
        }
        if(!receiver) {
            console.log("No receiver found for clerkId:", receiverClerkId);
        }

        const senderId = sender?.id || "";
        const receiverId = receiver?.id || "";

        const friendRequest = await db.friendRequest.updateMany({
            where: {
                senderId,
                receiverId,
            },
            data: {
                status: 'ACCEPTED',
            },
        });

        console.log("Friend request updated:", friendRequest); // Debugging
        return friendRequest;
    } catch (error) {
        console.error("Error accepting friend request:", error);
        throw error;
    }
}
