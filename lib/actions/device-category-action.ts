"use server";

import { DeviceCategory } from "@/types";
import { prisma } from "../db/prisma-helper";
import { deviceCateorySchema } from "../validators";
import { formatError } from "../utils";

// get device categories
export async function getDeviceCategory() {
    return await prisma.deviceCategory.findMany({
        orderBy: {
            createdAt: 'desc'
        },
    })
}

// create device category
export async function createDeviceCategory(data: DeviceCategory) {

    try {

        const deviceCategory = deviceCateorySchema.parse(data)

        await prisma.deviceCategory.create({
            data: {
                name: deviceCategory.name,
                description: deviceCategory.description,
                status: deviceCategory.status
            }
        })

        return {
            success: true,
            message: "Device Category created successfully"
        }

    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
}

// get device category by id
export async function getDeviceCategoryById(id: string) {
    try {

        let deviceCategory = await prisma.deviceCategory.findFirst({
            where: { id }
        })

        if (deviceCategory) {
            return {
                success: true,
                data: deviceCategory,
                message: "Device Category created successfully"
            }
        }

        return {
            success: false,
            message: "Device Category not found"
        }

    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
}

// update category device 
export async function updateCategoryDevice(data: DeviceCategory, id: string) {
    try {

        const deviceCategory = deviceCateorySchema.parse(data)

        await prisma.deviceCategory.update({
            where: { id },
            data: {
                name: deviceCategory.name,
                description: deviceCategory.description,
                status: deviceCategory.status
            }
        })

        return {
            success: true,
            message: "Device Category updated successfully"
        }

    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
}

// delete category device 
export async function deleteCategoryDevice(id: any) {
    try {
        await prisma.deviceCategory.delete({
            where: { id }
        })

        return {
            success: true,
            message: "Device Category deleted successfully"
        }

    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
}