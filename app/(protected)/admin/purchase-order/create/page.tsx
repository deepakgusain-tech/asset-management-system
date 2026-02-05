"use client";

import { useState } from "react";
import { Trash2, Eye, Pencil } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog";

import { createPurchaseOrder } from "@/lib/actions/purchase-order";

/* ---------------- TEMP DATA ---------------- */

const requirements = [
  { id: "req-1", name: "Laptops" },
  { id: "req-2", name: "Office Chairs" }
];

const vendors = [
  { id: "ven-1", name: "ABC Traders" },
  { id: "ven-2", name: "XYZ Suppliers" }
];

const deviceCategories = [
  { id: "cat-1", name: "Laptop" },
  { id: "cat-2", name: "Keyboard" },
  { id: "cat-3", name: "Mouse" }
];

/* ---------------- TYPES ---------------- */

type POItem = {
  deviceCategoryId: string;
  quantity: number;
  unitPrice: number;
};

/* ---------------- COMPONENT ---------------- */

export default function CreatePurchaseOrderPage() {
  const [requirementId, setRequirementId] = useState("");
  const [vendorId, setVendorId] = useState("");

  const [items, setItems] = useState<POItem[]>([
    { deviceCategoryId: "", quantity: 1, unitPrice: 0 }
  ]);

  const [readOnly, setReadOnly] = useState(false);

  const addItem = () => {
    if (readOnly) return;
    setItems([...items, { deviceCategoryId: "", quantity: 1, unitPrice: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length === 1 || readOnly) return;
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (
    index: number,
    field: keyof POItem,
    value: string | number
  ) => {
    if (readOnly) return;
    const updated = [...items];
    updated[index][field] = value as never;
    setItems(updated);
  };

  const totalAmount = items.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice,
    0
  );

  const handleCreatePO = async () => {
    if (!requirementId || !vendorId) {
      alert("Please select requirement and vendor");
      return;
    }

    await createPurchaseOrder({
      requirementId,
      vendorId,
      items: items.map(item => ({
        deviceCategoryId: item.deviceCategoryId,
        quantity: Number(item.quantity),
        unitPrice: Number(item.unitPrice)
      }))
    });

    alert("Purchase Order Created");
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Create Purchase Order</h1>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setReadOnly(!readOnly)}
        >
          {readOnly ? <Pencil size={18} /> : <Eye size={18} />}
        </Button>
      </div>

      {/* PO DETAILS */}
      <Card>
        <CardHeader>
          <CardTitle>Purchase Order Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-6">
          <Input disabled placeholder="PO Number (auto-generated)" />

          <Select disabled={readOnly} onValueChange={setRequirementId}>
            <SelectTrigger>
              <SelectValue placeholder="Select Requirement *" />
            </SelectTrigger>
            <SelectContent>
              {requirements.map(req => (
                <SelectItem key={req.id} value={req.id}>
                  {req.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select disabled={readOnly} onValueChange={setVendorId}>
            <SelectTrigger>
              <SelectValue placeholder="Select Vendor *" />
            </SelectTrigger>
            <SelectContent>
              {vendors.map(v => (
                <SelectItem key={v.id} value={v.id}>
                  {v.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* ITEMS */}
      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* HEADER ROW */}
          <div className="grid grid-cols-5  text-sm font-medium text-muted-foreground">
            <div className="ml-10">Item</div>
            <div className="text-center">Qty</div>
            <div className="text-center">Unit Price</div>
            <div className="text-right">Total</div>
            <div className="text-center">Action</div>
          </div>

          {/* DATA ROWS */}
          {items.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-5 gap-4 items-center"
            >
              <Select
                disabled={readOnly}
                value={item.deviceCategoryId}
                onValueChange={value =>
                  updateItem(index, "deviceCategoryId", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Item" />
                </SelectTrigger>
                <SelectContent>
                  {deviceCategories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                disabled={readOnly}
                type="number"
                min={1}
                className="text-center"
                value={item.quantity}
                onChange={e =>
                  updateItem(index, "quantity", Number(e.target.value))
                }
              />

              <Input
                disabled={readOnly}
                type="number"
                min={0}
                className="text-right"
                value={item.unitPrice}
                onChange={e =>
                  updateItem(index, "unitPrice", Number(e.target.value))
                }
              />

              <div className="text-right font-semibold">
                ₹{item.quantity * item.unitPrice}
              </div>

              <div className="flex justify-center">
                {!readOnly && (
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash2 size={16} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Remove this item?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => removeItem(index)}
                        >
                          Remove
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                )}
              </div>
            </div>
          ))}

          {!readOnly && (
            <Button variant="outline" onClick={addItem}>
              + Add Item
            </Button>
          )}
        </CardContent>
      </Card>

      {/* SUMMARY */}
      <Card className="bg-muted/40">
        <CardContent className="flex justify-between items-center py-6">
          <span className="text-lg font-medium">Total Payable</span>
          <span className="text-2xl font-bold">₹{totalAmount}</span>
        </CardContent>
      </Card>

      {!readOnly && (
        <div className="flex justify-end">
          <Button size="lg" onClick={handleCreatePO}>
            Create Purchase Order
          </Button>
        </div>
      )}
    </div>
  );
}
