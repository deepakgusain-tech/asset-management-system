import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import UserForm from "@/components/user/user-form";
import VendorForm from "@/components/vendor/vendor-from";
import { getUsers } from "@/lib/actions/user-action";
import Link from "next/link";
import React from "react";
import { getRoles } from "@/lib/actions/role-action";
// import { getVendorTypes } from '@/lib/actions/vendor-type-action'

const VendorCreatePage = async () => {
  // const vendorType = await getVendorTypes()

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1>Add vendor</h1>
          <Button variant="default" className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/vendor">Back</Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <VendorForm update={false} />
      </CardContent>
    </Card>
  );
};

export default VendorCreatePage;
