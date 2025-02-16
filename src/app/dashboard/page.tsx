'use client'

import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {FriendsCard} from "@/components/friends-card";
import {useUser} from "@clerk/nextjs";

export default function DashboardPage() {
    const [quizzes, setQuizzes] = useState<{ id: string, title: string }[]>([]);
    const [selectedQuizId, setSelectedQuizId] = useState<string>("");
    const [quizSelected, setQuizSelected] = useState<boolean>(false);
    const {user} = useUser();

    useEffect(() => {
        const fetchQuizzes = async () => {
            const fetchedQuizzes = [
                { id: "quiz1", title: "Math Quiz" },
                { id: "quiz2", title: "Science Quiz" },
                { id: "quiz3", title: "History Quiz" }
            ];
            setQuizzes(fetchedQuizzes);
        };
        fetchQuizzes();
    }, []);

    return (
        <div className="flex flex-row">
            <div className="my-auto">
                <div className="left-4 bg-gray-200 p-6 rounded-lg shadow-lg w-80 h-80 flex flex-col items-center">
                    <p className="text-lg text-gray-600 mb-4 font-semibold">Choose a Quiz:</p>
                    <select
                        className="w-full p-3 text-black bg-white border border-gray-300 rounded-lg text-lg"
                        value={selectedQuizId}
                        onChange={(e) => {
                            setSelectedQuizId(e.target.value);
                            setQuizSelected(!!e.target.value);
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
                <FriendsCard
                    userId = {user?.id || ""}
                />
            </div>
        </div>
    )
}