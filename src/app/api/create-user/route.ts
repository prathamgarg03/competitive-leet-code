import {NextApiRequest} from "next";

export async function POST(req: NextApiRequest) {
    const { type, data } = req.body;
    if(type === "user-created") {
        console.log("User created", data);
    }
}