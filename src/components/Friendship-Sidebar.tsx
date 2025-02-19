import {Bell, Search, UserCog, Users} from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu, SidebarMenuButton, SidebarMenuItem,
} from "@/components/ui/sidebar"

const menuItems = [
    { title: "My Friends", icon: <Users className="w-5 h-5" /> },
    { title: "Friend Requests", icon: <Bell className="w-5 h-5" /> },
    { title: "Find Friends", icon: <Search className="w-5 h-5" /> },
    { title: "Settings", icon: <UserCog className="w-5 h-5"/>}
]

interface FriendshipSidebarProps {
    onClick: (menuTitle: string) => void
}

export function FriendshipSidebar({ onClick }: FriendshipSidebarProps) {

    return (
        <Sidebar
            className="hidden md:flex"
        >
            <SidebarHeader>
                Manage Friends
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarMenu>
                        {menuItems.map((item, index) => (
                            <SidebarMenuItem
                                key={index}
                            >
                                <SidebarMenuButton
                                    size="lg"
                                    className="text-lg"
                                    onClick ={() => onClick(item.title)}
                                >
                                    {item.icon}
                                    {item.title}
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
