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
import { deleteEmployee } from "@/lib/actions/employee";
import { Employee } from "@/types";
import { format } from "date-fns";
import { EditIcon, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  data: Employee[];
  canEdit: boolean;
  canDelete: boolean;
};

const EmployeeTable = ({ data, canEdit, canDelete }: Props) => {
  const [employees, setEmployees] = useState<Employee[]>(data);

  const deleteEmployeeHandler = async (id: string) => {
    const res = await deleteEmployee(id);

    if (!res?.success) {
      toast.error("Error", { description: res?.message });
    } else {
      toast.success("Success", { description: res?.message });

      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    }
  };

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>First Name</TableHead>
          <TableHead>Last Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>DOB</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {employees.length === 0 && (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-6">
              No employees found
            </TableCell>
          </TableRow>
        )}

        {employees.map((employee) => (
          <TableRow key={employee.id}>
            <TableCell>{employee.first_name}</TableCell>
            <TableCell>{employee.last_name}</TableCell>
            <TableCell>{employee.email}</TableCell>
            <TableCell>{employee.phoneNumber}</TableCell>

            <TableCell>
              {employee.dateOfBirth &&
                format(new Date(employee.dateOfBirth), "PPP")}
            </TableCell>

            <TableCell>
              {employee.status === "ACTIVE" ? (
                <Badge className="bg-green-500">ACTIVE</Badge>
              ) : (
                <Badge variant="destructive">INACTIVE</Badge>
              )}
            </TableCell>

            <TableCell>
              {employee.createdAt &&
                format(new Date(employee.createdAt), "PPP")}
            </TableCell>

            <TableCell className="flex gap-2">
              {canEdit && (
                <Button asChild className="bg-orange-500 hover:bg-orange-600">
                  <Link href={`/admin/employee/edit/${employee.id}`}>
                    <EditIcon size={16} />
                  </Link>
                </Button>
              )}

              {canDelete &&
                (() => {
                  const id = employee.id;

                  if (!id) return null;

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

export default EmployeeTable;
