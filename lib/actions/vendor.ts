"use server";

import { Vendor } from "@/types";
import { prisma } from "../db/prisma-helper";
import { formatError } from "../utils";
import { vendorSchema } from "../validators";

// get device categories
export async function getVendors() {
  return await prisma.vendor.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

// create vendor
export async function createVendor(data: Vendor) {
  try {
    const vendor = vendorSchema.parse(data);

    await prisma.vendor.create({
      data: vendor,
    });

    return {
      success: true,
      message: "Vendor created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// get Department by id
export async function getVendorById(id: string) {
  try {
    let vendor = await prisma.vendor.findFirst({
      where: { id },
    });

    if (vendor) {
      return {
        success: true,
        data: vendor,
        message: "vendor created successfully",
      };
    }

    return {
      success: false,
      message: "vendor not found",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// update vendor
export async function updateVendor(data: Vendor, id: string) {
  try {
    const vendor = vendorSchema.parse(data);

    await prisma.vendor.update({
      where: { id },
      data: vendor,
    });

    return {
      success: true,
      message: "Vendor updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// delete vendor
export async function deleteVendor(id: any) {
  try {
    await prisma.vendor.delete({
      where: { id },
    });

    return {
      success: true,
      message: "Vendor deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
