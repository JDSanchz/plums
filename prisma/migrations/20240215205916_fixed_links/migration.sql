/*
  Warnings:

  - Made the column `topic_id` on table `Links` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Links" DROP CONSTRAINT "Links_topic_id_fkey";

-- AlterTable
ALTER TABLE "Links" ALTER COLUMN "topic_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Links" ADD CONSTRAINT "Links_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
