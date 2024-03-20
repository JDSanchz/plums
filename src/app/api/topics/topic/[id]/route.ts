import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(request: Request) {
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
    await prisma.$transaction(async (tx) => {
      console.log("transactions");
      // Correctly access the models in camelCase as per Prisma client's convention
      await tx.fileUpload.deleteMany({ where: { topicId } });
      await tx.notes.deleteMany({ where: { topicId } });
      await tx.links.deleteMany({ where: { topicId } });

      // Detach child topics by setting their parentId to null
      await tx.topic.updateMany({
        where: { parentId: topicId },
        data: { parentId: null },
      });

      // Finally, delete the topic
      await tx.topic.delete({ where: { id: topicId } });
    });

    return new Response(
      JSON.stringify({ message: "Topic deleted successfully" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Unable to delete topic" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function PUT(request: Request) {
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

  let body = await request.json();
  const title = body.title;

  if (!title) {
    return new Response(JSON.stringify({ error: "New title is required" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const updatedTopic = await prisma.topic.update({
      where: {
        id: topicId,
      },
      data: {
        title: title,
      },
    });

    return new Response(JSON.stringify(updatedTopic), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({ error: "Unable to update topic title" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
}
