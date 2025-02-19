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
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {Bell, Search, Users, MessageCircle, CheckCircle2, XCircle} from "lucide-react";
import { Friends } from "@/types";
import {GetFriendRequestsFromId, GetFriendsFromId} from "@/lib/friends";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {AcceptFriendRequest, SendFriendRequest} from "@/actions/friend-request";
import {FriendRequest} from "@prisma/client";
import {Input} from "@/components/ui/input";

// Define interfaces
interface AlertState {
    show: boolean;
    message: string;
    type: 'success' | 'error';
}

interface FriendsCardProps {
    userId: string;
}

const menuItems = [
    { title: "Friends", icon: <Users className="w-4 h-4" /> },
    { title: "Friend Requests", icon: <Bell className="w-4 h-4" /> },
    { title: "Find Friends", icon: <Search className="w-4 h-4" /> },
];


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

const FriendCard = ({ friend }: { friend: Friends }) => (
    <Card className="p-4 min-w-0">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 min-w-0">
                <Avatar className="h-10 w-10 flex-shrink-0">
                    <AvatarImage src="" alt={friend.username} />
                    <AvatarFallback>{friend.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                    <h3 className="font-medium truncate">{friend.username}</h3>
                </div>
            </div>
            <div className="flex space-x-2 flex-shrink-0">
                <Button size="sm" variant="ghost">
                    <MessageCircle className="w-4 h-4 mr-2"/>
                    Message
                </Button>
            </div>
        </div>
    </Card>
);
const RequestCard = ({ request, onAccept }: { request: Friends; onAccept: (id: string) => Promise<void> }) => (
    <Card className="p-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                    <AvatarImage src="" alt={request.username} />
                    <AvatarFallback>{request.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                    <h3 className="font-medium">{request.username}</h3>
                </div>
            </div>
            <div className="flex space-x-2">
                <Button
                    size="sm"
                    variant="default"
                    onClick={() => onAccept(request.id)}
                >
                    Accept Request
                </Button>
            </div>
        </div>
    </Card>
);

export const FriendsCard = ({ userId }: FriendsCardProps) => {
    const [selectedMenu, setSelectedMenu] = useState<string>("Friends");
    const [alert, setAlert] = useState<AlertState>({
        show: false,
        message: '',
        type: 'success'
    });

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

    const showAlert = (message: string, type: 'success' | 'error') => {
        setAlert({ show: true, message, type });
        setTimeout(() => {
            setAlert(prev => ({ ...prev, show: false }));
        }, 3000);
    };

    const loadData = async () => {
        await Promise.all([
            getFriends(),
            getRequests()
        ]);
    };

    const getFriends = async () => {
        setFriendLoading(true);
        try {
            const fetchedFriends = await GetFriendsFromId(userId);
            setFriends(fetchedFriends);
        } catch (err) {
            setFriendError("Failed to load friends.");
            showAlert('Failed to load friends', 'error');
        } finally {
            setFriendLoading(false);
        }
    };

    const getRequests = async () => {
        setRequestLoading(true);
        try {
            const fetchedRequests = await GetFriendRequestsFromId(userId);
            setRequests(fetchedRequests);
        } catch (err) {
            setRequestError("Failed to load friend requests.");
            showAlert('Failed to load friend requests', 'error');
        } finally {
            setRequestLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, [userId]);

    const sendFriendRequest = async () => {
        if (!friendEmail) {
            showAlert('Please enter an email address', 'error');
            return;
        }

        setSendRequestLoading(true);
        try {
            const friendRequest = await SendFriendRequest(userId, friendEmail);
            setSendRequest(friendRequest);
            showAlert('Friend request sent successfully', 'success');
            setFriendEmail('');
        } catch (err) {
            setSendRequestError("Failed to send friend request.");
            showAlert('Failed to send friend request', 'error');
        } finally {
            setSendRequestLoading(false);
        }
    };

    const acceptRequest = async (id: string) => {
        try {
            const friendRequest = await AcceptFriendRequest(id, userId);
            if(friendRequest) {
                showAlert('Friend request accepted successfully', 'success');
                await loadData();
            } else {
                showAlert('Error accepting friend request', 'error');
            }
        } catch (error) {
            showAlert('Failed to accept friend request', 'error');
        }
    };

    const renderContent = () => {
        return (
            <div className="h-full flex flex-col ">
                {alert.show && (
                    <Alert variant={alert.type === 'success' ? "default" : "destructive"} className="mb-4">
                        {alert.type === 'success' ? (
                            <CheckCircle2 className="h-4 w-4" />
                        ) : (
                            <XCircle className="h-4 w-4" />
                        )}
                        <AlertTitle>
                            {alert.type === 'success' ? 'Success' : 'Error'}
                        </AlertTitle>
                        <AlertDescription>
                            {alert.message}
                        </AlertDescription>
                    </Alert>
                )}

                {(() => {
                    switch (selectedMenu) {
                        case "Friends":
                            if (friendLoading) {
                                return <LoadingState />;
                            }
                            return (
                                <div className="flex flex-col h-full p-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-semibold">Friends</h2>
                                        <Badge variant="secondary">
                                            {friends.length} {friends.length === 1 ? 'friend' : 'friends'}
                                        </Badge>
                                    </div>
                                    <ScrollArea className="flex-1">
                                        <div className="space-y-3 pr-4">
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
                            return (
                                <div className="flex flex-col h-full p-4">
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-xl font-semibold">Friend Requests</h2>
                                        <Badge variant="secondary">
                                            {requests.length} {requests.length === 1 ? 'request' : 'requests'}
                                        </Badge>
                                    </div>
                                    <ScrollArea className="flex-1">
                                        <div className="space-y-3 pr-4">
                                            {requests.length > 0 ? (
                                                requests.map((request) => (
                                                    <RequestCard
                                                        key={request.id}
                                                        request={request}
                                                        onAccept={acceptRequest}
                                                    />
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
                                <div className="space-y-4 p-4">
                                    <div className="flex justify-between items-center">
                                        <h2 className="text-xl font-semibold">Find Friends</h2>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <Input
                                            type="email"
                                            placeholder="Enter email"
                                            className="w-full"
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
                })()}
            </div>
        );
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
                <DialogContent className="p-0 h-[450px] sm:max-w-[600px]">
                    <DialogTitle className="sr-only">Friends</DialogTitle>
                    <DialogDescription className="sr-only">
                        Manage your friends and connections
                    </DialogDescription>
                    <DialogHeader>
                        <SidebarProvider>
                            <div className="flex h-[450px]">
                                <Sidebar collapsible="none" className="w-48 border-r">
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
                                <main className="flex-1 p-6 bg-white overflow-hidden">
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