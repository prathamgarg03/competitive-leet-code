"use server"

export async function GetSubmission(token: string) {
    const apiEndpoint = `https://judge0-ce.p.rapidapi.com/submissions/${token}?base64_encoded=false`;
    const headers = {
        'x-rapidapi-key': process.env.RAPID_API_KEY as string,
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
    };
    try {
        const response = await fetch(apiEndpoint, {
            method: 'GET',
            headers: headers,
        });
        const data = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error('Error getting submission:', error);
        throw error;
    }
}