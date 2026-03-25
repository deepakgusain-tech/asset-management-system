import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

import RoleTable from "./role-table";
import { getRoles } from "@/lib/actions/role-action";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserPermissions, canAccess } from "@/lib/rbac";

const RolePage = async () => {
  // ✅ AUTH
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/sign-in");
  }

  // ✅ RBAC
  const user = await getUserPermissions(session.user.email);
  const route = "/admin/role";

  if (!canAccess(user, route, "view")) {
    redirect("/404");
  }

  const roleName = user?.role?.name || "";
  const isAdmin = roleName.toLowerCase().includes("admin");

  const canCreate = isAdmin || canAccess(user, route, "create");
  const canEdit = isAdmin || canAccess(user, route, "edit");
  const canDelete = isAdmin || canAccess(user, route, "delete");

  const roles = await getRoles();

  return (
    <Card className="mt-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1>Role</h1>

          {canCreate && (
            <Button asChild className="bg-blue-500 hover:bg-blue-600">
              <Link href="/admin/role/create">Add Role</Link>
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <RoleTable
          data={roles}
          canEdit={canEdit}
          canDelete={canDelete}
        />
      </CardContent>
    </Card>
  );
};

export default RolePage;