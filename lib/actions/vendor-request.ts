"use server";

import { prisma } from "../db/prisma-helper";
import { sendMail } from "../mail";
// import { requirementEmailTemplate } from "../requirement-template";
import { requirementEmailTemplate } from "../requirement-template";

import { vendorRequestSchema } from "../validators";

export async function submitVendorRequest(
  data: unknown,
  vendorId: string
) {
  // 1️⃣ Validate data
  const parsed = vendorRequestSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Invalid vendor request data");
  }

  // 2️⃣ Fetch vendor
  const vendor = await prisma.vendor.findUnique({
    where: { id: vendorId },
    select: {
      name: true,
      email: true,
    },
  });

  if (!vendor) {
    throw new Error("Vendor not found");
  }

  // ✅ IMPORTANT: Fix for "to is showing error"
  if (!vendor.email) {
    throw new Error("Vendor email not found");
  }

  const vendorName = vendor.name;

  // 3️⃣ Extract form data
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

  // 4️⃣ Create requirement
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

  console.log("DEBUG vendorName:", vendorName);
  console.log("DEBUG vendor email:", vendor.email);

  // // 5️⃣ Create vendor quotation entry
  // await prisma.requirementVendor.create({
  //   data: {
  //     requirementId: requirement.id,
  //     price,
  //     remarks,
  //   },
  // });

  // 6️⃣ SEND EMAIL (vendor name + email are now safe)
  await sendMail({
    to: vendor.email, // ✅ NO TypeScript error now
    subject: "Asset Request – Quotation Required",
    html: requirementEmailTemplate({
      model,
      manufatured,
      warranty,
      warrantyType,
      quotationValidity,
      configuration: configuration ? JSON.parse(configuration) : [],
      vendorName,
    }),
  });

  return { success: true };
}
