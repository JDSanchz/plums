import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    // Extract data from form fields
    const title = formData.get("title") as string;
    const file = formData.get("file") as File;
    const topicId = formData.get("topicId") as string;

    // Check if all required fields are provided
    if (!title || !file || !topicId) {
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

    // Read file contents
    const fileData = Buffer.from(await file.arrayBuffer());

    // Save file data to the database
    const newFile = await prisma.fileUpload.create({
        data: {
            title,
            data: fileData,
            topicId,
            filename: file.name,
            mimeType: file.type,
            size: file.size,
        },
    });

    return new Response(JSON.stringify(newFile), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error("Error here: " + e);
    return new Response(JSON.stringify({ error: "Unable to upload file" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function GET(request: Request) {
  // Extract query parameters from the request URL
  const url = new URL(request.url);
  const topicId = url.searchParams.get("topicId");

  // Validate that topicId is provided
  if (!topicId) {
    return new Response(
      JSON.stringify({ error: "topicId query parameter is required" }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }

  try {
    // Fetch all files associated with the topicId
    const files = await prisma.fileUpload.findMany({
      where: {
        topicId: topicId,
      },
    });

    // Return the fetched files
    return new Response(JSON.stringify(files), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error("Error fetching files: ", e);
    return new Response(JSON.stringify({ error: "Unable to fetch files" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
