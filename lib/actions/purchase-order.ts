"use server";

import { prisma } from "@/lib/db/prisma-helper";
import {
  createPurchaseOrderSchema
} from "@/lib/validators";
import { PurchaseOrderStatus } from "../generated/prisma/enums";

/**
 * CREATE PURCHASE ORDER
 */
export async function createPurchaseOrder(input: unknown) {
  // 1️⃣ Validate input using Zod
  const data = createPurchaseOrderSchema.parse(input);

  // 2️⃣ Calculate total amount
  const totalAmount = data.items.reduce(
    (sum, item) => sum + Number(item.quantity) * Number(item.unitPrice),
    0
  );

  // 3️⃣ Create Purchase Order with items
  const purchaseOrder = await prisma.purchaseOrder.create({
    data: {
      poNumber: `PO-${Date.now()}`,
      requirementId: data.requirementId,
      vendorId: data.vendorId,
      totalAmount,
      status: PurchaseOrderStatus.DRAFT,
      items: {
        create: data.items.map(item => ({
          deviceCategoryId: item.deviceCategoryId,
          quantity: Number(item.quantity),
          unitPrice: Number(item.unitPrice),
          totalPrice: Number(item.quantity) * Number(item.unitPrice)
        }))
      }
    }
  });

  return purchaseOrder;
}

/**
 * FETCH PURCHASE ORDERS (LIST PAGE)
 */
export async function getPurchaseOrders() {
  return prisma.purchaseOrder.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      vendor: true,
      requirement: true,
      items: {
        include: {
          deviceCategory: true
        }
      }
    }
  });
}

/**
 * FETCH SINGLE PURCHASE ORDER
 */
export async function getPurchaseOrderById(id: string) {
  return prisma.purchaseOrder.findUnique({
    where: { id },
    include: {
      vendor: true,
      requirement: true,
      items: {
        include: {
          deviceCategory: true
        }
      }
    }
  });
}
