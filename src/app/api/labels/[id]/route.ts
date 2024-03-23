import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
