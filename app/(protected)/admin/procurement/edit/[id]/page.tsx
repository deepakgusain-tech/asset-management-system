import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import RequirementForm from '@/components/requirement/requirements-form';
import { getRequirementById } from '@/lib/actions/requirements';
import Link from 'next/link';
import { Vendor } from '@/types';
import { getVendors } from '@/lib/actions/vendor';

const RequirementEditPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const requirement = await getRequirementById(id)  
  const vendors = await getVendors();


  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">Edit requirements</h1>
          <Button variant="default" className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/requirements">Back</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <RequirementForm update={true} data={requirement.data} vendors={vendors as Vendor[]} />
      </CardContent>
    </Card>
  );
};

export default RequirementEditPage;
