import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import RoleForm from '@/components/user/role-form'
import { getRoleById } from '@/lib/actions/role-action'
import { Role } from '@/types'
import Link from 'next/link'
import React from 'react'

const RoleEditPage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const res = await getRoleById(id)

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
                <RoleForm data={res.data as Role} update={true} />
            </CardContent>
        </Card>
    )
}

export default RoleEditPage