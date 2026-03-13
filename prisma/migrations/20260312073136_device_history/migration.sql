/*
  Warnings:

  - You are about to drop the column `email` on the `Configuration` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Configuration` table. All the data in the column will be lost.
  - Made the column `fromEmail` on table `Configuration` required. This step will fail if there are existing NULL values in that column.
  - Made the column `smtpHost` on table `Configuration` required. This step will fail if there are existing NULL values in that column.
  - Made the column `smtpPassword` on table `Configuration` required. This step will fail if there are existing NULL values in that column.
  - Made the column `smtpPort` on table `Configuration` required. This step will fail if there are existing NULL values in that column.
  - Made the column `smtpUser` on table `Configuration` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Configuration" DROP COLUMN "email",
DROP COLUMN "password",
ALTER COLUMN "fromEmail" SET NOT NULL,
ALTER COLUMN "smtpHost" SET NOT NULL,
ALTER COLUMN "smtpPassword" SET NOT NULL,
ALTER COLUMN "smtpPort" SET NOT NULL,
ALTER COLUMN "smtpUser" SET NOT NULL;

-- CreateTable
CREATE TABLE "DeviceHistory" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "deviceId" UUID NOT NULL,
    "employeeId" UUID,
    "actionType" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DeviceHistory_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DeviceHistory" ADD CONSTRAINT "DeviceHistory_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
