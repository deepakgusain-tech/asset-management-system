// "use client";

// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import Link from 'next/link';
// import React from 'react';
// import VendorTable from './vendor-table';

// // Vendor type for UI-only
// interface Vendor {
//   id: string;
//   name: string;
//   email?: string;
//   phoneNumber?: string;
//   vendorType: string;
//   address?: string;
//   status: "ACTIVE" | "INACTIVE";
//   createdAt?: Date;
// }

// // Dummy vendors (status must be "ACTIVE" | "INACTIVE")
// const dummyVendors: Vendor[] = [
//   {
//     id: '1',
//     name: 'ABC Supplies',
//     email: 'abc@supplies.com',
//     phoneNumber: '1234567890',
//     vendorType: 'Supplier',
//     address: '123 Market Street',
//     status: "ACTIVE",
//     createdAt: new Date(),
//   },
//   {
//     id: '2',
//     name: 'XYZ Distributors',
//     email: 'xyz@distributors.com',
//     phoneNumber: '9876543210',
//     vendorType: 'Distributor',
//     address: '456 Commerce Ave',
//     status: "INACTIVE",
//     createdAt: new Date(),
//   },
// ];

// const VendorPage = () => {
//   return (
//     <Card>
//       <CardHeader>
//         <div className="flex justify-between items-center">
//           <h1 className="text-lg font-semibold">Vendor</h1>
//           <Button
//             variant="default"
//             className="bg-blue-500 hover:bg-blue-600"
//           >
//             <Link href="/admin/vendor/create">Add Vendor</Link>
//           </Button>
//         </div>
//       </CardHeader>

//       <CardContent className="w-full">
//         <VendorTable data={dummyVendors} />
//       </CardContent>
//     </Card>
//   );
// };

// export default VendorPage;






// "use client";

// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import Link from 'next/link';
// import React from 'react';
// import VendorTable from './vendor-table';

// const VendorPage = () => {
//   return (
//     <Card>
//       <CardHeader>
//         <div className="flex justify-between items-center">
//           <h1 className="text-lg font-semibold">Vendor</h1>
//           <Button
//             variant="default"
//             className="bg-blue-500 hover:bg-blue-600"
//           >
//             <Link href="/admin/vendor/create">Add Vendor</Link>
//           </Button>
//         </div>
//       </CardHeader>

//       <CardContent className="w-full">
//         {/* Table structure only, no data */}
//         {/* <VendorTable data={[]} /> */}
//       </CardContent>
//     </Card>
//   );
// };

// export default VendorPage;















import VendorTableUI from "./vendor-table";

export default function VendorPage() {
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Vendors</h1>
      <VendorTableUI />
    </div>
  );
}









