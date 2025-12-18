import z from "zod"
import { Status } from "./generated/prisma/enums"

export const statusEnum = z.enum(["ACTIVE", "INACTIVE"])

// user schema
export const userSchema = z.object({
    id: z.string().min(1, "User id is required"),
    name: z.string().min(1, "User name is required"),
    email: z.email().min(1, "User email is required"),
    image: z.string().min(1, "User image is required"),
    password: z.string().min(1, "User password is required"),
    status: z.boolean().default(false).optional(),
    role: z.int().nullable(),
    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional()
})

// role schema
export const roleSchema = z.object({
    id: z.string().min(1, "Role id is required"),
    name: z.string().min(1, "Role name is required"),
    description: z.string().min(1, "Role description is required"),
    status: z.boolean().optional(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
})

// module schema 
export const moduleSchema = z.object({
    id: z.string().min(1, "Role id is required"),
    name: z.string().min(1, "Role name is required"),
    description: z.string().min(1, "Role description is required"),
    roleId: z.string(),
    status: z.boolean().optional(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
})

// deviceCategory schema
export const deviceCateorySchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Device Category name is required"),
    description: z.string().min(1, "Device Category description is required"),
    status: z.enum(["ACTIVE", "INACTIVE"]),
    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional()
})

// device schema
export const deviceSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Device name is required"),
    serialNumber: z.string().min(1, "Device serial number is required"),
    description: z.string().min(1, "Device description is required"),
    status: z.enum(["ACTIVE", "INACTIVE"]),
    categoryId: z.string().min(1, "Device categoryid is required"),
    manufacturer: z.string().min(1, "Device manufacturer is required"),
    model: z.string().min(1, "Device model is required"),
    purchaseDate: z.date().nullable(),
    warrantyEnd: z.date().nullable(),
    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional()
})

// department schema
export const departmentSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Department name is required"),
    description: z.string().min(1, "Department description is required"),
    status: z.enum(["ACTIVE", "INACTIVE"]),
    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional()
})

// employee schema
export const employeeSchema = z.object({
    id: z.string().optional(),
    first_name: z.string().min(1, "Employee first_name is required"),
    last_name: z.string().min(1, "Employee last_name is required"),
    email: z.string().min(1, "Employee email is required"),
    phoneNumber: z.string().min(1, "Employee phone number is required"),
    dateOfBirth: z.date().nullable().optional(),
    hireDate: z.date().nullable().optional(),
    salary: z.string().min(1, "Employee salary is required"),
    status: z.enum(["ACTIVE", "INACTIVE"]),
    departmentId: z.string().min(1, "Department id is required"),
    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional()
})