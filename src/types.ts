export type QuestionInput = {
    question: string
    input: string[]
    output: string[]
    difficulty: 'EASY' | 'MEDIUM' | 'HARD'
}

export type QuizInput = {
    title: string
    questions: QuestionInput[]
}

export type Friends = {
    id: string
    username: string
}