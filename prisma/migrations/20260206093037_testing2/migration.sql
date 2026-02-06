/*
  Warnings:

  - You are about to drop the `_RequirementToVendor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_RequirementToVendor" DROP CONSTRAINT "_RequirementToVendor_A_fkey";

-- DropForeignKey
ALTER TABLE "_RequirementToVendor" DROP CONSTRAINT "_RequirementToVendor_B_fkey";

-- AlterTable
ALTER TABLE "Requirement" ADD COLUMN     "vendorIds" TEXT[];

-- DropTable
DROP TABLE "_RequirementToVendor";
