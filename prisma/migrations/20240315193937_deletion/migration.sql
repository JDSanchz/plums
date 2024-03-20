-- DropForeignKey
ALTER TABLE "FileUpload" DROP CONSTRAINT "FileUpload_topic_id_fkey";

-- DropForeignKey
ALTER TABLE "Links" DROP CONSTRAINT "Links_topic_id_fkey";

-- DropForeignKey
ALTER TABLE "Notes" DROP CONSTRAINT "Notes_topic_id_fkey";

-- AlterTable
ALTER TABLE "FileUpload" ALTER COLUMN "topic_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Links" ALTER COLUMN "topic_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Notes" ALTER COLUMN "topic_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "FileUpload" ADD CONSTRAINT "FileUpload_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Links" ADD CONSTRAINT "Links_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
