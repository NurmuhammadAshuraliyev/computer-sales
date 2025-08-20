-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50) NOT NULL,
    "password" TEXT NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "phoneNumber" VARCHAR(30) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);
