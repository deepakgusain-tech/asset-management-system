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
import { deleteDepartment } from "@/lib/actions/department";
import { Department } from "@/types";
import { EditIcon, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  data: Department[];
  canEdit: boolean;
  canDelete: boolean;
};

const DepartmentTable = ({ data, canEdit, canDelete }: Props) => {
  const [departments, setDepartments] = useState<Department[]>(data);

  const deleteDepartmentHandler = async (id: string) => {
    const res = await deleteDepartment(id);

    if (!res?.success) {
      toast.error("Error", { description: res?.message });
    } else {
      toast.success("Success", { description: res?.message });

      setDepartments((prev) => prev.filter((d) => d.id !== id));
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {departments.length === 0 && (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-6">
              No departments found
            </TableCell>
          </TableRow>
        )}

        {departments.map((department) => (
          <TableRow key={department.id}>
            <TableCell>{department.name}</TableCell>

            <TableCell>
              {department.status === "ACTIVE" ? (
                <Badge className="bg-green-500">ACTIVE</Badge>
              ) : (
                <Badge variant="destructive">INACTIVE</Badge>
              )}
            </TableCell>

            <TableCell>
              {department.createdAt?.toLocaleString()}
            </TableCell>

            <TableCell className="flex gap-2">

              {canEdit && (
                <Button asChild className="bg-orange-500">
                  <Link href={`/admin/department/edit/${department.id}`}>
                    <EditIcon size={16} />
                  </Link>
                </Button>
              )}
              {canDelete &&
                (() => {
                  const id = department.id;

                  if (!id) return null;

                        function deleteEmployeeHandler(id: string): void {
                            throw new Error("Function not implemented.");
                        }

                  return (
                    <Button
                      variant="destructive"
                      onClick={() => deleteEmployeeHandler(id)}
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

export default DepartmentTable;