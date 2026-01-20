import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { getUserById } from "@/lib/actions/user-action";
import { Vendor } from "@/types";
import Link from "next/link";
import React from "react";
import { getRoles } from "@/lib/actions/role-action";
import { promises } from "dns";
import VendorForm from "@/components/vendor/vendor-from";
import { getVendorById } from "@/lib/actions/vendor-action";
// import { getVendorTypes } from '@/lib/actions/vendor-type-action'

type Props = {
  params: Promise<{ id: string }>;
};

const VendorEditPage = async ({ params }: Props) => {
  const { id } = await params;

  const res = await getVendorById(id);

  console.log(res);
  

  console.log(res);
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1>Edit Vendor</h1>
          <Button variant="default" className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/vendor">Back</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <VendorForm data={res.data} update={true} />
      </CardContent>
    </Card>
  );
};

export default VendorEditPage;
