import DeviceAssignedForm from "@/components/device/assigned-device-form";
import DeviceCategoryForm from "@/components/device/device-category-form";
import DepartmentForm from "@/components/employee/department-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getDevice } from "@/lib/actions/device-action";
import { getEmployee } from "@/lib/actions/employee";
import { Device, Employee } from "@/types";
import Link from "next/link";
import React from "react";
import { prisma } from "@/lib/db/prisma-helper";

const DepartmentCreate = async () => {
  const devices = await prisma.device.findMany({
    where: {
      status: "ACTIVE",
      deviceState: "AVAILABLE",
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  
  const empoloyees = await getEmployee();

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1>Add Device Assigned</h1>
          <Button variant="default" className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/device-assigned">Back</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DeviceAssignedForm
          update={false}
          devices={devices as Device[]}
          employees={empoloyees as Employee[]}
        />
      </CardContent>
    </Card>
  );
};

export default DepartmentCreate;
