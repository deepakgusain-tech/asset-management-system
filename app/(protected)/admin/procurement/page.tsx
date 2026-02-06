import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import RequirementTable from "./procurement-table";
import { getRequirement } from "@/lib/actions/requirements";
import { Procurement, Requirement } from "@/types";
import { getProcurement } from "@/lib/actions/procurement";


const procurementPage = async () => {
  const procurement  = await getProcurement();

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1 className="text-lg font-semibold">Procurement</h1>
        </div>
      </CardHeader>

      <CardContent className="w-full">
          <RequirementTable data={procurement as Procurement[]} />
      </CardContent>
    </Card>
  );
};

export default procurementPage;
