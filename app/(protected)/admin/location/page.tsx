
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
// import DepartmentTable from "./department-table";
import LocationTable from "./location-table";
// import { getDepartment } from "@/lib/actions/department";
import { getLocation } from "@/lib/actions/location";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserPermissions, canAccess } from "@/lib/rbac";

const LocationPage = async () => {
  // ✅ AUTH
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/sign-in");
  }

  const user = await getUserPermissions(session.user.email);
  const route = "/admin/location";

  if (!canAccess(user, route, "view")) {
    redirect("/404");
  }

  const roleName = user?.role?.name || "";
  const isAdmin = roleName.toLowerCase().includes("admin");

  const canCreate = isAdmin || canAccess(user, route, "create");
  const canEdit = isAdmin || canAccess(user, route, "edit");
  const canDelete = isAdmin || canAccess(user, route, "delete");

  const location = await getLocation();

  return (
    <Card className="mt-2 shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1>Location</h1>

          {canCreate && (
            <Button className="bg-blue-500 hover:bg-blue-600">
              <Link href="/admin/location/create">
                Add Location
              </Link>
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <LocationTable
          data={location as any}
          canEdit={canEdit}
          canDelete={canDelete}
        />
      </CardContent>
    </Card>
  );
};

export default LocationPage;