import DeviceAssignedForm from '@/components/device/assigned-device-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import ModuleForm from '@/components/user/module-from'
import { getDevice } from '@/lib/actions/device-action'
import { getDeviceAssignedById } from '@/lib/actions/device-assigned-action'
import { getEmployee } from '@/lib/actions/employee'
import { getModuleById } from '@/lib/actions/module-action'
import { Device, Employee } from '@/types'
import { AppModule } from '@/types'
import Link from 'next/link'
import React from 'react'

const ModuleEditPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    // const res = await getDeviceAssignedById(id)
    // const devices = await getDevice();
    // const empoloyees = await getEmployee();

    const res = await getModuleById(id)
    if (!res?.data) {
    return <div>Module not found</div>;
    }

    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <h1>Edit Module</h1>
                    <Button variant="default" className='bg-blue-500 hover:bg-blue-600'>
                        <Link href="/admin/module">Back</Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                 <ModuleForm data={res.data} update={true} />
            </CardContent>
        </Card>
    )
}

export default ModuleEditPage