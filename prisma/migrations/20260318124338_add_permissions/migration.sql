/*
  Warnings:

  - The primary key for the `RoleModule` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `RoleModule` table. All the data in the column will be lost.
  - You are about to drop the `_ModuleToRole` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RoleModule" DROP CONSTRAINT "RoleModule_moduleId_fkey";

-- DropForeignKey
ALTER TABLE "RoleModule" DROP CONSTRAINT "RoleModule_roleId_fkey";

-- DropForeignKey
ALTER TABLE "_ModuleToRole" DROP CONSTRAINT "_ModuleToRole_A_fkey";

-- DropForeignKey
ALTER TABLE "_ModuleToRole" DROP CONSTRAINT "_ModuleToRole_B_fkey";

-- DropIndex
DROP INDEX "RoleModule_roleId_moduleId_key";

-- AlterTable
ALTER TABLE "RoleModule" DROP CONSTRAINT "RoleModule_pkey",
DROP COLUMN "id",
ADD COLUMN     "canCreate" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canDelete" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canEdit" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "canView" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "roleId" SET DATA TYPE TEXT,
ALTER COLUMN "moduleId" SET DATA TYPE TEXT,
ADD CONSTRAINT "RoleModule_pkey" PRIMARY KEY ("roleId", "moduleId");

-- DropTable
DROP TABLE "_ModuleToRole";

-- AddForeignKey
ALTER TABLE "RoleModule" ADD CONSTRAINT "RoleModule_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleModule" ADD CONSTRAINT "RoleModule_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;
