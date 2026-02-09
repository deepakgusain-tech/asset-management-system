"use client";

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { deleteCategoryDevice, getDeviceCategory } from '@/lib/actions/device-category-action';
import { DeviceCategory } from '@/types'
import { EditIcon, Trash } from 'lucide-react';
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner';

const DeviceCategoryTable = ({ data }: { data: DeviceCategory[] }) => {

    const [categories, setCategories] = useState<DeviceCategory[]>(data)

    const deleteDeviceCategoryHandler = async (id: any) => {
        let res = await deleteCategoryDevice(id);

        if (!res?.success) {
            toast.error("Error", {
                description: res?.message
            })
        } else {
            toast.success("Success", {
                description: res?.message
            })

            const categories = await getDeviceCategory()
            setCategories(categories)
        }
    }

    return (
        <Table className='w-full'>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>CreatedAt</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {categories && categories.length > 0 && categories.map((category) => (
                    <TableRow key={category.id}>
                        <TableCell>{category.name}</TableCell>
                        <TableCell>{category.status === "ACTIVE" ? <Badge variant="default" className='bg-green-500' >{category.status}</Badge> : <Badge variant="destructive" >{category.status}</Badge>}</TableCell>
                        <TableCell>{category.createdAt?.toLocaleString()}</TableCell>
                        <TableCell className='space-x-2'>
                            <Button asChild variant="default" className='bg-orange-500 hover:bg-orange-600'>
                                <Link href={`/admin/device-category/edit/${category.id}`}>
                                    <EditIcon />
                                </Link>
                            </Button>
                            <Button variant="destructive" className='cursor-pointer' onClick={() => deleteDeviceCategoryHandler(category.id)}>
                                <Trash />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default DeviceCategoryTable