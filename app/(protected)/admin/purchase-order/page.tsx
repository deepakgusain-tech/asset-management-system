import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserPermissions, canAccess } from "@/lib/rbac";
import {
  getPurchaseOrders,
  updatePurchaseOrderStatus,
} from "@/lib/actions/purchase-order";

export default async function PurchaseOrderPage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/sign-in");
  }

  const user = await getUserPermissions(session.user.email);
  const route = "/admin/purchase-order";

  if (!canAccess(user, route, "view")) {
    redirect("/404");
  }

  const roleName = user?.role?.name || "";
  const isAdmin = roleName.toLowerCase().includes("admin");

  const canCreate = isAdmin || canAccess(user, route, "create");
  const canEdit = isAdmin || canAccess(user, route, "edit");

  const purchaseOrders = await getPurchaseOrders();

  return (
    <Card className="mt-2">
      <CardHeader className="flex justify-between items-center">
        <CardTitle>Purchase Orders</CardTitle>

        {canCreate && (
          <Button className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/purchase-order/create">Create PO</Link>
          </Button>
        )}
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>PO Number</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Requirement</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {purchaseOrders.map((po) => (
              <TableRow key={po.id}>
                <TableCell>{po.poNumber}</TableCell>
                <TableCell>{po.vendor.name}</TableCell>
                <TableCell>{po.requirement.model}</TableCell>

                <TableCell>₹{po.totalAmount.toLocaleString()}</TableCell>

                <TableCell>
                  <Badge>{po.status}</Badge>
                </TableCell>

                <TableCell>
                  <div className="flex justify-end gap-2">
                    {/* SEND */}
                    {canEdit && (
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
                        >
                          Send
                        </Button>
                      </form>
                    )}

                    {/* RECEIVE */}
                    {canEdit && (
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
                          className="bg-purple-600"
                        >
                          Receive
                        </Button>
                      </form>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {purchaseOrders.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-6">
                  No purchase orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
