/*
  Warnings:

  - You are about to drop the column `rating` on the `studySpace` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "studySpace" DROP COLUMN "rating";

-- CreateTable
CREATE TABLE "Rating" (
    "id" SERIAL NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "userId" INTEGER NOT NULL,
    "studySpaceId" INTEGER NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Rating_userId_studySpaceId_key" ON "Rating"("userId", "studySpaceId");

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_studySpaceId_fkey" FOREIGN KEY ("studySpaceId") REFERENCES "studySpace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
