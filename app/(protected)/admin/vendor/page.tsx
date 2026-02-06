import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import VendorTable from "./vendor-table";
import { getVendors } from "@/lib/actions/vendor";
import { Vendor } from "@/types";

const VendorPage = async () => {
  const vendor = await getVendors();
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">Vendor</h1>
          <Button variant="default" className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/vendor/create">Add Vendor</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="w-full">
          <VendorTable vendor={vendor as Vendor[]} />
      </CardContent>
    </Card>
  );
};

export default VendorPage;
