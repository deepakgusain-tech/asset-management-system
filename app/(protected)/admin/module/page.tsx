import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import ModuleTable from "./module-table";
import { getModules } from "@/lib/actions/module-action";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserPermissions, canAccess } from "@/lib/rbac";
import { Module } from "@/types";

const ModulePage = async () => {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/sign-in");
  }

  const user = await getUserPermissions(session.user.email);
  const route = "/admin/module";

  if (!canAccess(user, route, "view")) {
    redirect("/404");
  }

  const roleName = user?.role?.name || "";
  const isAdmin = roleName.toLowerCase().includes("admin");

  const canCreate = isAdmin || canAccess(user, route, "create");
  const canEdit = isAdmin || canAccess(user, route, "edit");
  const canDelete = isAdmin || canAccess(user, route, "delete");

  const modules = await getModules();

  return (
    <Card className="mt-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1>Module</h1>

          {canCreate && (
            <Button className="bg-blue-500 hover:bg-blue-600" asChild>
              <Link href="/admin/module/create">Add Module</Link>
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <ModuleTable
          data={modules as unknown as Module[]}
          canEdit={canEdit}
          canDelete={canDelete}
        />
      </CardContent>
    </Card>
  );
};

export default ModulePage;