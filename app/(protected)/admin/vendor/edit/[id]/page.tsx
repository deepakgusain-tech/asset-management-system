// "use client";

// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import VendorForm, { Vendor } from '@/components/vendor/vendor-from';
// import Link from 'next/link';
// import React from 'react';

// // Dummy vendor data for UI preview
// const dummyVendor: Vendor = {
//   id: '1',
//   name: 'ABC Supplies',
//   email: 'abc@supplies.com',
//   phoneNumber: '1234567890',
//   vendorTypeId: '1',
//   address: '123 Market Street',
//   status: 'ACTIVE',
// };

// // Dummy vendor types for dropdown
// const dummyVendorTypes = [
//   { id: '1', name: 'Supplier' },
//   { id: '2', name: 'Distributor' },
//   { id: '3', name: 'Retailer' },
// ];

// const VendorEditPage = () => {
//   return (
//     <Card>
//       <CardHeader>
//         <div className="flex justify-between items-center">
//           <h1 className="text-lg font-semibold">Edit Vendor</h1>
//           <Button variant="default" className="bg-blue-500 hover:bg-blue-600">
//             <Link href="/admin/vendor">Back</Link>
//           </Button>
//         </div>
//       </CardHeader>

//       <CardContent>
//         <VendorForm
//           data={dummyVendor}          // Pre-filled dummy data
//           update={true}               // Edit mode
//           vendorTypes={dummyVendorTypes}
//           onSubmit={(values: Vendor) => {
//             // UI-only: log form data
//             console.log("Vendor form submitted (UI-only):", values);
//             alert("Vendor form submitted (UI-only)!");
//           }}
//         />
//       </CardContent>
//     </Card>
//   );
// };

// export default VendorEditPage;















"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import Link from 'next/link';
import React from 'react';

const VendorEditPage = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">Edit Vendor</h1>
          <Button variant="default" className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/vendor">Back</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {/* <VendorForm 
        //   vendorTypes={[]} // Empty array: dropdown is empty
          // No data, no onSubmit, purely UI
        /> */}
      </CardContent>
    </Card>
  );
};

export default VendorEditPage;
