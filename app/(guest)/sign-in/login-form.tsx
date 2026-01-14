"use client";

import { loginUser } from "@/lib/actions/user-action";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { APP_NAME } from "@/lib/constants/";
import Image from "next/image";
import Banner from "@/assets/images/asset-management-software.png";
import { useEffect, useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await loginUser(email, password);

    if (res.success) {
      router.push("/admin/dashboard");
    } else {
      alert(res.message);
    }
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted) {
    return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden p-0">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form className="p-6 md:p-8" onSubmit={handleSubmit}>
              <FieldGroup>
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your {APP_NAME}
                  </p>
                </div>
                <Field>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </Field>
                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                  />
                </Field>
                <Field>
                  <Button type="submit">Login</Button>
                </Field>
              </FieldGroup>
            </form>
            <div className="bg-muted relative hidden md:block">
              <Image
                height={1000}
                width={1000}
                src={Banner}
                alt={APP_NAME}
                className="absolute inset-0 h-full w-full"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}
