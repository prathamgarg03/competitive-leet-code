"use server"
import { db } from "@/lib/db"
import jwt from "jsonwebtoken"

export async function CreateSocketToken(clerkId: string) {
    try {
        const user = await db.user.findUnique({
            where: {
                clerkId,
            }
        })

        if (!user) {
            console.log("No user found for clerkId:", clerkId)
        }

        console.log("SOCKET_SECRET:", process.env.SOCKET_SECRET)
        const socketToken = jwt.sign(
            {
                id: clerkId,
                username: user?.username,
            },
            process.env.SOCKET_SECRET as string,
            {
                expiresIn: "1h",
            }
        )

        console.log("Socket token created:", socketToken)
        return socketToken
    } catch (error) {
        console.error("Error creating socket token:", error)
        throw error
    }
}