-- CreateTable
CREATE TABLE "Configuration" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT,
    "logo" TEXT,
    "favicon" TEXT,
    "email" TEXT,
    "password" TEXT,

    CONSTRAINT "Configuration_pkey" PRIMARY KEY ("id")
);
