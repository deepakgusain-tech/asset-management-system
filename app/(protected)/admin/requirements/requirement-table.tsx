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

type Props = {
  requirement: Requirement[];
  canEdit: boolean;
  canDelete: boolean;
};

export default function RequirementTable({
  requirement,
  canEdit,
  canDelete,
}: Props) {
  const [requirements, setRequirements] = useState<Requirement[]>(requirement);

  const deleteRequirementHandler = async (id: string) => {
    const res = await deleteRequirement(id);

    if (!res?.success) {
      toast.error("Error", { description: res?.message });
    } else {
      toast.success("Success", { description: res?.message });

      const updated = await getRequirement();
      setRequirements(updated as Requirement[]);
    }
  };

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Warranty</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {requirements.length > 0 ? (
            requirements.map((req) => (
              <TableRow key={req.id}>
                <TableCell>{req.id}</TableCell>
                <TableCell>{req.model}</TableCell>
                <TableCell>{req.warranty}</TableCell>
                <TableCell>{req.status}</TableCell>

                <TableCell>
                  {req.createdAt ? format(req.createdAt, "PPP") : "-"}
                </TableCell>

                <TableCell>
                  <div className="flex gap-2">
                    {canEdit && (
                      <Button
                        asChild
                        size="icon"
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        <Link href={`/admin/requirements/edit/${req.id}`}>
                          <EditIcon size={16} />
                        </Link>
                      </Button>
                    )}

                    {canDelete && (
                      <Button
                        size="icon"
                        variant="destructive"
                        onClick={() =>
                          req.id && deleteRequirementHandler(req.id)
                        }
                      >
                        <Trash size={16} />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-4">
                No requirements found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
