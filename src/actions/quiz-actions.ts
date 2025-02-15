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
