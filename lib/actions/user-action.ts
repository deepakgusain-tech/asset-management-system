"use server";

import { User } from "@/types";
import { prisma } from "../db/prisma-helper";
import { userSchema } from "../validators";
import { formatError } from "../utils";

export async function getUsers() {
   return await prisma.user.findMany()
}

// create user
export async function createUser(data: User) {

   try {
      const user = userSchema.parse(data)

      await prisma.user.create({
         data: {
            name: user.name,
            email: user.email,
            image: user.image,
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

      await prisma.user.update({
         where: { id },
         data: {
            name: user.name,
            email: user.email,
            image: user.image,
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