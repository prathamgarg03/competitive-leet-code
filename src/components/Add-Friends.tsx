"use client"

import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {useState} from "react"

export function AddFriends () {
    const [friendEmail, setFriendEmail] = useState("")

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
                        >
                            Send Request
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}