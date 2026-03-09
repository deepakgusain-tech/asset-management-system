import "dotenv/config"
import bcrypt from "bcrypt"
import { prisma } from "../lib/db/prisma-helper"

async function main() {
  console.log("Seeding database...")

  const password = await bcrypt.hash("admin123", 10)

  const adminRole = await prisma.role.upsert({
    where: { name: "Admin" },
    update: {},
    create: {
      name: "Admin",
      description: "System Administrator",
      status: "ACTIVE"
    }
  })

  await prisma.user.upsert({
    where: { email: "admin@asset.com" },
    update: {},
    create: {
      name: "Suraj Bisht",
      email: "admin@asset.com",
      password,
      roleId: adminRole.id,
      status: "ACTIVE"
    }
  })

  console.log("Seed completed 🌱")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })