import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    // Assuming you're using some framework that allows you to access query params directly
    // Extract 'topicId' from query parameters instead of the body
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

    const notes = await prisma.notes.findMany({
      where: {
        topicId: topicId,
      },
    });

    return new Response(JSON.stringify(notes), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Unable to fetch Notes" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

// Create new Note
export async function POST(request: Request) {
  try {
    const { title, content, topicId } = await request.json();
    const newNote = await prisma.notes.create({
      data: {
        title: title,
        content: content,
        topicId: topicId,
      },
    });
    return new Response(JSON.stringify(newNote), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error("error here" + e);
    return new Response(JSON.stringify({ error: "Unable to create note" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
