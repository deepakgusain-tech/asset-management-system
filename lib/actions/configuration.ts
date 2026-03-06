"use server";

import { Configuration } from "@/types";
import { prisma } from "../db/prisma-helper";
import { configurationSchema } from "../validators";
import { formatError } from "../utils";

// get configuration
export async function getConfiguration() {
  return await prisma.configuration.findFirst({});
}

// create configuration
export async function createOrUpdateConfiguration(data: Configuration, id: string) {
  try {
    const configuration = configurationSchema.parse(data);

    if (id) {
      await prisma.configuration.update({
        where: { id },
        data: configuration as any,
      });
    } else {
      await prisma.configuration.create({
        data: configuration as any,
      });
    }

    return {
      success: true,
      message: "Configuration updated successfully",
    };
  } catch (error) {
    return {
      success: false,
      message: formatError(error),
    };
  }
}
