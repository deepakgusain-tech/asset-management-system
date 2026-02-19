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

import {
  getPurchaseOrders,
  updatePurchaseOrderStatus,
} from "@/lib/actions/purchase-order";

export default async function PurchaseOrderPage() {
  const purchaseOrders = await getPurchaseOrders();

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
                      className={`px-3 py-1 text-xs font-medium ${
                        po.status === "DRAFT"
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

                   
                      <form
                        action={async () => {
                          "use server";
                          await updatePurchaseOrderStatus(po.id);
                        }}
                      >
                        <Button
                          type="submit"
                          size="sm"
                          disabled={po.status !== "DRAFT"}
                          className={`min-w-[110px] transition-opacity ${
                            po.status !== "DRAFT"
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                        >
                          Send
                        </Button>
                      </form>

                       
                      <form
                        action={async () => {
                          "use server";
                          await updatePurchaseOrderStatus(po.id);
                        }}
                      >
                        <Button
                          type="submit"
                          size="sm"
                          disabled={po.status !== "SENT"}
                          className={`min-w-[140px] bg-purple-600 hover:bg-purple-700 transition-opacity ${
                            po.status !== "SENT"
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
