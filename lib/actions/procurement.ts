"use server";

import { Procurement, Requirement } from "@/types";
import { prisma } from "../db/prisma-helper";
import { formatError } from "../utils";
import { requriementsSchema } from "../validators";
import { sendMail } from "../mail";
import { requirementEmailTemplate } from "../requirement-template";

// get requirement
export async function getProcurement() {
  return await prisma.procurement.findMany({
    orderBy: {
      createdAt: 'desc'
    },
  })
}

// create requirement
export async function createProcurement(data: Procurement) {
  try {

    await prisma.procurement.create({
      data: {
        manufatured: data.manufatured,
        model: data.model,
        vendorId: data.vendorId,
        configuration: JSON.stringify(data.configuration),
        warranty: data.warranty,
        warrantyType: data.warrantyType,
        quotationValidity: data.quotationValidity,
        status: data.status,
        notes: data.notes,
        requirementId: data.requirementId
      },
    });

    let html = requirementEmailTemplate(data as any)

    await sendMail({
      to: "deepak@mail.com",
      subject : "subject",
      html,
    });

    return {
      success: true,
      message: "Procurement created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// get requirement by id
export async function getProcurementById(id: string) {
  try {
    let requirement = await prisma.requirement.findFirst({
      where: { id },
    });

    if (requirement) {
      return {
        success: true,
        data: requirement,
        message: "Procurement created successfully",
      };
    }

    return {
      success: false,
      message: "Procurement not found",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// update requirement
export async function updateProcurement(data: Requirement, id: string) {
  try {
    const requirement = requriementsSchema.parse(data);

    await prisma.requirement.update({
      where: { id },
      data: requirement as any,
    });

    return {
      success: true,
      message: "Procurement updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// delete requirement
export async function deleteProcurement(id: any) {
  try {
    await prisma.requirement.delete({
      where: { id },
    });

    return {
      success: true,
      message: "Procurement deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
