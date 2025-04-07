"use client"

import { Friends } from "@/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {Card} from "@/components/ui/card"
import {Button} from "@/components/ui/button"
import {Plus, X} from "lucide-react"
import {SuccessMessage} from "@/components/Success-Message"
import {ErrorMessage} from "@/components/Error-Message"
// import {Socket} from "socket.io-client"
// import {useUser} from "@clerk/nextjs"

interface FriendsListProps {
    friends: Friends[]
    onUpdate: () => void
    // socketRef: Socket | null
}

export function FriendsList({ friends, onUpdate }: FriendsListProps) {
    // const {user} = useUser()
    // const userId = user?.id
    const removeFriend = async (friendId: string) => {
        console.log('Removing friend:', friendId)
        onUpdate()
    }

    const inviteFriend = async (friendId: string) => {
        console.log('Inviting friend:', friendId)
        // if (userId && friendId && socketRef) {
        //     socketRef.emit("inviteFriend", { recipientId: friendId, senderId: userId })
        //     console.log('Invited friend:', friendId)
        // }
    }

    return (
        <div className="flex justify-center items-center">
            <Tabs defaultValue="online" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="online">All Friends</TabsTrigger>
                    <TabsTrigger value="recents">Recents</TabsTrigger>
                </TabsList>
                <TabsContent value="online">
                    <div className="flex flex-col gap-1 mt-3">
                        {friends.map((friend, index) => (
                            <Card
                                key={index}
                                className="border-none shadow-none bg-white rounded-lg p-4 flex justify-between items-center"
                            >
                                <span className="font-semibold text-gray-600 text-xl">
                                    {`${index + 1}. `}
                                    {friend.username}
                                </span>
                                <div>
                                    <Button
                                        variant="ghost"
                                        className="text-green-600 hover:text-green-800"
                                        onClick={() => inviteFriend(friend.clerkId)}
                                    >
                                        <Plus className="w-5 h-5" />
                                        Invite
                                    </Button>

                                    <Button
                                        variant="ghost"
                                        className="text-red-600 hover:text-red-800"
                                        onClick={() => removeFriend(friend.id)}
                                    >
                                        <X className="w-5 h-5" />
                                    </Button>
                                </div>
                            </Card>
                        ))}
                        <SuccessMessage message={"successMessage"} />
                        <ErrorMessage message={"errorMessage"} />
                    </div>
                </TabsContent>
                <TabsContent value="recents">
                    <div>
                        Recent Friends
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
