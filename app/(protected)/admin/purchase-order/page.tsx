import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sendMail } from "@/lib/mail";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db/prisma-helper";
import { purchaseOrderTemplate } from "@/lib/purchaseorder-template";

export default async function PurchaseOrderPage() {
  const purchaseOrders = await prisma.purchaseOrder.findMany({
    include: {
      vendor: true,
      requirement: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  async function handleUpdateStatus(id: string) {
    "use server";

    const po = await prisma.purchaseOrder.findUnique({
      where: { id },
      include: {
        vendor: true,
        requirement: true,
      },
    });

    if (!po) return;


    if (po.status === "DRAFT") {
      const html = purchaseOrderTemplate({
        vendorName: po.vendor.name,
        poNumber: po.poNumber,
        poDate: po.createdAt.toDateString(),
        totalAmount: po.totalAmount,
        deliveryDate: "As per agreed terms",
      });

      if (!po.vendor.email) {
        throw new Error("Vendor email not found");
      }

      await sendMail({
        to: po.vendor.email, 
        subject: `Purchase Order Approved - PO No ${po.poNumber}`,
        html,
      });
      await prisma.purchaseOrder.update({
        where: { id },
        data: { status: "SENT" },
      });
    }

    else if (po.status === "SENT") {
      await prisma.purchaseOrder.update({
        where: { id },
        data: { status: "RECEIVED" },
      });
    }

    revalidatePath("/purchase-order");
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-semibold">
            Purchase Orders
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PO Number</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Requirement</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {purchaseOrders.map((po) => (
                <TableRow key={po.id}>
                  <TableCell className="font-medium">
                    {po.poNumber}
                  </TableCell>
                  <TableCell>{po.vendor.name}</TableCell>

                  <TableCell>{po.requirement.model}</TableCell>

                  <TableCell>
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                    }).format(po.totalAmount)}
                  </TableCell>

                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`px-3 py-1 text-xs font-medium ${po.status === "DRAFT"
                          ? "bg-gray-100 text-gray-700"
                          : po.status === "SENT"
                            ? "bg-blue-100 text-blue-700"
                            : po.status === "RECEIVED"
                              ? "bg-green-100 text-green-700"
                              : "bg-muted"
                        }`}
                    >
                      {po.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <div className="flex items-center justify-end gap-3">
                      <form action={handleUpdateStatus.bind(null, po.id)}>
                        <Button
                          type="submit"
                          size="sm"
                          disabled={po.status !== "DRAFT"}
                          className={`min-w-[110px] ${po.status !== "DRAFT"
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                            }`}
                        >
                          Send
                        </Button>
                      </form>

                      <form action={handleUpdateStatus.bind(null, po.id)}>
                        <Button
                          type="submit"
                          size="sm"
                          disabled={po.status !== "SENT"}
                          className={`bg-purple-600 hover:bg-purple-700 ${po.status !== "SENT"
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                            }`}
                        >
                          Mark Received
                        </Button>
                      </form>
                    </div>
                  </TableCell>
                </TableRow>
              ))}

              {purchaseOrders.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center text-muted-foreground py-6"
                  >
                    No purchase orders found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}