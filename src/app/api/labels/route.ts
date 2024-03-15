import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { topicId, label } = await request.json();

        if(!topicId || !label) {
            return new Response(
                JSON.stringify({ error: "All fields are required" }),
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );
        }

        const newLabel = await prisma.addLabel.create({
            data: {
                title: label,
                topicId: topicId,
            },
        });

        return new Response(JSON.stringify(newLabel), {
            status: 201,
            headers: {
                "Content-Type": "application/json",
            },
        })

        } catch (e) {
            console.error(e);
            return new Response(JSON.stringify({ error: "Unable to create label" }), {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            });
        }
}


export async function GET(request: Request) {
    const url = new URL(request.url);
    const topicId = url.searchParams.get("topicId");

    if (!topicId) {
        return new Response(
            JSON.stringify({ error: "topicId query parameter is required" }),
            {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
    }

    try {
        const labels = await prisma.addLabel.findMany({
            where: {
                topicId: topicId,
            },
        });

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
