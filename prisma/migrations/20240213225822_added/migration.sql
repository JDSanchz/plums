-- CreateTable
CREATE TABLE "Images" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "topic_id" TEXT NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
