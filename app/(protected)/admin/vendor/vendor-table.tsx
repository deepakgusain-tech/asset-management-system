"use client";

import { useEffect, useState } from "react";
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
import { EditIcon, Trash } from 'lucide-react';
import Link from 'next/link'
import { deleteVendor, getVendors } from "@/lib/actions/vendor-action";

export default function VendorTable({ data }: { data: any[] }) {
  const [vendors, setVendors] = useState(data);

  const handleDelete = async (id: string) => {
    await deleteVendor(id);
    setVendors(await getVendors());
  };

  useEffect(() => {
  }, [vendors.length])

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          {/* <TableHead>Type</TableHead> */}
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {vendors.map((vendor) => (
          <TableRow key={vendor.id}>
            <TableCell>{vendor.name}</TableCell>
            <TableCell>{vendor.email}</TableCell>
            <TableCell>{vendor.phoneNumber}</TableCell>
            {/* <TableCell>{v.vendorType}</TableCell> */}
            <TableCell>
              <Badge variant="default" className='bg-green-500'>{vendor.status}</Badge>
            </TableCell>
            <TableCell>{new Date(vendor.createdAt).toLocaleDateString()}</TableCell>

                   <TableCell className='space-x-2'>
                            <Button asChild variant="default" className='bg-orange-500 hover:bg-orange-600'>
                                <Link href={`/admin/vendor/edit/${vendor.id}`}>
                                    <EditIcon />
                                </Link>
                            </Button>
                            <Button variant="destructive" className='cursor-pointer' onClick={() => handleDelete(vendor.id)}>
                                <Trash />
                            </Button>
                        </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
