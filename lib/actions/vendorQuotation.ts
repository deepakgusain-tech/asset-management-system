"use server"

import { z } from "zod";
import { prisma } from "../db/prisma-helper";
import { formatError } from "../utils";
import { vendorQuotationSchema, vendorQuotationItemSchema, vendorQuotationAttachmentSchema } from "../validators";
import { VendorQuotation } from "@/types";

export async function getVendorQuotations() {
    try{
        const quotations = await prisma.vendorQuotation.findMany({
         include: {
            items:{
                include:{
                    attachments:true
                }
            }
         }
        });

        return {
      success: true,
      data: quotations,
      message: "Vendor quotations fetched successfully"
    };
    } catch (error) {
    return {
      success: false,
      message: formatError(error)
    };
  }
}



// ----------------- Create Vendor Quotation -----------------
export async function createVendorQuotation(data: z.infer<typeof vendorQuotationSchema>) {
  try {
    // Validate input
    const quotation = vendorQuotationSchema.parse(data);

    // Prepare nested items
    const itemsData = quotation.items?.map(item => ({
      configuration: item.configuration,
      unitPrice: item.unitPrice,
      quantity: item.quantity,
      discount: item.discount ?? 0,
      totalPrice: item.totalPrice,
      model: item.model,
      serialNumber: item.serialNumber,
      version: item.version,
    attachments: item.attachments
    ? { 
        create: item.attachments.map(att => ({
        fileName: att.fileName,
        fileUrl: att.fileUrl,
        fileType: att.fileType,
        mimeType: att.mimeType ?? null,
        fileSize: att.fileSize ?? null
      })) }
    : undefined
}));

await prisma.vendorQuotation.create({
  data: {
    vendorId: quotation.vendorId,
    rfqId: quotation.rfqId ?? null,
    status: quotation.status,
    totalAmount: quotation.totalAmount,
    items: {
      create: itemsData
    }
  }
});
  return { success: true, 
    message: "Vendor quotation created successfully" };
  } catch (error) {
    return { success: false, 
        message: formatError(error) };
  }
}

