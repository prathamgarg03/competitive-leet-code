import {db} from "@/lib/db"
import {Friends} from "@/types";

export const GetFriendsFromId = async (id: string): Promise<Friends []> => {
    try {
        const sentFriends = await db.friendRequest.findMany({
            where: {
                senderId: id,
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
                receiverId: id,
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