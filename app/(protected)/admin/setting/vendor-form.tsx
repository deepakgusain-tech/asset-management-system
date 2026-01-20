"use client";

import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";

import { vendorSchema } from "@/lib/validators";
import { vendorDefaultValues } from "@/lib/constants";
import { createVendor } from "@/lib/actions/vendor-action";
// import { getVendorTypes } from "@/lib/actions/vendor-type-action";
import z from "zod"
import React from "react"




export default function AddAndUpdateModulePopover({ data, update }: { data?: any, update: boolean }) {

    const form = useForm<z.infer<typeof vendorSchema>>({
        resolver: zodResolver(vendorSchema),
        defaultValues: data || vendorDefaultValues
    })

    const [isPending, startTransition] = React.useTransition()

    const onSubmit: SubmitHandler<z.infer<typeof vendorSchema>> = async (values: any) => {
        startTransition(async () => {
            const res = await createVendor(values)

            if (!res?.success) {
                toast.error("Error", {
                    description: res?.message
                })
            }
        })
    }


  return (
    <Dialog>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <DialogTrigger asChild>
          <Button variant="outline">{update ? "Edit" : "Add"} Vendor</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{update ? "Edit" : "Add"} Vendor</DialogTitle>
          </DialogHeader>

          <div className="grid gap-4">
            {/* Name */}
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...form.register("name")} />
            </div>

            {/* Email */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...form.register("email")} />
            </div>

            {/* Phone Number */}
            <div className="grid gap-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <Input id="phoneNumber" {...form.register("phoneNumber")} />
            </div>

            {/* Address */}
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" {...form.register("address")} />
            </div>

            {/* Vendor Type */}
          {/*  <div className="grid gap-2">
              <Label htmlFor="vendorTypeId">Vendor Type</Label>
              <Select {...form.register("vendorTypeId")}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Vendor Type" />
                </SelectTrigger>
                 <SelectContent>
                  {vendorTypes.map((vt) => (
                    <SelectItem key={vt.id} value={vt.id}>
                      {vt.name}
                    </SelectItem>
                  ))}
                </SelectContent> 
              </Select>
            </div>
            */}

            {/* Status */}
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select {...form.register("status")}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">ACTIVE</SelectItem>
                  <SelectItem value="INACTIVE">INACTIVE</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">{update ? "Update" : "Save"}</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
