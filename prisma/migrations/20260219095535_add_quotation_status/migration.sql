-- CreateEnum
CREATE TYPE "QuotationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Quotation" ADD COLUMN     "status" "QuotationStatus" NOT NULL DEFAULT 'PENDING';
