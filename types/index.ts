import {
    departmentSchema,
    deviceCateorySchema,
    deviceSchema,
    employeeSchema,
    locationSchema,
    moduleSchema,
    roleSchema,
    userSchema,
    deviceAssignedSchema,
    vendorSchema,
    requriementsSchema,
    requriementVendorSchema,
    configurationSchema
} from "@/lib/validators";

import z from "zod";

export type User = z.infer<typeof userSchema>
export type Role = z.infer<typeof roleSchema> & { status: boolean }
export type Module = z.infer<typeof moduleSchema>
export type DeviceCategory = z.infer<typeof deviceCateorySchema>
export type Device = z.infer<typeof deviceSchema>
export type Department = z.infer<typeof departmentSchema>
export type Location = z.infer<typeof locationSchema>
export type Employee = z.infer<typeof employeeSchema>
export type DeviceAssigned = z.infer<typeof deviceAssignedSchema>
export type Vendor = z.infer<typeof vendorSchema>
export type Requirement = z.infer<typeof requriementsSchema>
export type RequirementVendor = z.infer<typeof requriementVendorSchema>
export type Configuration = z.infer<typeof configurationSchema>






