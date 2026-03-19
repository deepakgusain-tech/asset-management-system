"use server";

import { Role } from "@/types";
import { prisma } from "../db/prisma-helper";
import { roleSchema } from "../validators";
import { formatError } from "../utils";

export async function getRoles() {
  return await prisma.role.findMany();
}

// create role
export async function createRole(data: any) {
  try {
    const role = roleSchema.parse(data);

    await prisma.role.create({
      data: {
        name: role.name,
        description: role.description,
        status: role.status,
        roleModules: {
          create: data.modules.map((m: any) => ({
            moduleId: m.moduleId,
            canView: m.canView,
            canCreate: m.canCreate,
            canEdit: m.canEdit,
            canDelete: m.canDelete,
          })),
        },
      },
    });

    return {
      success: true,
      message: "Role created successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// get module by id
export async function getRoleById(id: string) {
  try {
    let role = await prisma.role.findFirst({
      where: { id },
      include: {
        roleModules: true,
      },
    });
    if (role) {
      return {
        success: true,
        data: role,
        message: "Role get successfully",
      };
    }

    return {
      success: false,
      message: "Role not found",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// update role
export async function updateRole(data: any, id: string) {
  try {
    const role = roleSchema.parse(data);

    // delete old modules
    await prisma.roleModule.deleteMany({
      where: { roleId: id },
    });

    // update role + modules
    await prisma.role.update({
      where: { id },
      data: {
        name: role.name,
        description: role.description,
        status: role.status,
        roleModules: {
          create: data.modules.map((moduleId: string) => ({
            moduleId,
          })),
        },
      },
    });

    return {
      success: true,
      message: "Role updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// delete role
export async function deleteRole(id: any) {
  try {
    await prisma.role.delete({
      where: { id },
    });

    return {
      success: true,
      message: "Role deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
