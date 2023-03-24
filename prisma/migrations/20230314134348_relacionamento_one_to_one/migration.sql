-- CreateTable
CREATE TABLE "author" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "age" BIGINT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "author_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "author_userId_key" ON "author"("userId");

-- AddForeignKey
ALTER TABLE "author" ADD CONSTRAINT "author_userId_fkey" FOREIGN KEY ("userId") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
