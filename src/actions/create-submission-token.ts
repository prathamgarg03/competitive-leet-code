"use server"

export async function CreateSubmissionToken(sourceCode: string, output: string) {
    console.log(process.env.RAPID_API_KEY)
    const apiEndpoint = 'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=false';
    const headers = {
        'x-rapidapi-key': process.env.RAPID_API_KEY as string,
        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
        'Content-Type': 'application/json',
    };
    const body = {
        language_id: 71,
        source_code: sourceCode,
        expected_output: output,
    };

    try {
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(body),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating token:', error);
        throw error;
    }
}
