"use client";

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { deleteDevice, getDevice } from '@/lib/actions/device-action';
import { Device } from '@/types'
import { format } from 'date-fns';
import { EditIcon, Trash } from 'lucide-react';
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner';

const DeviceTable = ({ data }: { data: Device[] }) => {

    const [device, setDevice] = useState<Device[]>(data)

    const deleteDeviceHandler = async (id: any) => {
        let res = await deleteDevice(id);

        if (!res?.success) {
            toast.error("Error", {
                description: res?.message
            })
        } else {
            toast.success("Success", {
                description: res?.message
            })

            const response = await getDevice()
            console.log(response);

            setDevice(response as Device[])
        }
    }

    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Serial Number</TableHead>
                        <TableHead>Manufacturer</TableHead>
                        <TableHead>Purchased Date</TableHead>
                        <TableHead>Warranty End</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>CreatedAt</TableHead>
                        <TableHead>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {device && device.length > 0 && device.map((device) => (
                        <TableRow key={device.id}>
                            <TableCell>{device.name}</TableCell>
                            <TableCell>{device.serialNumber}</TableCell>
                            <TableCell>{device.manufacturer}</TableCell>
                            <TableCell>{device.purchaseDate && format(device.purchaseDate, "PPP")}</TableCell>
                            <TableCell>{device.warrantyEnd && format(device.warrantyEnd, "PPP")}</TableCell>
                            <TableCell>{device.status === "ACTIVE" ? <Badge variant="default" className='bg-green-500' >{device.status}</Badge> : <Badge variant="destructive" >{device.status}</Badge>}</TableCell>
                            <TableCell>{device.createdAt && format(device.createdAt, "PPP")}</TableCell>
                            <TableCell className='space-x-2'>
                                <Button asChild variant="default" className='bg-orange-500 hover:bg-orange-600'>
                                    <Link href={`/admin/device/edit/${device.id}`}>
                                        <EditIcon />
                                    </Link>
                                </Button>
                                <Button variant="destructive" className='cursor-pointer' onClick={() => deleteDeviceHandler(device.id)}>
                                    <Trash />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </>

    )
}

export default DeviceTable