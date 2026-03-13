"use server";

import { prisma } from "../db/prisma-helper";
import { deviceAssignedSchema } from "../validators";
import { formatError } from "../utils";
import { DeviceAssigned } from "@/types";

// get device categories
export async function getAssignedDevices() {
  return await prisma.deviceAssigned.findMany({
    where: {
      status: "ASSIGNED",
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

// create device category
export async function createAssignedDevice(data: DeviceAssigned) {
  try {
    const deviceAssigned = deviceAssignedSchema.parse(data);

    await prisma.$transaction(async (tx) => {

      const device = await tx.device.findUnique({
        where: { id: deviceAssigned.deviceId },
      });

      if (!device) {
        throw new Error("Device not found");
      }

      if (device.deviceState !== "AVAILABLE") {
        throw new Error("Device is not available for assignment");
      }

      // create assignment
      await tx.deviceAssigned.create({
        data: {
          deviceId: deviceAssigned.deviceId,
          employeeId: deviceAssigned.employeeId,
          remarks: deviceAssigned.remarks,
          status: "ASSIGNED",
          assignedDate: deviceAssigned.assignedDate,
        },
      });

      console.log("Updating device state:", deviceAssigned.deviceId);

      // update device state
      await tx.device.update({
        where: { id: deviceAssigned.deviceId },
        data: {
          deviceState: "ASSIGNED",
        },
      });

      const employee = await tx.employee.findUnique({
        where: { id: deviceAssigned.employeeId },
      });

      await tx.deviceHistory.create({
        data: {
          deviceId: deviceAssigned.deviceId,
          employeeId: deviceAssigned.employeeId,
          actionType: "ASSIGNED",
          notes: `Device assigned to ${
            employee
              ? `${employee.first_name} ${employee.last_name}`
              : "employee"
          }`,
        },
      });

    });

    return {
      success: true,
      message: "Device assigned successfully",
    };

  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// get device category by id
export async function getDeviceAssignedById(id: string) {
  try {
    let deviceCategory = await prisma.deviceAssigned.findFirst({
      where: { id },
    });

    if (deviceCategory) {
      return {
        success: true,
        data: deviceCategory,
        message: "Device Assigned get successfully",
      };
    }

    return {
      success: false,
      message: "Device Assinged not found",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// update category device
export async function updateAssingedDevice(data: DeviceAssigned, id: string) {
  try {
    const deviceAssigned = deviceAssignedSchema.parse(data);

    await prisma.deviceAssigned.update({
      where: { id },
      data: {
        deviceId: deviceAssigned.deviceId,
        employeeId: deviceAssigned.employeeId,
        remarks: deviceAssigned.remarks,
        status: "ASSIGNED",
        assignedDate: deviceAssigned.assignedDate,
        returnedDate: deviceAssigned.returnedDate,
      },
    });

    return {
      success: true,
      message: "Device Assigned updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// delete category device
export async function deleteDeviceAssigned(id: string) {
  try {
    const assignment = await prisma.deviceAssigned.findUnique({
      where: { id },
    });

    if (assignment?.status === "RETURNED") {
      throw new Error("Cannot delete a returned assignment");
    }

    await prisma.$transaction(async (tx) => {
      await tx.deviceAssigned.delete({
        where: { id },
      });

      if (assignment) {
        await tx.device.update({
          where: { id: assignment.deviceId },
          data: { deviceState: "AVAILABLE" },
        });
      }
    });

    return {
      success: true,
      message: "Device assigned deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

export async function returnDeviceAction({
  assignedId,
  deviceId,
  damage,
  remarks,
}: any) {
  const assignment = await prisma.deviceAssigned.findUnique({
    where: { id: assignedId },
  });

  if (!assignment) {
    throw new Error("Assignment not found");
  }

  if (assignment.status === "RETURNED") {
    throw new Error("Device already returned");
  }

  if (assignment.deviceId !== deviceId) {
    throw new Error("Assignment does not match device");
  }

  await prisma.$transaction(async (tx) => {
    await tx.deviceAssigned.update({
      where: { id: assignedId },
      data: {
        status: "RETURNED",
        returnedDate: new Date(),
      },
    });

    await tx.device.update({
      where: { id: deviceId },
      data: {
        deviceState: "AVAILABLE",
      },
    });

    await tx.deviceHistory.create({
      data: {
        deviceId,
        actionType: "RETURNED",
        notes:
          damage === "YES"
            ? `Returned with damage. ${remarks}`
            : `Returned. ${remarks}`,
      },
    });
  });

  return { success: true };
}
