"use server";

import { prisma } from "../db/prisma-helper";

export async function getUsers() {
   return await prisma.user.findMany()
}