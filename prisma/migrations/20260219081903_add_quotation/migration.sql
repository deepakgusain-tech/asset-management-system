-- CreateTable
CREATE TABLE "Quotation" (
    "id" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "requirementId" TEXT NOT NULL,
    "items" JSONB NOT NULL,
    "validTill" TIMESTAMP(3) NOT NULL,
    "deliveryDays" INTEGER NOT NULL,
    "paymentTerms" TEXT NOT NULL,
    "gst" DOUBLE PRECISION NOT NULL,
    "additionalCharges" DOUBLE PRECISION NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "gstAmount" DOUBLE PRECISION NOT NULL,
    "grandTotal" DOUBLE PRECISION NOT NULL,
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quotation_pkey" PRIMARY KEY ("id")
);
