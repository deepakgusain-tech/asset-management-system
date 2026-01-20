/*
  Warnings:

  - You are about to drop the column `vendorTypeId` on the `Vendor` table. All the data in the column will be lost.
  - You are about to drop the `VendorType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Vendor" DROP CONSTRAINT "Vendor_vendorTypeId_fkey";

-- DropIndex
DROP INDEX "Vendor_vendorTypeId_idx";

-- AlterTable
ALTER TABLE "Vendor" DROP COLUMN "vendorTypeId";

-- DropTable
DROP TABLE "VendorType";
