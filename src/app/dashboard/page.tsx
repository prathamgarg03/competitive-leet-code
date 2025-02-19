'use client'

import {Button} from "@/components/ui/button"
import {useEffect, useState} from "react"
import {FriendsCard} from "@/components/friends-card"
import {useUser} from "@clerk/nextjs"
import {Friends} from "@/types";
import {GetFriendRequestsFromId, GetFriendsFromId} from "@/lib/friends";
import FriendshipDialog from "@/components/Friendship-Dialog";

export default function DashboardPage() {
    const [quizzes, setQuizzes] = useState<{ id: string, title: string }[]>([])
    const [selectedQuizId, setSelectedQuizId] = useState<string>("")
    const [quizSelected, setQuizSelected] = useState<boolean>(false)

    const [friends, setFriends] = useState<Friends[]>([])
    const [requests, setRequests] = useState<Friends[]>([])

    const {user} = useUser()
    const userId = user?.id || ""

    useEffect(() => {
        const fetchQuizzes = async () => {
            const fetchedQuizzes = [
                { id: "quiz1", title: "Math Quiz" },
                { id: "quiz2", title: "Science Quiz" },
                { id: "quiz3", title: "History Quiz" }
            ]
            setQuizzes(fetchedQuizzes)
        }
        fetchQuizzes()
    }, [])

    useEffect(() => {
        getFriends()
    }, [friends])

    const getFriends = async () => {
        try {
            const fetchedFriends = await GetFriendsFromId(userId);
            setFriends(fetchedFriends);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getRequests()
    }, [requests])

    const getRequests = async () => {
        try {
            const fetchedRequests = await GetFriendRequestsFromId(userId)
            setRequests(fetchedRequests)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="">
            <div className="my-auto">
                <div className="left-4 bg-gray-200 p-6 rounded-lg shadow-lg w-80 h-80 flex flex-col items-center">
                    <p className="text-lg text-gray-600 mb-4 font-semibold">Choose a Quiz:</p>
                    <select
                        className="w-full p-3 text-black bg-white border border-gray-300 rounded-lg text-lg"
                        value={selectedQuizId}
                        onChange={(e) => {
                            setSelectedQuizId(e.target.value)
                            setQuizSelected(!!e.target.value)
                        }}
                    >
                        <option value="">Select a quiz</option>
                        {quizzes.map((quiz) => (
                            <option key={quiz.id} value={quiz.id}>{quiz.title}</option>
                        ))}
                    </select>
                    <Button
                        className="mt-4 w-full p-3 bg-blue-600 text-white rounded-lg disabled:bg-gray-400"
                        disabled={!quizSelected}
                    >
                        Start Playing
                    </Button>
                </div>
            </div>

            <h1>Friends List</h1>
            {friends.map((friend) => {
                return (
                    <li key={friend.id}>
                        <ul>
                            {friend.username}
                        </ul>
                    </li>
                )
            })}

            <h1>Requests List</h1>
            {requests.map((request) => {
                return (
                    <li key={request.id}>
                        <ul>
                            {request.username}
                        </ul>
                    </li>

                )
            })}


            <div>
                <FriendshipDialog
                    friendsList={friends}
                />
            </div>
        </div>
    )
}