import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

import { getRequestQuotationById } from "@/lib/actions/requestQuotation-action";
import RequestQuotationForm from "@/components/vendor/requestQuotation-from";
import { RequestQuotation } from "@/types";

type Props = {
  params: Promise<{ id: string }>;
};

const RequestQuotationEditPage = async ({ params }: Props) => {
  const { id } = await params;

  const res = await getRequestQuotationById(id);

  console.log(res);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1>Edit Request Quotation</h1>
          <Button variant="default" className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/requestQuotation">Back</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <RequestQuotationForm data={res.data} update={true} />
      </CardContent>
    </Card>
  );
};

export default RequestQuotationEditPage;
