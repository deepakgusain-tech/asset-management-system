"use client";

import { departmentSchema, moduleSchema } from "@/lib/validators";
import { AppModule } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { ArrowRight, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Status } from "@/lib/generated/prisma/enums";
import { departmentDefaultValues } from "@/lib/constants";
import Module from "module";
import { createModule, updateModule } from "@/lib/actions/module-action";

const ModuleForm = ({
  data,
  update = false,
}: {
  data?: AppModule;
  update: boolean;
}) => {
  const router = useRouter();
  const id = data?.id;

  const form = useForm<z.infer<typeof moduleSchema>>({
    resolver: zodResolver(moduleSchema),
    defaultValues: data || departmentDefaultValues,
  });

  const [isPending, startTransition] = React.useTransition();

  const onSubmit: SubmitHandler<z.infer<typeof moduleSchema>> = async (
    values: any
  ) => {
    startTransition(async () => {
      let res;

      if (update && id) {
        res = await updateModule(values, id);
      } else {
        res = await createModule(values);
      }

      if (!res?.success) {
        toast.error("Error", {
          description: res?.message,
        });
      } else {
        toast.success("Success", {
          description: res?.message,
        });
        router.push("/admin/module");
      }
    });
  };
  return (
    <Form {...form}>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit(onSubmit, (errors) => console.log(errors))}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-5">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof moduleSchema>,
                  "name"
                >;
              }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
            <div className="flex flex-col gap-5">
              <FormField
                control={form.control}
                name="status"
                render={({
                  field,
                }: {
                  field: ControllerRenderProps<
                    z.infer<typeof moduleSchema>,
                    "status"
                  >;
                }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <Select
                        defaultValue={field.value}
                        onValueChange={(v) => field.onChange(v as Status)}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={Status.ACTIVE}>Active</SelectItem>
                          <SelectItem value={Status.INACTIVE}>
                            Inactive
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
         
        </div>

        <div className="flex flex-col gap-5">
          {/* Role */}
          <FormField
            control={form.control}
            name="roleId"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof moduleSchema>,
                "roleId"
              >;
            }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <FormControl>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={"admin"}>Active</SelectItem>
                    <SelectItem value={"developer"}>Inactive</SelectItem>
                  </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-2">
          <Button type="submit" className="cursor-pointer" disabled={isPending}>
            {isPending ? (
              <Loader className="w-4 h-4 animate-spin cursor-pointer" />
            ) : (
              <ArrowRight className="w-4 h-4" />
            )}{" "}
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ModuleForm;
