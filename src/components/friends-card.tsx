import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider,
} from "@/components/ui/sidebar";
import {Bell, CircleFadingPlus, Search, Users, UserCircle, Mail, MessageCircle, Plus, CirclePlus} from "lucide-react";
import { Friends } from "@/types";
import {GetFriendRequestsFromId, GetFriendsFromId} from "@/lib/friends";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {AcceptFriendRequest, SendFriendRequest} from "@/actions/friend-request";
import {FriendRequest} from "@prisma/client";
import {Input} from "@/components/ui/input";

const menuItems = [
    { title: "Friends", icon: <Users className="w-4 h-4" /> },
    { title: "Friend Requests", icon: <Bell className="w-4 h-4" /> },
    { title: "Find Friends", icon: <Search className="w-4 h-4" /> },
];

interface FriendsCardProps {
    userId: string;
}

export const FriendsCard = ({ userId }: FriendsCardProps) => {
    const [selectedMenu, setSelectedMenu] = useState<string>("Friends");

    const [friends, setFriends] = useState<Friends[]>([]);
    const [friendLoading, setFriendLoading] = useState<boolean>(true);
    const [friendError, setFriendError] = useState<string | null>(null);

    const [requests, setRequests] = useState<Friends[]>([]);
    const [requestLoading, setRequestLoading] = useState<boolean>(true);
    const [requestError, setRequestError] = useState<string | null>(null);

    const [friendEmail, setFriendEmail] = useState<string>("");
    const [sendRequest, setSendRequest] = useState<FriendRequest>();
    const [sendRequestLoading, setSendRequestLoading] = useState<boolean>(false);
    const [sendRequestError, setSendRequestError] = useState<string | null>(null);


    useEffect(() => {
        const getFriends = async () => {
            setFriendLoading(true);
            try {
                const fetchedFriends = await GetFriendsFromId(userId);
                console.log({fetchedFriends})
                setFriends(fetchedFriends);
            } catch (err) {
                setFriendError("Failed to load friends.");
            } finally {
                setFriendLoading(false);
            }
        };
        const getRequests = async () => {
            setRequestLoading(true);
            try {
                const fetchedRequests = await GetFriendRequestsFromId(userId);
                console.log({fetchedRequests})
                setRequests(fetchedRequests);
            } catch (err) {
                setRequestError("Failed to load friend requests.");
            } finally {
                setRequestLoading(false);
            }
        }
        getFriends();
        getRequests();

    }, [userId]);

    const sendFriendRequest = async () => {
        setSendRequestLoading(true);
        try {
            const friendRequest = await SendFriendRequest(userId, friendEmail)
            setSendRequest(friendRequest);
        } catch (err) {
            setSendRequestError("Failed to send friend request.");
        } finally {
            setSendRequestLoading(false);
        }
    }

    const FriendCard = ({ friend }: { friend: Friends }) => (
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div>
                        <h3 className="font-medium">{friend.username}</h3>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <Button size="sm" variant="ghost">
                        <CirclePlus className="w-4 h-4 mr-2"/>
                    </Button>
                </div>
            </div>
    );

    const acceptRequest = async (id: string) => {
        const friendRequest = await AcceptFriendRequest(id, userId)
        if(friendRequest) {
            console.log("Friend request accepted:", friendRequest)
        } else {
            console.log("Error accepting friend request")
        }
    }

    const RequestCard = ({ request }: { request: Friends }) => (
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div>
                        <h3 className="font-medium">{request.username}</h3>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => acceptRequest(request.id)}
                    >
                        Accept Request
                    </Button>
                </div>
            </div>
    );

    const LoadingState = () => (
        <div className="flex flex-col space-y-4">
            {[1, 2, 3].map((i) => (
                <Card key={i} className="p-4">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />
                        <div className="space-y-2 flex-1">
                            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/4" />
                            <div className="h-3 bg-gray-200 rounded animate-pulse w-1/3" />
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );

    const renderContent = () => {
        switch (selectedMenu) {
            case "Friends":
                if (friendLoading) {
                    return <LoadingState />;
                }
                if (friendError) {
                    return (
                        <div className="flex flex-col items-center justify-center h-full">
                            <div className="text-red-500 mb-2">{friendError}</div>
                            <Button onClick={() => window.location.reload()}>
                                Retry
                            </Button>
                        </div>
                    );
                }
                return (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Friends</h2>
                            <Badge variant="secondary">
                                {friends.length} {friends.length === 1 ? 'friend' : 'friends'}
                            </Badge>
                        </div>
                        <ScrollArea className="h-[400px] pr-4">
                            <div className="space-y-3">
                                {friends.length > 0 ? (
                                    friends.map((friend) => (
                                        <FriendCard key={friend.id} friend={friend} />
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <Users className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                        <h3 className="font-medium mb-1">No friends yet</h3>
                                        <p className="text-sm">Start connecting with others!</p>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </div>
                );
            case "Friend Requests":
                if(requestLoading) {
                    return <LoadingState />;
                }
                if(requestError) {
                    return (
                        <div className="flex flex-col items-center justify-center h-full">
                            <div className="text-red-500 mb-2">{requestError}</div>
                            <Button onClick={() => window.location.reload()}>
                                Retry
                            </Button>
                        </div>
                    );
                }
                return (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Friend Requests</h2>
                            <Badge variant="secondary">
                                {requests.length} {requests.length === 1 ? 'request' : 'requests'}
                            </Badge>
                        </div>
                        <ScrollArea className="h-[400px] pr-4">
                            <div className="space-y-3">
                                {requests.length > 0 ? (
                                    requests.map((request) => (
                                        <RequestCard key={request.id} request={request} />
                                    ))
                                ) : (
                                    <div className="text-center py-8 text-gray-500">
                                        <Bell className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                                        <h3 className="font-medium mb-1">No friend requests</h3>
                                        <p className="text-sm">Start connecting with others!</p>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                    </div>
                );
            case "Find Friends":
                return (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">Find Friends</h2>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Input
                                type="email"
                                placeholder="Enter email"
                                className="w-full p-2 border border-gray-300 rounded-lg text-lg"
                                value={friendEmail}
                                onChange={(e) => setFriendEmail(e.target.value)}
                            />
                            <Button
                                onClick={sendFriendRequest}
                                disabled={sendRequestLoading}
                            >
                                Send Request
                            </Button>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Card className="flex flex-row items-center p-3 space-x-2 hover:cursor-pointer hover:bg-gray-50 transition-colors">
                        <Avatar className="h-10 w-10">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Avatar className="h-10 w-10">
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-blue-100 text-blue-600">+</AvatarFallback>
                        </Avatar>
                    </Card>
                </DialogTrigger>
                <DialogContent className="overflow-hidden p-0 md:max-h-[300px] md:max-w-[550px]">
                    <DialogTitle className="sr-only">Friends</DialogTitle>
                    <DialogDescription className="sr-only">
                        Manage your friends and connections
                    </DialogDescription>
                    <DialogHeader>
                        <SidebarProvider>
                            <div className="flex h-[300px]">
                                <Sidebar collapsible="none" className="w-50 border-r">
                                    <SidebarContent>
                                        <SidebarGroup>
                                            <SidebarGroupContent>
                                                <SidebarMenu>
                                                    {menuItems.map((item) => (
                                                        <SidebarMenuItem key={item.title}>
                                                            <SidebarMenuButton
                                                                asChild
                                                                onClick={() => setSelectedMenu(item.title)}
                                                                className={selectedMenu === item.title ? "bg-gray-100" : ""}
                                                            >
                                                                <a href="#" className="flex items-center space-x-3">
                                                                    {item.icon}
                                                                    <span>{item.title}</span>
                                                                </a>
                                                            </SidebarMenuButton>
                                                        </SidebarMenuItem>
                                                    ))}
                                                </SidebarMenu>
                                            </SidebarGroupContent>
                                        </SidebarGroup>
                                    </SidebarContent>
                                </Sidebar>
                                <main className="flex-1 p-6 bg-white">
                                    {renderContent()}
                                </main>
                            </div>
                        </SidebarProvider>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    );
};