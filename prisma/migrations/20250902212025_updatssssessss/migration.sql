/*
  Warnings:

  - You are about to drop the column `userId` on the `category` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."category" DROP CONSTRAINT "category_userId_fkey";

-- AlterTable
ALTER TABLE "public"."category" DROP COLUMN "userId";
