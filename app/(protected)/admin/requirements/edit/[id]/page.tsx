import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
<<<<<<< HEAD
import RequirementForm from '@/components/requirement/requirements-form';
import { getRequirementById } from '@/lib/actions/requirements';
import Link from 'next/link';

const RequirementEditPage = async ({params}: {params: Promise<{id: string}>}) => {
  const {id} = await params;
  const vendor = await getRequirementById(id)
=======
import VendorForm from '@/components/vendor/vendor-from';
import { getVendorById } from '@/lib/actions/vendor';
import { Vendor } from '@/types';
import Link from 'next/link';

const VendorEditPage = async ({params}: {params: Promise<{id: string}>}) => {
  const {id} = await params;
  const vendor = await getVendorById(id)
>>>>>>> 3916a672119b866df9e1393234dffac48f6b531a

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
<<<<<<< HEAD
          <h1 className="text-lg font-semibold">Edit requirements</h1>
          <Button variant="default" className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/requirements">Back</Link>
=======
          <h1 className="text-lg font-semibold">Edit Vendor</h1>
          <Button variant="default" className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/vendor">Back</Link>
>>>>>>> 3916a672119b866df9e1393234dffac48f6b531a
          </Button>
        </div>
      </CardHeader>

      <CardContent>
<<<<<<< HEAD
        <RequirementForm update={true} data={vendor.data} />
=======
        <VendorForm update={true} data={vendor.data} />
>>>>>>> 3916a672119b866df9e1393234dffac48f6b531a
      </CardContent>
    </Card>
  );
};

<<<<<<< HEAD
export default RequirementEditPage;
=======
export default VendorEditPage;
>>>>>>> 3916a672119b866df9e1393234dffac48f6b531a
