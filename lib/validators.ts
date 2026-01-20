import z from "zod"
import { AssignedDeviceStatus, Status } from "./generated/prisma/enums"

export const statusEnum = z.enum(["ACTIVE", "INACTIVE"])

// user schema
export const userSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "User name is required"),
    email: z.email().min(1, "User email is required"),
   // image: z.string().min(6, "User image is required").optional(),
    image: z.union([
    z.instanceof(File),
    z.string().nullable(),
  ]).optional(),
    password: z.string().min(1, "User password is required"),
    status: z.enum(Object.values(Status)),
    roleId: z.string(),
    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional()
})

// role schema
export const roleSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Role name is required"),
    description: z.string().min(1, "Role description is required"),
    status: z.enum(Object.values(Status)),
    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional()
})

// module schema 
export const moduleSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Role name is required"),
    description: z.string().min(1, "Role description is required"),
    roleId: z.string(),
    status: z.enum(Object.values(Status)),
    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional()
})

// deviceCategory schema
export const deviceCateorySchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Device Category name is required"),
    description: z.string().min(1, "Device Category description is required"),
    status: z.enum(Object.values(Status)),
    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional()
})

// device schema
export const deviceSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Device name is required"),
    serialNumber: z.string().min(1, "Device serial number is required"),
    description: z.string().min(1, "Device description is required"),
    status: z.enum(Object.values(Status)),
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
    status: z.enum(Object.values(Status)),
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
    status: z.enum(Object.values(Status)),
    departmentId: z.string().min(1, "Department is required"),
    locationId: z.string().min(1, "Location is required"),
    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional()
})

// location schema
export const locationSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Location name is required"),
    streetAddress: z.string().min(1, "Street Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    postalCode: z.string().min(1, "Postal Code is required"),
    country: z.string().min(1, "Country is required"),
    latitude: z.string().optional(),
    longitude: z.string().optional(),
    status: z.enum(Object.values(Status)),
    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional()
})

// device assigned schema
export const deviceAssignedSchema = z.object({
    id: z.string().optional(),
    deviceId: z.string(),
    employeeId: z.string(),
    remarks: z.string(),
    status: z.enum(Object.values(AssignedDeviceStatus)),
    assignedDate: z.union([
        z.date(),
        z.string()
    ]),
    returnedDate: z.union([
        z.date(),
        z.string()
    ]).nullable().optional(),
    createdAt: z.date().nullable().optional(),
    updatedAt: z.date().nullable().optional()
})

// vendor schema
export const vendorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Vendor email is required"),
  phoneNumber: z.string().min(1, "Vendor phone number is required"),
  address: z.string().min(1,"Vendor address is required"),
//   vendorTypeId: z.string().min(1, "Select Vendor Type"),
  status: z.enum(["ACTIVE", "INACTIVE"]).default("INACTIVE"),
});



// export const vendorTypeSchema = z.object({
//   name: z.string().min(1, { message: "Name is required" }),
//   description: z.string().optional(),
//   status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
// });