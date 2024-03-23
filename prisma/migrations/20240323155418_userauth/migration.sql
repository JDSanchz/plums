/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "auth0_user_id" TEXT;

-- DropTable
DROP TABLE "User";
