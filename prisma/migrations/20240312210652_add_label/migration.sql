-- CreateTable
CREATE TABLE "AddLabel" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "topic_id" TEXT NOT NULL,

    CONSTRAINT "AddLabel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AddLabel" ADD CONSTRAINT "AddLabel_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
