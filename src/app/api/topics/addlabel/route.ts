import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function PUT(request: Request) {
    try {
        const { topicId, labelId } = await request.json()
        const updatedTopic = await prisma.topic.update({
            where: {
                id: topicId,
            },
            data: {
                label: {
                    connect: {
                        id: labelId,
                    },
                },
            },
        })

        return new Response(JSON.stringify(updatedTopic), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }
        })
    } catch(error) {
        console.log(error)
    }
}