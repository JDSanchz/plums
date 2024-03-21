-- DropForeignKey
ALTER TABLE "Label" DROP CONSTRAINT "Label_topic_id_fkey";

-- AlterTable
ALTER TABLE "Label" ALTER COLUMN "topic_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Label" ADD CONSTRAINT "Label_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;
