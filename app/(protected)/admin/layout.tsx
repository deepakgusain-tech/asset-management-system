import { auth } from "@/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import { prisma } from "@/lib/db/prisma-helper";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import NotificationDropdown from "@/components/notifications/notification-dropdown";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  console.log("SESSION:", session);
  const dbUser = session?.user?.email
    ? await prisma.user.findUnique({
        where: { email: session.user.email }, // ✅ CHANGED HERE
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
      })
    : null;

  // const allowedRoutes = dbUser?.role?.roleModules?.map((rm) => rm.module.route) || [];

  const allowedRoutes =
    dbUser?.role?.name === "Admin"
      ? [
          "/admin/device",
          "/admin/device-category",
          "/admin/device-assigned",
          "/admin/vendor",
          "/admin/requirements",
          "/admin/procurement",
          "/admin/purchase-order",
          "/admin/employee",
          "/admin/department",
          "/admin/location",
          "/admin/user",
          "/admin/role",
          "/admin/module",
          "/admin/configuration",
        ]
      : dbUser?.role?.roleModules?.map((rm) => rm.module.route) || [];

  const user = dbUser
    ? {
        name: dbUser.name || undefined,
        email: dbUser.email || undefined,
        image: dbUser.image || undefined,
        allowedRoutes,
      }
    : undefined;

  return (
    <>
      <SidebarProvider>
        <AppSidebar user={user} />
        <SidebarInset>
          <header className="relative sticky top-0 z-50 flex h-16 items-center justify-between bg-background border-b px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
            </div>
            <div className="flex items-center gap-2">
              <NotificationDropdown />
              <ThemeToggle />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
