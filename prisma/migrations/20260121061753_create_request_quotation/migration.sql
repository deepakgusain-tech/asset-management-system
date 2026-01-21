-- CreateEnum
CREATE TYPE "RQStatus" AS ENUM ('DRAFT', 'SENT');

-- CreateTable
CREATE TABLE "RequestQuotation" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "requirement" TEXT NOT NULL,
    "status" "RQStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RequestQuotation_pkey" PRIMARY KEY ("id")
);
