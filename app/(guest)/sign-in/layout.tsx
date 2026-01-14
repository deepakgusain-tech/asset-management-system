import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  console.log(session);
  
  if (session) {
    redirect("/admin/dashboard");
  }

  return (
    <>{children}</>
  );
}