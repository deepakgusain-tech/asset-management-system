import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import DeviceTable from "./device-table";
import { getDevice } from "@/lib/actions/device-action";
import { Device } from "@/types";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserPermissions, canAccess } from "@/lib/rbac";

const DevicePage = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/sign-in");
  }

  const user = await getUserPermissions(session.user.email);

  // ✅ VIEW CHECK (centralized)
  if (!canAccess(user, "/admin/device", "view")) {
    redirect("/404");
  }

  const device = await getDevice();

  const canCreate = canAccess(user, "/admin/device", "create");
  const canEdit = canAccess(user, "/admin/device", "edit");
  const canDelete = canAccess(user, "/admin/device", "delete");

  return (
    <Card className="mt-2 shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1>Device</h1>

          {canCreate && (
            <Button className="bg-blue-500 hover:bg-blue-600">
              <Link href="device/create">Add Device</Link>
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <DeviceTable
          data={device as Device[]}
          canEdit={canEdit}
          canDelete={canDelete}
        />
      </CardContent>
    </Card>
  );
};

export default DevicePage;
