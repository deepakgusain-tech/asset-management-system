import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import React from "react";
import DeviceAssignedTable from "./device-assigned-table";

import { getAssignedDevices } from "@/lib/actions/device-assigned-action";
import { getDevice } from "@/lib/actions/device-action";
import { getEmployee } from "@/lib/actions/employee";

import { Device, Employee } from "@/types";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserPermissions, canAccess } from "@/lib/rbac";

const DeviceAssignedPage = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/sign-in");
  }

  const user = await getUserPermissions(session.user.email);

  const route = "/admin/device-assigned";

  if (!canAccess(user, route, "view")) {
    redirect("/404");
  }

  const canCreate = canAccess(user, route, "create");
  const canEdit = canAccess(user, route, "edit");
  const canDelete = canAccess(user, route, "delete");

  const [deviceAssigned, devices, employees] = await Promise.all([
    getAssignedDevices(),
    getDevice(),
    getEmployee(),
  ]);

  return (
    <Card className="mt-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1>Device Assigned</h1>

          {canCreate && (
            <Button className="bg-blue-500 hover:bg-blue-600">
              <Link href="/admin/device-assigned/create">
                Add Device Assigned
              </Link>
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="w-full">
        <DeviceAssignedTable
          data={deviceAssigned}
          devices={devices as Device[]}
          employees={employees as Employee[]}
          canEdit={canEdit}
          canDelete={canDelete} 
        />
      </CardContent>
    </Card>
  );
};

export default DeviceAssignedPage;
