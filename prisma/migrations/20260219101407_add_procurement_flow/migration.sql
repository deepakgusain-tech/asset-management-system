/*
  Warnings:

  - The primary key for the `Quotation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Quotation` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Quotation" DROP CONSTRAINT "Quotation_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ADD CONSTRAINT "Quotation_pkey" PRIMARY KEY ("id");
