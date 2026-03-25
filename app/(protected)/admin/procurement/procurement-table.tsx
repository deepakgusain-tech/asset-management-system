"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getQuotations } from "@/lib/actions/quotation";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

type StatusFilter = "ALL" | "PENDING" | "APPROVED" | "REJECTED";

type Quote = {
  id: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  vendor?: { name: string };
  requirement?: { model: string };
  grandTotal: number;
  deliveryDays: number;
  validTill: string;
};

type Props = {
  canApprove: boolean;
  canReject: boolean;
  canDelete: boolean;
};

export default function ProcurementTable({
  canApprove,
  canReject,
  canDelete,
}: Props) {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<StatusFilter>("ALL");

  const loadData = async () => {
    try {
      const data = await getQuotations();
setQuotes(data as unknown as Quote[]);
    } catch {
      toast.error("Failed to load quotations");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const confirmAction = (message: string) => {
    return window.confirm(message);
  };

  const handleApprove = async (id: string) => {
    if (!confirmAction("Approve this quotation?")) return;

    setLoadingId(id);

    const res = await fetch("/api/quotation/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quotationId: id }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
    } else {
      toast.success("Quotation Approved");
      loadData();
    }

    setLoadingId(null);
  };

  const handleReject = async (id: string) => {
    if (!confirmAction("Reject this quotation?")) return;

    setLoadingId(id);

    const res = await fetch("/api/quotation/reject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quotationId: id }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
    } else {
      toast.success("Quotation Rejected");
      loadData();
    }

    setLoadingId(null);
  };

  const handleDelete = async (id: string) => {
    if (!confirmAction("Delete this quotation permanently?")) return;

    setLoadingId(id);

    const res = await fetch("/api/quotation/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quotationId: id }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message);
    } else {
      toast.success("Quotation Deleted");
      loadData();
    }

    setLoadingId(null);
  };

  const filteredQuotes =
    filter === "ALL" ? quotes : quotes.filter((q) => q.status === filter);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  return (
    <div className="w-full p-6 space-y-6">

      <div className="flex gap-2">
        {["ALL", "PENDING", "APPROVED", "REJECTED"].map((status) => (
          <Button
            key={status}
            size="sm"
            variant={filter === status ? "default" : "outline"}
            onClick={() => setFilter(status as StatusFilter)}
          >
            {status}
          </Button>
        ))}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Vendor</TableHead>
            <TableHead>Model</TableHead>
            <TableHead>Grand Total</TableHead>
            <TableHead>Delivery</TableHead>
            <TableHead>Valid Till</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filteredQuotes.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                No quotations found.
              </TableCell>
            </TableRow>
          )}

          {filteredQuotes.map((quote) => {
            const isPending = quote.status === "PENDING";

            return (
              <TableRow key={quote.id}>
                <TableCell>{quote.vendor?.name || "-"}</TableCell>
                <TableCell>{quote.requirement?.model || "-"}</TableCell>
                <TableCell className="font-semibold">
                  {formatCurrency(quote.grandTotal)}
                </TableCell>
                <TableCell>{quote.deliveryDays} Days</TableCell>
                <TableCell>
                  {format(new Date(quote.validTill), "PPP")}
                </TableCell>

                <TableCell>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      quote.status === "PENDING"
                        ? "bg-yellow-100 text-yellow-800"
                        : quote.status === "APPROVED"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {quote.status}
                  </span>
                </TableCell>

                <TableCell>
                  <div className="flex justify-end gap-3">

                    {canApprove && (
                      <Button
                        size="sm"
                        onClick={() => handleApprove(quote.id)}
                        disabled={!isPending || loadingId === quote.id}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        {loadingId === quote.id ? "..." : "Approve"}
                      </Button>
                    )}

                    {canReject && (
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleReject(quote.id)}
                        disabled={!isPending || loadingId === quote.id}
                      >
                        Reject
                      </Button>
                    )}

                    {canDelete && (
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => handleDelete(quote.id)}
                        disabled={loadingId === quote.id}
                      >
                        {loadingId === quote.id ? "⏳" : <Trash2 size={16} />}
                      </Button>
                    )}

                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
