import { moduleSchema, roleSchema, userSchema } from "@/lib/validators";
import z from "zod";

export type User = z.infer<typeof userSchema>
export type Role = z.infer<typeof roleSchema>
export type Module = z.infer<typeof moduleSchema>
