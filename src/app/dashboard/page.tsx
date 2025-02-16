'use client'

import {QuizListPage} from "@/components/Quizes";
import {GetFriendRequestsFromId, GetFriendsFromId} from "@/lib/friends";
import {useUser} from "@clerk/nextjs";
import {useState} from "react";
import {Friends} from "@/types";
import {Button} from "@/components/ui/button";
import {AcceptFriendRequest, SendFriendRequest} from "@/actions/friend-request";
import {Input} from "@/components/ui/input";

export default function DashboardPage() {
    const [friends, setFriends] = useState<Friends []>([])
    const [receiver, setReceiver] = useState<string>("")
    const [friendRequest, setFriendRequest] = useState<Friends []>()

    const {user} = useUser()
    const getFriends = async () => {
        console.log("Hello World")

        const friends = await GetFriendsFromId(user?.id || "")

        if(friends) {
            setFriends(friends)
        } else {
            setFriends([])
        }
    }

    const getFriendRequests = async () => {
        const friendRequests = await GetFriendRequestsFromId(user?.id || "")
        if(friendRequests) {
            setFriendRequest(friendRequests)
        } else {
            setFriendRequest([])
        }
    }


    const sendFriendRequest = async () => {
        if (!user?.id || !receiver) {
            alert("Sender or receiver is missing");
            return;
        }

        try {
            const friendRequest = await SendFriendRequest(user.id, receiver);
            if (friendRequest) {
                alert("Friend request sent");
            } else {
                alert("Failed to send friend request");
            }
        } catch (error) {
            console.error("Failed to send friend request:", error);
            alert("An error occurred while sending friend request");
        }
    };


    const acceptRequest = (id: string) => async () => {
        if (!user?.id) {
            alert("User ID is missing");
            return;
        }

        try {
            const friendRequest = await AcceptFriendRequest(id, user.id);
            if (friendRequest) {
                alert("Friend request accepted");
            } else {
                alert("Failed to accept friend request");
            }
        } catch (error) {
            console.error("Failed to accept friend request:", error);
            alert("An error occurred while accepting friend request");
        }
    };




    return (
        <div>
            Dashboard Page

            <Button onClick={getFriends}>Get Friends</Button>
            {friends.map(friend => {
                    return (
                        <div key={friend.id}>
                            {friend.username}
                        </div>
                    )
                }
            )}

            <Button onClick={getFriendRequests}>Get Friend Requests</Button>
            {friendRequest?.map(friend => {
                    return (
                        <div key={friend.id}>
                            {friend.username}
                            <Button
                                onClick={acceptRequest(friend.id)}
                            >
                                Accept Request
                            </Button>
                        </div>
                    )
                }
            )}

            <Input
                type="email"
                value={receiver}
                onChange={(e) => setReceiver(e.target.value)}
                placeholder="Enter reciever email"
                required
            >
            </Input>
            <Button onClick={sendFriendRequest}>Send Friend Request</Button>

            <QuizListPage/>
        </div>
    );
}