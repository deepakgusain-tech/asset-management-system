/*
  Warnings:

  - You are about to drop the column `roleId` on the `Module` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[route]` on the table `Module` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `route` to the `Module` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Module" DROP CONSTRAINT "Module_roleId_fkey";

-- AlterTable
ALTER TABLE "Module" DROP COLUMN "roleId",
ADD COLUMN     "route" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "RoleModule" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "roleId" UUID NOT NULL,
    "moduleId" UUID NOT NULL,

    CONSTRAINT "RoleModule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ModuleToRole" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL,

    CONSTRAINT "_ModuleToRole_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "RoleModule_roleId_moduleId_key" ON "RoleModule"("roleId", "moduleId");

-- CreateIndex
CREATE INDEX "_ModuleToRole_B_index" ON "_ModuleToRole"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Module_route_key" ON "Module"("route");

-- AddForeignKey
ALTER TABLE "RoleModule" ADD CONSTRAINT "RoleModule_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoleModule" ADD CONSTRAINT "RoleModule_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModuleToRole" ADD CONSTRAINT "_ModuleToRole_A_fkey" FOREIGN KEY ("A") REFERENCES "Module"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ModuleToRole" ADD CONSTRAINT "_ModuleToRole_B_fkey" FOREIGN KEY ("B") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
