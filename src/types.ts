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
    clerkId: string
}

export type QuizSession = {
    id: string
    quizId: string
    participants: {
        userId: string
        username: string
        connected: boolean
        progress: number
        solutions: Record<string, {
            code: string
            status: 'pending' | 'running' | 'completed' | 'error'
            result?: {
                success: boolean
                runtime: number
                memory: number
                testCasesPassed: number
                totalTestCases: number
            }
        }>
    }[]
    startTime: Date
    endTime?: Date
    status: 'waiting' | 'in-progress' | 'completed'
}