"use server";

import { Department } from "@/types";
import { prisma } from "../db/prisma-helper";
import { departmentSchema, deviceCateorySchema } from "../validators";
import { formatError } from "../utils";

// get device categories
export async function getDepartment() {
    return await prisma.department.findMany({
        orderBy: {
            createdAt: 'desc'
        },
    })
}

// create Department
export async function createDepartment(data: Department) {

    try {
        const department = departmentSchema.parse(data)

        await prisma.department.create({
            data: {
                name: department.name,
                description: department.description,
                status: department.status
            }
        })

        return {
            success: true,
            message: "Department created successfully"
        }

    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
}

// get Department by id
export async function getDepartmentById(id: string) {
    try {

        let department = await prisma.department.findFirst({
            where: { id }
        })

        if (department) {
            return {
                success: true,
                data: department,
                message: "Department created successfully"
            }
        }

        return {
            success: false,
            message: "Department not found"
        }

    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
}

// update department
export async function updateDepartment(data: Department, id: string) {
    try {

        const department = departmentSchema.parse(data)

        await prisma.department.update({
            where: { id },
            data: {
                name: department.name,
                description: department.description,
                status: department.status
            }
        })

        return {
            success: true,
            message: "Department updated successfully"
        }

    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
}

// delete department
export async function deleteDepartment(id: any) {
    try {
        await prisma.department.delete({
            where: { id }
        })

        return {
            success: true,
            message: "Department deleted successfully"
        }

    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
}