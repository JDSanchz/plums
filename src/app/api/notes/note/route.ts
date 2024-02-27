import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// // Get a single note
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const noteId = url.searchParams.get("noteId");

    if (!noteId) {
      return new Response(JSON.stringify({ error: "Note ID is required" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const note = await prisma.notes.findUnique({
      where: {
        id: noteId,
      },
    });

    return new Response(JSON.stringify(note), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Unable to fetch Note" }), {
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
    return new Response(JSON.stringify({ error: e }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

//update note
export async function PUT(request: Request) {
  try {
    const { noteId, content } = await request.json();
    const updatedNote = await prisma.notes.update({
      where: {
        id: noteId,
      },
      data: {
        content: content,
      },
    });
    return new Response(JSON.stringify(updatedNote), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: e }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}