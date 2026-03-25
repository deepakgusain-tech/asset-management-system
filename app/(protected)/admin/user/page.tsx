import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

import UserTable from "./user-table";
import { getUsers } from "@/lib/actions/user-action";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserPermissions, canAccess } from "@/lib/rbac";

const UserPage = async () => {
 
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/sign-in");
  }

 
  const user = await getUserPermissions(session.user.email);
  const route = "/admin/user";

  if (!canAccess(user, route, "view")) {
    redirect("/404");
  }

  const roleName = user?.role?.name || "";
  const isAdmin = roleName.toLowerCase().includes("admin");

  const canCreate = isAdmin || canAccess(user, route, "create");
  const canEdit = isAdmin || canAccess(user, route, "edit");
  const canDelete = isAdmin || canAccess(user, route, "delete");

 
  const users = await getUsers();

  return (
    <Card className="mt-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1>User</h1>

          {canCreate && (
            <Button asChild className="bg-blue-500 hover:bg-blue-600">
              <Link href="/admin/user/create">Add User</Link>
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <UserTable
          data={users}
          canEdit={canEdit}
          canDelete={canDelete}
        />
      </CardContent>
    </Card>
  );
};

export default UserPage;