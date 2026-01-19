// "use client";

// import React from "react";
// import { ControllerRenderProps, useForm } from "react-hook-form";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
// import { Input } from "../ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
// import { Button } from "../ui/button";
// import { ArrowRight, Loader } from "lucide-react";
// import { toast } from "sonner";

// // Dummy types for UI-only
// export interface VendorType {
//   id: string;
//   name: string;
// }

// export interface Vendor {
//   id?: string;
//   name: string;
//   email?: string;
//   phoneNumber?: string;
//   vendorTypeId?: string;
//   address?: string;
//   status: "ACTIVE" | "INACTIVE";
// }

// // Dummy default values
// export const vendorDefaultValues: Vendor = {
//   name: "",
//   email: "",
//   phoneNumber: "",
//   vendorTypeId: undefined,
//   address: "",
//   status: "ACTIVE",
// };

// interface VendorFormProps {
//   data?: Vendor;
//   update?: boolean;
//   vendorTypes: VendorType[];
//    onSubmit?: (values: Vendor) => void; // ✅ add this optional prop
// }

// const VendorForm = ({ data, update = false, vendorTypes }: VendorFormProps) => {
//   const form = useForm<Vendor>({
//     defaultValues: data || vendorDefaultValues,
//   });

//   const [isPending, startTransition] = React.useTransition();

//   const handleSubmit = (values: Vendor) => {
//     startTransition(() => {
//       console.log("Vendor Form Submitted (UI-only):", values);
//       toast.success("Vendor form submitted (UI-only)!");
//     });
//   };

//   return (
//     <Form {...form}>
//       <form
//         className="space-y-4 grid grid-cols-2 gap-4"
//         onSubmit={form.handleSubmit(handleSubmit)}
//       >
//         {/* Vendor Name */}
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }: { field: ControllerRenderProps<Vendor, "name"> }) => (
//             <FormItem>
//               <FormLabel>Name</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter Vendor Name" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Vendor Email */}
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }: { field: ControllerRenderProps<Vendor, "email"> }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter Email" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Vendor Phone */}
//         <FormField
//           control={form.control}
//           name="phoneNumber"
//           render={({ field }: { field: ControllerRenderProps<Vendor, "phoneNumber"> }) => (
//             <FormItem>
//               <FormLabel>Phone Number</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter Phone Number" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Vendor Type */}
//         <FormField
//           control={form.control}
//           name="vendorTypeId"
//           render={({ field }: { field: ControllerRenderProps<Vendor, "vendorTypeId"> }) => (
//             <FormItem>
//               <FormLabel>Vendor Type</FormLabel>
//               <FormControl>
//                 <Select defaultValue={field.value} onValueChange={(v) => field.onChange(v)}>
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Select Vendor Type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {vendorTypes.map((type) => (
//                       <SelectItem key={type.id} value={type.id}>
//                         {type.name}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Address (spans two columns) */}
//         <FormField
//           control={form.control}
//           name="address"
//           render={({ field }: { field: ControllerRenderProps<Vendor, "address"> }) => (
//             <FormItem className="col-span-2">
//               <FormLabel>Address</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter Address" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Status */}
//         <FormField
//           control={form.control}
//           name="status"
//           render={({ field }: { field: ControllerRenderProps<Vendor, "status"> }) => (
//             <FormItem>
//               <FormLabel>Status</FormLabel>
//               <FormControl>
//                 <Select defaultValue={field.value} onValueChange={(v) => field.onChange(v as "ACTIVE" | "INACTIVE")}>
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Select Status" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="ACTIVE">Active</SelectItem>
//                     <SelectItem value="INACTIVE">Inactive</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Submit Button */}
//         <div className="flex gap-2 col-span-2">
//           <Button type="submit" disabled={isPending}>
//             {isPending ? <Loader className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />} Save
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// };

// export default VendorForm;








// "use client";

// import React from "react";
// import { useForm, Controller } from "react-hook-form";
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
// import { Input } from "../ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
// import { Button } from "../ui/button";
// import { ArrowRight, Loader } from "lucide-react";

// const VendorForm = () => {
//   const form = useForm(); // no default values

//   const [isPending, startTransition] = React.useTransition();

//   // UI-only submit handler does nothing
//   const handleSubmit = () => {
//     startTransition(() => {
//       // Purely UI: no action
//     });
//   };

//   return (
//     <Form {...form}>
//       <form
//         className="space-y-4 grid grid-cols-2 gap-4"
//         onSubmit={form.handleSubmit(handleSubmit)}
//       >
//         {/* Vendor Name */}
//         <FormField
//           control={form.control}
//           name="name"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Name</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter Vendor Name" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Vendor Email */}
//         <FormField
//           control={form.control}
//           name="email"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Email</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter Email" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Vendor Phone */}
//         <FormField
//           control={form.control}
//           name="phoneNumber"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Phone Number</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter Phone Number" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Vendor Type */}
//         <FormField
//           control={form.control}
//           name="vendorTypeId"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Vendor Type</FormLabel>
//               <FormControl>
//                 <Select onValueChange={(v) => field.onChange(v)}>
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Select Vendor Type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {/* No options, purely UI */}
//                   </SelectContent>
//                 </Select>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Address (spans two columns) */}
//         <FormField
//           control={form.control}
//           name="address"
//           render={({ field }) => (
//             <FormItem className="col-span-2">
//               <FormLabel>Address</FormLabel>
//               <FormControl>
//                 <Input placeholder="Enter Address" {...field} />
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Status */}
//         <FormField
//           control={form.control}
//           name="status"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>Status</FormLabel>
//               <FormControl>
//                 <Select onValueChange={(v) => field.onChange(v)}>
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Select Status" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="ACTIVE">Active</SelectItem>
//                     <SelectItem value="INACTIVE">Inactive</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </FormControl>
//               <FormMessage />
//             </FormItem>
//           )}
//         />

//         {/* Submit Button */}
//         <div className="flex gap-2 col-span-2">
//           <Button type="submit" disabled={isPending}>
//             {isPending ? <Loader className="w-4 h-4 animate-spin" /> : <ArrowRight className="w-4 h-4" />} Save
//           </Button>
//         </div>
//       </form>
//     </Form>
//   );
// };

// export default VendorForm;


