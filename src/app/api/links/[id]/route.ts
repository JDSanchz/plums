import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
  try {
    // Extract the link's ID from the URL path
    const url = new URL(request.url);
    // Assuming the URL is something like /api/links/{id}, extract the ID
    const pathSegments = url.pathname.split("/"); // This splits the path into segments
    const linkId = pathSegments[pathSegments.length - 1]; // Gets the last segment, which should be the ID

    // Perform the deletion
    const deleteLink = await prisma.links.delete({
      where: {
        id: linkId,
      },
    });

    // Return success response
    return new Response(JSON.stringify(deleteLink), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error("Error deleting link: ", e);
    return new Response(JSON.stringify({ error: "Unable to delete link" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
