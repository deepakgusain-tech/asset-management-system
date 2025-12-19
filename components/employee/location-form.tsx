"use client";

import { locationSchema } from '@/lib/validators'
import { Location } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { ControllerRenderProps, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '../ui/button';
import { ArrowRight, Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Status } from '@/lib/generated/prisma/enums';
import { locationDefaultValues } from '@/lib/constants';
import { createLocation, updateLocation } from '@/lib/actions/location';

const LocationForm = ({ data, update = false }: { data?: Location, update: boolean }) => {
    const router = useRouter()
    const id = data?.id;

    const form = useForm<z.infer<typeof locationSchema>>({
        resolver: zodResolver(locationSchema),
        defaultValues: data || locationDefaultValues
    })

    const [isPending, startTransition] = React.useTransition()

    const onSubmit: SubmitHandler<z.infer<typeof locationSchema>> = async (values: any) => {

        startTransition(async () => {
            let res;

            if(update && id) {
                res = await updateLocation(values, id)
            }else {
                res = await createLocation(values)
            }

            if (!res?.success) {
                toast.error("Error", {
                    description: res?.message
                })
            } else {
                router.push("/admin/location")
            }
        })
    }
    return (
        <Form {...form}>
            <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit, (errors) => console.log(errors))}>
                <div className='flex flex-col gap-5'>
                    <FormField
                        control={form.control}
                        name='name'
                        render={({
                            field
                        }: {
                            field: ControllerRenderProps<z.infer<typeof locationSchema>, "name">
                        }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder='Enter name' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='flex flex-col gap-5'>
                    <FormField
                        control={form.control}
                        name='streetAddress'
                        render={({
                            field
                        }: {
                            field: ControllerRenderProps<z.infer<typeof locationSchema>, "streetAddress">
                        }) => (
                            <FormItem>
                                <FormLabel>Street Address</FormLabel>
                                <FormControl>
                                    <Input placeholder='Enter street address' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='flex flex-col gap-5'>
                    <FormField
                        control={form.control}
                        name='city'
                        render={({
                            field
                        }: {
                            field: ControllerRenderProps<z.infer<typeof locationSchema>, "city">
                        }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input placeholder='Enter City' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='flex flex-col gap-5'>
                    <FormField
                        control={form.control}
                        name='state'
                        render={({
                            field
                        }: {
                            field: ControllerRenderProps<z.infer<typeof locationSchema>, "state">
                        }) => (
                            <FormItem>
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                    <Input placeholder='Enter state' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='flex flex-col gap-5'>
                    <FormField
                        control={form.control}
                        name='postalCode'
                        render={({
                            field
                        }: {
                            field: ControllerRenderProps<z.infer<typeof locationSchema>, "postalCode">
                        }) => (
                            <FormItem>
                                <FormLabel>Postal Code</FormLabel>
                                <FormControl>
                                    <Input placeholder='Enter Postal Code' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='flex flex-col gap-5'>
                    <FormField
                        control={form.control}
                        name='country'
                        render={({
                            field
                        }: {
                            field: ControllerRenderProps<z.infer<typeof locationSchema>, "country">
                        }) => (
                            <FormItem>
                                <FormLabel>Country</FormLabel>
                                <FormControl>
                                    <Input placeholder='Enter country' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='flex flex-col gap-5'>
                    <FormField
                        control={form.control}
                        name='latitude'
                        render={({
                            field
                        }: {
                            field: ControllerRenderProps<z.infer<typeof locationSchema>, "latitude">
                        }) => (
                            <FormItem>
                                <FormLabel>Latitude</FormLabel>
                                <FormControl>
                                    <Input placeholder='Enter latitude' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='flex flex-col gap-5'>
                    <FormField
                        control={form.control}
                        name='longitude'
                        render={({
                            field
                        }: {
                            field: ControllerRenderProps<z.infer<typeof locationSchema>, "longitude">
                        }) => (
                            <FormItem>
                                <FormLabel>Longitude</FormLabel>
                                <FormControl>
                                    <Input placeholder='Enter longitude' {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='flex flex-col gap-5'>
                    <FormField
                        control={form.control}
                        name='status'
                        render={({
                            field
                        }: {
                            field: ControllerRenderProps<z.infer<typeof locationSchema>, "status">
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
                                            <SelectItem value={Status.INACTIVE}>Inactive</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='flex gap-2'>
                    <Button type='submit' className='cursor-pointer' disabled={isPending}>
                        {
                            isPending ? (<Loader className='w-4 h-4 animate-spin cursor-pointer' />) : (
                                <ArrowRight className='w-4 h-4' />
                            )
                        }{" "} Save
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default LocationForm