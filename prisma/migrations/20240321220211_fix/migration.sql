/*
  Warnings:

  - You are about to drop the column `topic_id` on the `Label` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Label" DROP CONSTRAINT "Label_topic_id_fkey";

-- AlterTable
ALTER TABLE "Label" DROP COLUMN "topic_id";

-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "labelId" TEXT;

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_labelId_fkey" FOREIGN KEY ("labelId") REFERENCES "Label"("id") ON DELETE SET NULL ON UPDATE CASCADE;
