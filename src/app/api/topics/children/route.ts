// Get a topic and its children by topic id
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const topicId = url.searchParams.get("parentId");
  if (!topicId) {
    return new Response(JSON.stringify({ error: "Parent ID is required" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    console.log("Made it to the ROUTE function with Parent ID:", topicId);
    // Assuming 'children' is the relation name. Adjust based on your schema.
    const topicWithChildren = await prisma.topic.findUnique({
      where: {
        id: topicId,
      },
      include: {
        children: true, // Include child topics in the response
      },
    });

    if (!topicWithChildren) {
      return new Response(JSON.stringify({ error: "Topic not found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify(topicWithChildren), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({ error: "Unable to fetch topic and its children" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
