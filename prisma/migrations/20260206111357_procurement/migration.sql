-- CreateTable
CREATE TABLE "Procurement" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "manufatured" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "configuration" JSONB,
    "warranty" TEXT NOT NULL,
    "notes" TEXT,
    "vendorIds" TEXT NOT NULL,
    "warrantyType" TEXT,
    "quotationValidity" TIMESTAMP(6) NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "requirementId" TEXT NOT NULL,

    CONSTRAINT "Procurement_pkey" PRIMARY KEY ("id")
);
