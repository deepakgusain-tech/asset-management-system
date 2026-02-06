/*
  Warnings:

  - You are about to drop the column `vendorIds` on the `Procurement` table. All the data in the column will be lost.
  - Added the required column `vendorId` to the `Procurement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Procurement" DROP COLUMN "vendorIds",
ADD COLUMN     "vendorId" TEXT NOT NULL;
