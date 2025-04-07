type Message = {
    type: string
    message: any
}

const userMessages = new Map<string, Message[]>()

export function pushMessage(userId: string, type: string, message: any) {
    const existing = userMessages.get(userId) || []
    userMessages.set(userId, [...existing, { type, message }])
}

export function pullMessages(userId: string): Message[] {
    const messages = userMessages.get(userId) || []
    userMessages.delete(userId) // clear after sending
    return messages
}