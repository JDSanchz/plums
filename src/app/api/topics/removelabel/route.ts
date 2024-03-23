// Assuming this is saved in a file within your Next.js project, such as pages/api/topics/removeChild.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { topicId, labelId } = await request.json();

    // Check if both parentId and childId are provided
    if (!topicId || !labelId) {
      return new Response(
        JSON.stringify({ error: "Both topicId and labelId are required" }),
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
        id: topicId,
      },
      data: {
        label: { disconnect: true },
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
