// app/api/links/route.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { title, url, desc, topicId } = await request.json();

    // Check if all required fields are provided
    if (!title || !url || !desc || !topicId) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    const newLink = await prisma.links.create({
      data: {
        title,
        url,
        desc,
        topicId,
      },
    });

    return new Response(JSON.stringify(newLink), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error("Error here: " + e);
    return new Response(JSON.stringify({ error: "Unable to create link" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
