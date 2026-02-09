import DeviceAssignedForm from '@/components/device/assigned-device-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import ModuleForm from '@/components/user/module-form'
import { getRoles } from '@/lib/actions/role-action'
import Link from 'next/link'
import React from 'react'

const ModuleCreate = async() => {
    const roles = await getRoles();
   
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
                <ModuleForm update={false} roles={roles} />
            </CardContent>
        </Card>
    )
}

export default ModuleCreate