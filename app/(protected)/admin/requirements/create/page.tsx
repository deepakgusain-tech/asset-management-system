import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import RequirementForm from "@/components/requirement/requirements-form";
import { getVendors } from "@/lib/actions/vendor";
import Link from "next/link";
import React from "react";
import { Vendor } from "@/types";

const RequirementCreatePage = async () => {

  const vendors = await getVendors();

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">Add requirements</h1>
          <Button variant="default" className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/requirements">Back</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
          <RequirementForm update={false} vendors={vendors as Vendor[]}/>
      </CardContent>
    </Card>
  );
};

export default RequirementCreatePage;
