import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {SidebarProvider} from "@/components/ui/sidebar"
import {FriendshipSidebar} from "@/components/Friendship-Sidebar"
import { Friends } from "@/types"

interface FriendshipDialogProps {
    friendsList: Friends []
}

export default function FriendshipDialog({
     friendsList
}: FriendshipDialogProps) {
    return (
        <div>
            <Dialog>
                <DialogTrigger>Open</DialogTrigger>
                <DialogContent
                    className="overflow-hidden p-0 md:max-h-[500px] md:max-w-[700px] lg:max-w-[800px]"
                >
                    <DialogHeader>
                        <DialogTitle className="sr-only">
                            Manage Friends
                        </DialogTitle>
                        <DialogDescription className="sr-only">
                            Add or remove friends
                        </DialogDescription>
                    </DialogHeader>
                    <SidebarProvider
                        className="items-start"
                    >
                        <FriendshipSidebar />
                        <main className="flex h-[480px] flex-1 flex-col overflow-hidden">
                            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                                <div className="flex itbems-center gap-2 px-4">
                                    Friends
                                </div>
                            </header>
                            <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
                                {
                                    friendsList.length === 0 && (
                                        <div className="text-center text-lg">
                                            No friends yet
                                        </div>
                                    )

                                }
                                {friendsList.length !== 0 &&
                                    friendsList.map((friend, index) => (
                                    <div
                                        key={index}
                                        className="aspect-video max-w-3xl rounded-xl bg-muted/50"
                                    >
                                        {friend.username}
                                    </div>
                                ))}
                            </div>
                        </main>
                    </SidebarProvider>
                </DialogContent>
            </Dialog>
        </div>
    )
}