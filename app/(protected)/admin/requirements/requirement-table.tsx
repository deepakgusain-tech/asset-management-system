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
import { deleteRequirement, getRequirement } from "@/lib/actions/requirements";
import { Requirement } from "@/types";
import { format } from "date-fns";
import { EditIcon, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function RequirementTable({ requirement }: { requirement: Requirement[] }) {
  const [Requirement, setRequirements] = useState<Requirement[]>(requirement); 

  const deleteRequirementHandler = async (id: any) => {
    let res = await deleteRequirement(id);

    if (!res?.success) {
      toast.error("Error", {
        description: res?.message,
      });
    } else {
      toast.success("Success", {
        description: res?.message,
      });

      const response = await getRequirement();
      setRequirements(response as Requirement[]);
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
          {Requirement.map((Requirement) => (
            <TableRow key={Requirement.id}>
              <TableCell>{Requirement.id}</TableCell>
              <TableCell>{Requirement.model}</TableCell>
              <TableCell>{Requirement.warranty}</TableCell>
              <TableCell>{Requirement.createdAt && format(Requirement.createdAt, "PPP")}</TableCell>
              <TableCell>{Requirement.status}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    asChild
                    size="icon"
                    className="bg-orange-500 hover:bg-orange-600"
                  >
                    <Link href={`/admin/requirements/edit/${Requirement.id}`}>
                      <EditIcon size={16} />
                    </Link>
                  </Button>
                  <Button
                    size="icon"
                    variant="destructive"
                    onClick={() => deleteRequirementHandler(Requirement.id)}
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
