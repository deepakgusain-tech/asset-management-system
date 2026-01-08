import DeviceAssignedForm from '@/components/device/assigned-device-form'
import DeviceCategoryForm from '@/components/device/device-category-form'
import DepartmentForm from '@/components/employee/department-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import ModuleForm from '@/components/user/module-from'
import { getDevice } from '@/lib/actions/device-action'
import { getEmployee } from '@/lib/actions/employee'
import { Device, Employee } from '@/types'
import Link from 'next/link'
import React from 'react'

const ModuleCreate = async() => {
    const devices = await getDevice();
    const empoloyees = await getEmployee();

    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <h1>Add Module</h1>
                    <Button variant="default" className='bg-blue-500 hover:bg-blue-600'>
                        <Link href="/admin/module">Back</Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <ModuleForm update={false} />
            </CardContent>
        </Card>
    )
}

export default ModuleCreate