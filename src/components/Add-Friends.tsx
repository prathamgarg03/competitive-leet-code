"use client"

import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {useState} from "react"
import {SendFriendRequest} from "@/actions/friend-request";
import {useUser} from "@clerk/nextjs";
import {SuccessMessage} from "@/components/Success-Message";
import {ErrorMessage} from "@/components/Error-Message";

interface AddFriendsProps {
    onUpdate: () => void
}

export function AddFriends ({ onUpdate }: AddFriendsProps) {
    const [friendEmail, setFriendEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const {user} = useUser()

    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const sendRequest = async () => {
        if (!friendEmail) return
        try {
            setIsLoading(true)
            const request = await SendFriendRequest(user?.id || "", friendEmail)
            setSuccessMessage("Friend request sent")
            setFriendEmail("")
            onUpdate()
        } catch (e) {
            setErrorMessage("Failed to send friend request")
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="w-[400px]">
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
                            onClick={() => {sendRequest()}}
                            disabled={!friendEmail || isLoading}
                        >
                            Send Request
                        </Button>
                    </div>

                    <SuccessMessage message={successMessage} />
                    <ErrorMessage message={errorMessage} />
                </div>
            </div>
        </div>
    )
}