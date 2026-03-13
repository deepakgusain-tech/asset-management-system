/*
  Warnings:

  - You are about to drop the column `state` on the `Device` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Device_state_idx";

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "state",
ADD COLUMN     "deviceState" "DeviceState" NOT NULL DEFAULT 'AVAILABLE';

-- CreateIndex
CREATE INDEX "Device_deviceState_idx" ON "Device"("deviceState");
