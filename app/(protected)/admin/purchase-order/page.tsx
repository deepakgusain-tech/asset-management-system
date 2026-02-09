import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { getPurchaseOrders } from "@/lib/actions/purchase-order";

export default async function PurchaseOrderPage() {
  // 🔹 Fetch from database (Prisma)
  const purchaseOrders = await getPurchaseOrders();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Purchase Orders</CardTitle>

          <Link href="/admin/purchase-order/create">
            <Button>Create Purchase Order</Button>
          </Link>
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
              </TableRow>
            </TableHeader>

            <TableBody>
              {purchaseOrders.map(po => (
                <TableRow key={po.id}>
                  <TableCell className="font-medium">
                    {po.poNumber}
                  </TableCell>

                  <TableCell>
                    {po.vendor.name}
                  </TableCell>

                  <TableCell>
                    {po.requirement.model}
                  </TableCell>

                  <TableCell>
                    ₹{po.totalAmount.toLocaleString()}
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline">
                      {po.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}

              {purchaseOrders.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center text-muted-foreground"
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
