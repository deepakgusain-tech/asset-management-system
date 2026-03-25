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
import { deleteRole } from "@/lib/actions/role-action";
import { Role } from "@/types";
import { EditIcon, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";

type Props = {
  data: Role[];
  canEdit: boolean;
  canDelete: boolean;
};

const RoleTable = ({ data, canEdit, canDelete }: Props) => {
  const [roles, setRoles] = useState<Role[]>(data);

  const deleteRoleHandler = async (id: string) => {
    const res = await deleteRole(id);

    if (!res?.success) {
      toast.error("Error", { description: res?.message });
      return;
    }

    toast.success("Success", { description: res?.message });

    setRoles((prev) => prev.filter((role) => role.id !== id));
  };

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {roles.length === 0 && (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-6">
              No roles found
            </TableCell>
          </TableRow>
        )}

        {roles.map((role) => (
          <TableRow key={role.id}>
            <TableCell>{role.name}</TableCell>

            <TableCell>
              {role.status === "ACTIVE" ? (
                <Badge className="bg-green-500">ACTIVE</Badge>
              ) : (
                <Badge variant="destructive">INACTIVE</Badge>
              )}
            </TableCell>

            <TableCell>
              {role.createdAt &&
                format(new Date(role.createdAt), "PPP")}
            </TableCell>

            <TableCell className="flex gap-2">
              {canEdit && (
                <Button asChild className="bg-orange-500 hover:bg-orange-600">
                  <Link href={`/admin/role/edit/${role.id}`}>
                    <EditIcon size={16} />
                  </Link>
                </Button>
              )}

              {canDelete &&
                (() => {
                  const id = role.id;
                  if (!id) return null;

                  return (
                    <Button
                      variant="destructive"
                      onClick={() => deleteRoleHandler(id)}
                    >
                      <Trash size={16} />
                    </Button>
                  );
                })()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RoleTable;