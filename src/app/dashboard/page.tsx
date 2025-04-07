'use client'

import { Button } from '@/components/ui/button'
import { useCallback, useEffect, useState } from 'react'
import { useUser } from '@clerk/nextjs'
import { Friends } from '@/types'
import { GetFriendRequestsFromId, GetFriendsFromId } from '@/lib/friends'
import FriendshipDialog from '@/components/Friendship-Dialog'
import { RegisterUser } from '@/actions/socket'
import {pollMessages} from "@/actions/socket-message";
import { GetUsernameFromClerkId } from '@/lib/user'

export default function DashboardPage() {
    const [quizzes, setQuizzes] = useState<{ id: string; title: string }[]>([])
    const [selectedQuizId, setSelectedQuizId] = useState<string>('')
    const [quizSelected, setQuizSelected] = useState<boolean>(false)

    const [friends, setFriends] = useState<Friends[]>([])
    const [requests, setRequests] = useState<Friends[]>([])
    const [lastUpdateTime, setLastUpdateTime] = useState<number>(Date.now())

    const [msg, setMsg] = useState("")
    const [invUser, setInvUser] = useState("")

    const { user } = useUser()
    const userId = user?.id

    useEffect(() => {
        if (userId) {
            const register = async () => {
                try {
                    const res = await RegisterUser(userId)
                    console.log("User registered:", res)
                } catch (err) {
                    console.error("Error registering user:", err)
                }
            }
    
            register()
        }
    }, [userId])

    useEffect(() => {
        const fetchQuizzes = async () => {
            const fetchedQuizzes = [
                { id: 'quiz1', title: 'Math Quiz' },
                { id: 'quiz2', title: 'Science Quiz' },
                { id: 'quiz3', title: 'History Quiz' },
            ]
            setQuizzes(fetchedQuizzes)
        }
        fetchQuizzes()
    }, [])

    useEffect(() => {
        if (!userId) return

        const interval = setInterval(async () => {

            console.log("Polling ...")
            const messages = await pollMessages(userId)

            console.log({messages})

            if (messages && messages.length > 0) {
                for (const msg of messages) {
                    console.log(`🔔 [${msg.type}]`, msg.message)
                    
                    setMsg(`Invitation received from: ${msg.message.from}`)
                }
            }
        }, 3000)

        return () => clearInterval(interval)
    }, [userId])

    const getFriends = useCallback(async () => {
        try {
            const fetchedFriends = await GetFriendsFromId(userId || '')
            setFriends(fetchedFriends)
        } catch (err) {
            console.error(err)
        }
    }, [userId])

    const getRequests = useCallback(async () => {
        try {
            const fetchedRequests = await GetFriendRequestsFromId(userId || '')
            setRequests(fetchedRequests)
        } catch (err) {
            console.error(err)
        }
    }, [userId])

    const refreshData = useCallback(() => {
        setLastUpdateTime(Date.now())
    }, [])

    useEffect(() => {
        getFriends()
        getRequests()

        //Fix Later

        const intervalId = setInterval(() => {
            getFriends()
            getRequests()
        }, 30000)

        return () => clearInterval(intervalId)
    }, [getFriends, getRequests, lastUpdateTime])

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

            <div>
                <FriendshipDialog
                    friendsList={friends}
                    requestsList={requests}
                    onUpdate={refreshData}
                />
            </div>

            <div>
                {userId &&
                    <h1 className="text-xl">User Id:{userId}</h1>
                }
            </div>

            {/* <div>
                {status}
            </div> */}

            <div>
                {msg}
            </div>

        </div>
    )
}