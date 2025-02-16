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

export async function AcceptFriendRequest(senderId: string, receiverClerkId: string) {
    try {
        const receiver = await db.user.findUnique({
            where: {
                clerkId: receiverClerkId,
            }
        })

        const receiverId = receiver?.id || "";

        const friendRequest = await db.friendRequest.updateMany({
            where: {
                senderId,
                receiverId,
                status: `PENDING`
            },
            data: {
                status: 'ACCEPTED',
                updatedAt: new Date()
            }
        });

        if (friendRequest.count === 0) {
            throw new Error("No pending friend request found between these users");
        }

        return friendRequest;
    } catch (error) {
        console.error("Error accepting friend request:", error);
        throw error;
    }
}