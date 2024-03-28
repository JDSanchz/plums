import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
    try {
        const url = new URL(request.url);
        const pathSegments = url.pathname.split("/"); // This splits the path into segments
        const fileId = pathSegments[pathSegments.length - 1]; // Gets the last segment, which should be the ID
    
        // Perform the deletion
        const deleteFile = await prisma.fileUpload.delete({
        where: {
            id: fileId,
        },
        });
    
        // Return success response
        return new Response(JSON.stringify(deleteFile), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
        });
    } catch (e) {
        console.error("Error deleting file: ", e);
        return new Response(JSON.stringify({ error: "Unable to delete file" }), {
        status: 500,
        headers: {
            "Content-Type": "application/json",
        },
        });
    }
}

export async function PUT(request: Request) {
    try {
        const url = new URL(request.url);
        const pathSegments = url.pathname.split("/"); // This splits the path into segments
        const fileId = pathSegments[pathSegments.length - 1]; // Gets the last segment, which should be the ID
        const { title } = await request.json();
    
        // Perform the update
        const updateFile = await prisma.fileUpload.update({
        where: {
            id: fileId,
        },
        data: {
            title: title,
        },
        });
    
        // Return success response
        return new Response(JSON.stringify(updateFile), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
        });
    } catch (e) {
        console.error("Error updating file: ", e);
        return new Response(JSON.stringify({ error: "Unable to update file" }), {
        status: 500,
        headers: {
            "Content-Type": "application/json",
        },
        });
    }
}