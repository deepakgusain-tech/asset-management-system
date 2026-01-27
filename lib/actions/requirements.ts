"use server";

import { Requirement, Vendor } from "@/types";
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
export async function createRequirement(data: Requirement) {
  try {
    const requirement = requriementsSchema.parse(data);

    await prisma.requirement.create({
      data: requirement,
    });

    return {
      success: true,
      message: "Requirment created successfully",
    };
  } catch (error) {
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
export async function updateRequirement(data: Requirement, id: string) {
  try {
    const requirement = requriementsSchema.parse(data);

    await prisma.requirement.update({
      where: { id },
      data: requirement,
    });

    return {
      success: true,
      message: "Requirement updated successfully",
    };
  } catch (error) {
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
