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

export async function PUT(request: Request) {
  try {
    // Extract the link's ID from the URL path
    const url = new URL(request.url);
    const pathSegments = url.pathname.split("/");
    const linkId = pathSegments[pathSegments.length - 1]; // Gets the last segment, which should be the ID

    // Assuming the request's body contains the updated link data in JSON format
    const body = await request.json();
    const { title, url: linkUrl, desc } = body; // Destructure the updated fields from the request body

    // Perform the update
    const updatedLink = await prisma.links.update({
      where: {
        id: linkId,
      },
      data: {
        title,
        url: linkUrl, // Note: 'url' is renamed to 'linkUrl' to avoid name conflict with 'url' from the request
        desc,
      },
    });

    // Return success response with the updated link
    return new Response(JSON.stringify(updatedLink), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error("Error updating link: ", e);
    // Return error response
    return new Response(JSON.stringify({ error: "Unable to update link" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
