"use client";

import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

import { deleteDeviceAssigned, getAssignedDevices } from "@/lib/actions/device-assigned-action";
import { Device, DeviceAssigned, Employee } from "@/types";

import { EditIcon, Trash, Info } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  data: DeviceAssigned[];
  devices: Device[];
  employees: Employee[];
  canEdit: boolean;     
  canDelete: boolean;   
};

const DeviceAssignedTable = ({
  data,
  devices,
  employees,
  canEdit,
  canDelete,
}: Props) => {

  const [assignedDevice, setAssignedDevice] = useState<DeviceAssigned[]>(data);

  const deleteDeviceAssignedHandler = async (id: string) => {
    const res = await deleteDeviceAssigned(id);

    if (!res?.success) {
      toast.error("Error", { description: res?.message });
    } else {
      toast.success("Success", { description: res?.message });

      const response = await getAssignedDevices();
      setAssignedDevice(response);
    }
  };

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Device</TableHead>
          <TableHead>Employee</TableHead>
          <TableHead>Assigned Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>CreatedAt</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {assignedDevice?.map((item) => (
          <TableRow key={item.id}>

            <TableCell>
              {devices.find(d => d.id === item.deviceId)?.name}
            </TableCell>

            <TableCell>
              {employees.find(e => e.id === item.employeeId)?.first_name}
            </TableCell>

            <TableCell>{item.assignedDate?.toLocaleString()}</TableCell>
            <TableCell>{item.status}</TableCell>
            <TableCell>{item.createdAt?.toLocaleString()}</TableCell>

            <TableCell className="flex gap-2">

              <Button asChild variant="outline">
                <Link href={`/admin/device/${item.deviceId}/history?assignedId=${item.id}`}>
                  <Info />
                </Link>
              </Button>

              {canEdit && (
                <Button asChild className="bg-orange-500 hover:bg-orange-600">
                  <Link href={`/admin/device-assigned/edit/${item.id}`} >
                    <EditIcon />
                  </Link>
                </Button>
              )}

              {canDelete && (
                <Button
                  variant="destructive"
                  onClick={() => item.id && deleteDeviceAssignedHandler(item.id)}
                >
                  <Trash />
                </Button>
              )}

            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DeviceAssignedTable;
