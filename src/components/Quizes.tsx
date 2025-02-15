"use client"

import { useEffect, useState } from 'react';
import { getQuizzes } from '@/actions/quiz-actions';

interface Quiz {
    id: string;
    title: string;
}

export function QuizListPage() {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);

    useEffect(() => {
        async function fetchQuizzes() {
            const response = await getQuizzes();
            if (response.success && response.quizzes) {
                setQuizzes(response.quizzes);
            }
        }
        fetchQuizzes();
    }, []);

    return (
        <div>
            <h1>Available Quizzes</h1>
            {quizzes.length > 0 ? (
                <ul>
                    {quizzes.map((quiz) => (
                        <li key={quiz.id}>{quiz.title}</li>
                    ))}
                </ul>
            ) : (
                <p>No quizzes found</p>
            )}
        </div>
    );
}
