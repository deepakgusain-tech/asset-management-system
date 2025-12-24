-- CreateEnum
CREATE TYPE "AssignedDeviceStatus" AS ENUM ('ASSIGNED', 'NOTASSIGNED', 'RETURNED');

-- CreateTable
CREATE TABLE "DeviceAssigned" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "deviceId" UUID NOT NULL,
    "employeeId" UUID NOT NULL,
    "assignedDate" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnedDate" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "status" "AssignedDeviceStatus" NOT NULL DEFAULT 'NOTASSIGNED',
    "remarks" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DeviceAssigned_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DeviceAssigned_deviceId_idx" ON "DeviceAssigned"("deviceId");

-- CreateIndex
CREATE INDEX "DeviceAssigned_employeeId_idx" ON "DeviceAssigned"("employeeId");

-- AddForeignKey
ALTER TABLE "DeviceAssigned" ADD CONSTRAINT "DeviceAssigned_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceAssigned" ADD CONSTRAINT "DeviceAssigned_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE CASCADE ON UPDATE CASCADE;
