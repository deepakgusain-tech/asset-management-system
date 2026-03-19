import { prisma } from "@/lib/db/prisma-helper";

// ✅ get full user with permissions
export async function getUserPermissions(email: string) {
  return prisma.user.findUnique({
    where: { email },
    include: {
      role: {
        include: {
          roleModules: {
            include: {
              module: true,
            },
          },
        },
      },
    },
  });
}

// ✅ check permission
export function canAccess(
  user: any,
  route: string,
  action: "view" | "create" | "edit" | "delete"
) {
  if (!user) return false;

  // ✅ Admin bypass
  if (user.role.name === "Admin") return true;

  const permission = user.role.roleModules.find(
    (rm: any) => rm.module.route === route
  );

  if (!permission) return false;

  if (action === "view") return !!permission.canView;
  if (action === "create") return !!permission.canCreate;
  if (action === "edit") return !!permission.canEdit;
  if (action === "delete") return !!permission.canDelete;

  return false;
}