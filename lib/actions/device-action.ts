"use server";

import { Device } from "@/types";
import { prisma } from "../db/prisma-helper";
import { deviceCateorySchema, deviceSchema } from "../validators";
import { formatError } from "../utils";

// get device categories
export async function getDevice() {
    return await prisma.device.findMany({
        orderBy: {
            createdAt: 'desc'
        },
    })
}

// create device 
export async function createDevice(data: Device) {

    try {

        const device = deviceSchema.parse(data)

        await prisma.device.create({
            data: {
                name: device.name,
                serialNumber: device.serialNumber,
                description: device.description,
                status: device.status,
                categoryId: device.categoryId,
                manufacturer: device.manufacturer,
                model: device.model,
                purchaseDate: device.purchaseDate,
                warrantyEnd: device.warrantyEnd,
            }
        })

        return {
            success: true,
            message: "Device  created successfully"
        }

    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
}

// get device  by id
export async function getDeviceById(id: string) {
    try {

        let device = await prisma.device.findFirst({
            where: { id }
        })

        if (device) {
            return {
                success: true,
                data: device,
                message: "Device  created successfully"
            }
        }

        return {
            success: false,
            message: "Device  not found"
        }

    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
}

// update  device 
export async function updateDevice(data: Device, id: string) {
    try {

        const device = deviceCateorySchema.parse(data)

        await prisma.device.update({
            where: { id },
            data: {
                name: device.name,
                description: device.description,
                status: device.status
            }
        })

        return {
            success: true,
            message: "Device  updated successfully"
        }

    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
}

// delete  device 
export async function deleteDevice(id: any) {
    try {
        await prisma.device.delete({
            where: { id }
        })

        return {
            success: true,
            message: "Device  deleted successfully"
        }

    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
}