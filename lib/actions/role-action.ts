"use server";

import { prisma } from "../db/prisma-helper";

export async function getRoles() {
   return await prisma.role.findMany()
}