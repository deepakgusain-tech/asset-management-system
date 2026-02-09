"use server";

import { Employee } from "@/types";
import { prisma } from "../db/prisma-helper";
import { employeeSchema } from "../validators";
import { formatError } from "../utils";

// get device categories
export async function getEmployee() {
    return await prisma.employee.findMany({
        orderBy: {
            createdAt: 'desc'
        },
    })
}

// create employee
export async function createEmployee(data: Employee) {

    try {
        const employee = employeeSchema.parse(data)

        await prisma.employee.create({
            data: {
                first_name: employee.first_name,
                last_name: employee.last_name,
                email: employee.email,
                phoneNumber: employee.phoneNumber,
                dateOfBirth: employee.dateOfBirth,
                hireDate: employee.hireDate,
                salary: employee.salary,
                departmentId: employee.departmentId,
                locationId: employee.locationId,
                status: employee.status,
            }
        })

        return {
            success: true,
            message: "Employee created successfully"
        }

    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
}

// get employee by id
export async function getEmployeeById(id: string) {
    try {

        let employee = await prisma.employee.findFirst({
            where: { id }
        })

        if (employee) {
            return {
                success: true,
                data: employee,
                message: "Employee get successfully"
            }
        }

        return {
            success: false,
            message: "Location not found"
        }

    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
}

// update employee
export async function updateEmployee(data: Employee, id: string) {
    try {

        const employee = employeeSchema.parse(data)

        await prisma.employee.update({
            where: { id },
            data: {
                 first_name: employee.first_name,
                last_name: employee.last_name,
                email: employee.email,
                phoneNumber: employee.phoneNumber,
                dateOfBirth: employee.dateOfBirth,
                hireDate: employee.hireDate,
                salary: employee.salary,
                departmentId: employee.departmentId,
                locationId: employee.locationId,
                status: employee.status,
            }
        })

        return {
            success: true,
            message: "Employee updated successfully"
        }

    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
}

// delete employee
export async function deleteEmployee(id: any) {
    try {
        await prisma.employee.delete({
            where: { id }
        })

        return {
            success: true,
            message: "Employee deleted successfully"
        }

    } catch (error) {
        return {
            success: false,
            message: formatError(error)
        }
    }
}