"use server";

import { z } from "zod";
import { User } from "@/types";
import { prisma } from "../db/prisma-helper";
import { userSchema } from "../validators";
import { formatError } from "../utils";


export async function getUsers() {
   return await prisma.user.findMany()
}

// create user
export async function createUser(data: z.infer<typeof userSchema>) {


   try {
      const user = userSchema.parse(data)

      const imageValue =
      user.image instanceof File
        ? user.image.name        // convert File → string
        : user.image ?? null     // allow string or null


      await prisma.user.create({
         data: {
            name: user.name,
            email: user.email,
            image: imageValue,
            password: user.password,
            status: user.status,
            roleId: user.roleId,
         }
      })

      return {
         success: true,
         message: "User created successfully"
      }

   } catch (error) {
      return {
         success: false,
         message: formatError(error)
      }
   }
}

// get user by id
export async function getUserById(id: string) {
   try {

      let user = await prisma.user.findFirst({
         where: { id }
      })

      if (user) {
         return {
            success: true,
            data: user,
            message: "User get successfully"
         }
      }

      return {
         success: false,
         message: "User not found"
      }

   } catch (error) {
      return {
         success: false,
         message: formatError(error)
      }
   }
}

// update user
export async function updateUser(data: User, id: string) {
   try {

      const user = userSchema.parse(data)

       const imageValue =
      user.image instanceof File
        ? user.image.name        // convert File → string
        : user.image ?? null     // allow string or null


      await prisma.user.update({
         where: { id },
         data: {
            name: user.name,
            email: user.email,
            image:  imageValue,
            password: user.password,
            status: user.status,
            roleId: user.roleId,
         }
      })

      return {
         success: true,
         message: "user updated successfully"
      }

   } catch (error) {
      return {
         success: false,
         message: formatError(error)
      }
   }
}

// delete user
export async function deleteUser(id: any) {
   try {
      await prisma.user.delete({
         where: { id }
      })

      return {
         success: true,
         message: "User deleted successfully"
      }

   } catch (error) {
      return {
         success: false,
         message: formatError(error)
      }
   }
}