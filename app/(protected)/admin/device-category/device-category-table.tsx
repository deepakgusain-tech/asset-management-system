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
  deleteCategoryDevice,
  getDeviceCategory,
} from "@/lib/actions/device-category-action";
import { DeviceCategory } from "@/types";
import { EditIcon, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  data: DeviceCategory[];
  canEdit: boolean;
  canDelete: boolean;
};

const DeviceCategoryTable = ({ data, canEdit, canDelete }: Props) => {
  const [categories, setCategories] = useState<DeviceCategory[]>(data);

  const deleteDeviceCategoryHandler = async (id: string) => {
    const res = await deleteCategoryDevice(id);

    if (!res?.success) {
      toast.error("Error", { description: res?.message });
    } else {
      toast.success("Success", { description: res?.message });

      const updated = await getDeviceCategory();
      setCategories(updated);
    }
  };

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>CreatedAt</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {categories?.length > 0 ? (
          categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>

              <TableCell>
                {category.status === "ACTIVE" ? (
                  <Badge className="bg-green-500">ACTIVE</Badge>
                ) : (
                  <Badge variant="destructive">INACTIVE</Badge>
                )}
              </TableCell>

              <TableCell>{category.createdAt?.toLocaleString()}</TableCell>

              <TableCell className="flex gap-2">
                {canEdit && (
                  <Button asChild className="bg-orange-500 hover:bg-orange-600">
                    <Link href={`/admin/device-category/edit/${category.id}`}>
                      <EditIcon />
                    </Link>
                  </Button>
                )}

                {canDelete && (
                  <Button
                    variant="destructive"
                    onClick={() => category.id && deleteDeviceCategoryHandler(category.id)}
                  >
                    <Trash />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-4">
              No categories found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DeviceCategoryTable;
