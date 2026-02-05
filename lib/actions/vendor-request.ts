"use server";

import { prisma } from "../db/prisma-helper";
import { vendorRequestSchema } from "../validators";


export async function submitVendorRequest(data: unknown) {
  const parsed = vendorRequestSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Invalid vendor request data");
  }

  const {
    manufatured,
    model,
    configuration,
    warranty,
    warrantyType,
    quotationValidity,
    price,
    remarks,
  } = parsed.data;

  // Create Requirement
  const requirement = await prisma.requirement.create({
    data: {
      manufatured,
      model,
      configuration: configuration
        ? JSON.parse(configuration)
        : null,
      warranty,
      warrantyType,
      quotationValidity,
    },
  });

  // Create Vendor quotation
  await prisma.requirementVendor.create({
    data: {
      requirementId: requirement.id,
      price,
      remarks,
    },
  });

  return { success: true };
}
