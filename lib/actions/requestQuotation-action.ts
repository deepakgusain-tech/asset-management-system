"use server";

import { prisma } from "../db/prisma-helper";
import { requestQuotationSchema } from "../validators";
import { formatError } from "../utils";
import { RequestQuotation } from "@/types";

export async function getRequestQuotations(): Promise<{
  success: boolean;
  data?: RequestQuotation[];
  message: string;
}> {
  try {
    const requests = await prisma.requestQuotation.findMany({
      orderBy: { createdAt: "desc" },
    });

    return {
      success: true,
      data: requests,
      message: "Request Quotations fetched successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}



// CREATE REQUEST QUOTATION
export async function createRequestQuotation(data: RequestQuotation) {
  try {
    const rq = requestQuotationSchema.parse(data);

    const newRq = await prisma.requestQuotation.create({
      data: {
        title: rq.title,
        requirement: rq.requirement,
        status: rq.status, // DRAFT by default
      },
    });

    return {
      success: true,
      data: newRq,
      message: "Request Quotation created successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// GET REQUEST QUOTATION BY ID
export async function getRequestQuotationById(id: string) {
  try {
    const rq = await prisma.requestQuotation.findUnique({
      where: { id },
    });

    if (rq) {
      return {
        success: true,
        data: rq,
        message: "Request Quotation get successfully",
      };
    }

    return { success: false, message: "Request Quotation not found" };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// UPDATE REQUEST QUOTATION
export async function updateRequestQuotation(
  data: RequestQuotation,
  id: string
) {
  try {
    const rq = requestQuotationSchema.parse(data);

    const updatedRq = await prisma.requestQuotation.update({
      where: { id },
      data: {
        title: rq.title,
        requirement: rq.requirement,
        status: rq.status ?? "DRAFT",
      },
    });

    return {
      success: true,
      data: updatedRq,
      message: "Request Quotation updated successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}

// DELETE REQUEST QUOTATION
export async function deleteRequestQuotation(id: string) {
  try {
    await prisma.requestQuotation.delete({
      where: { id },
    });

    return {
      success: true,
      message: "Request Quotation deleted successfully",
    };
  } catch (error) {
    return { success: false, message: formatError(error) };
  }
}
