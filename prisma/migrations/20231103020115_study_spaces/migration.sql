/*
  Warnings:

  - You are about to drop the `ToDo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ToDo" DROP CONSTRAINT "ToDo_ownerId_fkey";

-- DropTable
DROP TABLE "ToDo";

-- CreateTable
CREATE TABLE "studySpace" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "building" TEXT NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "busyness" DOUBLE PRECISION NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "studySpace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "studySpaceId" INTEGER NOT NULL,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservation" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "studySpaceId" INTEGER NOT NULL,

    CONSTRAINT "reservation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "studySpace" ADD CONSTRAINT "studySpace_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_studySpaceId_fkey" FOREIGN KEY ("studySpaceId") REFERENCES "studySpace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_studySpaceId_fkey" FOREIGN KEY ("studySpaceId") REFERENCES "studySpace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
