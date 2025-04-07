"use client"

import { useState } from "react"
import { Friends } from "@/types"
import { SidebarProvider } from "@/components/ui/sidebar"
import { FriendshipSidebar } from "@/components/Friendship-Sidebar"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FriendsList } from "@/components/Friends-List"
import { RequestsList } from "@/components/Requests-List"
import { AddFriends } from "@/components/Add-Friends"
// import {Socket} from "socket.io-client"

interface FriendshipDialogProps {
    friendsList: Friends[]
    requestsList: Friends[]
    onUpdate: () => void
    // socketRef: Socket | null
}

export default function FriendshipDialog({ friendsList, requestsList, onUpdate }: FriendshipDialogProps) {
    const [menu, setMenu] = useState("My Friends")

    const onClick = (menuTitle: string) => {
        setMenu(menuTitle)
    }

    const renderContent = () => {
        return (
            <div>
                <div className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    Friends
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block"/>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>{menu}</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </div>
                <div>
                    {(() => {
                        switch (menu) {
                            case "My Friends":
                                return <FriendsList
                                    friends={friendsList}
                                    onUpdate={onUpdate}
                                    // socketRef={socketRef}
                                />
                            case "Friend Requests":
                                return <RequestsList
                                    requests={requestsList}
                                    onUpdate={onUpdate}
                                />
                            case "Find Friends":
                                return <AddFriends
                                    onUpdate={onUpdate}
                                />
                            case "Settings":
                                return <div>{menu} List</div>
                            default:
                                return <div>Friends List</div>
                        }
                    })()}
                </div>
            </div>
        )
    }

    return (
        <div>
            <Dialog>
                <DialogTrigger>Open</DialogTrigger>
                <DialogContent className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]">
                    <DialogHeader>
                        <DialogTitle className="sr-only">Manage Friends</DialogTitle>
                        <DialogDescription className="sr-only">
                            Add or remove friends
                        </DialogDescription>
                    </DialogHeader>
                    <SidebarProvider className="items-start">
                        <FriendshipSidebar onClick={onClick}/>
                        <ScrollArea className="flex h-[480px] flex-1 flex-col">
                            {renderContent()}
                        </ScrollArea>
                    </SidebarProvider>
                </DialogContent>
            </Dialog>
        </div>
    )
}