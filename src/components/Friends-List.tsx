import { Friends } from "@/types"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Plus, X} from "lucide-react";

interface FriendsListProps {
    friends: Friends[]
    onUpdate: () => void
}

export function FriendsList({ friends, onUpdate }: FriendsListProps) {

    const removeFriend = async (friendId: string) => {
        console.log('Removing friend:', friendId)
        onUpdate()
    }

    return (
        <div className="flex justify-center items-center">
            <Tabs defaultValue="online" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="online">Online</TabsTrigger>
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
                                    <Button variant="ghost" className="text-green-600 hover:text-green-800">
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
