
export const RegisterUser = async (userId: String) => {
    const res = await fetch('http://localhost:30001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userId })
    })

    return res
}

export const InvitationRequest = async (from: string, to: string) => {
    const res = await fetch('http://localhost:30001/invitation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, to})
    })

    return res
}