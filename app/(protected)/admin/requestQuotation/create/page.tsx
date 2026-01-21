"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

import RequestQuotationForm from "@/components/vendor/requestQuotation-from";

const RequestQuotationCreatePage = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Add Request Quotation</h1>
          <Button variant="default" className="bg-blue-500 hover:bg-blue-600">
            <Link href="/admin/requestQuotation">Back</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <RequestQuotationForm update={false} />
      </CardContent>
    </Card>
  );
};

export default RequestQuotationCreatePage;
