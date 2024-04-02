import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const url = new URL(request.url);
    const labelId = url.searchParams.get("labelId");

    if (!labelId) {
        return new Response(JSON.stringify({ error: "Topic ID is missing" }), {
            status: 400,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    try {
        const labels = await prisma.topic.findMany({
            where: {
                labelId: labelId
            }
        })
        return new Response(JSON.stringify(labels), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({ error: "Unable to fetch labels" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
