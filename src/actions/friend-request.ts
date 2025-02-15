import {db} from "@/lib/db"

export async function SendFriendRequest(senderId: string, receiverId: string) {
    try {
        const friendRequest = await db.friendRequest.create({
            data: {
                senderId,
                receiverId,
            }
        });

        return friendRequest;
    } catch (error) {
        console.error("Error sending friend request:", error);
        throw error;
    }
}

export async function AcceptFriendRequest(senderId: string, receiverId: string) {
    try {
        const friendRequest = await db.friendRequest.updateMany({
            where: {
                senderId,
                receiverId,
            },
            data: {
                status: 'ACCEPTED'
            }
        });

        return friendRequest;
    } catch (error) {
        console.error("Error accepting friend request:", error);
        throw error;
    }
}