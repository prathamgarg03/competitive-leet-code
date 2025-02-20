"use server"

import {db} from "@/lib/db";

export const GetUidFromClerkId = async (clerkId: string): Promise<string> => {
    const user = await db.user.findUnique({
        where: {
            clerkId: clerkId
        }
    })
    return user?.id || ""
}
