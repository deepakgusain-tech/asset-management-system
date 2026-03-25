"use server";

import { prisma } from "../db/prisma-helper";
import { userSchema } from "../validators";
import { formatError } from "../utils";
import bcrypt from "bcrypt";
import { createNotification } from "@/lib/actions/notification-action";
import { User } from "@/types";
import { z } from "zod";

// ✅ Response type
type ActionResponse = {
  success: boolean;
  message: string;
};

// ✅ Mapper (CRITICAL)
function mapUser(u: any): User {
  return {
    id: u.id,
    name: u.name ?? "",            // ✅ FIX
    email: u.email ?? "",          // ✅ FIX
    image: u.image ?? null,
    status: u.status,
    roleId: u.roleId,
    createdAt: u.createdAt.toISOString(),
    updatedAt: u.updatedAt?.toISOString(),
  };
}

// ✅ GET USERS
export async function getUsers(): Promise<User[]> {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return users.map(mapUser);
}

// ✅ CREATE USER
export async function createUser(
  data: z.infer<typeof userSchema>
): Promise<ActionResponse> {
  try {
    const user = userSchema.parse(data);

    const imageValue =
      user.image instanceof File
        ? user.image.name
        : user.image ?? null;

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const createdUser = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        image: imageValue,
        password: hashedPassword,
        status: user.status,
        roleId: user.roleId,
      },
    });

    await createNotification({
      title: "New User Created",
      message: `${createdUser.name} has been added`,
      type: "USER_CREATE",
    });

    return {
      success: true,
      message: "User created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// ✅ GET USER BY ID
export async function getUserById(id: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    return {
      success: true,
      data: mapUser(user), // 🔥 FIX
      message: "User fetched successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// ✅ UPDATE USER
export async function updateUser(
  data: z.infer<typeof userSchema>,
  id: string
): Promise<ActionResponse> {
  try {
    const user = userSchema.parse(data);

    const imageValue =
      user.image instanceof File
        ? user.image.name
        : user.image ?? null;

    const updateData: any = {
      name: user.name,
      email: user.email,
      image: imageValue,
      status: user.status,
      roleId: user.roleId,
    };

    if (user.password) {
      updateData.password = await bcrypt.hash(user.password, 10);
    }

    await prisma.user.update({
      where: { id },
      data: updateData,
    });

    return {
      success: true,
      message: "User updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// ✅ DELETE USER
export async function deleteUser(id: string): Promise<ActionResponse> {
  try {
    await prisma.user.delete({
      where: { id },
    });

    return {
      success: true,
      message: "User deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
