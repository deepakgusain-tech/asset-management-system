"use server";

import { prisma } from "../db/prisma-helper";
import { vendorSchema } from "../validators";
import { formatError } from "../utils";
import type { Vendor } from "@/types";

// GET ALL VENDORS
export async function getVendors() {
  const vendors = await prisma.vendor.findMany({
    orderBy: { createdAt: "desc" },
  });

  return vendors;
}

// CREATE VENDOR
export async function createVendor(data: Vendor) {
  try {
    const vendor = vendorSchema.parse(data);

    await prisma.vendor.create({
      data: {
        name: vendor.name,
        email: vendor.email,
        phoneNumber: vendor.phoneNumber,
        address: vendor.address,
        status: vendor.status,
      },
    });

    return {
      success: true,
      message: "Vendor created successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// GET VENDOR BY ID
export async function getVendorById(id: string) {
  try {
    let vendorData = await prisma.vendor.findFirst({
      where: { id },
    });

    if (vendorData) {
      return {
        success: true,
        data:vendorData,
        message: "Vendor get successfully",
      };
    }

    return {
      success: false,
      message: "Vendor not found",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// UPDATE VENDOR
export async function updateVendor(data: Vendor, id: string) {
  try {
    const vendor = vendorSchema.parse(data);

    await prisma.vendor.update({
      where: { id },
      data: {
        name: vendor.name,
        email: vendor.email,
        phoneNumber: vendor.phoneNumber,
        address: vendor.address,
        // vendorTypeId: vendor.vendorTypeId
        status: vendor.status || "ACTIVE",
        // status: vendor.status ?? "ACTIVE",
      },
    });

    return {
      success: true,
      message: "Vendor updated successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// DELETE VENDOR
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
    return { success: false, message: formatError(error) };
  }
}
