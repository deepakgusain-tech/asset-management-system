-- CreateEnum
CREATE TYPE "DeviceState" AS ENUM ('AVAILABLE', 'ASSIGNED', 'REPAIR', 'REPAIRING', 'RETIRED');

-- AlterTable
ALTER TABLE "Device" ADD COLUMN     "state" "DeviceState" NOT NULL DEFAULT 'AVAILABLE';

-- CreateIndex
CREATE INDEX "Device_state_idx" ON "Device"("state");
