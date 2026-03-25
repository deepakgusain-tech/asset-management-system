import { prisma } from "@/lib/db/prisma-helper";
import bcrypt from "bcrypt";

async function main() {
  console.log(" Seeding started...");

  const modules = [
    { name: "Device", route: "/admin/device" },
    { name: "Device Category", route: "/admin/device-category" },
    { name: "Device Assigned", route: "/admin/device-assigned" },
    { name: "Vendor", route: "/admin/vendor" },
    { name: "Requirements", route: "/admin/requirements" },
    { name: "Procurement", route: "/admin/procurement" },
    { name: "Purchase Order", route: "/admin/purchase-order" },
    { name: "Employee", route: "/admin/employee" },
    { name: "Department", route: "/admin/department" },
    { name: "Location", route: "/admin/location" },
    { name: "User", route: "/admin/user" },
    { name: "Role", route: "/admin/role" },
    { name: "Module", route: "/admin/module" },
    { name: "Configuration", route: "/admin/configuration" },
    { name: "Dashboard", route: "/admin/dashboard" },
    { name: "Notifications", route: "/admin/notifications" }
  ];

  const createdModules = [];

  for (const mod of modules) {
    const m = await prisma.module.upsert({
      where: { route: mod.route },
      update: {},
      create: {
        name: mod.name,
        route: mod.route,
        description: mod.name,
      },
    });

    createdModules.push(m);
  }

  console.log("Modules seeded");

  const adminRole = await prisma.role.upsert({
    where: { name: "Admin" },
    update: {},
    create: {
      name: "Admin",
      description: "Super admin with full access",
    },
  });

  console.log("Admin role created");

  for (const module of createdModules) {
    await prisma.roleModule.upsert({
      where: {
        roleId_moduleId: {
          roleId: adminRole.id,
          moduleId: module.id,
        },
      },
      update: {},
      create: {
        roleId: adminRole.id,
        moduleId: module.id,
        canView: true,
        canCreate: true,
        canEdit: true,
        canDelete: true,
      },
    });
  }

  console.log("Admin permissions assigned");

  const hashedPassword = await bcrypt.hash("123456", 10);

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {
      password: hashedPassword, 
    },
    create: {
      name: "Admin",
      email: "admin@example.com",
      password: hashedPassword,
      status: "ACTIVE",
      roleId: adminRole.id,
    },
  });

  console.log(" Admin user created:", adminUser.email);

  console.log(" Seeding finished");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
