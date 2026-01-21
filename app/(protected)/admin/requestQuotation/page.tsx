"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { RequestQuotation } from "@/types";
import RequestQuotationTable from "./quotation-table";
import { getRequestQuotations } from "@/lib/actions/requestQuotation-action";

const RequestQuotationPage = () => {
  const [requests, setRequests] = useState<RequestQuotation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      const res = await getRequestQuotations();
      if (res?.success && res.data) {
        setRequests(res.data);
      }
      setLoading(false);
    };

    fetchRequests();
  }, []);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Request Quotations</h1>
          <Button variant="default" className="bg-blue-500 hover:bg-blue-600">
            <Link href="requestQuotation/create">Add Request</Link>
          </Button>
        </div>
      </CardHeader>

      <CardContent className="w-full">
        {loading ? (
          <p>Loading...</p>
        ) : requests.length > 0 ? (
          <RequestQuotationTable data={requests} />
        ) : (
          <p>No Request Quotations found.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default RequestQuotationPage;
