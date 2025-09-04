/*
  Warnings:

  - You are about to drop the column `categoryId` on the `suggest` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."suggest" DROP CONSTRAINT "suggest_categoryId_fkey";

-- AlterTable
ALTER TABLE "public"."suggest" DROP COLUMN "categoryId";

-- CreateTable
CREATE TABLE "public"."category_item" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION,
    "imageUrl" TEXT,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."category_item" ADD CONSTRAINT "category_item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
