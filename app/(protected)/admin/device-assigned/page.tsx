import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'
import DepartmentTable from './device-assigned-table'
import { getDepartment } from '@/lib/actions/department'
import DeviceAssignedTable from './device-assigned-table'
import { getAssignedDevices } from '@/lib/actions/device-assigned-action'
import { getDevice } from '@/lib/actions/device-action'
import { getEmployee } from '@/lib/actions/employee'
import { Device, Employee } from '@/types'

const DeviceAssignedPage = async () => {
    const deviceAssigned = await getAssignedDevices()
    const devices = await getDevice();
    const empoloyees = await getEmployee();

    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <h1>Device Assigned</h1>
                    <Button variant="default" className='bg-blue-500 hover:bg-blue-600'>
                        <Link href="device-assigned/create">Add Device Assigned</Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent className='w-full'>
                <DeviceAssignedTable data={deviceAssigned} devices={devices as Device[]} employees={empoloyees as Employee[]} />
            </CardContent>
        </Card>
    )
}

export default DeviceAssignedPage