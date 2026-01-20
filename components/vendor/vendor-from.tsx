
"use client";

import React from "react";
import z from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { vendorSchema } from "@/lib/validators"; 
import { vendorDefaultValues } from "@/lib/constants";
import { createVendor, updateVendor } from "@/lib/actions/vendor-action";
import { Status } from "@/lib/generated/prisma/enums";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader } from "lucide-react";

// type VendorType = {
//   id: string;
//   name: string;
// };

type VendorFormProps = {
  data?: any;
  update?: boolean;
//   vendorTypes: VendorType[];
};

const VendorForm = ({
  data,
  update = false,
//   vendorTypes,
}: VendorFormProps) => {
  const router = useRouter();
  const id = data?.id;

  const form = useForm<z.infer<typeof vendorSchema>>({
    resolver: zodResolver(vendorSchema),
    defaultValues: data || vendorDefaultValues,
  });

  const [isPending, startTransition] = React.useTransition();

  const onSubmit: SubmitHandler<z.infer<typeof vendorSchema>> = async (
    values
  ) => {
    startTransition(async () => {
      let res;

      if (update && id) {
        res = await updateVendor(values, id);
      } else {
        res = await createVendor(values);
      }

      if (!res?.success) {
        toast.error("Error", { description: res?.message });
      } else {
        toast.success("Success", { description: res?.message });
        router.push("/admin/vendor");
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {/* <div className="grid grid-cols-2 gap-4"> */}
    
          {/* Name */}
          <div className='flex flex-col gap-5'>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Vendor name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>

          {/* Email */}
          <div className='flex flex-col gap-5'>
          <FormField
            control={form.control}
            name="email"
            render={({
              field,
            }: {
              field: ControllerRenderProps<
                z.infer<typeof vendorSchema>,
                "email"
              >;
            }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Vendor email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>

          {/* Phone */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Address */}
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="Vendor address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Status */}
          <div className='flex flex-col gap-5'>
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select
                    value={field.value}
                    onValueChange={(v) =>
                      field.onChange(v as Status)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={Status.ACTIVE}>Active</SelectItem>
                      <SelectItem value={Status.INACTIVE}>Inactive</SelectItem>
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

export default VendorForm
