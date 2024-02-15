/*
  Warnings:

  - You are about to drop the column `preview_img` on the `Links` table. All the data in the column will be lost.
  - Added the required column `desc` to the `Links` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Links" DROP COLUMN "preview_img",
ADD COLUMN     "desc" TEXT NOT NULL;
