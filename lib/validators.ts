import z from "zod"

// user schema
export const userSchema = z.object({
    id: z.string().min(1, "User id is required"),
    name: z.string().min(1, "User name is required"),
    email: z.string().min(1, "User email is required"),
    image: z.string().min(1, "User image is required"),
    password: z.string().min(1, "User password is required").optional(),
    status: z.boolean().default(false),
    role: z.int().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
})

// role schema
export const roleSchema = z.object({
    id: z.string().min(1, "Role id is required"),
    name: z.string().min(1, "Role name is required"),
    description: z.string().min(1, "Role description is required"),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
})

// module schema 
export const moduleSchema = z.object({
    id: z.string().min(1, "Role id is required"),
    name: z.string().min(1, "Role name is required"),
    description: z.string().min(1, "Role description is required"),
    roleId: z.string(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
})