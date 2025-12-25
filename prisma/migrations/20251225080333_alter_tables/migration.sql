/*
  Warnings:

  - The `status` column on the `Module` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `Role` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `status` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Module" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "Role" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'ACTIVE';
