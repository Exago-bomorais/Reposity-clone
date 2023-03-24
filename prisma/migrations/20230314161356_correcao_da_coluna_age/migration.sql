/*
  Warnings:

  - You are about to alter the column `age` on the `author` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "author" ALTER COLUMN "age" SET DATA TYPE INTEGER;
