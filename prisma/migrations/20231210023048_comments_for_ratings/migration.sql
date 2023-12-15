/*
  Warnings:

  - You are about to drop the `comment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "comment" DROP CONSTRAINT "comment_studySpaceId_fkey";

-- AlterTable
ALTER TABLE "Rating" ADD COLUMN     "comment" TEXT NOT NULL DEFAULT '';

-- DropTable
DROP TABLE "comment";
