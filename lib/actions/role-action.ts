"use server";

import { Role } from "@/types";
import { prisma } from "../db/prisma-helper";
import { roleSchema } from "../validators";

export async function getRoles() {
   return await prisma.role.findMany()
}

export async function createRole(data: Role) {
   try {

      const role = roleSchema.parse(data)
      
      await prisma.role.create({
         data: {
            name: role.name,
            description: role.description,
            status: role.status
         }
      })

   } catch (error) {
      return {
         success: true,
         message: "User updated successfully"
      }
   }
}