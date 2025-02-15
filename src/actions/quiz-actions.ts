"use server"

import {db} from '@/lib/db'
import {QuizInput} from '@/types'


export async function createQuiz(quizData: QuizInput) {
    try {
        const quiz = await db.quiz.create({
            data: {
                title: quizData.title,
                questions: {
                    create: quizData.questions.map((question) => ({
                        question: question.question,
                        input: question.input,
                        output: question.output,
                        difficulty: question.difficulty,
                    })),
                },
            },
        })

        return {
            success: true,
            quiz,
        }
    } catch (error) {
        console.error('Error creating quiz:', error)
        return {
            success: false,
            message: 'Failed to create quiz',
        }
    }
}

export async function getQuizzes() {
    try {
        const quizzes = await db.quiz.findMany({
            select: {
                id: true,
                title: true,
                createdAt: true,
            },
        });

        return {
            success: true,
            quizzes,
        };
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        return {
            success: false,
            message: 'Failed to fetch quizzes',
        };
    }
}

export async function getQuestionsByQuizId(quizId: string) {
    try {
        const quiz = await db.quiz.findUnique({
            where: { id: quizId },
            select: {
                title: true,
                questions: {
                    select: {
                        id: true,
                        question: true,
                        input: true,
                        output: true,
                        difficulty: true,
                    },
                },
            },
        });

        if (!quiz) {
            return {
                success: false,
                message: 'Quiz not found',
            };
        }

        return {
            success: true,
            quiz,
        };
    } catch (error) {
        console.error('Error fetching questions:', error);
        return {
            success: false,
            message: 'Failed to fetch questions',
        };
    }
}