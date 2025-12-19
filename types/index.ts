import { 
    departmentSchema,
    deviceCateorySchema, 
    deviceSchema, 
    employeeSchema, 
    locationSchema, 
    moduleSchema, 
    roleSchema, 
    userSchema 
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

