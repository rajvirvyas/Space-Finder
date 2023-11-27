/*
  Warnings:

  - The `rating` column on the `studySpace` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profilePic" DROP DEFAULT;

-- AlterTable
ALTER TABLE "studySpace" DROP COLUMN "rating",
ADD COLUMN     "rating" DOUBLE PRECISION[];
