"use server";

import { Requirement } from "@/types";
import { prisma } from "../db/prisma-helper";
import { formatError } from "../utils";
import { requriementsSchema } from "../validators";
import { sendMail } from "../mail";
import { requirementEmailTemplate } from "../requirement-template";
import { getVendorById } from "./vendor";

// get requirement
export async function getRequirement() {
  return await prisma.requirement.findMany({
    orderBy: {
      createdAt: 'desc'
    },
  })
}

// create requirement
export async function createRequirement(data: Requirement) {
  try {

    const response =  await prisma.requirement.create({
      data: {
        manufatured: data.manufatured,
        model: data.model,
        vendorIds: data.vendorIds,
        configuration: JSON.stringify(data.configuration),
        warranty: data.warranty,
        warrantyType: data.warrantyType,
        quotationValidity: data.quotationValidity,
        status: data.status,
        notes: data.notes,
      },
    });

    console.log(response);
    

    
    for (const vendorId of data.vendorIds) {
      const vendor = await getVendorById(vendorId)
      
      let html = requirementEmailTemplate({...data, vendorName : vendor.data?.name as string, vendorId:vendor.data?.id as string, requirementId:response.id as string})

      await sendMail({
        to: vendor.data?.email as string,
        subject: "Asset Request – Quotation Required",
        html,
      });
    }



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
