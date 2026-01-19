// "use client";

// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow
// } from '@/components/ui/table';
// import { format } from 'date-fns';
// import { EditIcon, Trash } from 'lucide-react';
// import Link from 'next/link';
// import { useState } from 'react';
// import { toast } from 'sonner';

// // Dummy Vendor type
// interface Vendor {
//   id: string;
//   name: string;
//   email?: string;
//   phone?: string;
//   status: "ACTIVE" | "INACTIVE";
//   createdAt?: Date;
// }

// const VendorTable = ({ data }: { data: Vendor[] }) => {
//   const [vendors, setVendors] = useState<Vendor[]>(data);

//   // UI-only delete handler
//   const deleteVendorHandler = (id: string) => {
//     // Remove vendor from local state only
//     setVendors(vendors.filter(v => v.id !== id));
//     toast.success("Vendor removed (UI-only)");
//   };

//   return (
//     <Table className='w-full'>
//       <TableHeader>
//         <TableRow>
//           <TableHead>Vendor Name</TableHead>
//           <TableHead>Email</TableHead>
//           <TableHead>Phone Number</TableHead>
//           <TableHead>Status</TableHead>
//           <TableHead>Created At</TableHead>
//           <TableHead>Action</TableHead>
//         </TableRow>
//       </TableHeader>

//       <TableBody>
//         {vendors && vendors.length > 0 ? (
//           vendors.map((vendor) => (
//             <TableRow key={vendor.id}>
//               <TableCell>{vendor.name}</TableCell>
//               <TableCell>{vendor.email ?? "-"}</TableCell>
//               <TableCell>{vendor.phone ?? "-"}</TableCell>

//               <TableCell>
//                 {vendor.status === "ACTIVE" ? (
//                   <Badge variant="default" className='bg-green-500'>
//                     {vendor.status}
//                   </Badge>
//                 ) : (
//                   <Badge variant="destructive">
//                     {vendor.status}
//                   </Badge>
//                 )}
//               </TableCell>

//               <TableCell>
//                 {vendor.createdAt ? format(vendor.createdAt, "PPP") : "-"}
//               </TableCell>

//               <TableCell className='space-x-2'>
//                 <Button
//                   asChild
//                   variant="default"
//                   className='bg-orange-500 hover:bg-orange-600'
//                 >
//                   <Link href={`/admin/vendor/edit/${vendor.id}`}>
//                     <EditIcon />
//                   </Link>
//                 </Button>

//                 <Button
//                   variant="destructive"
//                   className='cursor-pointer'
//                   onClick={() => deleteVendorHandler(vendor.id)}
//                 >
//                   <Trash />
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))
//         ) : (
//           <TableRow>
//             <TableCell colSpan={6} className="text-center">
//               No vendors found
//             </TableCell>
//           </TableRow>
//         )}
//       </TableBody>
//     </Table>
//   );
// };

// export default VendorTable;









// "use client";

// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow
// } from '@/components/ui/table';
// import { EditIcon, Trash } from 'lucide-react';
// import Link from 'next/link';
// import React from 'react';

// const VendorTable = () => {
//   // Number of empty rows for UI preview
//   const emptyRows = Array.from({ length: 5 });

//   return (
//     <Table className='w-full'>
//       <TableHeader>
//         <TableRow>
//           <TableHead>Vendor Name</TableHead>
//           <TableHead>Email</TableHead>
//           <TableHead>Phone Number</TableHead>
//           <TableHead>Status</TableHead>
//           <TableHead>Created At</TableHead>
//           <TableHead>Action</TableHead>
//         </TableRow>
//       </TableHeader>

//       <TableBody>
//         {emptyRows.map((_, index) => (
//           <TableRow key={index}>
//             <TableCell>-</TableCell>
//             <TableCell>-</TableCell>
//             <TableCell>-</TableCell>
//             <TableCell>
//               <Badge variant="default" className='bg-gray-300'>
//                 -
//               </Badge>
//             </TableCell>
//             <TableCell>-</TableCell>
//             <TableCell className='space-x-2'>
//               <Button asChild variant="default" className='bg-gray-300 cursor-not-allowed'>
//                 <span>
//                   <EditIcon />
//                 </span>
//               </Button>

//               <Button variant="destructive" className='bg-gray-300 cursor-not-allowed'>
//                 <Trash />
//               </Button>
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// };

// export default VendorTable;



"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";

export default function VendorTableUI() {
  return (
    <div className="rounded-lg border bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vendor Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Vendor Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {/* Empty UI state */}
          <TableRow>
            <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
              No vendors available
            </TableCell>
          </TableRow>

          {/* 
          Future me yahan map lagega
          vendors.map(...)
          */}
        </TableBody>
      </Table>
    </div>
  );
}





