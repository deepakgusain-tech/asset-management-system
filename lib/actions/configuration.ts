"use server";

import { Configuration } from "@/types";
import { prisma } from "../db/prisma-helper";
import { configurationSchema } from "../validators";
import { formatError } from "../utils";

// get configuration
export async function getVendors() {
  return await prisma.configuration.findOne({});
}

// create configuration
export async function createConfiguration(data: Configuration) {
  try {
    const configuration = configurationSchema.parse(data);

    await prisma.configuration.create({
      data: configuration,
    });

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
