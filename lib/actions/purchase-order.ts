"use server";

import { prisma } from "@/lib/db/prisma-helper";
import { createPurchaseOrderSchema } from "@/lib/validators";
import { PurchaseOrderStatus } from "../generated/prisma/enums";
import { revalidatePath } from "next/cache";

 
export async function createPurchaseOrder(input: unknown) {
  const data = createPurchaseOrderSchema.parse(input);

  const totalAmount = data.items.reduce(
    (sum, item) =>
      sum + Number(item.quantity) * Number(item.unitPrice),
    0
  );

  const purchaseOrder = await prisma.purchaseOrder.create({
    data: {
      poNumber: `PO-${Date.now()}`,
      requirementId: data.requirementId,
      vendorId: data.vendorId,
      totalAmount,
      status: PurchaseOrderStatus.DRAFT,  
      items: {
        create: data.items.map((item) => ({
          deviceCategoryId: item.deviceCategoryId,
          quantity: Number(item.quantity),
          unitPrice: Number(item.unitPrice),
          totalPrice:
            Number(item.quantity) *
            Number(item.unitPrice),
        })),
      },
    },
  });

  revalidatePath("/admin/purchase-order");

  return purchaseOrder;
}

 
export async function updatePurchaseOrderStatus(id: string) {
  const po = await prisma.purchaseOrder.findUnique({
    where: { id },
  });

  if (!po) {
    throw new Error("Purchase Order not found");
  }

  
  if (po.status === PurchaseOrderStatus.DRAFT) {
    await prisma.purchaseOrder.update({
      where: { id },
      data: { status: PurchaseOrderStatus.SENT },
    });
  } else if (po.status === PurchaseOrderStatus.SENT) {
    await prisma.purchaseOrder.update({
      where: { id },
      data: { status: PurchaseOrderStatus.RECEIVED },
    });
  } else {
    throw new Error(
      "Purchase Order cannot be modified further"
    );
  }

  revalidatePath("/admin/purchase-order");
}
 
export async function getPurchaseOrders() {
  return prisma.purchaseOrder.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      vendor: true,
      requirement: true,
      items: {
        include: {
          deviceCategory: true,
        },
      },
    },
  });
}

 
export async function getPurchaseOrderById(id: string) {
  return prisma.purchaseOrder.findUnique({
    where: { id },
    include: {
      vendor: true,
      requirement: true,
      items: {
        include: {
          deviceCategory: true,
        },
      },
    },
  });
}
