"use client";

import React from "react";
import z from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { requestQuotationSchema } from "@/lib/validators";
import { requestQuotationDefaultValues } from "@/lib/constants";
import {
  createRequestQuotation,
  updateRequestQuotation,
} from "@/lib/actions/requestQuotation-action";

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
import { RequestQuotation } from "@/types";
import RichTextEditor from "../textEditor/richTextEditor";

type RequestQuotationFormProps = {
  data?: RequestQuotation;
  update?: boolean;
};

const RequestQuotationForm = ({
  data,
  update = false,
}: RequestQuotationFormProps) => {
  const router = useRouter();
  const id = data?.id;

  const form = useForm<z.infer<typeof requestQuotationSchema>>({
    resolver: zodResolver(requestQuotationSchema) as any,
    defaultValues:
      (data as z.infer<typeof requestQuotationSchema>) ||
      requestQuotationDefaultValues,
  });

  const [isPending, startTransition] = React.useTransition();

  const onSubmit: SubmitHandler<
    z.infer<typeof requestQuotationSchema>
  > = async (values) => {
    startTransition(async () => {
      let res;

      if (update && id) {
        res = await updateRequestQuotation(values, id);
      } else {
        res = await createRequestQuotation(values);
      }

      if (!res?.success) {
        toast.error("Error", { description: res?.message });
      } else {
        toast.success("Success", { description: res?.message });
        router.push("/admin/requestQuotation");
      }
    });
  };

  

  return (
    <Form {...form}>
  <form
  onSubmit={form.handleSubmit(
    onSubmit,
    (errors) => {
      console.log( errors);
    }
  )}
  className="space-y-4"
>

        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({
            field,
          }: {
            field: ControllerRenderProps<
              z.infer<typeof requestQuotationSchema>,
              "title"
            >;
          }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter request title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Requirement */}
        <FormField
          control={form.control}
          name="requirement"
          render={({
            field,
          }: {
            field: ControllerRenderProps<
              z.infer<typeof requestQuotationSchema>,
              "requirement"
            >;
          }) => (
            <FormItem>
              <FormLabel>Requirement</FormLabel>
              <FormControl>
                <div className="border rounded-md p-2 min-h-[150px]">
                  <RichTextEditor
                    value={field.value}
                    onChange={field.onChange}
                  />
                </div>
              </FormControl>
              <FormMessage />
            
            </FormItem>
          )}
        />

        {/* Status */}
        <FormField
          control={form.control}
          name="status"
          render={({
            field,
          }: {
            field: ControllerRenderProps<
              z.infer<typeof requestQuotationSchema>,
              "status"
            >;
          }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(v) => field.onChange(v)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="DRAFT">Draft</SelectItem>
                    <SelectItem value="SENT">Sent</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
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

export default RequestQuotationForm;
