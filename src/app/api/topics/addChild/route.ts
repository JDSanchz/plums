// app/api/topics/addChild.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // Parse the request body to get parentId and childId
    const { parentId, childId } = await request.json();

    // Validate input
    if (!parentId || !childId) {
      return new Response(
        JSON.stringify({ error: "parentId and childId are required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    // Update the child topic to set its parentId
    const updatedChild = await prisma.topic.update({
      where: {
        id: childId,
      },
      data: {
        parentId: parentId,
      },
    });

    // Respond with the updated child topic
    return new Response(JSON.stringify(updatedChild), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error("Error in addChild: ", e);
    return new Response(
      JSON.stringify({ error: "Unable to add child topic" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
