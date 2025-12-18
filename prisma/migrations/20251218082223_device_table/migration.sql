-- CreateEnum
CREATE TYPE "DeviceStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'MAINTENANCE', 'RETIRED');

-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "description" TEXT,
    "status" "DeviceStatus" NOT NULL DEFAULT 'ACTIVE',
    "categoryId" UUID NOT NULL,
    "manufacturer" TEXT,
    "model" TEXT,
    "purchaseDate" TIMESTAMP(3),
    "warrantyEnd" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Device_serialNumber_key" ON "Device"("serialNumber");

-- CreateIndex
CREATE INDEX "Device_categoryId_idx" ON "Device"("categoryId");

-- CreateIndex
CREATE INDEX "Device_status_idx" ON "Device"("status");

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "DeviceCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
