/*
  Warnings:

  - You are about to drop the column `userId` on the `suggest` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."suggest" DROP CONSTRAINT "suggest_userId_fkey";

-- AlterTable
ALTER TABLE "public"."suggest" DROP COLUMN "userId";
