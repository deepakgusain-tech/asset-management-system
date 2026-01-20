// import VendorTable from "./vendor-table";

// export default function VendorPage() {
//   return (
//     <div className="p-6 space-y-4">
//       <h1 className="text-xl font-semibold">Vendors</h1>
//       <VendorTable />
//     </div>
//   );
// }




// import { Button } from '@/components/ui/button'
// import { Card, CardContent, CardHeader } from '@/components/ui/card'
// import Link from 'next/link'
// import React from 'react'

// import { User } from '@/types'

// import { getUsers } from '@/lib/actions/user-action'
// import VendorTable from './vendor-table'

// const VendorPage = async () => {
//     const users = await getUsers();
  
//     return (
//         <Card>
//             <CardHeader>
//                 <div className='flex justify-between items-center'>
//                     <h1>Vendor</h1>
//                     <Button variant="default" className='bg-blue-500 hover:bg-blue-600'>
//                         <Link href="user/create">Add Vendor</Link>
//                     </Button>
//                 </div>
//             </CardHeader>
//             <CardContent className='w-full'>
//                 <VendorTable data={users as User[]} />
//             </CardContent>
//         </Card>
//     )
// }

// export default VendorPage




// import { getVendors } from "@/lib/actions/vendor-action";
// import VendorTable from "./vendor-table";

// export default async function VendorPage() {
//   const vendors = await getVendors();

//   return (
//     <div className="p-6">
//       <VendorTable data={vendors} />
//     </div>
//   );
// }



import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

import { Vendor } from '@/types'
import VendorTable from './vendor-table'
import { getUsers } from '@/lib/actions/user-action'
import { getVendors } from '@/lib/actions/vendor-action'

const VendorPage = async () => {
    const vendors = await getVendors();
  
    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <h1>Vendor</h1>
                    <Button variant="default" className='bg-blue-500 hover:bg-blue-600'>
                        <Link href="vendor/create">Add Vendor</Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent className='w-full'>
                {/* <VendorTable data={vendors as Vendor[]} /> */}
                <VendorTable data={vendors} />
            </CardContent>
        </Card>
    )
}

export default VendorPage







