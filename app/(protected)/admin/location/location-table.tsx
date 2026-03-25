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
import { deleteLocation } from "@/lib/actions/location";
import { Location } from "@/types";
import { EditIcon, Trash } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  data: Location[];
  canEdit: boolean;
  canDelete: boolean;
};

const LocationTable = ({ data, canEdit, canDelete }: Props) => {
  const [locations, setLocations] = useState<Location[]>(data);

  const deleteLocationHandler = async (id: string) => {
    const res = await deleteLocation(id);

    if (!res?.success) {
      toast.error("Error", { description: res?.message });
    } else {
      toast.success("Success", { description: res?.message });
      setLocations((prev) => prev.filter((loc) => loc.id !== id));
    }
  };

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Street</TableHead>
          <TableHead>City</TableHead>
          <TableHead>Country</TableHead>
          <TableHead>Postal Code</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {locations.length === 0 && (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-6">
              No locations found
            </TableCell>
          </TableRow>
        )}

        {locations.map((location) => (
          <TableRow key={location.id}>
            <TableCell>{location.name}</TableCell>
            <TableCell>{location.streetAddress}</TableCell>
            <TableCell>{location.city}</TableCell>
            <TableCell>{location.country}</TableCell>
            <TableCell>{location.postalCode}</TableCell>

            <TableCell>
              {location.status === "ACTIVE" ? (
                <Badge className="bg-green-500">ACTIVE</Badge>
              ) : (
                <Badge variant="destructive">INACTIVE</Badge>
              )}
            </TableCell>

            <TableCell>
              {location.createdAt?.toLocaleString()}
            </TableCell>

            <TableCell className="flex gap-2">
              
              {canEdit && (
                <Button asChild className="bg-orange-500 hover:bg-orange-600">
                  <Link href={`/admin/location/edit/${location.id}`}>
                    <EditIcon size={16} />
                  </Link>
                </Button>
              )}

              {canDelete &&
                (() => {
                  const id = location.id;

                  if (!id) return null;

                        function deleteLocationHandler(id: string): void {
                            throw new Error("Function not implemented.");
                        }

                  return (
                    <Button
                      variant="destructive"
                      onClick={() => deleteLocationHandler(id)}
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

export default LocationTable;