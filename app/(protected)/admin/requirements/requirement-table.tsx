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
import { deleteVendor, getVendors } from "@/lib/actions/vendor";
import { Requirement, Vendor } from "@/types";
import { format } from "date-fns";
import { EditIcon, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function RequirementTable({ requirement }: { requirement: Requirement[] }) {
  const [requirements, setRequirements] = useState<Requirement[]>(requirement);

  const deleteVendorHandler = async (id: any) => {
    let res = await deleteVendor(id);

    if (!res?.success) {
      toast.error("Error", {
        description: res?.message,
      });
    } else {
      toast.success("Success", {
        description: res?.message,
      });

      const response = await ();
      setRequirements(response as Requirement[]);
    }
  };

  return (
    <div className="rounded-lg border bg-white">
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
          {vendors.map((vendor) => (
            <TableRow key={vendor.id}>
              <TableCell>{vendor.name}</TableCell>
              <TableCell>{vendor.email}</TableCell>
              <TableCell>{vendor.phone}</TableCell>
              <TableCell>{vendor.status}</TableCell>
              <TableCell>{vendor.createdAt && format(vendor.createdAt, "PPP")}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    asChild
                    size="icon"
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    <Link href={`/admin/vendor/edit/${vendor.id}`}>
                      <EditIcon size={16} />
                    </Link>
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => deleteVendorHandler(vendor.id)}
                  >
                    <Trash size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
