"use server"

import {db} from "@/lib/db"
import {Friends} from "@/types";

export const GetFriendsFromId = async (id: string): Promise<Friends []> => {
    try {
        const user = await db.user.findUnique({
            where: {
                clerkId: id
            }
        })

        const userId = user?.id

        const sentFriends = await db.friendRequest.findMany({
            where: {
                senderId: userId,
                status: 'ACCEPTED'
            },
            select: {
                sender: {
                    select: {
                        id: true,
                        username: true
                    }
                }
            }
        })

        const receivedFriends = await db.friendRequest.findMany({
            where: {
                receiverId: userId,
                status: 'ACCEPTED'
            },
            select: {
                receiver: {
                    select: {
                        id: true,
                        username: true
                    }
                }
            }
        })

        const friends: Friends[] = [
            ...sentFriends.map(req => ({
                id: req.sender.id,
                username: req.sender.username || ""
            })),
            ...receivedFriends.map(req => ({
                id: req.receiver.id,
                username: req.receiver.username || ""
            })),
        ]

        return friends
    } catch (error) {
        console.error("Error getting friends:", error)
        throw error
    }
}

export const GetFriendRequestsFromId = async(id: string): Promise<Friends []> => {
    const user = await db.user.findUnique({
        where: {
            clerkId: id
        }
    })

    const userId = user?.id

    const friendRequests = await db.friendRequest.findMany({
        where: {
            receiverId: userId,
            status: 'PENDING'
        },
        select: {
            sender: {
                select: {
                    id: true,
                    username: true
                }
            }
        }
    })

    const requests: Friends[] = friendRequests.map(req => ({
        id: req.sender.id,
        username: req.sender.username || ""
    }))

    return requests
}