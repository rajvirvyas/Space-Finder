-- CreateTable
CREATE TABLE "ToDo" (
    "id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,
    "done" BOOLEAN NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "ToDo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ToDo" ADD CONSTRAINT "ToDo_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
