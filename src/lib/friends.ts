"use server"

import {db} from "@/lib/db"
import {Friends} from "@/types";

export const GetFriendsFromId = async (id: string): Promise<Friends []> => {
    try {
        const sentFriends = await db.user.findUnique({
            where: {
                clerkId: id
            },
            select: {
                sentRequests: {
                    where: {
                        status: 'ACCEPTED'
                    },
                    select: {
                        receiver: {
                            select: {
                                id: true,
                                username: true,
                                clerkId: true
                            }
                        }
                    }
                }
            }
        })

        const receivedFriends = await db.user.findUnique({
            where: {
                clerkId: id
            },
            select: {
                recvRequests: {
                    where: {
                        status: 'ACCEPTED'
                    },
                    select: {
                        sender: {
                            select: {
                                id: true,
                                username: true,
                                clerkId: true
                            }
                        }
                    }
                }
            }
        })

        const friends: Friends[] = [
            ...sentFriends?.sentRequests.map(req => ({
                id: req.receiver.id,
                username: req.receiver.username || "",
                clerkId: req.receiver.clerkId || ""
            })) || [],
            ...receivedFriends?.recvRequests.map(req => ({
                id: req.sender.id,
                username: req.sender.username || "",
                clerkId: req.sender.clerkId || ""
            })) || []
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
                    username: true,
                    clerkId: true
                }
            }
        }
    })

    const requests: Friends[] = friendRequests.map(req => ({
        id: req.sender.id,
        username: req.sender.username || "",
        clerkId: req.sender.clerkId || ""
    }))

    return requests
}