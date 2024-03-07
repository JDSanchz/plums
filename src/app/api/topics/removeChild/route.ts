// Assuming this is saved in a file within your Next.js project, such as pages/api/topics/removeChild.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { parentId, childId } = await request.json();

    // Check if both parentId and childId are provided
    if (!parentId || !childId) {
      return new Response(
        JSON.stringify({ error: "Both parentId and childId are required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    // Set the parent of the child to null
    const updatedChild = await prisma.topic.update({
      where: {
        id: childId,
      },
      data: {
        parent: { disconnect: true },
      },
    });

    return new Response(JSON.stringify(updatedChild), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error("Error removing parent-child relationship: " + e);
    return new Response(
      JSON.stringify({ error: "Unable to remove parent-child relationship" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
