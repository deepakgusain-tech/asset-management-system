import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import RequirementTable from "./requirement-table";
import { getRequirement } from "@/lib/actions/requirements";
import { Requirement } from "@/types";


const requirementsPage = async () => {
  const requirement  = await getRequirement();
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">Requirement</h1>
          <Button variant="default" className="bg-blue-500 hover:bg-blue-600 text-white">
            <Link href="/admin/requirements/create">Add Requirements</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="w-full">
          <RequirementTable requirement={requirement as Requirement[]} />
      </CardContent>
    </Card>
  );
};

export default requirementsPage;
