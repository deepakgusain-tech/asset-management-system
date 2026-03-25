"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { deleteVendor } from "@/lib/actions/vendor";
import { Vendor } from "@/types";
import { format } from "date-fns";
import { EditIcon, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  vendor: Vendor[];
  canEdit: boolean;
  canDelete: boolean;
};

export default function VendorTable({
  vendor,
  canEdit,
  canDelete,
}: Props) {
  const [vendors, setVendors] = useState<Vendor[]>(vendor);

  const deleteVendorHandler = async (id: string) => {
    const res = await deleteVendor(id);

    if (!res?.success) {
      toast.error("Error", {
        description: res?.message,
      });
      return;
    }

    toast.success("Success", {
      description: res?.message,
    });

    setVendors((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {vendors.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-6">
                No vendors found
              </TableCell>
            </TableRow>
          )}

          {vendors.map((vendor) => (
            <TableRow key={vendor.id}>
              <TableCell>{vendor.name}</TableCell>
              <TableCell>{vendor.email}</TableCell>
              <TableCell>{vendor.phone}</TableCell>
              <TableCell>{vendor.status}</TableCell>

              <TableCell>
                {vendor.createdAt
                  ? format(new Date(vendor.createdAt), "PPP")
                  : "-"}
              </TableCell>

              <TableCell>
                <div className="flex gap-2">
                  
                  {canEdit && (
                    <Button
                      asChild
                      size="icon"
                      className="bg-orange-500 hover:bg-orange-600"
                    >
                      <Link href={`/admin/vendor/edit/${vendor.id}`}>
                        <EditIcon size={16} />
                      </Link>
                    </Button>
                  )}

                  {canDelete &&
                    (() => {
                      const id = vendor.id;
                      if (!id) return null;

                      return (
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => deleteVendorHandler(id)}
                        >
                          <Trash size={16} />
                        </Button>
                      );
                    })()}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}