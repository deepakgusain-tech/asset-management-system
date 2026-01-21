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
import {
  getRequestQuotations,
  deleteRequestQuotation,
} from "@/lib/actions/requestQuotation-action";
import { RequestQuotation } from "@/types";
import { EditIcon, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props {
  data: RequestQuotation[];
}

const RequestQuotationTable = ({ data }: Props) => {
  const [requests, setRequests] = useState<RequestQuotation[]>(data);

  // DELETE REQUEST QUOTATION
  const deleteHandler = async (id: string) => {
    const res = await deleteRequestQuotation(id);

    if (!res?.success) {
      toast.error("Error", { description: res?.message });
    } else {
      toast.success("Success", { description: res?.message });

      const response = await getRequestQuotations();
      setRequests(response?.data ?? []);
    }
  };

  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Requirement</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {requests.map((rq) => (
          <TableRow key={rq.id}>
            <TableCell>{rq.title}</TableCell>
            {/* <TableCell>
              {rq.requirement.length > 50
                ? rq.requirement.substring(0, 50) + "..."
                : rq.requirement
              }
            </TableCell> */}
            <TableCell>
              <div
                className="prose max-w-none line-clamp-3"
                dangerouslySetInnerHTML={{ __html: rq.requirement }}
              />
            </TableCell>
            <TableCell>
              {rq.status === "DRAFT" ? (
                <Badge className="bg-red-500">DRAFT</Badge>
              ) : (
                <Badge className="bg-green-500">SENT</Badge>
              )}
            </TableCell>
            <TableCell>
              {rq.createdAt ? new Date(rq.createdAt).toLocaleString() : "-"}
            </TableCell>
            <TableCell>
              <div className="flex gap-2">
                <Button
                  asChild
                  size="icon"
                  className="bg-orange-500 hover:bg-orange-600"
                >
                  <Link href={`/admin/requestQuotation/edit/${rq.id}`}>
                    <EditIcon size={16} />
                  </Link>
                </Button>

                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => deleteHandler(rq.id)}
                >
                  <Trash size={16} />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RequestQuotationTable;
