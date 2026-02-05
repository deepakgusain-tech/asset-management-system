"use server";

import { Requirement } from "@/types";
import { prisma } from "../db/prisma-helper";
import { formatError } from "../utils";
import { requriementsSchema } from "../validators";

// get requirement
export async function getRequirement() {
  return await prisma.requirement.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
}

// create requirement
export async function createRequirement(data: any) {
  try {
    const parsed = requriementsSchema.parse(data);
    const { vendorIds, ...rest } = parsed;

    const requirement = await prisma.requirement.create({
      data: {
        manufatured: rest.manufatured,
        model: rest.model,
        warranty: rest.warranty,
        warrantyType: rest.warrantyType ?? null,

        configuration: (rest.configuration ?? null) as any,

        quotationValidity: rest.quotationValidity
          ? new Date(rest.quotationValidity as any)
          : new Date(),

        delivery: rest.delivery ? new Date(rest.delivery as any) : null,
      },
    });

    if (vendorIds?.length) {
      await prisma.requirementVendor.createMany({
        data: vendorIds.map((vId: string) => ({
          requirementId: requirement.id,
          vendorId: vId,
        })),
      });
    }

    return {
      success: true,
      message: "Requirement created successfully",
    };
  } catch (error) {
    console.error("CREATE REQUIREMENT ERROR:", error);throw error; 
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// get requirement by id
export async function getRequirementById(id: string) {
  try {
    let requirement = await prisma.requirement.findFirst({
      where: { id },
    });

    if (requirement) {
      return {
        success: true,
        data: requirement,
        message: "Requirement created successfully",
      };
    }

    return {
      success: false,
      message: "Requirement not found",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// update requirement
export async function updateRequirement(data: any, id: string) {
  try {
    const parsed = requriementsSchema.parse(data);
    const { vendorIds, ...rest } = parsed;

    await prisma.requirement.update({
      where: { id },
      data: {
        manufatured: rest.manufatured,
        model: rest.model,
        warranty: rest.warranty,
        warrantyType: rest.warrantyType ?? null,

        configuration: (rest.configuration ?? null) as any,

        quotationValidity: rest.quotationValidity
          ? new Date(rest.quotationValidity as any)
          : new Date(),

        delivery: rest.delivery ? new Date(rest.delivery as any) : null,
      },
    });

    await prisma.requirementVendor.deleteMany({
      where: { requirementId: id },
    });

    if (vendorIds?.length) {
      await prisma.requirementVendor.createMany({
        data: vendorIds.map((vId: string) => ({
          requirementId: id,
          vendorId: vId,
        })),
      });
    }

    return {
      success: true,
      message: "Requirement updated successfully",
    };
  } catch (error) {
    console.error("UPDATE REQUIREMENT ERROR:", error);throw error; 
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// delete requirement
export async function deleteRequirement(id: any) {
  try {
    await prisma.requirement.delete({
      where: { id },
    });

    return {
      success: true,
      message: "Requriement deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
