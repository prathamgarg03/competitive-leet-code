import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

interface CreateUserInput {
    clerkId: string;
    email: string;
    username: string;
}

export async function CreateUser({ clerkId, email, username }: CreateUserInput) {
    if (!clerkId || !email || !username) {
        throw new Error("All fields (clerkId, email, and username) must be provided.");
    }

    try {
        const existingUser = await db.user.findFirst({
            where: {
                OR: [
                    { clerkId },
                    { email }
                ]
            }
        });

        if (existingUser) {
            throw new Error("User with this Clerk ID or email already exists.");
        }

        const user = await db.user.create({
            data: {
                clerkId,
                email,
                username,
            },
        });

        return user;
    } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            console.error("Prisma error while creating user:", error.message);
        } else {
            console.error("Unexpected error while creating user:", error);
        }
        throw new Error("Failed to create user. Please try again.");
    }
}
