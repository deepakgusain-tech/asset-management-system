import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
<<<<<<< HEAD
import ModuleForm from '@/components/user/module-from'
import { getDevice } from '@/lib/actions/device-action'
import { getDeviceAssignedById } from '@/lib/actions/device-assigned-action'
import { getEmployee } from '@/lib/actions/employee'
import { getModuleById } from '@/lib/actions/module-action'
import { Device, Employee } from '@/types'
import { AppModule } from '@/types'
=======
import ModuleForm from '@/components/user/module-form'
import { getModuleById } from '@/lib/actions/module-action'
import { getRoles } from '@/lib/actions/role-action'
>>>>>>> 64a8abe3216cae2d3c9025285e19fac63e51c88b
import Link from 'next/link'
import React from 'react'

const ModuleEditPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
<<<<<<< HEAD

    // const res = await getDeviceAssignedById(id)
    // const devices = await getDevice();
    // const empoloyees = await getEmployee();

    const res = await getModuleById(id)
    if (!res?.data) {
    return <div>Module not found</div>;
    }
=======
    const res = await getModuleById(id)
    const roles = await getRoles();
>>>>>>> 64a8abe3216cae2d3c9025285e19fac63e51c88b

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
<<<<<<< HEAD
                 <ModuleForm data={res.data} update={true} />
=======
                 <ModuleForm update={true} data={res.data} roles={roles} />
>>>>>>> 64a8abe3216cae2d3c9025285e19fac63e51c88b
            </CardContent>
        </Card>
    )
}

export default ModuleEditPage