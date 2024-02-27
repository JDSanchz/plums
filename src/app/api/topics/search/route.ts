import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get("term");

  if (!searchTerm) {
    return new Response(JSON.stringify({ error: "Search term is required" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    console.log("Made it to the ROUTE function with Search Term:", searchTerm);
    const searchResults = await prisma.topic.findMany({
      where: {
        AND: [
          // Use AND to combine conditions
          {
            OR: [
              // Search in title or content or other fields
              {
                title: {
                  contains: searchTerm,
                  mode: "insensitive",
                },
              },
            ],
          },
          {
            parentId: null, // Ensure the topic does not have a parent
          },
        ],
      },
    });

    return new Response(JSON.stringify(searchResults), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Unable to perform search" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
