"use server";

import { prisma } from "../db/prisma-helper";
import { deviceAssignedSchema } from "../validators";
import { formatError } from "../utils";
import { DeviceAssigned } from "@/types";

// get device categories
export async function getAssignedDevices() {
    return await prisma.deviceAssigned.findMany({
        orderBy: {
            createdAt: 'desc'
        },
    })
}

// create device category
export async function createAssignedDevice(data: DeviceAssigned) {

    try {

        const deviceAssigned = deviceAssignedSchema.parse(data)

        await prisma.deviceAssigned.create({
            data: {
                deviceId: deviceAssigned.deviceId,
                employeeId: deviceAssigned.employeeId,
                remarks: deviceAssigned.remarks,
                status: deviceAssigned.status,
                assignedDate: deviceAssigned.assignedDate,
                returnedDate: deviceAssigned.returnedDate,
            }
        })

        return {
            success: true,
            message: "Device Assigned created successfully"
        }

    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
}

// get device category by id
export async function getDeviceAssignedById(id: string) {
    try {

        let deviceCategory = await prisma.deviceAssigned.findFirst({
            where: { id }
        })

        if (deviceCategory) {
            return {
                success: true,
                data: deviceCategory,
                message: "Device Assigned get successfully"
            }
        }

        return {
            success: false,
            message: "Device Assinged not found"
        }

    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
}

// update category device 
export async function updateAssingedDevice(data: DeviceAssigned, id: string) {
    try {

        const deviceAssigned = deviceAssignedSchema.parse(data)

        await prisma.deviceAssigned.update({
            where: { id },
            data: {
                deviceId: deviceAssigned.deviceId,
                employeeId: deviceAssigned.employeeId,
                remarks: deviceAssigned.remarks,
                status: deviceAssigned.status,
                assignedDate: deviceAssigned.assignedDate,
                returnedDate: deviceAssigned.returnedDate,
            }
        })

        return {
            success: true,
            message: "Device Assigned updated successfully"
        }

    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
}

// delete category device 
export async function deleteDeviceAssigned(id: any) {
    try {
        await prisma.deviceAssigned.delete({
            where: { id }
        })

        return {
            success: true,
            message: "Device assigned deleted successfully"
        }

    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
}