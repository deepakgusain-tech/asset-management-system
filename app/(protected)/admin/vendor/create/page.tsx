// "use client";

// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import VendorForm, { Vendor } from '@/components/vendor/vendor-from'; // fixed import
// import Link from 'next/link';
// import React from 'react';

// // Dummy vendor types for dropdown
// const dummyVendorTypes = [
//   { id: '1', name: 'Supplier' },
//   { id: '2', name: 'Distributor' },
//   { id: '3', name: 'Retailer' },
// ];

// const VendorCreatePage = () => {
//   return (
//     <Card>
//       <CardHeader>
//         <div className='flex justify-between items-center'>
//           <h1 className="text-lg font-semibold">Add Vendor</h1>
//           <Button
//             variant="default"
//             className='bg-blue-500 hover:bg-blue-600'
//           >
//             <Link href="/admin/vendor">Back</Link>
//           </Button>
//         </div>
//       </CardHeader>

//       <CardContent>
//         <VendorForm
//           update={false}                 // Create mode
//           vendorTypes={dummyVendorTypes} // Dropdown options
//           // UI-only onSubmit
//           onSubmit={ (values: Vendor) => {
//             console.log("Vendor form submitted (UI-only):", values);
//             alert("Vendor form submitted (UI-only)!");
//           }}
//         />
//       </CardContent>
//     </Card>
//   );
// };

// export default VendorCreatePage;










"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
// import VendorForm from '@/components/vendor/vendor-from'; // import the UI-only form
import Link from 'next/link';
import React from 'react';

const VendorCreatePage = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">Add Vendor</h1>
          <Button
            variant="default"
            className="bg-blue-500 hover:bg-blue-600"
          >
            <Link href="/admin/vendor">Back</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {/* <VendorForm 
        //  vendorTypes={[]} // empty array, just UI
        
        />
        */}
      </CardContent>
    </Card>
  );
};

export default VendorCreatePage;