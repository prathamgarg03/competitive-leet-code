import { Friends } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import {useState} from "react";
import {useUser} from "@clerk/nextjs";
import {AcceptFriendRequest} from "@/actions/friend-request";
import {SuccessMessage} from "@/components/Success-Message";
import {ErrorMessage} from "@/components/Error-Message";

interface RequestsListProps {
    requests: Friends[]
    onUpdate: () => void
}

export function RequestsList({ requests, onUpdate }: RequestsListProps) {
    const [processingRequest, setProcessingRequest] = useState<string>("")
    const {user} = useUser()

    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const acceptRequest = async (requestId: string) => {
        try {
            setProcessingRequest(requestId)
            const request = await AcceptFriendRequest(requestId, user?.id || "")
            console.log(request)
            setSuccessMessage("Friend request accepted")
            onUpdate()
        } catch (error) {
            console.error('Failed to process request:', error)
            setErrorMessage("Failed to accept friend request")
        } finally {
            setProcessingRequest("")
        }
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="w-[400px]">
                <div className="text-center mb-6">
                    <h1 className="text-xl font-bold text-gray-800">Friend Requests</h1>
                    <p className="text-gray-500">Review and accept your friend requests</p>
                </div>

                <div>
                    {requests.length === 0 ? (
                        <div className="text-center text-gray-500 text-lg">No friend requests</div>
                    ) : (
                        <div className="flex flex-col gap-1 mt-3">
                            {requests.map((request, index) => (
                                <Card
                                    key={index}
                                    className="bg-white border-none shadow-none rounded-lg p-4 flex justify-between items-center"
                                >
                                <span className="font-semibold text-gray-700 text-xl">
                                    {`${index + 1}. ${request.username}`}
                                </span>
                                    <Button
                                        variant="ghost"
                                        className="text-green-600 hover:text-green-800"
                                        disabled={processingRequest === request.id}
                                        onClick={() => {acceptRequest(request.id)}}
                                    >
                                        <Check className="w-5 h-5"/>
                                    </Button>
                                </Card>
                            ))}
                            <SuccessMessage message={successMessage}/>
                            <ErrorMessage message={errorMessage}/>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
