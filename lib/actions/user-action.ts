"use server";

import { User } from "@/types";
import { prisma } from "../db/prisma-helper";
import { userSchema } from "../validators";

export async function getUsers() {
   return await prisma.user.findMany()
}


export async function createUser(data: User) {
   try {

      const user = userSchema.parse(data)

      await prisma.user.create({
         data: {
            name: user.name,
            email: user.email,
            image: user.image,
            password: user.password,
            role: user.role,
            status: user.status
         }
      })

   } catch (error) {
      return {
         success: true,
         message: "User updated successfully"
      }
   }
}