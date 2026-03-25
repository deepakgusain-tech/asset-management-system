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
import { deleteUser } from "@/lib/actions/user-action";
import { User } from "@/types";
import { EditIcon, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";

type Props = {
  data: User[];
  canEdit: boolean;
  canDelete: boolean;
};

const UserTable = ({ data, canEdit, canDelete }: Props) => {
  const [users, setUsers] = useState<User[]>(data);

  const deleteUserHandler = async (id: string) => {
    const res = await deleteUser(id);

    if (!res?.success) {
      toast.error("Error", { description: res?.message });
      return;
    }

    toast.success("Success", { description: res?.message });

    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {users.length === 0 && (
          <TableRow>
            <TableCell colSpan={6} className="text-center py-6">
              No users found
            </TableCell>
          </TableRow>
        )}

        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
              ) : (
                <span className="text-gray-400 text-sm">No Image</span>
              )}
            </TableCell>

            <TableCell>{user.name}</TableCell>

            <TableCell>{user.email}</TableCell>

            <TableCell>
              {user.status === "ACTIVE" ? (
                <Badge className="bg-green-500">ACTIVE</Badge>
              ) : (
                <Badge variant="destructive">INACTIVE</Badge>
              )}
            </TableCell>

            <TableCell>
              {user.createdAt &&
                format(new Date(user.createdAt), "PPP")}
            </TableCell>

            <TableCell className="flex gap-2">
              {canEdit && (
                <Button
                  asChild
                  size="icon"
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  <Link href={`/admin/user/edit/${user.id}`}>
                    <EditIcon size={16} />
                  </Link>
                </Button>
              )}

              {canDelete &&
                (() => {
                  const id = user.id;
                  if (!id) return null;

                  return (
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => deleteUserHandler(id)}
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

export default UserTable;
