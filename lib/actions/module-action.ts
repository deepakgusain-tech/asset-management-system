"use server";

import { Module } from "@/types";
import { prisma } from "../db/prisma-helper";
import { formatError } from "../utils";
import { moduleSchema } from "../validators";

export async function getModules() {
  //return await prisma.module.findMany()
  const modules = await prisma.module.findMany({
    include: {
      roleModules: {
        include: {
          role: true,
        },
      },
    },
  });
  return modules;
}

// create module
export async function createModule(data: any) {
  try {
    const module = moduleSchema.parse(data);

    const route = `/admin/${module.name
      .toLowerCase()
      .replace(/\s+/g, "-")}`;

    await prisma.module.create({
      data: {
        name: module.name,
        description: module.description,
        route,
        status: module.status,
      },
    });

    return {
      success: true,
      message: "Module created successfully",
    };
  } catch (error) {
    console.log(error); // 👈 ADD THIS FOR DEBUG
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// get module by id
export async function getModuleById(id: string) {
  try {
    let module = await prisma.module.findFirst({
      where: { id },
    });

    if (module) {
      return {
        success: true,
        data: module,
        message: "Module get successfully",
      };
    }

    return {
      success: false,
      message: "Module not found",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// update module
export async function updateModule(data: any, id: string) {
  try {
    const module = moduleSchema.parse(data);
    const route = `/admin/${module.name.toLowerCase().replace(/\s+/g, "-")}`;

    await prisma.module.update({
      where: { id },
      data: {
        name: module.name,
        description: module.description,
        route,
        status: module.status,
      },
    });

    return {
      success: true,
      message: "Module updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}

// delete module
export async function deleteModule(id: any) {
  try {
    await prisma.module.delete({
      where: { id },
    });

    return {
      success: true,
      message: "Module deleted successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
