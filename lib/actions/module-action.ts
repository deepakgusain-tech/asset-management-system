"use server";

import { prisma } from "../db/prisma-helper";

export async function getModules() {
   return await prisma.module.findMany()
}