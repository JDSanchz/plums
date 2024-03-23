import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { title } = await request.json(); 

        if (!title) {
            return new Response(
                JSON.stringify({ error: "Title is required" }), 
                {
                    status: 400,
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );
        }

        // Create the new label using Prisma
        const newLabel = await prisma.label.create({
            data: {
                title: title,
            },
        })

        return new Response(JSON.stringify(newLabel), {
            status: 201,
            headers: {
                "Content-Type": "application/json",
            },
        });
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


// FUNCTION TO GET ALL LABELS
export async function GET(request: Request) {
    try {
        const labels = await prisma.label.findMany();
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
