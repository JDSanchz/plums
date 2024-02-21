// Get a topic by id
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
    const url = new URL(request.url);
    const topicId = url.searchParams.get("topicId");
    if (!topicId) {
        return new Response(JSON.stringify({ error: "Topic ID is required" }), {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        });
    }

    try {
      const topic = await prisma.topic.findUnique({
        where: {
            id: topicId,
        }
      });
      
      return new Response(JSON.stringify(topic), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.error(e);
      return new Response(JSON.stringify({ error: "Unable to fetch topic" }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }