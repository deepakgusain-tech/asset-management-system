"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Requirement } from "@/types";

type RequirementItem = {
  name: string;
  quantity: number;
  price: number;
};

export default function VendorForm({
  requirement,
  vendorId,
}: {
  requirement: Requirement;
  vendorId: string;
}) {
  console.log("Requirement Data:", requirement);

  // ✅ Safely parse configuration
  let parsedConfig: any[] = [];
  try {
    parsedConfig = JSON.parse(requirement.configuration as any);
  } catch {
    parsedConfig = [];
  }

  const [items, setItems] = useState<RequirementItem[]>(
    parsedConfig.map((item: any) => ({
      name: item.item || "",
      quantity: Number(item.quantity) || 1,
      price: 0,
    }))
  );

  // Extra quotation fields
  const [validTill, setValidTill] = useState("");
  const [deliveryDays, setDeliveryDays] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("");
  const [gst, setGst] = useState(0);
  const [additionalCharges, setAdditionalCharges] = useState(0);
  const [remarks, setRemarks] = useState("");

  // Calculations
  const subtotal = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const gstAmount = (subtotal * gst) / 100;
  const grandTotal = subtotal + gstAmount + additionalCharges;

  const handleItemChange = (index: number, value: number) => {
    setItems((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, price: value } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-muted/40 flex justify-center p-6">
      <Card className="w-full max-w-5xl">
        <CardHeader>
          <CardTitle className="text-2xl">
            Vendor Quotation Submission
          </CardTitle>
          <CardDescription>
            Vendor ID: {vendorId}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">

          {/* Requirement Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label>Manufactured</label>
              <Input value={requirement.manufatured ?? ""} readOnly />
            </div>

            <div>
              <label>Model</label>
              <Input value={requirement.model ?? ""} readOnly />
            </div>

            <div>
              <label>Warranty</label>
              <Input value={requirement.warranty ?? ""} readOnly />
            </div>

            <div>
              <label>Warranty Type</label>
              <Input value={requirement.warrantyType ?? ""} readOnly />
            </div>
          </div>

          {/* Requirements Table */}
          <div>
            <h3 className="font-semibold mb-4">Requirements</h3>

            {items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-4 gap-4 mb-3 items-center"
              >
                <Input value={item.name} readOnly />
                <Input value={item.quantity} readOnly />
                <Input
                  type="number"
                  min={0}
                  placeholder="Enter price"
                  onChange={(e) =>
                    handleItemChange(index, Number(e.target.value))
                  }
                />
                <div className="font-medium">
                  ₹{(item.quantity * item.price).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          {/* Quotation Extra Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label>Quotation Valid Till</label>
              <Input
                type="date"
                value={validTill}
                onChange={(e) => setValidTill(e.target.value)}
              />
            </div>

            <div>
              <label>Delivery (Days)</label>
              <Input
                type="number"
                value={deliveryDays}
                onChange={(e) => setDeliveryDays(e.target.value)}
                placeholder="e.g. 7"
              />
            </div>

            <div>
              <label>Payment Terms</label>
              <Input
                value={paymentTerms}
                onChange={(e) => setPaymentTerms(e.target.value)}
                placeholder="e.g. 50% Advance"
              />
            </div>

            <div>
              <label>GST (%)</label>
              <Input
                type="number"
                value={gst}
                onChange={(e) => setGst(Number(e.target.value))}
                placeholder="e.g. 18"
              />
            </div>

            <div>
              <label>Additional Charges</label>
              <Input
                type="number"
                value={additionalCharges}
                onChange={(e) =>
                  setAdditionalCharges(Number(e.target.value))
                }
                placeholder="Shipping / Handling"
              />
            </div>

          </div>

          {/* Remarks */}
          <div>
            <label>Remarks</label>
            <Textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>

          {/* Total Breakdown */}
          <div className="text-right space-y-1 font-medium">
            <div>Subtotal: ₹{subtotal.toFixed(2)}</div>
            <div>GST: ₹{gstAmount.toFixed(2)}</div>
            <div className="text-lg font-bold">
              Grand Total: ₹{grandTotal.toFixed(2)}
            </div>
          </div>

          <div className="flex justify-end">
            <Button>Submit Quotation</Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
