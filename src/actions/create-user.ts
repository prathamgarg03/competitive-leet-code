import { db } from "@/lib/db"

type CreateUserProps = {
    clerkId: string;
    username: string;
    email: string;
}

export const CreateUser = async ({
     clerkId,
     username,
     email
 }: CreateUserProps) => {
    try {
        const user = await db.user.create({
            data: {
                clerkId,
                username,
                email,
            }
        });

        return user;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};