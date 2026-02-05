import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import VendorForm from '@/components/vendor/vendor-from';
import { getVendorById } from '@/lib/actions/vendor';
import { Vendor } from '@/types';
import Link from 'next/link';

const VendorEditPage = async ({params}: {params: Promise<{id: string}>}) => {
  const {id} = await params;
  const vendor = await getVendorById(id)

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
        <VendorForm update={true} data={vendor.data} />
      </CardContent>
    </Card>
  );
};

export default VendorEditPage;
