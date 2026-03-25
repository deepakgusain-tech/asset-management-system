import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import ProcurementTable from "./procurement-table";
import { getProcurement } from "@/lib/actions/procurement";
import { auth } from "@/auth";
import { getUserPermissions, canAccess } from "@/lib/rbac";
import { redirect } from "next/navigation";

const ProcurementPage = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/sign-in");
  }

  const user = await getUserPermissions(session.user.email);
  const route = "/admin/procurement";

  if (!canAccess(user, route, "view")) {
    redirect("/404");
  }

  const isAdmin = user?.role?.name?.toLowerCase()?.includes("admin") ?? false;

  const canCreate = isAdmin || canAccess(user, route, "create");
  const canEdit = isAdmin || canAccess(user, route, "edit");
  const canDelete = isAdmin || canAccess(user, route, "delete");

  await getProcurement();

  return (
    <Card className="mt-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">Procurement</h1>

          {canCreate && (
            <Button className="bg-blue-500 hover:bg-blue-600">
              <Link href="/admin/procurement/create">Add Procurement</Link>
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="w-full">
        <ProcurementTable
          canApprove={canEdit}
          canReject={canEdit}
          canDelete={canDelete}
        />
      </CardContent>
    </Card>
  );
};

export default ProcurementPage;
