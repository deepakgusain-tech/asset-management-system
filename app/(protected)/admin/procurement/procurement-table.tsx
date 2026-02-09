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
import { deleteProcurement, getProcurement } from "@/lib/actions/procurement";
import { Procurement } from "@/types";
import { format } from "date-fns";
import { EditIcon, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function ProcurementTable({ data }: { data: Procurement[] }) {
  const [procurement, setProcurements] = useState<Procurement[]>(data);

  const deletePocurementHandler = async (id: any) => {
    let res = await deleteProcurement(id);

    if (!res?.success) {
      toast.error("Error", {
        description: res?.message,
      });
    } else {
      toast.success("Success", {
        description: res?.message,
      });

      const response = await getProcurement();
      setProcurements(response as Procurement[]);
    }
  };

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Requirement ID</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Warranty</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {procurement.map((proc) => (
            <TableRow key={proc.id}>
              <TableCell>{proc.id}</TableCell>
              <TableCell>{proc.model}</TableCell>
              <TableCell>{proc.warranty}</TableCell>
              <TableCell>{proc.createdAt && format(proc.createdAt, "PPP")}</TableCell>
              <TableCell>{proc.status}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    asChild
                    size="icon"
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    <Link href={`/admin/procs/edit/${proc.id}`}>
                      <EditIcon size={16} />
                    </Link>
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => deletePocurementHandler(proc.id)}
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
