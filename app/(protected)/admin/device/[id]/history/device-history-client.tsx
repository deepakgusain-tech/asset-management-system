"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import DeviceRepairForm from "@/components/device/device-repair-form";
import { completeDeviceRepair } from "@/lib/actions/device-repair-action";
import DeviceReturnForm from "@/components/device/device-return-form";
import { useRouter } from "next/navigation";
export default function DeviceHistoryClient({
  history,
  deviceId,
  repair,
  device,
  assigned,
  repairs,
}: any) {
  const [showRepair, setShowRepair] = useState(false);
  const [showReturn, setShowReturn] = useState(false);
  const [showCrux, setShowCrux] = useState(false);
  const router = useRouter();
  const totalRepairCost =
    repairs?.reduce((sum: number, r: any) => sum + (r.cost || 0), 0) || 0;

  const repairCount = repairs?.length || 0;

  const completeRepair = async () => {
    if (!repair) return;

    const res = await completeDeviceRepair(repair.id, deviceId);

    if (res.success) {
      router.refresh();
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "ASSIGNED":
        return "bg-blue-100 text-blue-700";

      case "RETURNED":
        return "bg-green-100 text-green-700";

      case "REPAIR_SENT":
        return "bg-orange-100 text-orange-700";

      case "REPAIR_COMPLETED":
        return "bg-purple-100 text-purple-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-4">
      {/* DEVICE HEADER */}
      <div className="flex gap-10 bg-muted/40 p-3 rounded-md text-sm">
        <div>
          <span className="text-muted-foreground">Device</span>
          <p className="font-medium">{device.name}</p>
        </div>

        <div>
          <span className="text-muted-foreground">Model</span>
          <p className="font-medium">{device.model}</p>
        </div>

        {assigned && (
          <>
            <div>
              <span className="text-muted-foreground">Assigned To</span>
              <p className="font-medium">{assigned.employee.first_name}</p>
            </div>

            <div>
              <span className="text-muted-foreground">Assigned Date</span>
              <p className="font-medium">
                {new Date(assigned.assignedDate).toLocaleDateString()}
              </p>
            </div>
          </>
        )}
      </div>

      <div className="flex justify-between items-start">
        <h1 className="text-xl font-semibold">Device History</h1>

        <div className="flex flex-col gap-2">
          {device.deviceState === "REPAIR" ? (
            <Button onClick={completeRepair}>Complete Repair</Button>
          ) : assigned ? (
            <Button
              onClick={() => {
                setShowRepair(false);
                setShowReturn(true);
              }}
            >
              Return Device
            </Button>
          ) : (
            <Button
              onClick={() => {
                setShowReturn(false);
                setShowRepair(true);
              }}
            >
              Send To Repair
            </Button>
          )}

          <Button variant="outline" onClick={() => setShowCrux(!showCrux)}>
            Crux
          </Button>
        </div>
      </div>
      <div
        className={`grid ${showRepair || showReturn ? "grid-cols-2" : "grid-cols-1"} gap-6`}
      >
        {/* LEFT SIDE FORM */}
        {showRepair && (
          <DeviceRepairForm
            deviceId={deviceId}
            onClose={() => setShowRepair(false)}
          />
        )}
        {showReturn && (
          <DeviceReturnForm
            assignedId={assigned?.id}
            deviceId={deviceId}
            onClose={() => setShowReturn(false)}
          />
        )}

        {/* RIGHT SIDE HISTORY */}

        <div className="flex gap-4">
          <div
            className={`${showCrux ? "w-2/3 max-h-[70vh] overflow-y-auto" : "w-full"} space-y-6`}
          >
            {history.length === 0 && <p>No history found for this device.</p>}

            {history.map((item: any) => (
              <div key={item.id} className="flex gap-4">
                {/* timeline dot */}
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 bg-primary rounded-full mt-2"></div>
                  <div className="w-px bg-border flex-1"></div>
                </div>

                {/* history card */}
                <div className="border rounded-md p-4 w-full bg-background">
                  <div className="flex justify-between">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${getActionColor(
                        item.actionType,
                      )}`}
                    >
                      {item.actionType}
                    </span>

                    <p className="text-sm text-muted-foreground">
                      {new Date(item.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {item.notes && (
                    <p className="text-sm mt-2 text-muted-foreground">
                      {item.notes}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          {showCrux && (
            <div className="w-1/3 border rounded-md p-4 bg-background sticky top-4 h-fit">
              <h3 className="font-semibold mb-3">Cost Chart</h3>

              <div className="flex justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">Total Amount</p>
                  <p className="font-semibold">₹{totalRepairCost}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Repairs</p>
                  <p className="font-semibold">{repairCount}</p>
                </div>
              </div>

              <div className="space-y-3">
                {repairs?.map((r: any) => (
                  <div key={r.id} className="grid grid-cols-3 gap-2 text-sm">
                    <div className="border p-2 rounded">{r.vendor}</div>
                    <div className="border p-2 rounded">
                      {new Date(r.createdAt).toLocaleDateString()}
                    </div>
                    <div className="border p-2 rounded">₹{r.cost}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
