// app/api/topics.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  // Extracting the URL from the request and then the userId from the search parameters
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");

  try {
    // Fetch topics from the database where the auth0_user_id matches the userId parameter
    const topics = await prisma.topic.findMany({
      where: {
        auth0_user_id: userId, // Ensure this matches the column name in your database
      },
    });

    return new Response(JSON.stringify(topics), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Unable to fetch topics" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
export async function POST(request: Request) {
  try {
    // Destructure title and auth0_user_id from the request body
    const { title, auth0_user_id } = await request.json();

    // Include auth0_user_id in the data payload for topic creation
    const newTopic = await prisma.topic.create({
      data: {
        title: title,
        auth0_user_id: auth0_user_id, // Assuming your Prisma schema has this field in the Topic model
      },
    });

    return new Response(JSON.stringify(newTopic), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error("error here" + e);
    return new Response(JSON.stringify({ error: "Unable to create topic" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

// Date last accessed for a topic
export async function PUT(request: Request) {
  try {
    const { id, lastAccessed } = await request.json();
    const updatedTopic = await prisma.topic.update({
      where: {
        id: id,
      },
      data: {
        lastAccessed: lastAccessed,
      },
    });
    return new Response(JSON.stringify(updatedTopic), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error("error here" + e);
    return new Response(JSON.stringify({ error: "Unable to update topic" }), {
      status: 500,
    });
  }
}
