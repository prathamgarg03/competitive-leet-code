"use server"

import {db} from "@/lib/db"
import {pusherServer} from "@/lib/pusher";

export async function InviteFriend(userClerkId: string, friendId: string) {
    try {
        await pusherServer.trigger(`private-user-${friendId}`, 'friend-invite', {
            message: `User ${userClerkId} has invited you to play a quiz!`,
        })
        return { success: true }
    } catch (error) {
        console.error("Error inviting friend:", error)
        return { success: false, error: 'Failed to invite friend' }
    }
}
