import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const {labelId, topicId} = await request.json();

        if(!labelId || !topicId) {
            return new Response(
                JSON.stringify({ error: "Both labelId and topicId are required" }), 
            {
                status: 400,
                headers: {
                    "Content-Type": "application/json",
                },
            },
            );
        }

        const updatedLabel = await prisma.topic.update({
            where: {
                id: topicId,
            },
            data: {
                labelId: labelId,
            },
        });

        return new Response(JSON.stringify(updatedLabel), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (e) {
        console.error("Error in addLabel: ", e);
        return new Response(
            JSON.stringify({ error: "Unable to add label to topic" }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
    }
}