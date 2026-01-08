import Roleform from '@/components/USer/role-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getRoleById } from '@/lib/actions/role-action'
import Link from 'next/link'
import React from 'react'

const EditRolePage = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const res = await getRoleById(id)

    return (
        <Card>
            <CardHeader>
                <div className='flex justify-between items-center'>
                    <h1>Edit Role</h1>
                    <Button variant="default" className='bg-blue-500 hover:bg-blue-600'>
                        <Link href="/admin/role">Back</Link>
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <Roleform data={res.data} update={true} />
            </CardContent>
        </Card>
    )
}
export default EditRolePage
