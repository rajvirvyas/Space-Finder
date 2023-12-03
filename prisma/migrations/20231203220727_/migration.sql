-- CreateTable
CREATE TABLE "report" (
    "id" SERIAL NOT NULL,
    "spotName" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "studySpaceId" INTEGER NOT NULL,

    CONSTRAINT "report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report" ADD CONSTRAINT "report_studySpaceId_fkey" FOREIGN KEY ("studySpaceId") REFERENCES "studySpace"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
