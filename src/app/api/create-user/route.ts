import {NextRequest} from "next/server";

export async function GET(req: NextRequest) {
    return Response.json({
        status: 200,
        message: "Hello, world!"
    }, {status: 200})
}