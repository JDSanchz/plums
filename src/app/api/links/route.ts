// app/api/links.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Adjusted to match your updated Links model
export async function POST(request: Request) {
  try {
    const { title, url, previewImg, topicId } = await request.json();

    // Check if topicId is provided
    if (!topicId) {
      return new Response(JSON.stringify({ error: "topicId is required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const newLink = await prisma.links.create({
      data: {
        title,
        url,
        previewImg, // This is still optional.
        topicId, // Now ensuring it's provided.
      },
    });
    return new Response(JSON.stringify(newLink), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error("error here" + e);
    return new Response(JSON.stringify({ error: "Unable to create link" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
