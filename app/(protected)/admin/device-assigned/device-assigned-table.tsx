"use client";

import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { deleteDepartment } from '@/lib/actions/department';
import { getAssignedDevices } from '@/lib/actions/device-assigned-action';
import { Device, DeviceAssigned, Employee } from '@/types'
import { EditIcon, Trash } from 'lucide-react';
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner';

const DeviceAssignedTable = ({ data, devices, employees }: { data: DeviceAssigned[], devices: Device[] , employees: Employee[] }) => {

    const [assignedDevice, setAssignedDevice] = useState<DeviceAssigned[]>(data)

    const deleteDeviceAssignedHandler = async (id: any) => {
        let res = await deleteDepartment(id);

        if (!res?.success) {
            toast.error("Error", {
                description: res?.message
            })
        } else {
            toast.success("Success", {
                description: res?.message
            })

            const response = await getAssignedDevices()
            setAssignedDevice(response)
        }
    }

    return (
        <Table className='w-full'>
            <TableHeader>
                <TableRow>
                    <TableHead>Device</TableHead>
                    <TableHead>Employee</TableHead>
                    <TableHead>Assigned Date</TableHead>
                    <TableHead>Returned Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>CreatedAt</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {assignedDevice && assignedDevice.length > 0 && assignedDevice.map((deviceAssigned) => (
                    <TableRow key={deviceAssigned.id}>
                        <TableCell>{(devices.find((d) => d.id === deviceAssigned.deviceId))?.name}</TableCell>
                        <TableCell>{(employees.find((e) => e.id === deviceAssigned.employeeId))?.first_name}</TableCell>
                        <TableCell>{deviceAssigned.assignedDate?.toLocaleString()}</TableCell>
                        <TableCell>{deviceAssigned.returnedDate?.toLocaleString()}</TableCell>
                        <TableCell>{deviceAssigned.status}</TableCell>
                        <TableCell>{deviceAssigned.createdAt?.toLocaleString()}</TableCell>
                        <TableCell className='space-x-2'>
                            <Button asChild variant="default" className='bg-orange-500 hover:bg-orange-600'>
                                <Link href={`/admin/device-assigned/edit/${deviceAssigned.id}`}>
                                    <EditIcon />
                                </Link>
                            </Button>
                            <Button variant="destructive" className='cursor-pointer' onClick={() => deleteDeviceAssignedHandler(deviceAssigned.id)}>
                                <Trash />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default DeviceAssignedTable