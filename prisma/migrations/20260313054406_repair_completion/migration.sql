-- AlterTable
ALTER TABLE "DeviceRepair" ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'REPAIRING';
