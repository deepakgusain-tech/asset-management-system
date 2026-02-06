import DeviceAssignedForm from '@/components/device/assigned-device-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getDevice } from '@/lib/actions/device-action'
import { getDeviceAssignedById } from '@/lib/actions/device-assigned-action'
import { getEmployee } from '@/lib/actions/employee'
import { Device, Employee } from '@/types'
import Link from 'next/link'
import React from 'react'

const DepartmentEditPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const res = await getDeviceAssignedById(id)
    const devices = await getDevice();
    const empoloyees = await getEmployee();

    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <h1>Edit Device Assigned</h1>
                    <Button variant="default" className='bg-blue-500 hover:bg-blue-600'>
                        <Link href="/admin/device-assigned">Back</Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <DeviceAssignedForm data={res.data} update={true} devices={devices as Device[]} employees={empoloyees as Employee[]} />
            </CardContent>
        </Card>
    )
}

export default DepartmentEditPage                                                                                                                                                                   