/*
  Warnings:

  - You are about to drop the `RequirementVendor` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RequirementVendor" DROP CONSTRAINT "RequirementVendor_requirementId_fkey";

-- DropForeignKey
ALTER TABLE "RequirementVendor" DROP CONSTRAINT "RequirementVendor_vendorId_fkey";

-- AlterTable
ALTER TABLE "Requirement" ADD COLUMN     "notes" TEXT;

-- DropTable
DROP TABLE "RequirementVendor";

-- CreateTable
CREATE TABLE "_RequirementToVendor" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_RequirementToVendor_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_RequirementToVendor_B_index" ON "_RequirementToVendor"("B");

-- AddForeignKey
ALTER TABLE "_RequirementToVendor" ADD CONSTRAINT "_RequirementToVendor_A_fkey" FOREIGN KEY ("A") REFERENCES "Requirement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RequirementToVendor" ADD CONSTRAINT "_RequirementToVendor_B_fkey" FOREIGN KEY ("B") REFERENCES "Vendor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
