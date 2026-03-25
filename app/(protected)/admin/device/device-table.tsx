"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  deleteDevice,
  retireDevice,
  getDevice,
} from "@/lib/actions/device-action";
import { Device } from "@/types";
import { format } from "date-fns";
import { EditIcon, Trash, Info } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

const DeviceTable = ({
  data,
  canEdit,
  canDelete,
}: {
  data: Device[];
  canEdit: boolean;
  canDelete: boolean;
}) => {
  const [device, setDevice] = useState<Device[]>(data);
  const [open, setOpen] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  const retireDeviceHandler = async (id: string) => {
    let res = await retireDevice(id);

    if (!res?.success) {
      toast.error("Error", {
        description: res?.message,
      });
    } else {
      toast.success("Success", {
        description: res?.message,
      });

      const response = await getDevice();
      setDevice(response as unknown as Device[]);
    }
  };

  const deleteDeviceHandler = async (id: string) => {
    let res = await deleteDevice(id);

    if (!res?.success) {
      toast.error("Error", {
        description: res?.message,
      });
    } else {
      toast.success("Success", {
        description: res?.message,
      });

      const response = await getDevice();

      setDevice(response as Device[]);
    }
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Serial Number</TableHead>
            <TableHead>Manufacturer</TableHead>
            <TableHead>Purchased Date</TableHead>
            <TableHead>Warranty End</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>State</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {device &&
            device.length > 0 &&
            device.map((device) => (
              <TableRow key={device.id}>
                <TableCell>{device.name}</TableCell>
                <TableCell>{device.serialNumber}</TableCell>
                <TableCell>{device.manufacturer}</TableCell>
                <TableCell>
                  {device.purchaseDate && format(device.purchaseDate, "PPP")}
                </TableCell>
                <TableCell>
                  {device.warrantyEnd && format(device.warrantyEnd, "PPP")}
                </TableCell>
                <TableCell>
                  {device.status === "ACTIVE" ? (
                    <Badge variant="default" className="bg-green-500">
                      {device.status}
                    </Badge>
                  ) : (
                    <Badge variant="destructive">{device.status}</Badge>
                  )}
                </TableCell>
                <TableCell>
                  {device.deviceState === "AVAILABLE" && (
                    <Badge className="bg-green-500">AVAILABLE</Badge>
                  )}

                  {device.deviceState === "ASSIGNED" && (
                    <Badge className="bg-blue-500">ASSIGNED</Badge>
                  )}

                  {device.deviceState === "REPAIR" && (
                    <Badge className="bg-yellow-500">REPAIR</Badge>
                  )}

                  {device.deviceState === "REPAIRING" && (
                    <Badge className="bg-orange-500">REPAIRING</Badge>
                  )}

                  {device.deviceState === "RETIRED" && (
                    <Badge variant="destructive">RETIRED</Badge>
                  )}
                </TableCell>
                <TableCell className="space-x-3">
                  <Link href={`/admin/device/${device.id}/history`}>
                    <Button variant="secondary">
                      <Info />
                    </Button>
                  </Link>

                  {canEdit && (
                    <Link href={`/admin/device/edit/${device.id}`}>
                      <Button className="bg-orange-500 hover:bg-orange-600">
                        <EditIcon />
                      </Button>
                    </Link>
                  )}

                  {canDelete && (
                    <Button
                      variant="destructive"
                      onClick={() => {
                        setSelectedDevice(device.id as string);
                        setOpen(true);
                      }}
                    >
                      <Trash />
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              What would you like to do with this device?
            </AlertDialogTitle>
          </AlertDialogHeader>

          <div className="flex gap-3 justify-end">
            {canEdit && (
              <Button
                variant="secondary"
                onClick={() => {
                  if (selectedDevice) retireDeviceHandler(selectedDevice);
                  setOpen(false);
                }}
              >
                Retire Device
              </Button>
            )}

            {canDelete && (
              <Button
                variant="destructive"
                onClick={() => {
                  if (selectedDevice) deleteDeviceHandler(selectedDevice);
                  setOpen(false);
                }}
              >
                Delete Permanently
              </Button>
            )}
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default DeviceTable;
