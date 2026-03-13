-- AlterTable
ALTER TABLE "DeviceAssigned" ALTER COLUMN "returnedDate" DROP DEFAULT,
ALTER COLUMN "returnedDate" SET DATA TYPE TIMESTAMP(3);
