import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const pathSegments = url.pathname.split("/"); // This splits the path into segments
        const labelId = pathSegments[pathSegments.length - 1]; // Gets the last segment, which should be the ID

        // Fetch the label
        const label = await prisma.label.findUnique({
            where: {
                id: labelId,
            },
            include: {
                topics: true // Include the associated topics
            }
        });

        return new Response(JSON.stringify(label), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });

    } catch (e) {
        console.error("Error fetching label: ", e);
        return new Response(JSON.stringify({ error: "Unable to fetch label" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}

export async function DELETE(request: Request) {
    try {
        const url = new URL(request.url);
        const pathSegments = url.pathname.split("/"); // This splits the path into segments
        const labelId = pathSegments[pathSegments.length - 1]; // Gets the last segment, which should be the ID

        const deleteLabel = await prisma.label.delete({
            where: {
                id: labelId,
            },
        });

        return new Response(JSON.stringify(deleteLabel), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
        } catch (e) {
            console.error("Error deleting label: ", e);
            return new Response(JSON.stringify({ error: "Unable to delete label" }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
            });
        }
    }


export async function PUT(request: Request) {
    try{
        const url = new URL(request.url);
        const pathSegments = url.pathname.split("/"); // This splits the path into segments
        const labelId = pathSegments[pathSegments.length - 1]; // Gets the last segment, which should be the ID
        const { title } = await request.json();

        const updateLabel = await prisma.label.update({
            where: {
                id: labelId,
            },
            data: {
                title: title,
            },
        });

        return new Response(JSON.stringify(updateLabel), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (e) {
        console.error("Error updating label: ", e);
        return new Response(JSON.stringify({ error: "Unable to update label" }), {
        status: 500,
        headers: {
            "Content-Type": "application/json",
        },
        });
    }
}