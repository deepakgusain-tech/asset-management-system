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

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type RequirementItem = {
  name: string;
  quantity: number;
  price: number;
};

export default function VendorRequestPage() {
  const [items, setItems] = useState<RequirementItem[]>([
    { name: "", quantity: 1, price: 0 },
  ]);

  const handleItemChange = (
    index: number,
    field: keyof RequirementItem,
    value: string | number
  ) => {
    const updated = [...items];
    // @ts-ignore
    updated[index][field] = value;
    setItems(updated);
  };

  const addItem = () => {
    setItems([...items, { name: "", quantity: 1, price: 0 }]);
  };

  const totalAmount = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  return (
    <div className="min-h-screen bg-muted/40 flex justify-center p-6">
      <Card className="w-full max-w-5xl">
        <CardHeader>
          <CardTitle className="text-2xl">
            Vendor Quotation Submission
          </CardTitle>
          <CardDescription>
            Add all required items with quantity and pricing.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Vendor / Product Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Manufacturer
              </label>
              <Input placeholder="Dell / HP / Lenovo" />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Warranty
              </label>
              <Input placeholder="1 Year / 3 Years" />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Warranty Type
              </label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="on-site">On Site</SelectItem>
                  <SelectItem value="off-site">Off Site</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">
                Quotation Valid Till
              </label>
              <Input type="date" />
            </div>
          </div>

          {/* Requirements Table */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">
              Quotation Requirements
            </h3>

            <div className="border rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 bg-muted px-4 py-2 text-sm font-medium">
                <div className="col-span-6">Requirement</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-right">Total</div>
              </div>

              {items.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-2 px-4 py-3 border-t"
                >
                  <div className="col-span-6">
                    <Input
                      placeholder="Item name / specification"
                      value={item.name}
                      onChange={(e) =>
                        handleItemChange(index, "name", e.target.value)
                      }
                    />
                  </div>

                  <div className="col-span-2">
                    <Input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "quantity",
                          Number(e.target.value)
                        )
                      }
                    />
                  </div>

                  <div className="col-span-2">
                    <Input
                      type="number"
                      value={item.price}
                      onChange={(e) =>
                        handleItemChange(
                          index,
                          "price",
                          Number(e.target.value)
                        )
                      }
                    />
                  </div>

                  <div className="col-span-2 text-right flex items-center justify-end font-medium">
                    ₹{item.quantity * item.price || 0}
                  </div>
                </div>
              ))}
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={addItem}
            >
              + Add Another Requirement
            </Button>
          </div>

          {/* Remarks */}
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">
              Remarks
            </label>
            <Textarea placeholder="Additional notes or conditions" />
          </div>

          {/* Total */}
          <div className="flex justify-between items-center border-t pt-4">
            <span className="text-lg font-semibold">
              Total Quotation Value
            </span>
            <span className="text-2xl font-bold">
              ₹{totalAmount}
            </span>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <Button size="lg">
              Submit Quotation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
