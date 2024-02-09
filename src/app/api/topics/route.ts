// app/api/topics.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const topics = await prisma.topic.findMany();
    console.log(topics); // Logs to the server's console
    return new Response(JSON.stringify(topics), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: "Unable to fetch topics" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
