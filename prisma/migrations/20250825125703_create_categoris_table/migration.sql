-- CreateTable
CREATE TABLE "public"."categoriys" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "categoriys_pkey" PRIMARY KEY ("id")
);
