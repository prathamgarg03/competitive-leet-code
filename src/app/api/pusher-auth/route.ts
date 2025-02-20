import { pusherServer } from "@/lib/pusher"
import { getAuth } from "@clerk/nextjs/server"
import {NextRequest} from "next/server"

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData()
        const socket_id = formData.get("socket_id")?.toString()
        const channel_name = formData.get("channel_name")?.toString()

        if (!socket_id || !channel_name) {
            return new Response("Missing socket_id or channel_name", { status: 400 })
        }

        const { userId } = getAuth(req)
        if (!userId) {
            return new Response("Unauthorized", { status: 401 })
        }

        const authResponse = pusherServer.authorizeChannel(socket_id, channel_name)
        return new Response(JSON.stringify(authResponse), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        })
    } catch (error) {
        console.error("Error authorizing Pusher channel:", error)
        return new Response("Server error", { status: 500 })
    }
}
