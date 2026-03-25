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
import { deleteModule } from "@/lib/actions/module-action";
import { Module } from "@/types";
import { EditIcon, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";

type Props = {
  data: Module[];
  canEdit: boolean;
  canDelete: boolean;
};

const ModuleTable = ({ data, canEdit, canDelete }: Props) => {
  const [modules, setModules] = useState<Module[]>(data);

  const deleteModuleHandler = async (id: string) => {
    const res = await deleteModule(id);

    if (!res?.success) {
      toast.error("Error", { description: res?.message });
      return;
    }

    toast.success("Success", { description: res?.message });

    setModules((prev) => prev.filter((mod) => mod.id !== id));
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
        {modules.length === 0 && (
          <TableRow>
            <TableCell colSpan={4} className="text-center py-6">
              No modules found
            </TableCell>
          </TableRow>
        )}

        {modules.map((module) => (
          <TableRow key={module.id}>
            <TableCell>{module.name}</TableCell>

            <TableCell>
              {module.status === "ACTIVE" ? (
                <Badge className="bg-green-500">ACTIVE</Badge>
              ) : (
                <Badge variant="destructive">INACTIVE</Badge>
              )}
            </TableCell>

            <TableCell>
              {module.createdAt &&
                format(new Date(module.createdAt), "PPP")}
            </TableCell>

            <TableCell className="flex gap-2">
              {canEdit && (
                <Button asChild className="bg-orange-500 hover:bg-orange-600">
                  <Link href={`/admin/module/edit/${module.id}`}>
                    <EditIcon size={16} />
                  </Link>
                </Button>
              )}

              {canDelete &&
                (() => {
                  const id = module.id;

                  if (!id) return null;

                  return (
                    <Button
                      variant="destructive"
                      onClick={() => deleteModuleHandler(id)}
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

export default ModuleTable;
