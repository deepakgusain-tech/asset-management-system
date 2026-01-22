import {
    departmentSchema,
    deviceCateorySchema,
    deviceSchema,
    employeeSchema,
    locationSchema,
    moduleSchema,
    roleSchema,
    userSchema,
<<<<<<< Updated upstream
    deviceAssignedSchema
=======

    deviceAssignedSchema,
    vendorSchema,
    requestQuotationSchema,
    
    vendorQuotationSchema,
    vendorQuotationItemSchema,
    vendorQuotationAttachmentSchema

>>>>>>> Stashed changes
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


<<<<<<< Updated upstream
=======

// add new
export type Vendor = z.infer<typeof vendorSchema>;
// new RFQ type
export type RequestQuotation = z.infer<typeof requestQuotationSchema>;

// ✅ new VendorQuotation types
export type VendorQuotation = z.infer<typeof vendorQuotationSchema>
export type VendorQuotationItem = z.infer<typeof vendorQuotationItemSchema>
export type VendorQuotationAttachment = z.infer<typeof vendorQuotationAttachmentSchema>




>>>>>>> Stashed changes
